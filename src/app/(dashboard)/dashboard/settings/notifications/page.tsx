'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart2,
  Bell,
  BookOpen,
  Brain,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileSearch,
  Link2,
  LogOut,
  Mail,
  Map,
  Moon,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Zap,
  Clock,
  Layout,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type DigestFreq = 'none' | 'immediately' | 'daily' | 'weekly' | 'monthly'
type NotifKey   =
  | 'map' | 'sessions' | 'ai' | 'goals' | 'connections'
  | 'sourceReview' | 'unfinished' | 'reports' | 'guidance'
  | 'product' | 'security'
type DigestGlobal = 'off' | 'daily' | 'weekly' | 'monthly'

interface NotifRow { email: boolean; inApp: boolean; push: boolean; digest: DigestFreq }

// ─── Static data ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: Users },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

const notifMeta: Record<NotifKey, { label: string; desc: string; icon: React.ElementType; iconColor: string; iconBg: string; isNew?: boolean }> = {
  map:          { label: 'Map Updates & Reflections',    desc: 'New insights, reflections, or suggested changes for your review.',                icon: Map,        iconColor: '#6c37c6', iconBg: '#f5f0ff' },
  sessions:     { label: 'Session Reminders',            desc: 'Reminders for upcoming or suggested Reflection Sessions.',                         icon: Calendar,   iconColor: '#176dff', iconBg: '#eff4ff' },
  ai:           { label: 'AI Insights & Suggestions',   desc: 'New insights, suggestions, and Reality Scientist AI discoveries.',                  icon: Brain,      iconColor: '#6c37c6', iconBg: '#f5f0ff' },
  goals:        { label: 'Goals & Progress',             desc: 'Goal check-ins, milestones, and progress updates.',                               icon: Target,     iconColor: '#0f8a77', iconBg: '#f0faf6' },
  connections:  { label: 'Connections & Patterns',       desc: 'New connections found across your domains.',                                      icon: Link2,      iconColor: '#c97c1e', iconBg: '#fff8ee' },
  sourceReview: { label: 'Source Review Needed',         desc: 'Imported sources, transcripts, scans, or suggestions may need review.',           icon: FileSearch, iconColor: '#176dff', iconBg: '#eff4ff', isNew: true },
  unfinished:   { label: 'Unfinished Sessions & Drafts', desc: 'Reminders about incomplete voice sessions, text sessions, journal drafts, or unfinished map work.', icon: Clock, iconColor: '#6b7280', iconBg: '#f3f4f6' },
  reports:      { label: 'Reports & Comparisons',        desc: 'New reports ready, comparisons, and analysis summaries.',                         icon: BarChart2,  iconColor: '#176dff', iconBg: '#eff4ff' },
  guidance:     { label: 'Guidance & Exercises',         desc: 'New exercises, practices, and personalized guidance.',                            icon: BookOpen,   iconColor: '#0f8a77', iconBg: '#f0faf6' },
  product:      { label: 'Product & Feature Updates',    desc: 'New features, improvements, and product announcements.',                          icon: Zap,        iconColor: '#c97c1e', iconBg: '#fff8ee' },
  security:     { label: 'Security & Account Alerts',    desc: 'Important account, security, and privacy notifications.',                         icon: ShieldCheck,iconColor: '#0f8a77', iconBg: '#f0faf6' },
}

const notifOrder: NotifKey[] = ['map','sessions','ai','goals','connections','sourceReview','unfinished','reports','guidance','product','security']

const defaultNotifs: Record<NotifKey, NotifRow> = {
  map:          { email: true,  inApp: true,  push: true,  digest: 'daily' },
  sessions:     { email: false, inApp: true,  push: true,  digest: 'none' },
  ai:           { email: true,  inApp: true,  push: false, digest: 'weekly' },
  goals:        { email: true,  inApp: true,  push: false, digest: 'weekly' },
  connections:  { email: false, inApp: true,  push: false, digest: 'weekly' },
  sourceReview: { email: true,  inApp: true,  push: true,  digest: 'daily' },
  unfinished:   { email: false, inApp: true,  push: false, digest: 'weekly' },
  reports:      { email: true,  inApp: true,  push: false, digest: 'weekly' },
  guidance:     { email: false, inApp: true,  push: false, digest: 'weekly' },
  product:      { email: true,  inApp: false, push: false, digest: 'monthly' },
  security:     { email: true,  inApp: true,  push: true,  digest: 'immediately' },
}

const digestLabel: Record<DigestFreq, string> = {
  none: '–', immediately: 'Immediately', daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly',
}

const digestOptions: DigestFreq[] = ['none','immediately','daily','weekly','monthly']

const hours = Array.from({ length: 24 }, (_, i) => {
  const h = i % 12 || 12
  const ampm = i < 12 ? 'AM' : 'PM'
  return `${h}:00 ${ampm}`
})

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ on, onChange, disabled }: { on: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => !disabled && onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        on ? 'bg-[#6c37c6]' : 'bg-[#d1d5db]'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
    >
      <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [avatarOpen, setAvatarOpen]   = useState(false)
  const [saved,      setSaved]        = useState(false)

  // Notification matrix
  const [notifs, setNotifs] = useState<Record<NotifKey, NotifRow>>({ ...defaultNotifs })

  // Quiet hours
  const [quietStart,    setQuietStart]    = useState('10:00 PM')
  const [quietEnd,      setQuietEnd]      = useState('7:00 AM')
  const [quietDays,     setQuietDays]     = useState<Set<string>>(new Set(days))

  // Delivery
  const [pushOn,   setPushOn]   = useState(true)
  const [inAppOn,  setInAppOn]  = useState(true)

  // Digest
  const [digestGlobal, setDigestGlobal] = useState<DigestGlobal>('daily')

  function setRow(key: NotifKey, patch: Partial<NotifRow>) {
    setNotifs((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }))
  }

  function applyUrgentOnly() {
    const next = { ...defaultNotifs }
    const urgentKeys: NotifKey[] = ['security']
    ;(Object.keys(next) as NotifKey[]).forEach((k) => {
      if (!urgentKeys.includes(k)) {
        next[k] = { email: false, inApp: false, push: false, digest: 'none' }
      }
    })
    setNotifs(next)
  }

  function pauseAll() {
    const next = { ...defaultNotifs }
    ;(Object.keys(next) as NotifKey[]).forEach((k) => {
      if (k !== 'security') next[k] = { email: false, inApp: false, push: false, digest: 'none' }
    })
    setNotifs(next)
  }

  function resumeAll() { setNotifs({ ...defaultNotifs }) }

  function toggleDay(d: string) {
    setQuietDays((prev) => {
      const next = new Set(prev)
      next.has(d) ? next.delete(d) : next.add(d)
      return next
    })
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Back + header */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/dashboard/settings" className="mb-3 flex items-center gap-1.5 text-xs font-bold text-[#6b7280] hover:text-[#c97c1e] transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Settings
            </Link>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Notifications</h1>
            <p className="mt-1.5 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Choose what Meta-Aware can remind you about, how often it reaches out,
              and when your attention stays protected.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
            <div className="relative">
              <button onClick={() => setAvatarOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-[12px] border border-[#ead7b9] bg-white px-3 py-2 hover:bg-[#fff8ee] transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f2c78c] to-[#8a4b25] font-serif text-sm font-bold text-white">D</div>
                <div className="text-left">
                  <p className="text-sm font-black text-[#06183a]">David</p>
                  <p className="text-[11px] font-semibold text-[#6c37c6]">Premium Member</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-[#6b7280] transition-transform ${avatarOpen ? 'rotate-180' : ''}`} />
              </button>
              {avatarOpen && (
                <div className="absolute right-0 top-12 z-30 w-56 rounded-[14px] border border-[#ead7b9] bg-white py-2 shadow-[0_12px_30px_rgba(48,27,5,0.12)]">
                  <div className="border-b border-[#ead7b9] px-4 pb-3 pt-2">
                    <p className="font-serif text-base font-bold text-[#06183a]">David</p>
                    <p className="text-xs font-semibold text-[#6c37c6]">Premium Member</p>
                  </div>
                  <div className="py-1">
                    {avatarMenuItems.map(({ label, href, icon: Icon }) => (
                      <Link key={label} href={href} onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#344263] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-colors">
                        <Icon className="h-4 w-4 shrink-0 text-[#6b7280]" /> {label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-[#ead7b9] pt-1">
                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#c04060] hover:bg-[#fff0f0] transition-colors">
                      <LogOut className="h-4 w-4 shrink-0" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {avatarOpen && <div className="fixed inset-0 z-20" onClick={() => setAvatarOpen(false)} />}

        {/* Toast */}
        {saved && (
          <div className="mb-4 flex items-center gap-2 rounded-[10px] border border-[#b6e8d9] bg-[#f0faf6] px-4 py-2.5 text-sm font-black text-[#0f8a77]">
            <BadgeCheck className="h-4 w-4" /> Notification preferences saved.
          </div>
        )}

        {/* ── Hero card ─────────────────────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
          <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#ede8fb]">
                <Bell className="h-8 w-8 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#3b1d72]">You&apos;re in control.</h2>
                <p className="mt-1.5 text-sm font-semibold leading-6 text-[#4a2b8a]">
                  Meta-Aware only notifies you about what you choose,<br />
                  delivered how and where you prefer.
                </p>
                <Link href="/how-it-works/notifications" className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-[#6c37c6] hover:underline">
                  Learn more about notifications <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="shrink-0 sm:border-l sm:border-[#e0d4f8] sm:pl-6">
              <ul className="space-y-2">
                {[
                  'You choose what you\'re notified about',
                  'You decide how often and where',
                  'You pick when to receive notifications',
                  'You can change everything anytime',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-[#3b1d72]">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-[#6c37c6]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 1: Notification matrix ───────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
              <Bell className="h-4 w-4 text-[#6c37c6]" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">1. What Meta-Aware Can Notify You About</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Choose which types of notifications you want to receive and how.</p>
            </div>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_56px_56px_56px_100px] gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-2.5">
            <div>
              <p className="text-[11px] font-black text-[#344263]">Category</p>
              <p className="text-[10px] font-semibold text-[#a0a8b8]">What you&apos;ll get notified about</p>
            </div>
            {(['Email','In-App','Push'] as const).map((col) => (
              <div key={col} className="flex justify-center">
                <p className="text-[11px] font-black text-[#344263]">{col}</p>
              </div>
            ))}
            <div className="flex items-center justify-center gap-1">
              <p className="text-[11px] font-black text-[#344263]">Digest</p>
              <CircleHelp className="h-3 w-3 text-[#a0a8b8]" />
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#ead7b9]">
            {notifOrder.map((key) => {
              const meta = notifMeta[key]
              const row  = notifs[key]
              const isLocked = key === 'security'
              return (
                <div key={key} className={`grid grid-cols-[1fr_56px_56px_56px_100px] items-center gap-3 px-5 py-3 ${isLocked ? 'bg-[#fafef8]' : 'hover:bg-[#faf6f0]'} transition-colors`}>
                  {/* Category */}
                  <div className="flex min-w-0 items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: meta.iconBg }}>
                      <meta.icon className="h-3.5 w-3.5" style={{ color: meta.iconColor }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="text-sm font-black text-[#06183a]">{meta.label}</p>
                        {meta.isNew && (
                          <span className="rounded-full bg-[#176dff] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-white">NEW</span>
                        )}
                        {isLocked && (
                          <span className="text-[10px] font-semibold text-[#0f8a77]">Urgent alerts bypass quiet hours</span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">{meta.desc}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex justify-center">
                    <Toggle on={row.email} onChange={(v) => setRow(key, { email: v })} disabled={isLocked} />
                  </div>

                  {/* In-App */}
                  <div className="flex justify-center">
                    <Toggle on={row.inApp} onChange={(v) => setRow(key, { inApp: v })} disabled={isLocked} />
                  </div>

                  {/* Push */}
                  <div className="flex justify-center">
                    <Toggle on={row.push} onChange={(v) => setRow(key, { push: v })} disabled={isLocked} />
                  </div>

                  {/* Digest */}
                  <div>
                    {row.digest === 'none' ? (
                      <span className="block text-center text-sm font-semibold text-[#a0a8b8]">–</span>
                    ) : (
                      <div className="relative">
                        <select
                          value={row.digest}
                          onChange={(e) => setRow(key, { digest: e.target.value as DigestFreq })}
                          disabled={isLocked}
                          className="w-full appearance-none rounded-[6px] border border-[#ead7b9] bg-white py-1 pl-2 pr-6 text-xs font-semibold text-[#344263] focus:outline-none focus:border-[#6c37c6] disabled:opacity-60"
                        >
                          {digestOptions.filter((d) => d !== 'none').map((d) => (
                            <option key={d} value={d}>{digestLabel[d]}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-1.5 top-1.5 h-3 w-3 text-[#6b7280]" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Sections 2 + 3 + 4 ───────────────────────────────────────── */}
        <div className="mb-3 grid gap-3 lg:grid-cols-3">

          {/* 2. Quiet Hours */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Moon className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">2. Quiet Hours</h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">Pause non-urgent notifications during these times.</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {/* Time selectors */}
              <div className="flex items-center gap-2">
                <div>
                  <p className="mb-1 text-[10px] font-black text-[#344263]">Start</p>
                  <div className="relative">
                    <select value={quietStart} onChange={(e) => setQuietStart(e.target.value)}
                      className="appearance-none rounded-[8px] border border-[#ead7b9] bg-white py-1.5 pl-2.5 pr-6 text-xs font-semibold text-[#344263] focus:outline-none focus:border-[#6c37c6]">
                      {hours.map((h) => <option key={h}>{h}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-1.5 top-2 h-3 w-3 text-[#6b7280]" />
                  </div>
                </div>
                <span className="mt-5 text-xs font-semibold text-[#6b7280]">End</span>
                <div className="mt-0">
                  <p className="mb-1 text-[10px] font-black text-[#344263]">End</p>
                  <div className="relative">
                    <select value={quietEnd} onChange={(e) => setQuietEnd(e.target.value)}
                      className="appearance-none rounded-[8px] border border-[#ead7b9] bg-white py-1.5 pl-2.5 pr-6 text-xs font-semibold text-[#344263] focus:outline-none focus:border-[#6c37c6]">
                      {hours.map((h) => <option key={h}>{h}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-1.5 top-2 h-3 w-3 text-[#6b7280]" />
                  </div>
                </div>
              </div>
              {/* Day chips */}
              <div className="flex flex-wrap gap-1.5">
                {days.map((d) => {
                  const on = quietDays.has(d)
                  return (
                    <button key={d} onClick={() => toggleDay(d)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-black transition-colors ${
                        on ? 'bg-[#6c37c6] text-white' : 'border border-[#ead7b9] bg-white text-[#344263] hover:border-[#c4aaee]'
                      }`}>
                      {d}
                    </button>
                  )
                })}
              </div>
              {/* Note */}
              <div className="flex items-start gap-2 rounded-[8px] border border-[#b6e8d9] bg-[#f2faf6] px-3 py-2">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
                <p className="text-[11px] font-semibold leading-4 text-[#0a5c4e]">
                  You&apos;ll still receive urgent security and account alerts.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Delivery Preferences */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Mail className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">3. Delivery Preferences</h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">Choose how and where you want to be notified.</p>
              </div>
            </div>
            <div className="divide-y divide-[#ead7b9]">
              {/* Email */}
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eff4ff]">
                  <Mail className="h-4 w-4 text-[#176dff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#06183a]">Email notifications</p>
                  <p className="text-[11px] font-semibold text-[#a0a8b8]">Send to david@example.com</p>
                </div>
                <button className="text-xs font-black text-[#c97c1e] hover:underline">Manage</button>
              </div>
              {/* Push */}
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                  <Smartphone className="h-4 w-4 text-[#6c37c6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#06183a]">Push notifications</p>
                  <p className="text-[11px] font-semibold text-[#a0a8b8]">Mobile app push notifications</p>
                </div>
                <Toggle on={pushOn} onChange={setPushOn} />
              </div>
              {/* In-App */}
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                  <Bell className="h-4 w-4 text-[#6c37c6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#06183a]">In-app notifications</p>
                  <p className="text-[11px] font-semibold text-[#a0a8b8]">Show in the Meta-Aware app</p>
                </div>
                <Toggle on={inAppOn} onChange={setInAppOn} />
              </div>
            </div>
          </section>

          {/* 4. Notification Digest */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Sparkles className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">4. Notification Digest</h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">Choose how often you&apos;d like to receive a summary.</p>
              </div>
            </div>
            <div className="divide-y divide-[#ead7b9] px-4 py-1">
              {([
                { value: 'off',     label: 'Off',     desc: 'No summary emails.' },
                { value: 'daily',   label: 'Daily',   desc: 'Once a day.' },
                { value: 'weekly',  label: 'Weekly',  desc: 'Once a week.' },
                { value: 'monthly', label: 'Monthly', desc: 'Once a month.' },
              ] as { value: DigestGlobal; label: string; desc: string }[]).map((o) => (
                <label key={o.value} className="flex cursor-pointer items-start gap-3 py-3 hover:opacity-80 transition-opacity">
                  <input type="radio" name="digestGlobal" value={o.value} checked={digestGlobal === o.value}
                    onChange={() => setDigestGlobal(o.value)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#6c37c6]" />
                  <div>
                    <p className="text-xs font-black text-[#06183a]">{o.label}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{o.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* ── Bottom control banner ─────────────────────────────────────── */}
        <section className="mb-4 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] px-6 py-5 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0f5ee]">
              <ShieldCheck className="h-6 w-6 text-[#0f8a77]" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[#0a5c4e]">Your attention stays yours.</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1a6b5a]">
                Meta-Aware only notifies you about what you choose, when you choose. You can change any setting anytime.
              </p>
            </div>
          </div>
          <button onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#0f8a77] bg-[#0f8a77] px-5 py-2.5 text-sm font-black text-white shadow-[0_4px_12px_rgba(15,138,119,0.25)] hover:bg-[#0a6e5e] transition-colors">
            Save Notification Preferences <Check className="h-4 w-4" />
          </button>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* About Notifications */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">About Notifications</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Notifications help you stay informed about what matters most in your Self-Map journey.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              They are designed to support you, not interrupt you.
            </p>
            <Link href="/how-it-works/notifications" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Your data. Your choice. */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0f8a77]" />
              <h2 className="text-sm font-black text-[#06183a]">Your data. Your choice.</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              You control what you&apos;re notified about, how often, and where you receive notifications.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              We never share or sell your information.
            </p>
            <Link href="/dashboard/settings/privacy-data" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#0f8a77] hover:underline">
              View Privacy Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quick Settings */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">Quick Settings</h2>
            </div>
            <div className="mt-3 space-y-1">
              {[
                { icon: ShieldCheck, color: '#0f8a77', label: 'Only urgent alerts',        sub: 'Keep only security and account alerts.',  action: applyUrgentOnly },
                { icon: Moon,        color: '#6c37c6', label: 'Pause all notifications',   sub: 'Until tomorrow morning.',                action: pauseAll },
                { icon: Bell,        color: '#c97c1e', label: 'Resume all notifications',  sub: 'Turn everything back on.',               action: resumeAll },
                { icon: Mail,        color: '#176dff', label: 'Delivery preferences',      sub: 'Manage channels & frequency.',           action: undefined as (() => void) | undefined },
              ].map(({ icon: Icon, color, label, sub, action }) => (
                <button key={label} onClick={action}
                  className="flex w-full items-start gap-3 rounded-[8px] px-2 py-2.5 text-left hover:bg-[#fff8ee] transition-colors">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />
                  <div className="flex-1">
                    <p className="text-xs font-black text-[#06183a]">{label}</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">{sub}</p>
                  </div>
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d3b98f]" />
                </button>
              ))}
            </div>
          </div>

          {/* Need help? */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#c97c1e]" />
              <h2 className="text-sm font-black text-[#06183a]">Need help?</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Visit the Help Center for guides and support.
            </p>
            <Link href="/dashboard/settings/help-support" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Go to Help Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </aside>
    </div>
  )
}
