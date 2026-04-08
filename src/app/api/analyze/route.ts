import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
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
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { session_id, client_id, lens_id, transcript } = await request.json()

    if (!lens_id || !transcript || !LENSES[lens_id as LensId]) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check profile plan
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    const isPro = profile?.plan === 'pro'

    if (!isPro) {
      // Check weekly usage
      const weekStart = getWeekStart()
      const { data: usage } = await supabase
        .from('usage')
        .select('count')
        .eq('practitioner_id', user.id)
        .eq('week_start', weekStart)
        .single()

      const currentCount = usage?.count || 0
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

    // Save analysis
    const { data: analysis, error: saveError } = await supabase
      .from('analyses')
      .insert({
        session_id,
        practitioner_id: user.id,
        client_id,
        lens_id,
        result,
      })
      .select()
      .single()

    if (saveError) {
      console.error('Save error:', saveError)
    }

    // Update usage
    const weekStart = getWeekStart()
    try {
      const { error: rpcError } = await supabase.rpc('increment_usage', {
        p_practitioner_id: user.id,
        p_week_start: weekStart,
      })
      if (rpcError) {
        await supabase.from('usage').upsert({
          practitioner_id: user.id,
          week_start: weekStart,
          count: 1,
        }, { onConflict: 'practitioner_id,week_start' })
      }
    } catch {
      // Ignore usage tracking errors
    }

    return NextResponse.json({ result, analysis_id: analysis?.id })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
