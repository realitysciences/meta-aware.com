import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LENSES } from '@/lib/lenses'
import type { LensId } from '@/lib/lenses'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const today = new Date().toISOString().split('T')[0]
  const weekStart = (() => {
    const now = new Date()
    const day = now.getDay()
    const diff = now.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(now.setDate(diff)).toISOString().split('T')[0]
  })()

  // Parallel data fetching
  const [
    { count: clientCount },
    { count: weekSessionCount },
    { count: analysisCount },
    { data: todaySessions },
    { data: recentAnalyses },
  ] = await Promise.all([
    supabase.from('clients').select('*', { count: 'exact', head: true }).eq('practitioner_id', user.id),
    supabase.from('sessions').select('*', { count: 'exact', head: true })
      .eq('practitioner_id', user.id).gte('created_at', weekStart),
    supabase.from('analyses').select('*', { count: 'exact', head: true }).eq('practitioner_id', user.id),
    supabase.from('sessions').select('*, clients(name, initials, color)').eq('practitioner_id', user.id)
      .gte('created_at', today).order('created_at', { ascending: false }),
    supabase.from('analyses').select('*, clients(name, initials, color), sessions(session_number)')
      .eq('practitioner_id', user.id).order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'Active Clients', value: clientCount || 0 },
    { label: 'Sessions This Week', value: weekSessionCount || 0 },
    { label: 'Analyses Run', value: analysisCount || 0 },
    { label: 'Reports Sent', value: 0 },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Today's sessions */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">Today&apos;s Sessions</h2>
            <Link href="/dashboard/sessions/new" className="text-xs text-[#0a6b5e] font-medium hover:underline">
              + New Session
            </Link>
          </div>
          {!todaySessions?.length ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">No sessions today</p>
              <Link href="/dashboard/sessions/new" className="text-[#0a6b5e] text-sm font-medium hover:underline mt-2 block">
                Start a session
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {todaySessions.map((session: any) => (
                <Link key={session.id} href={`/dashboard/sessions/${session.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: session.clients?.color || '#0a6b5e' }}
                  >
                    {session.clients?.initials || '?'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{session.clients?.name || 'Unknown'}</div>
                    <div className="text-xs text-gray-400">Session #{session.session_number}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent analyses */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">Recent Analyses</h2>
            <Link href="/dashboard/analyses" className="text-xs text-[#0a6b5e] font-medium hover:underline">View all</Link>
          </div>
          {!recentAnalyses?.length ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">No analyses yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAnalyses.map((analysis: any) => {
                const lens = LENSES[analysis.lens_id as LensId]
                return (
                  <div key={analysis.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: analysis.clients?.color || '#0a6b5e' }}
                    >
                      {analysis.clients?.initials || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-gray-900 truncate">{analysis.clients?.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ backgroundColor: lens?.color + '20', color: lens?.color }}>
                          {lens?.name || analysis.lens_id}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{analysis.result?.substring(0, 80)}...</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
