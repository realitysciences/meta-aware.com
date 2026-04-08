'use client'

import { useState } from 'react'
import { LENSES, LENS_IDS } from '@/lib/lenses'
import type { LensId } from '@/lib/lenses'

interface Session {
  id: string
  session_number: number
  transcript: Array<{ speaker: string; text: string }> | null
}

interface Props {
  clientId: string
  sessions: Session[]
}

export default function RunAnalysisSection({ clientId, sessions }: Props) {
  const [selectedLens, setSelectedLens] = useState<LensId | null>(null)
  const [selectedSession, setSelectedSession] = useState<string>(sessions[0]?.id || '')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')

  const sessionsWithTranscripts = sessions.filter(s => s.transcript && s.transcript.length > 0)

  async function handleAnalyze() {
    if (!selectedLens || !selectedSession) return

    const session = sessions.find(s => s.id === selectedSession)
    if (!session?.transcript) {
      setError('Selected session has no transcript')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        session_id: selectedSession,
        client_id: clientId,
        lens_id: selectedLens,
        transcript: session.transcript,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Analysis failed')
    } else {
      setResult(data.result)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Run New Analysis</h2>

      {sessionsWithTranscripts.length === 0 ? (
        <p className="text-xs text-gray-400">No transcribed sessions yet. Record a session first.</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2">Session</label>
            <select
              value={selectedSession}
              onChange={e => setSelectedSession(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a6b5e]"
            >
              {sessionsWithTranscripts.map(s => (
                <option key={s.id} value={s.id}>Session #{s.session_number}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2">Lens</label>
            <div className="grid grid-cols-2 gap-1.5">
              {LENS_IDS.map(lensId => {
                const lens = LENSES[lensId]
                return (
                  <button
                    key={lensId}
                    onClick={() => setSelectedLens(lensId)}
                    className={`text-left px-2.5 py-2 rounded-lg border text-xs font-medium transition-all ${
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

          {error && (
            <div className="bg-red-50 text-red-700 text-xs px-3 py-2 rounded-lg mb-3">{error}</div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!selectedLens || !selectedSession || loading}
            className="w-full bg-[#0a6b5e] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#0d7f6f] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Run Analysis'}
          </button>

          {result && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-xs font-semibold text-gray-700 mb-2">Analysis Result</div>
              <div className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">{result}</div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
