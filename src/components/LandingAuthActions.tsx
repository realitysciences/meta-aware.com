'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Mic } from 'lucide-react'

interface UserSummary {
  email: string
  fullName: string | null
  photoURL: string | null
}

export default function LandingAuthActions() {
  const [user, setUser] = useState<UserSummary | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let alive = true

    fetch('/api/auth/me')
      .then((response) => response.json())
      .then((data) => {
        if (!alive) return
        setUser(data.user || null)
      })
      .catch(() => {
        if (alive) setUser(null)
      })
      .finally(() => {
        if (alive) setLoaded(true)
      })

    return () => {
      alive = false
    }
  }, [])

  if (!loaded) {
    return <div className="h-11 w-[190px] rounded-[10px] bg-[#06183a]/8" aria-hidden="true" />
  }

  if (user) {
    const fallback = (user.fullName || user.email || 'M').charAt(0).toUpperCase()

    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="hidden text-[13px] font-bold sm:inline">Dashboard</Link>
        <Link href="/dashboard" className="flex items-center gap-2 rounded-full border border-[#d7c6ae] bg-white/80 px-2 py-1.5 shadow-[0_10px_24px_rgba(42,25,7,0.06)]">
          {user.photoURL ? (
            <Image src={user.photoURL} alt={user.fullName || user.email || 'Signed in user'} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#06183a] text-sm font-bold text-white">{fallback}</span>
          )}
          <span className="hidden max-w-[120px] truncate pr-2 text-xs font-bold text-[#06183a] md:inline">{user.fullName || user.email}</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex shrink-0 items-center gap-4">
      <Link href="/dashboard" className="hidden text-[13px] font-bold sm:inline lg:hidden">Dashboard</Link>
      <Link href="/login" className="hidden text-[13px] font-bold sm:inline">Log in</Link>
      <Link href="/signup" className="inline-flex items-center gap-2 rounded-[10px] bg-[#06183a] px-3 py-2.5 text-left text-[11px] font-bold text-white shadow-[0_14px_30px_rgba(6,24,58,0.18)] sm:gap-3 sm:px-4 sm:py-3 sm:text-xs">
        <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="sm:hidden">Start</span>
        <span className="hidden sm:inline">
          Start Mapping Session
          <span className="block text-[9px] font-semibold text-white/72">One session. One reflection.</span>
        </span>
      </Link>
    </div>
  )
}
