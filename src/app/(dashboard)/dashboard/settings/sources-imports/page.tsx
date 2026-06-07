'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpen,
  Brain,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clipboard,
  Clock,
  Cloud,
  CreditCard,
  FileText,
  FileUp,
  History,
  ImagePlus,
  Info,
  Layers3,
  Link2,
  LogOut,
  Map,
  MessageSquare,
  MoreHorizontal,
  Mic,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
} from 'lucide-react'

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: Users },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Add-new cards ────────────────────────────────────────────────────────────

const addCards = [
  {
    icon: FileUp,
    iconColor: '#6c37c6',
    iconBg: '#f5f0ff',
    borderColor: '#e0d4f8',
    label: 'Upload File',
    desc: 'Documents, PDFs, notes, exports.',
    href: '/dashboard/settings/sources-imports/new?type=file',
  },
  {
    icon: ImagePlus,
    iconColor: '#c04060',
    iconBg: '#fff0f3',
    borderColor: '#f5c5cf',
    label: 'Upload Image / Artifact',
    desc: 'Photos, screenshots, letters, visual material.',
    href: '/dashboard/settings/sources-imports/new?type=image-artifact',
  },
  {
    icon: MessageSquare,
    iconColor: '#0f8a77',
    iconBg: '#f0faf6',
    borderColor: '#b6e8d9',
    label: 'Import Transcript',
    desc: 'Past conversations, interviews, session text.',
    href: '/dashboard/settings/sources-imports/new?type=transcript',
  },
  {
    icon: BookOpen,
    iconColor: '#c97c1e',
    iconBg: '#fff8ee',
    borderColor: '#ead7b9',
    label: 'Import Journal Entry',
    desc: 'Old writing, reflections, retreat notes.',
    href: '/dashboard/settings/sources-imports/new?type=journal',
  },
  {
    icon: Cloud,
    iconColor: '#176dff',
    iconBg: '#eff4ff',
    borderColor: '#c5d8ff',
    label: 'Connect Account',
    desc: 'Google Drive, Apple, email, or future sources.',
    href: '/dashboard/settings/connected-accounts',
  },
  {
    icon: Clipboard,
    iconColor: '#0f8a77',
    iconBg: '#f0faf6',
    borderColor: '#b6e8d9',
    label: 'Paste Text',
    desc: 'Quickly add copied text or notes.',
    href: '/dashboard/settings/sources-imports/new?type=paste-text',
  },
]

// ─── Library rows ─────────────────────────────────────────────────────────────

const libraryRows = [
  {
    icon: Mic,
    iconColor: '#6c37c6',
    iconBg: '#f5f0ff',
    source: 'Uploaded Audio File',
    meta: 'Audio File • May 4, 2025',
    originLabel: 'Upload',
    originSub: 'My Device',
    permLabel: 'Included in Map',
    permSub: 'AI can use',
    permIcon: 'included',
    statusLabel: 'Processed',
    statusSub: 'Insights added',
    statusDot: 'green',
    action: 'Review',
  },
  {
    icon: FileText,
    iconColor: '#176dff',
    iconBg: '#eff4ff',
    source: 'Personal Goals Document',
    meta: 'PDF • Apr 29, 2025',
    originLabel: 'Upload',
    originSub: 'My Device',
    permLabel: 'Included in Map',
    permSub: 'AI can use',
    permIcon: 'included',
    statusLabel: 'Processed',
    statusSub: 'Insights added',
    statusDot: 'green',
    action: 'Review',
  },
  {
    icon: ImagePlus,
    iconColor: '#c04060',
    iconBg: '#fff0f3',
    source: 'Vision Board Photos (12)',
    meta: 'Images • Apr 28, 2025',
    originLabel: 'Upload',
    originSub: 'My Device',
    permLabel: 'Limited Use',
    permSub: 'Insights only',
    permIcon: 'limited',
    statusLabel: 'Scanned',
    statusSub: 'Organizing',
    statusDot: 'orange',
    action: 'Review',
  },
  {
    icon: MessageSquare,
    iconColor: '#0f8a77',
    iconBg: '#f0faf6',
    source: 'Imported Mentor Chat Transcript',
    meta: 'Transcript • Apr 24, 2025',
    originLabel: 'Upload',
    originSub: 'My Device',
    permLabel: 'Included in Map',
    permSub: 'AI can use',
    permIcon: 'included',
    statusLabel: 'Processed',
    statusSub: 'Insights added',
    statusDot: 'green',
    action: 'Review',
  },
  {
    icon: BookOpen,
    iconColor: '#c97c1e',
    iconBg: '#fff8ee',
    source: 'Retreat Journal — Day 2',
    meta: 'Journal Entry • Apr 24, 2025',
    originLabel: 'Upload',
    originSub: 'My Device',
    permLabel: 'Limited Use',
    permSub: 'Insights only',
    permIcon: 'limited',
    statusLabel: 'Pending Review',
    statusSub: 'Waiting for you',
    statusDot: 'amber',
    action: 'Review',
  },
  {
    icon: Cloud,
    iconColor: '#176dff',
    iconBg: '#eff4ff',
    source: 'Google Drive — Journal Folder',
    meta: 'Folder • Apr 20, 2025',
    originLabel: 'Google Drive',
    originSub: 'Connected',
    permLabel: 'Ask Before Use',
    permSub: 'You decide each time',
    permIcon: 'ask',
    statusLabel: 'Ready',
    statusSub: '12 items found',
    statusDot: 'blue',
    action: 'Manage',
  },
]

const statusDotColors: Record<string, string> = {
  green: '#0f8a77',
  orange: '#c97c1e',
  amber: '#f0a638',
  blue: '#176dff',
}

function PermIcon({ type }: { type: string }) {
  if (type === 'included') return <BadgeCheck className="h-3.5 w-3.5 text-[#0f8a77]" />
  if (type === 'limited')  return <AlertTriangle className="h-3.5 w-3.5 text-[#c97c1e]" />
  return <Info className="h-3.5 w-3.5 text-[#176dff]" />
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button role="switch" aria-checked={on} onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? 'bg-[#6c37c6]' : 'bg-[#d1d5db]'}`}>
      <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SourcesImportsPage() {
  const [avatarOpen,    setAvatarOpen]    = useState(false)
  const [typeFilter,    setTypeFilter]    = useState('All Types')
  const [statusFilter,  setStatusFilter]  = useState('All Status')
  const [autoAnalyze,   setAutoAnalyze]   = useState(true)
  const [notifyImport,  setNotifyImport]  = useState(true)
  const [defaultPerm,   setDefaultPerm]   = useState('Ask Before Use')

  const categories = ['Work', 'Health', 'Relationships', 'Personal Growth', 'Creativity', 'Values & Purpose']
  const catColors: Record<string, { bg: string; text: string; border: string }> = {
    'Work':             { bg: '#eff4ff', text: '#176dff', border: '#c5d8ff' },
    'Health':           { bg: '#f0faf6', text: '#0f8a77', border: '#b6e8d9' },
    'Relationships':    { bg: '#fff0f3', text: '#c04060', border: '#f5c5cf' },
    'Personal Growth':  { bg: '#f5f0ff', text: '#6c37c6', border: '#e0d4f8' },
    'Creativity':       { bg: '#fff8ee', text: '#c97c1e', border: '#ead7b9' },
    'Values & Purpose': { bg: '#f5f0ff', text: '#6c37c6', border: '#e0d4f8' },
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
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Sources &amp; Imports</h1>
            <p className="mt-1.5 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Connect, upload, and manage the outside materials that can enrich your Self-Map.
              You decide what enters, how it is used, and what stays private.
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
            <div className="flex flex-1 items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#ede8fb]">
                <Upload className="h-8 w-8 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#3b1d72]">Your story. Your sources.</h2>
                <p className="mt-1.5 text-sm font-semibold leading-6 text-[#4a2b8a]">
                  The more meaningful material you add, the<br />
                  richer and more accurate your Self-Map becomes.
                </p>
                <Link href="/how-it-works/sources-imports" className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-[#6c37c6] hover:underline">
                  Learn more about Sources &amp; Imports <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="shrink-0 sm:border-l sm:border-[#e0d4f8] sm:pl-6">
              <ul className="space-y-2">
                {['You choose what to add', 'You control how it\'s used', 'You can review and remove anytime', 'You\'re always in control'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-[#3b1d72]">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-[#6c37c6]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 1: Add New Material ───────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
              <FileUp className="h-4 w-4 text-[#6c37c6]" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">1. Add New Material</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Bring outside material into Meta-Aware. You stay in control of what enters your map.</p>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {addCards.map(({ icon: Icon, iconColor, iconBg, borderColor, label, desc, href }) => (
                <Link key={label} href={href}
                  className="group flex flex-col items-center gap-2.5 rounded-[12px] border bg-white p-4 text-center transition-all hover:shadow-[0_6px_18px_rgba(48,27,5,0.08)]"
                  style={{ borderColor }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-105" style={{ background: iconBg }}>
                    <Icon className="h-5 w-5" style={{ color: iconColor }} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#06183a]">{label}</p>
                    <p className="mt-0.5 text-[10px] font-semibold leading-3.5 text-[#6b7280]">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#6b7280]">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
              Nothing enters your Self-Map until you review and approve it.
            </div>
          </div>
        </section>

        {/* ── Section 2: Imported Sources Library ──────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div>
              <h2 className="text-base font-black text-[#06183a]">2. Imported Sources Library</h2>
              <p className="text-xs font-semibold text-[#6b7280]">All material you&apos;ve imported.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Type filter */}
              <div className="relative">
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none rounded-[8px] border border-[#ead7b9] bg-white py-1.5 pl-3 pr-7 text-xs font-semibold text-[#344263] focus:outline-none focus:border-[#6c37c6]">
                  {['All Types','Audio File','PDF','Images','Transcript','Journal Entry','Folder'].map((t) => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 text-[#6b7280]" />
              </div>
              {/* Status filter */}
              <div className="relative">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none rounded-[8px] border border-[#ead7b9] bg-white py-1.5 pl-3 pr-7 text-xs font-semibold text-[#344263] focus:outline-none focus:border-[#6c37c6]">
                  {['All Status','Processed','Scanned','Pending Review','Ready'].map((s) => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 text-[#6b7280]" />
              </div>
              {/* Search */}
              <div className="flex items-center gap-1.5 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-1.5">
                <Search className="h-3.5 w-3.5 text-[#a0a8b8]" />
                <input placeholder="Search sources..." className="w-32 bg-transparent text-xs font-semibold text-[#344263] outline-none placeholder:text-[#a0a8b8]" />
              </div>
            </div>
          </div>

          {/* Table header */}
          <div className="hidden grid-cols-[2fr_1fr_1.5fr_1.5fr_auto] gap-4 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-2.5 sm:grid">
            {[
              { label: 'Source', sub: 'Type • Added' },
              { label: 'Origin', sub: 'Where it came from' },
              { label: 'Use Permission', sub: 'How Meta-Aware may use it' },
              { label: 'Map Status', sub: 'What\'s happened' },
              { label: 'Actions', sub: '' },
            ].map(({ label, sub }) => (
              <div key={label}>
                <p className="text-[11px] font-black text-[#344263]">{label}</p>
                {sub && <p className="text-[10px] font-semibold text-[#a0a8b8]">{sub}</p>}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#ead7b9]">
            {libraryRows.map((row) => (
              <div key={row.source} className="grid grid-cols-1 gap-3 px-5 py-3.5 hover:bg-[#faf6f0] transition-colors sm:grid-cols-[2fr_1fr_1.5fr_1.5fr_auto] sm:items-center sm:gap-4">
                {/* Source */}
                <div className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: row.iconBg }}>
                    <row.icon className="h-4 w-4" style={{ color: row.iconColor }} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#06183a]">{row.source}</p>
                    <p className="text-[11px] font-semibold text-[#a0a8b8]">{row.meta}</p>
                  </div>
                </div>
                {/* Origin */}
                <div className="sm:block">
                  <p className="text-xs font-black" style={{ color: row.originLabel === 'Google Drive' ? '#176dff' : '#344263' }}>{row.originLabel}</p>
                  <p className="text-[11px] font-semibold text-[#a0a8b8]">{row.originSub}</p>
                </div>
                {/* Use Permission */}
                <div className="flex items-start gap-1.5">
                  <PermIcon type={row.permIcon} />
                  <div>
                    <p className="text-xs font-black text-[#06183a]">{row.permLabel}</p>
                    <p className="text-[11px] font-semibold text-[#a0a8b8]">{row.permSub}</p>
                  </div>
                </div>
                {/* Map Status */}
                <div className="flex items-start gap-1.5">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: statusDotColors[row.statusDot] }} />
                  <div>
                    <p className="text-xs font-black text-[#06183a]">{row.statusLabel}</p>
                    <p className="text-[11px] font-semibold text-[#a0a8b8]">{row.statusSub}</p>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <button className="rounded-[6px] border border-[#ead7b9] bg-white px-3 py-1.5 text-xs font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
                    {row.action}
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#ead7b9] bg-white text-[#6b7280] hover:bg-[#faf6f0] transition-colors" aria-label="More options">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          <div className="border-t border-[#ead7b9] px-5 py-3 text-center">
            <button className="rounded-[8px] border border-[#ead7b9] bg-white px-6 py-2 text-xs font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
              Load more sources
            </button>
          </div>
        </section>

        {/* ── Sections 3 + 4 + 5: Settings, Categories, Activity ─────────── */}
        <div className="mb-3 grid gap-3 lg:grid-cols-3">

          {/* 3. Import Settings */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Settings className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">3. Import Settings</h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">Control how new material is added and used.</p>
              </div>
            </div>
            <div className="divide-y divide-[#ead7b9]">
              {/* Default permission */}
              <div className="px-4 py-3.5">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0f8a77]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-[#06183a]">Default use permission for new imports</p>
                    <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">Choose the default privacy and use setting.</p>
                    <div className="relative mt-2">
                      <select value={defaultPerm} onChange={(e) => setDefaultPerm(e.target.value)}
                        className="w-full appearance-none rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] py-1.5 pl-3 pr-7 text-xs font-black text-[#344263] focus:outline-none focus:border-[#6c37c6]">
                        {['Ask Before Use', 'Included in Map', 'Limited Use', 'Insights Only'].map((o) => <option key={o}>{o}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 text-[#6b7280]" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Auto-analyze */}
              <div className="flex items-start gap-2.5 px-4 py-3.5">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#6c37c6]" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#06183a]">Auto-analyze new imports</p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">Allow AI to analyze new sources for insights.</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
                  <span className="text-[11px] font-black" style={{ color: autoAnalyze ? '#0f8a77' : '#6b7280' }}>{autoAnalyze ? 'On' : 'Off'}</span>
                  <Toggle on={autoAnalyze} onChange={setAutoAnalyze} />
                </div>
              </div>
              {/* Notify */}
              <div className="flex items-start gap-2.5 px-4 py-3.5">
                <Bell className="mt-0.5 h-4 w-4 shrink-0 text-[#c97c1e]" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#06183a]">Notify me when import completes</p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">Get notified when large imports finish processing.</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
                  <span className="text-[11px] font-black" style={{ color: notifyImport ? '#0f8a77' : '#6b7280' }}>{notifyImport ? 'On' : 'Off'}</span>
                  <Toggle on={notifyImport} onChange={setNotifyImport} />
                </div>
              </div>
            </div>
          </section>

          {/* 4. Source Categories */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Layers3 className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">4. Source Categories <span className="font-semibold text-[#a0a8b8]">(Optional)</span></h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">Organize your sources in ways that make sense to you.</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const c = catColors[cat]
                  return (
                    <span key={cat} className="inline-flex cursor-pointer items-center rounded-full border px-3 py-1 text-xs font-black transition-opacity hover:opacity-80"
                      style={{ background: c.bg, color: c.text, borderColor: c.border }}>
                      {cat}
                    </span>
                  )
                })}
              </div>
              <button className="mt-3 flex items-center gap-1.5 rounded-[8px] border border-dashed border-[#d3b98f] px-3 py-1.5 text-xs font-black text-[#c97c1e] hover:bg-[#fff8ee] transition-colors">
                <Plus className="h-3.5 w-3.5" /> Add category
              </button>
            </div>
          </section>

          {/* 5. Import Activity */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <History className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">5. Import Activity</h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">Overview of your import activity.</p>
              </div>
            </div>
            <div className="divide-y divide-[#ead7b9] px-4 py-1">
              {[
                { icon: Upload,    color: '#6c37c6', label: 'Total sources imported',  value: '42' },
                { icon: BadgeCheck,color: '#0f8a77', label: 'Processed & in your map', value: '98' },
                { icon: Clock,     color: '#f0a638', label: 'Pending your review',     value: '12' },
              ].map(({ icon: Icon, color, label, value }) => (
                <div key={label} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                    <p className="text-xs font-semibold text-[#344263]">{label}</p>
                  </div>
                  <p className="text-base font-black text-[#06183a]">{value}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[#ead7b9] px-4 py-3">
              <Link href="/dashboard/settings/sources-imports/history"
                className="flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
                View full import history <ArrowRight className="h-3.5 w-3.5" />
              </Link>
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
              <p className="font-serif text-lg font-bold text-[#0a5c4e]">You&apos;re always in control.</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1a6b5a]">
                You decide what to add, how it&apos;s used, and what stays private. Nothing enters your map without your approval.
              </p>
            </div>
          </div>
          <Link href="/dashboard/settings/privacy-data"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#0f8a77] bg-white px-5 py-2.5 text-sm font-black text-[#0f8a77] shadow-[0_4px_12px_rgba(15,138,119,0.1)] hover:bg-[#f0faf6] transition-colors">
            Review Privacy &amp; Data Settings <ChevronRight className="h-4 w-4" />
          </Link>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* About Sources & Imports */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">About Sources &amp; Imports</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Sources are anything that can help build your Self-Map.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              You stay in control of what you add, how it&apos;s used, and what&apos;s included.
            </p>
            <Link href="/how-it-works/sources-imports" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Imports do not enter automatically */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-start gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff8ee]">
                <ShieldCheck className="h-4 w-4 text-[#c97c1e]" />
              </div>
              <h2 className="text-sm font-black leading-tight text-[#06183a]">Imports do not enter your map automatically.</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Uploaded material can be reviewed, scanned, tagged, or connected, but nothing becomes part of your Atlas without your approval.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              You decide what enters, how it&apos;s used, and when it becomes part of your story.
            </p>
            <Link href="/how-it-works/sources-imports#control" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Learn more about control <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Related Settings */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Related Settings</h2>
            <div className="mt-3 space-y-1">
              {[
                { icon: ShieldCheck, color: '#0f8a77', label: 'Privacy & Data',               sub: 'Manage permissions and data use.',    href: '/dashboard/settings/privacy-data' },
                { icon: Brain,       color: '#6c37c6', label: 'AI Memory & Saving',            sub: 'Control memory, duration, and review.',href: '/dashboard/settings/ai-memory-saving' },
                { icon: Map,         color: '#6c37c6', label: 'Map Preferences',               sub: 'Customize your map experience.',      href: '/dashboard/settings/map-preferences' },
                { icon: Settings,    color: '#6c37c6', label: 'Reality Scientist AI Preferences',sub:'Customize how AI responds.',          href: '/dashboard/settings/reality-scientist-ai' },
                { icon: Sparkles,    color: '#176dff', label: 'Insights & Summaries',          sub: 'Control how insights are generated.', href: '/dashboard/settings/privacy-data' },
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
