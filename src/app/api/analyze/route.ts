import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getCurrentUser } from '@/lib/firebase/session'
import { getFirebaseAdminDb } from '@/lib/firebase/admin'
import { LENSES, LensId } from '@/lib/lenses'

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().split('T')[0]
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { session_id, client_id, lens_id, transcript } = await request.json()

    if (!lens_id || !transcript || !LENSES[lens_id as LensId]) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const db = getFirebaseAdminDb()
    const isPro = user.plan === 'pro'

    if (!isPro) {
      const weekStart = getWeekStart()
      const usageRef = db.collection('usage').doc(`${user.id}_${weekStart}`)
      const usageSnapshot = await usageRef.get()
      const currentCount = usageSnapshot.exists ? usageSnapshot.data()?.count || 0 : 0
      if (currentCount >= 10) {
        return NextResponse.json(
          { error: 'Weekly limit reached. Upgrade to Pro for unlimited analyses.' },
          { status: 429 }
        )
      }
    }

    // Format transcript for analysis
    const transcriptText = Array.isArray(transcript)
      ? transcript.map((s: { speaker: string; text: string }) => `${s.speaker}: ${s.text}`).join('\n')
      : transcript

    const lens = LENSES[lens_id as LensId]

    // Call Anthropic (instantiated here to avoid module-level errors when API key is unset)
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: lens.prompt,
      messages: [
        {
          role: 'user',
          content: `Please analyze the following session transcript:\n\n${transcriptText}`,
        },
      ],
    })

    const result = message.content[0].type === 'text' ? message.content[0].text : ''

    const analysisRef = await db.collection('analyses').add({
      sessionId: session_id || null,
      userId: user.id,
      clientId: client_id || null,
      lensId: lens_id,
      result,
      createdAt: new Date().toISOString(),
    })

    const weekStart = getWeekStart()
    try {
      const usageRef = db.collection('usage').doc(`${user.id}_${weekStart}`)
      await db.runTransaction(async (transaction) => {
        const usageSnapshot = await transaction.get(usageRef)
        const count = usageSnapshot.exists ? usageSnapshot.data()?.count || 0 : 0
        transaction.set(usageRef, {
          userId: user.id,
          weekStart,
          count: count + 1,
          updatedAt: new Date().toISOString(),
        }, { merge: true })
      })
    } catch {
      // Ignore usage tracking errors
    }

    return NextResponse.json({ result, analysis_id: analysisRef.id })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
