import { redirect } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser } from '@/lib/firebase/session'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">
      <Sidebar
        fullName={user.fullName}
        email={user.email}
        photoURL={user.photoURL}
        plan={user.plan}
        certificationStatus={user.certificationStatus}
      />
      <main className="flex-1 md:ml-64 pt-14 md:pt-0">
        {children}
      </main>
    </div>
  )
}
