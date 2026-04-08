import { NextRequest, NextResponse } from 'next/server'

const ASSEMBLYAI_API = 'https://api.assemblyai.com/v2'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 })
    }

    const apiKey = process.env.ASSEMBLYAI_API_KEY!

    // Upload audio to AssemblyAI
    const audioBuffer = await audioFile.arrayBuffer()
    const uploadResponse = await fetch(`${ASSEMBLYAI_API}/upload`, {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'content-type': 'application/octet-stream',
      },
      body: audioBuffer,
    })
    const { upload_url } = await uploadResponse.json()

    // Submit for transcription with speaker diarization
    const transcriptResponse = await fetch(`${ASSEMBLYAI_API}/transcript`, {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        audio_url: upload_url,
        speaker_labels: true,
      }),
    })
    const { id: transcriptId } = await transcriptResponse.json()

    // Poll for completion (max 5 minutes)
    const maxAttempts = 60
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 5000))

      const pollResponse = await fetch(`${ASSEMBLYAI_API}/transcript/${transcriptId}`, {
        headers: { 'authorization': apiKey },
      })
      const result = await pollResponse.json()

      if (result.status === 'completed') {
        // Build speaker-labeled segments from utterances
        const segments = (result.utterances || []).map((u: { speaker: string; text: string }) => ({
          speaker: u.speaker === 'A' ? 'Practitioner' : 'Client',
          text: u.text,
        }))
        return NextResponse.json({
          transcript: segments,
          text: result.text,
          duration_seconds: Math.round(result.audio_duration || 0),
          word_count: result.words?.length || 0,
        })
      }

      if (result.status === 'error') {
        return NextResponse.json({ error: result.error }, { status: 500 })
      }
    }

    return NextResponse.json({ error: 'Transcription timed out' }, { status: 408 })
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 })
  }
}
