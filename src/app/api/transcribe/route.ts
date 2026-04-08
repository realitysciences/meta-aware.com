import { NextRequest, NextResponse } from 'next/server'

const ASSEMBLYAI_API = 'https://api.assemblyai.com/v2'

// POST: upload audio + submit transcription job → returns { transcriptId }
export async function POST(request: NextRequest) {
  try {
    const API_KEY = process.env.ASSEMBLYAI_API_KEY || ''
    if (!API_KEY) {
      return NextResponse.json({ error: 'AssemblyAI API key not configured' }, { status: 500 })
    }

    const formData = await request.formData()
    const audioFile = formData.get('audio') as File

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 })
    }

    // Upload audio to AssemblyAI
    const audioBuffer = await audioFile.arrayBuffer()
    const uploadResponse = await fetch(`${ASSEMBLYAI_API}/upload`, {
      method: 'POST',
      headers: {
        'authorization': API_KEY,
        'content-type': 'application/octet-stream',
      },
      body: audioBuffer,
    })

    const uploadText = await uploadResponse.text()
    if (!uploadResponse.ok) {
      console.error('AssemblyAI upload error:', uploadText)
      return NextResponse.json({ error: `Upload failed: ${uploadText}` }, { status: 500 })
    }

    const { upload_url } = JSON.parse(uploadText)
    if (!upload_url) {
      return NextResponse.json({ error: 'No upload URL returned from AssemblyAI' }, { status: 500 })
    }

    // Submit transcription job (returns immediately with an ID)
    const transcriptResponse = await fetch(`${ASSEMBLYAI_API}/transcript`, {
      method: 'POST',
      headers: {
        'authorization': API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        audio_url: upload_url,
        speech_model: 'universal',
        speaker_labels: true,
      }),
    })

    const transcriptText = await transcriptResponse.text()
    if (!transcriptResponse.ok) {
      console.error('AssemblyAI submit error:', transcriptText)
      return NextResponse.json({ error: `Submit failed: ${transcriptText}` }, { status: 500 })
    }

    const { id: transcriptId } = JSON.parse(transcriptText)
    if (!transcriptId) {
      return NextResponse.json({ error: 'No transcript ID returned from AssemblyAI' }, { status: 500 })
    }

    return NextResponse.json({ transcriptId })
  } catch (error) {
    console.error('Transcription submit error:', error)
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 })
  }
}

// GET: check status of a transcription job → returns result or { status }
export async function GET(request: NextRequest) {
  try {
    const API_KEY = process.env.ASSEMBLYAI_API_KEY || ''
    if (!API_KEY) {
      return NextResponse.json({ error: 'AssemblyAI API key not configured' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const transcriptId = searchParams.get('id')

    if (!transcriptId) {
      return NextResponse.json({ error: 'No transcript ID provided' }, { status: 400 })
    }

    const pollResponse = await fetch(`${ASSEMBLYAI_API}/transcript/${transcriptId}`, {
      headers: { 'authorization': API_KEY },
    })

    if (!pollResponse.ok) {
      return NextResponse.json({ error: 'Failed to check transcription status' }, { status: 500 })
    }

    const result = await pollResponse.json()

    if (result.status === 'completed') {
      const segments = (result.utterances || []).map((u: { speaker: string; text: string }) => ({
        speaker: u.speaker === 'A' ? 'Practitioner' : 'Client',
        text: u.text,
      }))
      return NextResponse.json({
        status: 'completed',
        transcript: segments,
        text: result.text,
        duration_seconds: Math.round(result.audio_duration || 0),
        word_count: result.words?.length || 0,
      })
    }

    if (result.status === 'error') {
      return NextResponse.json({ status: 'error', error: result.error }, { status: 500 })
    }

    // Still processing
    return NextResponse.json({ status: result.status })
  } catch (error) {
    console.error('Transcription poll error:', error)
    return NextResponse.json({ error: 'Failed to check transcription' }, { status: 500 })
  }
}
