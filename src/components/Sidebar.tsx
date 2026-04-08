'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, Users, FileAudio, Brain, FileText, GraduationCap, LogOut, Award } from 'lucide-react'

interface SidebarProps {
  fullName: string | null
  email: string
  plan: string
  certificationStatus: string | null
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Clients', href: '/dashboard/clients', icon: Users },
  { label: 'Sessions', href: '/dashboard/sessions/new', icon: FileAudio },
  { label: 'Analyses', href: '/dashboard/analyses', icon: Brain },
  { label: 'Reports', href: '/dashboard/reports', icon: FileText },
]

export default function Sidebar({ fullName, email, plan, certificationStatus }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-64 bg-[#0f1f1c] min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Image src="/logo.png" alt="meta aware" width={160} height={54} className="h-14 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-[#1d9e75]/20 text-[#1d9e75]'
                  : 'text-white/60 hover:text-white/90 hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}

        {/* Academy - coming soon */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/30 cursor-not-allowed">
          <GraduationCap size={18} />
          Academy
          <span className="ml-auto text-[10px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded">Soon</span>
        </div>
      </nav>

      {/* User info + sign out */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#1d9e75]/20 flex items-center justify-center text-[#1d9e75] text-xs font-bold">
            {(fullName || email).charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">{fullName || email}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                plan === 'pro' ? 'bg-[#1d9e75]/20 text-[#1d9e75]' : 'bg-white/10 text-white/40'
              }`}>
                {plan === 'pro' ? 'PRO' : 'FREE'}
              </span>
              {certificationStatus && (
                <span className="text-[10px] text-[#1d9e75]/70 flex items-center gap-0.5">
                  <Award size={10} />
                  {certificationStatus}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs w-full transition-colors"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
