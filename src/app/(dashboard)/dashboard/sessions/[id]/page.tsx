import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { LENSES } from '@/lib/lenses'
import type { LensId } from '@/lib/lenses'
import SessionAnalyzer from './SessionAnalyzer'

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: session } = await supabase
    .from('sessions')
    .select('*, clients(name, initials, color)')
    .eq('id', id)
    .eq('practitioner_id', user.id)
    .single()

  if (!session) notFound()

  const { data: analyses } = await supabase
    .from('analyses')
    .select('*')
    .eq('session_id', id)
    .order('created_at', { ascending: false })

  const transcript = session.transcript as Array<{ speaker: string; text: string }> || []

  function formatTime(s: number) {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/dashboard/clients" className="text-gray-400 hover:text-gray-600">Clients</Link>
        <span className="text-gray-300">/</span>
        <Link href={`/dashboard/clients/${session.client_id}`} className="text-gray-400 hover:text-gray-600">
          {session.clients?.name}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-600">Session #{session.session_number}</span>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: session.clients?.color }}>
          {session.clients?.initials}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Session #{session.session_number}</h1>
          <div className="text-sm text-gray-400">
            {session.clients?.name} · {new Date(session.created_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            {session.duration_seconds && ` · ${formatTime(session.duration_seconds)}`}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Transcript */}
        <div className="col-span-3">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Transcript</h2>
          {transcript.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
              <p className="text-gray-400 text-sm">No transcript available</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4 max-h-[600px] overflow-y-auto">
              {transcript.map((seg, i) => (
                <div key={i}>
                  <div className={`text-xs font-semibold mb-1 ${seg.speaker === 'Practitioner' ? 'text-[#0a6b5e]' : 'text-gray-400'}`}>
                    {seg.speaker}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{seg.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right panel: analyses + run new */}
        <div className="col-span-2 space-y-5">
          <SessionAnalyzer
            sessionId={id}
            clientId={session.client_id}
            transcript={transcript}
          />

          {analyses && analyses.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Past Analyses</h2>
              <div className="space-y-3">
                {analyses.map(a => {
                  const lens = LENSES[a.lens_id as LensId]
                  return (
                    <div key={a.id} className="bg-white border border-gray-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: lens?.color + '20', color: lens?.color }}>
                          {lens?.name || a.lens_id}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                        {a.result}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
