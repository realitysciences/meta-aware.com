'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Calendar,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock,
  Cloud,
  CreditCard,
  Database,
  Download,
  ExternalLink,
  History,
  Link2,
  LogOut,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  XCircle,
} from 'lucide-react'

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Connected accounts ───────────────────────────────────────────────────────

const connectedAccounts = [
  {
    id: 'google-drive',
    logo: { bg: '#fff', letters: 'GD', colors: ['#4285F4','#34A853','#FBBC05','#EA4335'] },
    name: 'Google Drive',
    desc: 'Import documents, notes, and files.',
    scope: 'Selected folders only',
    lastDate: 'May 3, 2025',
    lastCount: '12 files imported',
  },
  {
    id: 'apple-icloud',
    logo: { bg: '#06b6d4', letters: '☁', colors: [] },
    name: 'Apple iCloud',
    desc: 'Import notes, files, and device content.',
    scope: 'Selected items only',
    lastDate: 'May 2, 2025',
    lastCount: '8 items imported',
  },
  {
    id: 'dropbox',
    logo: { bg: '#0061FF', letters: '✦', colors: [] },
    name: 'Dropbox',
    desc: 'Import documents and files.',
    scope: 'Selected folders only',
    lastDate: 'Apr 28, 2025',
    lastCount: '7 files imported',
  },
]

// ─── Available connections ────────────────────────────────────────────────────

const availableConnections = [
  { id: 'onedrive',  name: 'Microsoft OneDrive', desc: 'Import files and documents from OneDrive.',      iconBg: '#0078D4', iconText: '⊡',  iconColor: '#fff', available: true },
  { id: 'evernote',  name: 'Evernote',           desc: 'Import notes and notebooks into your Self-Map.', iconBg: '#00A82D', iconText: '✎',  iconColor: '#fff', available: true },
  { id: 'notion',    name: 'Notion',             desc: 'Import pages, databases, and notes.',            iconBg: '#000000', iconText: 'N',  iconColor: '#fff', available: true },
  { id: 'slack',     name: 'Slack',              desc: 'Import messages and conversations.',             iconBg: '#4A154B', iconText: '#',  iconColor: '#fff', available: true },
  { id: 'email',     name: 'Email',              desc: 'Import emails and attachments.',                 iconBg: '#eff4ff', iconText: '✉',  iconColor: '#176dff', available: true },
  { id: 'calendar',  name: 'Calendar',           desc: 'Sync events and reflections.',                   iconBg: '#f0faf6', iconText: '📅', iconColor: '#0f8a77', available: true },
  { id: 'twitter',   name: 'Twitter / X',        desc: 'Import posts and your archive.',                 iconBg: '#000000', iconText: 'X',  iconColor: '#fff', available: true },
  { id: 'more',      name: 'More coming soon',   desc: 'We\'re always adding new integrations.',         iconBg: '#f3f4f6', iconText: '…',  iconColor: '#6b7280', available: false },
]

// ─── Service logo cluster ─────────────────────────────────────────────────────

function ServiceCluster() {
  const orbitItems = [
    { bg: '#4285F4', label: 'G', top: '8px',    left: '50px' },
    { bg: '#000000', label: '🍎',top: '8px',    left: '130px' },
    { bg: '#0061FF', label: '✦', top: '70px',   left: '20px' },
    { bg: '#0078D4', label: '⊡', top: '70px',   left: '160px' },
  ]
  return (
    <div className="relative h-[100px] w-[200px] shrink-0">
      {/* Center user icon */}
      <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#e0d4f8] bg-[#ede8fb] shadow-[0_0_0_6px_rgba(108,55,198,0.08)]">
        <User className="h-6 w-6 text-[#6c37c6]" />
      </div>
      {/* Orbit dots */}
      {orbitItems.map((item, i) => (
        <div
          key={i}
          className="absolute flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
          style={{ background: item.bg, top: item.top, left: item.left }}
        >
          {item.label}
        </div>
      ))}
      {/* Dashed connection lines (decorative) */}
      <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0, pointerEvents: 'none' }}>
        <line x1="100" y1="50" x2="75"  y2="28"  stroke="#c4aaee" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="100" y1="50" x2="155" y2="28"  stroke="#c4aaee" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="100" y1="50" x2="45"  y2="75"  stroke="#c4aaee" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="100" y1="50" x2="185" y2="75"  stroke="#c4aaee" strokeWidth="1" strokeDasharray="3,3" />
      </svg>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConnectedAccountsPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)

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
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Connected Accounts</h1>
            <p className="mt-1.5 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Connect external accounts so you can choose specific files, folders, or sources to import into your Self-Map.
              You control what is connected, what is imported, and what stays private.
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

        {/* ── Hero card ─────────────────────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
          <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-5">
              <ServiceCluster />
              <div>
                <h2 className="font-serif text-xl font-bold text-[#3b1d72]">
                  Connect accounts. Choose sources. Stay in control.
                </h2>
                <p className="mt-1.5 text-sm font-semibold leading-6 text-[#4a2b8a]">
                  Connections create the doorway. You decide what to import,<br className="hidden sm:block" />
                  when, and how it&apos;s used in your Self-Map.
                </p>
                <Link href="/how-it-works/connected-accounts" className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-[#6c37c6] hover:underline">
                  Learn more about connected accounts <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="shrink-0 sm:border-l sm:border-[#e0d4f8] sm:pl-6">
              <ul className="space-y-2">
                {[
                  { icon: ShieldCheck, color: '#6c37c6', text: 'You choose what to connect' },
                  { icon: BadgeCheck,  color: '#0f8a77', text: 'You approve what\'s imported' },
                  { icon: XCircle,     color: '#c97c1e', text: 'You can disconnect anytime' },
                  { icon: ShieldCheck, color: '#0f8a77', text: 'Your data stays private and secure' },
                ].map(({ icon: Icon, color, text }) => (
                  <li key={text} className="flex items-center gap-2 text-sm font-semibold text-[#3b1d72]">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 1: Connected Accounts & Access ────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <h2 className="text-base font-black text-[#06183a]">Connected Accounts &amp; Access</h2>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[2fr_1.8fr_1.4fr_auto] gap-4 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-2.5 text-[11px] font-black uppercase tracking-wide text-[#a0a8b8]">
            <span>Account</span>
            <div className="flex items-center gap-1">
              <span>Access Scope</span>
              <CircleHelp className="h-3 w-3" />
            </div>
            <span>Last Import</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#ead7b9]">
            {connectedAccounts.map((acct) => (
              <div key={acct.id} className="grid grid-cols-1 gap-3 px-5 py-4 hover:bg-[#faf6f0] transition-colors sm:grid-cols-[2fr_1.8fr_1.4fr_auto] sm:items-center sm:gap-4">
                {/* Account */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#ead7b9] bg-white text-sm font-bold shadow-sm"
                    style={{ background: acct.logo.bg === '#fff' ? '#fff' : acct.logo.bg, color: acct.logo.bg === '#fff' ? '#4285F4' : '#fff' }}>
                    {acct.id === 'google-drive' ? (
                      <span className="text-[10px] font-black" style={{ background: 'linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>GD</span>
                    ) : acct.id === 'apple-icloud' ? (
                      <Cloud className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-base">✦</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#06183a]">{acct.name}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{acct.desc}</p>
                  </div>
                </div>
                {/* Access Scope */}
                <div>
                  <span className="inline-block rounded-full bg-[#e0f5ee] px-2.5 py-0.5 text-[11px] font-black text-[#0f8a77]">Connected</span>
                  <p className="mt-1 text-xs font-semibold text-[#344263]">{acct.scope}</p>
                  <Link href={`/dashboard/settings/connected-accounts/${acct.id}/access`} className="text-[11px] font-black text-[#6c37c6] hover:underline">
                    Review access
                  </Link>
                </div>
                {/* Last Import */}
                <div>
                  <p className="text-xs font-black text-[#06183a]">{acct.lastDate}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{acct.lastCount}</p>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <Link href={`/dashboard/settings/connected-accounts/${acct.id}/manage`}
                    className="rounded-[6px] border border-[#ead7b9] bg-white px-3 py-1.5 text-xs font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
                    Manage
                  </Link>
                  <Link href={`/dashboard/settings/connected-accounts/${acct.id}/access`}
                    className="rounded-[6px] border border-[#ead7b9] bg-white px-3 py-1.5 text-xs font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
                    Review Access
                  </Link>
                  <button className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#ead7b9] bg-white text-[#6b7280] hover:bg-[#faf6f0] transition-colors" aria-label="More options">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer link */}
          <div className="border-t border-[#ead7b9] px-5 py-3">
            <Link href="/dashboard/settings/connected-accounts/history" className="flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View connection history <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* ── Section 2: Available Account Connections ──────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <h2 className="text-base font-black text-[#06183a]">Available Account Connections</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">
              You&apos;ll choose what each account can access before anything is imported.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
            {availableConnections.map(({ id, name, desc, iconBg, iconText, iconColor, available }) => (
              <div key={id}
                className={`flex flex-col gap-3 rounded-[12px] border p-4 transition-all ${
                  available
                    ? 'border-[#ead7b9] bg-white hover:border-[#c4aaee] hover:shadow-[0_4px_12px_rgba(108,55,198,0.08)]'
                    : 'border-[#ead7b9] bg-[#faf6f0] opacity-70'
                }`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] text-lg font-bold"
                  style={{ background: iconBg, color: iconColor }}>
                  {iconText}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-[#06183a]">{name}</p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">{desc}</p>
                </div>
                {available ? (
                  <Link href={`/dashboard/settings/connected-accounts/connect?provider=${id}`}
                    className="flex items-center justify-center rounded-[8px] border border-[#e0d4f8] bg-[#f5f0ff] px-3 py-1.5 text-xs font-black text-[#6c37c6] transition-colors hover:bg-[#ede8fb]">
                    Connect
                  </Link>
                ) : (
                  <span className="flex items-center justify-center rounded-[8px] border border-[#ead7b9] bg-[#f3f4f6] px-3 py-1.5 text-xs font-semibold text-[#a0a8b8]">
                    Coming soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom control banner ─────────────────────────────────────── */}
        <section className="mb-4 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] px-6 py-5 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0f5ee]">
              <ShieldCheck className="h-6 w-6 text-[#0f8a77]" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[#0a5c4e]">You&apos;re always in control.</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1a6b5a]">
                You decide what to connect, what to import, and what stays out. You can disconnect any account anytime.
              </p>
            </div>
          </div>
          <Link href="/dashboard/settings/privacy-data"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#0f8a77] bg-white px-5 py-2.5 text-sm font-black text-[#0f8a77] shadow-[0_4px_12px_rgba(15,138,119,0.1)] hover:bg-[#f0faf6] transition-colors">
            Learn more about data privacy <ChevronRight className="h-4 w-4" />
          </Link>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* About Connected Accounts */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">About Connected Accounts</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Connected accounts help you securely import and sync your data.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              You control what is connected, what is imported, and what stays private.
            </p>
            <Link href="/how-it-works/connected-accounts" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Connected does not mean imported */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-start gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff8ee]">
                <ShieldCheck className="h-4 w-4 text-[#c97c1e]" />
              </div>
              <h2 className="text-sm font-black leading-tight text-[#06183a]">Connected does not mean imported.</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Meta-Aware only imports the files, folders, or sources you approve.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              You can disconnect anytime.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              Your Self-Map and data remain yours.
            </p>
            <Link href="/dashboard/settings/privacy-data" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Learn more about data privacy <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">Quick Actions</h2>
            </div>
            <div className="mt-3 space-y-1">
              {[
                { icon: Link2,     color: '#6c37c6', label: 'Manage all connections', sub: 'View and manage your connected accounts.',  href: '/dashboard/settings/connected-accounts' },
                { icon: History,   color: '#c97c1e', label: 'Import history',         sub: 'See your past imports.',                   href: '/dashboard/settings/connected-accounts/history' },
                { icon: ShieldCheck,color:'#0f8a77', label: 'Data permissions',       sub: 'Review what each app can access.',         href: '/dashboard/settings/privacy-data' },
              ].map(({ icon: Icon, color, label, sub, href }) => (
                <Link key={label} href={href} className="flex items-start gap-3 rounded-[8px] px-2 py-2.5 hover:bg-[#fff8ee] transition-colors">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />
                  <div className="flex-1">
                    <p className="text-xs font-black text-[#06183a]">{label}</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">{sub}</p>
                  </div>
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d3b98f]" />
                </Link>
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
