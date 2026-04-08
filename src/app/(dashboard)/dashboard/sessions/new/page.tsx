'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LENSES, LENS_IDS } from '@/lib/lenses'
import type { LensId } from '@/lib/lenses'
import { Mic, Pause, Square, Play, ChevronRight, Check } from 'lucide-react'

interface Client {
  id: string
  name: string
  initials: string
  color: string
  session_count?: number
}

interface TranscriptSegment {
  speaker: string
  text: string
}

export default function NewSessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedClientId = searchParams.get('client')

  const [step, setStep] = useState(1)
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [consent, setConsent] = useState(false)

  // Recording state
  const [recording, setRecording] = useState(false)
  const [paused, setPaused] = useState(false)
  const [timer, setTimer] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Transcription state
  const [transcribing, setTranscribing] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([])
  const [transcriptMeta, setTranscriptMeta] = useState<{ word_count: number; duration_seconds: number } | null>(null)
  const [transcriptError, setTranscriptError] = useState('')

  // Analysis state
  const [selectedLens, setSelectedLens] = useState<LensId | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [analysisError, setAnalysisError] = useState('')
  const [savedSessionId, setSavedSessionId] = useState<string | null>(null)

  // Load clients
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase.from('clients').select('*, sessions(id)').eq('practitioner_id', user.id)
        .order('name').then(({ data }) => {
          const withCount = (data || []).map(c => ({ ...c, session_count: c.sessions?.length || 0 }))
          setClients(withCount)
          if (preselectedClientId) {
            const found = withCount.find(c => c.id === preselectedClientId)
            if (found) { setSelectedClient(found); setStep(2) }
          }
        })
    })
  }, [preselectedClientId])

  // Timer
  useEffect(() => {
    if (recording && !paused) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [recording, paused])

  function formatTime(s: number) {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
      }
      recorder.start(1000)
      setRecording(true)
      setPaused(false)
      setTimer(0)
    } catch {
      alert('Could not access microphone. Please allow microphone access.')
    }
  }

  function pauseRecording() {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause()
      setPaused(true)
    }
  }

  function resumeRecording() {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume()
      setPaused(false)
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      streamRef.current?.getTracks().forEach(t => t.stop())
      setRecording(false)
      setPaused(false)
      setStep(4)
    }
  }

  // Auto-transcribe after recording stops
  useEffect(() => {
    if (step === 4 && audioBlob) {
      transcribeAudio()
    }
  }, [step, audioBlob])

  async function transcribeAudio() {
    if (!audioBlob) return
    setTranscribing(true)
    setTranscriptError('')

    const formData = new FormData()
    formData.append('audio', audioBlob, 'session.webm')

    const res = await fetch('/api/transcribe', { method: 'POST', body: formData })
    const data = await res.json()

    if (!res.ok) {
      setTranscriptError(data.error || 'Transcription failed')
      setTranscribing(false)
      return
    }

    setTranscript(data.transcript || [])
    setTranscriptMeta({ word_count: data.word_count || 0, duration_seconds: data.duration_seconds || timer })
    setTranscribing(false)

    // Save session to DB
    await saveSession(data.transcript || [], data.duration_seconds || timer)
    setStep(5)
  }

  async function saveSession(transcriptData: TranscriptSegment[], duration: number) {
    if (!selectedClient) return
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Get next session number for this client
    const { count } = await supabase.from('sessions').select('*', { count: 'exact', head: true })
      .eq('client_id', selectedClient.id)

    const { data: session } = await supabase.from('sessions').insert({
      practitioner_id: user.id,
      client_id: selectedClient.id,
      transcript: transcriptData,
      duration_seconds: duration,
      session_number: (count || 0) + 1,
    }).select().single()

    if (session) setSavedSessionId(session.id)
  }

  async function runAnalysis() {
    if (!selectedLens || !savedSessionId || !selectedClient) return
    setAnalyzing(true)
    setAnalysisError('')

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        session_id: savedSessionId,
        client_id: selectedClient.id,
        lens_id: selectedLens,
        transcript,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setAnalysisError(data.error || 'Analysis failed')
    } else {
      setAnalysisResult(data.result)
    }
    setAnalyzing(false)
  }

  const speakerCount = new Set(transcript.map(s => s.speaker)).size

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1,2,3,4,5].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step > s ? 'bg-[#0a6b5e] text-white' : step === s ? 'bg-[#0a6b5e] text-white ring-4 ring-[#0a6b5e]/20' : 'bg-gray-200 text-gray-400'
            }`}>
              {step > s ? <Check size={14} /> : s}
            </div>
            {s < 5 && <div className={`h-0.5 w-8 ${step > s ? 'bg-[#0a6b5e]' : 'bg-gray-200'}`} />}
          </div>
        ))}
        <div className="ml-3 text-sm text-gray-400">
          {['Select Client', 'Consent', 'Record', 'Transcribe', 'Review'][step - 1]}
        </div>
      </div>

      {/* Step 1: Select Client */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Select a client</h2>
          <p className="text-gray-400 text-sm mb-6">Who is this session with?</p>
          {clients.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-400 text-sm mb-3">No clients yet</p>
              <a href="/dashboard/clients" className="text-[#0a6b5e] text-sm font-medium hover:underline">Add a client first</a>
            </div>
          ) : (
            <div className="space-y-2">
              {clients.map(client => (
                <button
                  key={client.id}
                  onClick={() => { setSelectedClient(client); setStep(2) }}
                  className="w-full flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-[#0a6b5e]/40 hover:bg-[#0a6b5e]/5 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: client.color }}>
                    {client.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    <div className="text-xs text-gray-400">{client.session_count} sessions</div>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Consent */}
      {step === 2 && selectedClient && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm consent</h2>
          <p className="text-gray-400 text-sm mb-6">Session with <span className="font-medium text-gray-700">{selectedClient.name}</span></p>
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-[#0a6b5e]"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                Client has consented to recording and transcription for this session.
              </span>
            </label>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50">
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!consent}
              className="flex-1 bg-[#0a6b5e] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0d7f6f] disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Record */}
      {step === 3 && selectedClient && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Recording session</h2>
          <p className="text-[#0a6b5e] font-medium mb-8">{selectedClient.name}</p>

          {/* Waveform animation */}
          <div className="flex items-center justify-center gap-1 h-16 mb-6">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all ${recording && !paused ? 'bg-[#1d9e75]' : 'bg-gray-300'}`}
                style={{
                  height: recording && !paused ? `${20 + Math.sin((Date.now() / 200) + i * 0.5) * 20 + Math.random() * 15}px` : '8px',
                  animation: recording && !paused ? `wave ${0.8 + (i % 5) * 0.1}s ease-in-out infinite alternate` : 'none',
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>

          <style>{`
            @keyframes wave {
              from { height: 8px; }
              to { height: 48px; }
            }
          `}</style>

          <div className="text-4xl font-mono font-bold text-gray-900 mb-8">
            {formatTime(timer)}
          </div>

          {!recording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 mx-auto bg-[#0a6b5e] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0d7f6f] transition-colors"
            >
              <Mic size={18} />
              Start Recording
            </button>
          ) : (
            <div className="flex items-center justify-center gap-4">
              {!paused ? (
                <button onClick={pauseRecording} className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50">
                  <Pause size={16} />
                  Pause
                </button>
              ) : (
                <button onClick={resumeRecording} className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50">
                  <Play size={16} />
                  Resume
                </button>
              )}
              <button onClick={stopRecording} className="flex items-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600">
                <Square size={16} />
                Stop
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Transcribing */}
      {step === 4 && (
        <div className="text-center py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Transcribing session</h2>
          <p className="text-gray-400 text-sm mb-8">This usually takes 1–3 minutes</p>

          {transcriptError ? (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{transcriptError}</div>
          ) : (
            <>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                <div className="h-2 bg-[#1d9e75] rounded-full animate-pulse" style={{ width: transcribing ? '75%' : '100%', transition: 'width 2s ease' }} />
              </div>
              <p className="text-sm text-gray-500">{transcribing ? 'Processing audio...' : 'Almost done...'}</p>
            </>
          )}
        </div>
      )}

      {/* Step 5: Review + Analysis */}
      {step === 5 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Transcript ready</h2>

          {/* Meta */}
          <div className="flex gap-4 mb-6">
            <div className="bg-white border border-gray-100 rounded-lg px-4 py-2.5 text-center">
              <div className="text-lg font-bold text-gray-900">{transcriptMeta?.word_count || 0}</div>
              <div className="text-xs text-gray-400">Words</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg px-4 py-2.5 text-center">
              <div className="text-lg font-bold text-gray-900">{speakerCount}</div>
              <div className="text-xs text-gray-400">Speakers</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg px-4 py-2.5 text-center">
              <div className="text-lg font-bold text-gray-900">{formatTime(transcriptMeta?.duration_seconds || 0)}</div>
              <div className="text-xs text-gray-400">Duration</div>
            </div>
          </div>

          {/* Transcript preview */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6 max-h-64 overflow-y-auto">
            {transcript.slice(0, 6).map((seg, i) => (
              <div key={i} className="mb-3">
                <div className={`text-xs font-semibold mb-0.5 ${seg.speaker === 'Practitioner' ? 'text-[#0a6b5e]' : 'text-gray-500'}`}>
                  {seg.speaker}
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">{seg.text}</div>
              </div>
            ))}
            {transcript.length > 6 && (
              <div className="text-xs text-gray-400 text-center pt-2">+ {transcript.length - 6} more segments</div>
            )}
          </div>

          {/* Lens selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">Run analysis with lens</label>
            <div className="grid grid-cols-4 gap-2">
              {LENS_IDS.map(lensId => {
                const lens = LENSES[lensId]
                return (
                  <button
                    key={lensId}
                    onClick={() => setSelectedLens(lensId)}
                    className={`text-center px-2 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                      selectedLens === lensId
                        ? 'border-[#0a6b5e] bg-[#0a6b5e]/5 text-[#0a6b5e]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {lens.name}
                  </button>
                )
              })}
            </div>
          </div>

          {analysisError && (
            <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg mb-3">{analysisError}</div>
          )}

          <div className="flex gap-3 mb-4">
            {savedSessionId && (
              <button
                onClick={() => router.push(`/dashboard/sessions/${savedSessionId}`)}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                View Session
              </button>
            )}
            <button
              onClick={runAnalysis}
              disabled={!selectedLens || analyzing}
              className="flex-1 bg-[#0a6b5e] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0d7f6f] disabled:opacity-50"
            >
              {analyzing ? 'Analyzing...' : 'Run Analysis'}
            </button>
          </div>

          {analysisResult && (
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-sm font-semibold text-gray-900 mb-3">
                {selectedLens && LENSES[selectedLens].name} Analysis
              </div>
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{analysisResult}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
