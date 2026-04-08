import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, plan, certification_status')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        fullName={profile?.full_name || null}
        email={user.email || ''}
        plan={profile?.plan || 'free'}
        certificationStatus={profile?.certification_status || null}
      />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  )
}
