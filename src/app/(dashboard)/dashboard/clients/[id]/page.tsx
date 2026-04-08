import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { LENSES } from '@/lib/lenses'
import type { LensId } from '@/lib/lenses'
import SessionActivityChart from './SessionActivityChart'
import RunAnalysisSection from './RunAnalysisSection'

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params // Next.js 16: params is a Promise

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .eq('practitioner_id', user.id)
    .single()

  if (!client) notFound()

  const [{ data: sessions }, { data: analyses }] = await Promise.all([
    supabase.from('sessions')
      .select('*')
      .eq('client_id', id)
      .order('created_at', { ascending: false }),
    supabase.from('analyses')
      .select('*')
      .eq('client_id', id)
      .order('created_at', { ascending: false }),
  ])

  // Build monthly session activity data
  const monthlyActivity: Record<string, number> = {}
  for (const session of sessions || []) {
    const month = new Date(session.created_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    monthlyActivity[month] = (monthlyActivity[month] || 0) + 1
  }
  const chartData = Object.entries(monthlyActivity).map(([month, count]) => ({ month, count })).slice(-6)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/clients" className="text-gray-400 hover:text-gray-600 text-sm">← Clients</Link>
      </div>

      <div className="flex items-start gap-5 mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
          style={{ backgroundColor: client.color }}
        >
          {client.initials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
            <span>{sessions?.length || 0} sessions</span>
            <span>{analyses?.length || 0} analyses</span>
            {client.notes && <span>· {client.notes}</span>}
          </div>
        </div>
        <div className="ml-auto">
          <Link
            href={`/dashboard/sessions/new?client=${id}`}
            className="bg-[#0a6b5e] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0d7f6f] transition-colors"
          >
            + New Session
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Session history */}
        <div className="col-span-3 space-y-4">
          <h2 className="text-base font-semibold text-gray-900">Session History</h2>
          {!sessions?.length ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <p className="text-gray-400 text-sm">No sessions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map(session => {
                const sessionAnalyses = (analyses || []).filter(a => a.session_id === session.id)
                return (
                  <Link
                    key={session.id}
                    href={`/dashboard/sessions/${session.id}`}
                    className="block bg-white rounded-xl border border-gray-100 p-4 hover:border-[#0a6b5e]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">Session #{session.session_number}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(session.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    {sessionAnalyses.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {sessionAnalyses.map(a => {
                          const lens = LENSES[a.lens_id as LensId]
                          return (
                            <span key={a.id} className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ backgroundColor: lens?.color + '20', color: lens?.color }}>
                              {lens?.name || a.lens_id}
                            </span>
                          )
                        })}
                      </div>
                    )}
                    {session.transcript && Array.isArray(session.transcript) && session.transcript.length > 0 && (
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {session.transcript[0]?.text}
                      </p>
                    )}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Right column: chart + run analysis */}
        <div className="col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Session Activity</h2>
            <SessionActivityChart data={chartData} />
          </div>

          <RunAnalysisSection
            clientId={id}
            sessions={sessions || []}
          />
        </div>
      </div>
    </div>
  )
}
