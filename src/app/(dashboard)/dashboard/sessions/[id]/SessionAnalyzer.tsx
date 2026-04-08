'use client'

import { useState } from 'react'
import { LENSES, LENS_IDS } from '@/lib/lenses'
import type { LensId } from '@/lib/lenses'
import { useRouter } from 'next/navigation'

interface Props {
  sessionId: string
  clientId: string
  transcript: Array<{ speaker: string; text: string }>
}

export default function SessionAnalyzer({ sessionId, clientId, transcript }: Props) {
  const router = useRouter()
  const [selectedLens, setSelectedLens] = useState<LensId | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handleAnalyze() {
    if (!selectedLens) return
    setLoading(true)
    setError('')
    setResult(null)

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, client_id: clientId, lens_id: selectedLens, transcript }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Analysis failed')
    } else {
      setResult(data.result)
      router.refresh()
    }
    setLoading(false)
  }

  if (!transcript.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <p className="text-sm text-gray-400">No transcript to analyze</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Run Analysis</h2>
      <div className="grid grid-cols-2 gap-1.5 mb-4">
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
      {error && <div className="bg-red-50 text-red-700 text-xs px-3 py-2 rounded-lg mb-3">{error}</div>}
      <button
        onClick={handleAnalyze}
        disabled={!selectedLens || loading}
        className="w-full bg-[#0a6b5e] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#0d7f6f] disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Run Analysis'}
      </button>
      {result && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">{result}</div>
        </div>
      )}
    </div>
  )
}
