'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LENSES } from '@/lib/lenses'
import type { LensId } from '@/lib/lenses'
import Link from 'next/link'

interface Analysis {
  id: string
  session_id: string
  client_id: string
  lens_id: string
  result: string
  created_at: string
  clients?: { name: string; initials: string; color: string }
  sessions?: { session_number: number }
}

interface Client {
  id: string
  name: string
}

export default function AnalysesPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [filterClient, setFilterClient] = useState<string>('')
  const [filterLens, setFilterLens] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [{ data: a }, { data: c }] = await Promise.all([
        supabase.from('analyses')
          .select('*, clients(name, initials, color), sessions(session_number)')
          .eq('practitioner_id', user.id)
          .order('created_at', { ascending: false }),
        supabase.from('clients').select('id, name').eq('practitioner_id', user.id).order('name'),
      ])

      setAnalyses(a || [])
      setClients(c || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = analyses.filter(a => {
    if (filterClient && a.client_id !== filterClient) return false
    if (filterLens && a.lens_id !== filterLens) return false
    return true
  })

  const LENS_IDS = Object.keys(LENSES) as LensId[]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analyses</h1>
        <p className="text-gray-400 text-sm mt-1">{filtered.length} analyses</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <select
          value={filterClient}
          onChange={e => setFilterClient(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a6b5e] bg-white"
        >
          <option value="">All clients</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={filterLens}
          onChange={e => setFilterLens(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a6b5e] bg-white"
        >
          <option value="">All lenses</option>
          {LENS_IDS.map(id => (
            <option key={id} value={id}>{LENSES[id].name}</option>
          ))}
        </select>
        {(filterClient || filterLens) && (
          <button
            onClick={() => { setFilterClient(''); setFilterLens('') }}
            className="text-sm text-gray-400 hover:text-gray-600 px-2"
          >
            Clear filters
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/4 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <div className="text-4xl mb-4">🔬</div>
          <h3 className="text-gray-900 font-semibold mb-2">No analyses yet</h3>
          <p className="text-gray-400 text-sm mb-6">Run your first analysis from a session</p>
          <Link href="/dashboard/sessions/new" className="text-[#0a6b5e] text-sm font-medium hover:underline">
            Start a session
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(analysis => {
            const lens = LENSES[analysis.lens_id as LensId]
            return (
              <div key={analysis.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: analysis.clients?.color || '#0a6b5e' }}
                    >
                      {analysis.clients?.initials || '?'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{analysis.clients?.name}</span>
                        {analysis.sessions?.session_number && (
                          <span className="text-xs text-gray-400">Session #{analysis.sessions.session_number}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: lens?.color + '20', color: lens?.color }}>
                      {lens?.name || analysis.lens_id}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(analysis.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed pl-11">
                  {analysis.result}
                </p>
                <div className="mt-3 pl-11">
                  <Link
                    href={`/dashboard/sessions/${analysis.session_id}`}
                    className="text-xs text-[#0a6b5e] font-medium hover:underline"
                  >
                    View full session →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
