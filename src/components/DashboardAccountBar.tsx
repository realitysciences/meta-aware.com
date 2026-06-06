'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { LogOut } from 'lucide-react'
import { getFirebaseAuth } from '@/lib/firebase/client'

interface DashboardAccountBarProps {
  fullName: string | null
  email: string
  photoURL: string | null
  plan: string
}

export default function DashboardAccountBar({ fullName, email, photoURL, plan }: DashboardAccountBarProps) {
  const router = useRouter()
  const displayName = fullName || email || 'Meta-Aware user'
  const initials = displayName.charAt(0).toUpperCase()

  async function handleSignOut() {
    await getFirebaseAuth().then((auth) => signOut(auth)).catch(() => null)
    await fetch('/api/auth/session', { method: 'DELETE' })
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="sticky top-0 z-20 hidden border-b border-[#ead7b9] bg-[#fffaf2]/92 px-4 py-3 shadow-[0_10px_24px_rgba(48,27,5,0.045)] backdrop-blur md:block">
      <div className="flex items-center justify-end gap-3">
        <div className="flex items-center gap-3 rounded-full border border-[#ead7b9] bg-white/78 px-3 py-2">
          {photoURL ? (
            <Image src={photoURL} alt={displayName} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06183a] font-serif text-lg font-black text-white">{initials}</span>
          )}
          <div className="min-w-0">
            <p className="max-w-[190px] truncate text-sm font-black text-[#06183a]">{displayName}</p>
            <p className="text-xs font-semibold text-[#4c3a87]">{plan === 'pro' ? 'Premium Member' : 'Member'} · Google account</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-full border border-[#d3b98f] bg-white/78 px-4 py-3 text-sm font-black text-[#06183a] transition hover:bg-[#fff2df]"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  )
}
