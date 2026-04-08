import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AddClientModal from './AddClientModal'

export default async function ClientsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: clients } = await supabase
    .from('clients')
    .select(`
      *,
      sessions(id, created_at)
    `)
    .eq('practitioner_id', user.id)
    .order('created_at', { ascending: false })

  const clientsWithStats = (clients || []).map(c => {
    const sessions = c.sessions || []
    const sessionCount = sessions.length
    const lastSession = sessions.sort((a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0]

    let status: 'Active' | 'New' | 'Review due' = 'New'
    if (sessionCount > 0) {
      const daysSince = lastSession
        ? (Date.now() - new Date(lastSession.created_at).getTime()) / (1000 * 60 * 60 * 24)
        : 999
      status = daysSince > 30 ? 'Review due' : 'Active'
    }

    return { ...c, sessionCount, lastSession: lastSession?.created_at, status }
  })

  const statusColor: Record<string, string> = {
    'Active': 'bg-green-100 text-green-700',
    'New': 'bg-blue-100 text-blue-700',
    'Review due': 'bg-amber-100 text-amber-700',
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-400 text-sm mt-1">{clientsWithStats.length} total clients</p>
        </div>
        <AddClientModal practitionerId={user.id} />
      </div>

      {clientsWithStats.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-gray-900 font-semibold mb-2">No clients yet</h3>
          <p className="text-gray-400 text-sm mb-6">Add your first client to get started</p>
          <AddClientModal practitionerId={user.id} />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            <div className="w-10"></div>
            <div>Client</div>
            <div className="w-20 text-center">Sessions</div>
            <div className="w-32 text-right">Last Session</div>
            <div className="w-24 text-center">Status</div>
          </div>
          {clientsWithStats.map(client => (
            <Link
              key={client.id}
              href={`/dashboard/clients/${client.id}`}
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: client.color }}
              >
                {client.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{client.name}</div>
                {client.notes && (
                  <div className="text-xs text-gray-400 truncate max-w-xs mt-0.5">{client.notes}</div>
                )}
              </div>
              <div className="w-20 text-center text-sm text-gray-600">{client.sessionCount}</div>
              <div className="w-32 text-right text-xs text-gray-400">
                {client.lastSession
                  ? new Date(client.lastSession).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : '—'}
              </div>
              <div className="w-24 flex justify-center">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[client.status]}`}>
                  {client.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
