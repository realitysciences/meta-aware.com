'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase/client'
import {
  BookOpen,
  ChevronDown,
  CircleHelp,
  Clock,
  FileText,
  Home,
  Layers3,
  Link2,
  Lock,
  LogOut,
  Map,
  Menu,
  MessageSquare,
  Mic,
  Settings,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

interface SidebarProps {
  fullName: string | null
  email: string
  photoURL?: string | null
  plan: string
  certificationStatus: string | null
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Map Sessions', href: '/voice-session', icon: Mic },
  { label: 'Reality Scientist AI', href: '/talk-to-ai', icon: MessageSquare },
  { label: 'My Self-Map (24 Domains)', href: '/dashboard/self-map', icon: Map },
]

const lowerNavItems = [
  { label: 'Reflections', href: '/reflections', icon: Sparkles },
  { label: 'Reports & Insights', href: '/dashboard/reports', icon: FileText },
  { label: 'Timeline & Comparisons', href: '/timeline', icon: Clock },
  { label: 'Connections & Patterns', href: '/patterns', icon: Link2 },
  { label: 'Guidance & Exercises', href: '/guidance', icon: BookOpen },
  { label: 'How It Works', href: '/how-it-works', icon: CircleHelp },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const sourceItems: Array<{
  label: string
  href: string
  activeCheck?: (p: string) => boolean
}> = [
  { label: 'Voice Sessions', href: '/map-sources/voice-sessions', activeCheck: (p) => p.startsWith('/map-sources/voice-sessions') || (p.startsWith('/voice-session') && !p.includes('/text-chat')) },
  { label: 'Text Chat Sessions', href: '/map-sources/text-chat-sessions', activeCheck: (p) => p.startsWith('/map-sources/text-chat-sessions') || p.includes('/text-chat') },
  { label: 'Artifacts', href: '/map-sources/artifacts' },
  { label: 'Lens Scans', href: '/map-sources/lens-scans' },
  { label: 'Journals', href: '/map-sources/journals' },
  { label: 'Transcripts', href: '/map-sources/transcripts' },
]

export default function Sidebar({ fullName, email, photoURL, plan }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const displayName = fullName || 'David'
  const initials = (displayName || email || 'D').charAt(0).toUpperCase()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  async function handleSignOut() {
    await getFirebaseAuth().then((auth) => signOut(auth)).catch(() => null)
    await fetch('/api/auth/session', { method: 'DELETE' })
    router.push('/login')
    router.refresh()
  }

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  const sidebarContent = (
    <aside
      className={`
        fixed bottom-0 left-0 top-0 z-40 flex min-h-screen w-64 flex-col border-r border-[#ead7b9]
        bg-[#fffaf2] shadow-[18px_0_40px_rgba(48,27,5,0.05)] transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}
    >
      <div className="border-b border-[#ead7b9]/70 px-4 pb-4 pt-5">
        <div className="flex items-start justify-between gap-2">
          <Link href="/dashboard" aria-label="Meta-Aware dashboard" className="block w-full max-w-[190px]">
            <Image src="/assets/meta-aware-logo.png" alt="Meta-Aware" width={2508} height={627} className="mx-auto h-14 w-auto object-contain" priority />
            <p className="mt-1 text-center text-[11px] font-semibold tracking-[0.01em] text-[#314164]">Your self-map. Your freedom.</p>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="mt-1 rounded-full p-1 text-[#06183a]/50 hover:bg-[#f4eadb] md:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
                active
                  ? 'border-[#d9a461] bg-[#fff2df] text-[#5b3609] shadow-[0_8px_18px_rgba(201,124,30,0.1)]'
                  : 'border-transparent text-[#06183a] hover:bg-white/70'
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? 'text-[#c97c1e]' : 'text-[#173563]'}`} />
              {item.label}
            </Link>
          )
        })}

        <div className="rounded-lg px-3 py-2">
          <div className="flex items-center gap-3 text-sm font-bold text-[#06183a]">
            <Layers3 className="h-5 w-5 text-[#173563]" />
            Map Sources
            <ChevronDown className="ml-auto h-4 w-4 text-[#173563]" />
          </div>
          <div className="ml-[9px] mt-2 space-y-2 border-l border-[#d8c4a7] pl-6">
            {sourceItems.map((item) => {
              const active = item.activeCheck ? item.activeCheck(pathname) : pathname.startsWith(item.href)
              return (
                <Link key={item.label} href={item.href} className={`flex items-center gap-2 text-xs font-semibold transition ${active ? 'text-[#c97c1e]' : 'text-[#314164] hover:text-[#a45f0d]'}`}>
                  <span className={`h-2 w-2 rounded-full ${active ? 'bg-[#c97c1e]' : 'bg-[#cfc0a8]'}`} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        {lowerNavItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition ${active ? 'bg-[#fff2df] text-[#5b3609]' : 'text-[#06183a] hover:bg-white/70'}`}
            >
              <Icon className="h-5 w-5 text-[#173563]" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-3 px-4 pb-4">
        <div className="rounded-xl border border-[#ead7b9] bg-white/72 p-3">
          <p className="flex items-center gap-2 text-xs font-black text-[#a45f0d]"><Lock className="h-4 w-4" />Private. Secure. Yours alone.</p>
          <p className="mt-2 text-xs leading-5 text-[#314164]">End-to-end encrypted. Your data is never shared.</p>
          <Link href="/dashboard/settings/privacy-data" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#d3b98f] bg-white/80 px-3 py-2 text-xs font-bold">
            View Privacy Center <ShieldCheck className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-xl border border-[#ead7b9] bg-white/72 p-3">
          <div className="flex items-center gap-3">
            {photoURL ? (
              <Image src={photoURL} alt={displayName} width={44} height={44} className="h-11 w-11 shrink-0 rounded-full object-cover" />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f2c78c] to-[#8a4b25] font-serif text-lg font-bold text-white">{initials}</div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg leading-tight text-[#06183a]">{displayName}</p>
              <p className="truncate text-xs font-semibold text-[#4c3a87]">{plan === 'pro' ? 'Premium Member' : 'Member'} · Google account</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#d3b98f] bg-white/80 px-3 py-2 text-xs font-black text-[#06183a] hover:bg-[#fff2df]">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  )

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center border-b border-[#ead7b9] bg-[#fffaf2]/96 px-4 shadow-[0_10px_28px_rgba(48,27,5,0.06)] backdrop-blur md:hidden">
        <button onClick={() => setMobileOpen(true)} className="rounded-full p-2 text-[#06183a]" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <Image src="/assets/meta-aware-logo.png" alt="Meta-Aware" width={2508} height={627} className="mx-auto h-8 w-auto" />
      </div>

      {mobileOpen && <button aria-label="Close menu overlay" className="fixed inset-0 z-30 bg-[#06183a]/45 md:hidden" onClick={() => setMobileOpen(false)} />}
      {sidebarContent}
    </>
  )
}
