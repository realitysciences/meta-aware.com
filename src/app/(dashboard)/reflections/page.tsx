'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  BadgeCheck,
  Bookmark,
  ChevronDown,
  CreditCard,
  Edit3,
  Eye,
  FileText,
  Flame,
  Link2,
  LogOut,
  Map,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Plus,
  Sparkles,
  Trash2,
  TrendingUp,
  User,
  Settings,
  ShieldCheck,
  CircleHelp,
  BookOpen,
  Scan,
  ArrowRight,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab    = 'all' | 'new' | 'ready' | 'saved' | 'weak' | 'dismissed'
type Source = 'all' | 'voice' | 'chat' | 'journal' | 'artifact' | 'lens' | 'transcript' | 'ai'

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, iconColor, iconBg, label, value, caption, valueColor, compact }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  label: string; value: string; caption: string; valueColor?: string; compact?: boolean
}) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]">
      <div className="flex items-start justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
          <Icon className="h-4 w-4" style={{ color: iconColor }} />
        </div>
      </div>
      <p className="text-[11px] font-semibold text-[#6b7280]">{label}</p>
      <p className={`font-serif font-bold ${compact ? 'text-lg leading-tight' : 'text-3xl leading-none'}`} style={{ color: valueColor ?? '#06183a' }}>{value}</p>
      <p className="text-[11px] font-semibold leading-4 text-[#a0a8b8]">{caption}</p>
    </div>
  )
}

// ─── Domain tag ──────────────────────────────────────────────────────────────

function Tag({ label, color = '#6c37c6', bg = '#f5f0ff', border = '#e0d4f8' }: {
  label: string; color?: string; bg?: string; border?: string
}) {
  return (
    <span className="rounded-full border px-2.5 py-0.5 text-[11px] font-black"
      style={{ color, background: bg, borderColor: border }}>
      {label}
    </span>
  )
}

// ─── Status pill ──────────────────────────────────────────────────────────────

const pillConfig = {
  'Ready to Review': { text: '#6c37c6', bg: '#f5f0ff', border: '#e0d4f8' },
  'New Suggestion':  { text: '#c97c1e', bg: '#fff8ee', border: '#ead7b9' },
  'Needs More Signal': { text: '#176dff', bg: '#eff4ff', border: '#c5d8ff' },
  'Saved':           { text: '#0f8a77', bg: '#f0faf6', border: '#b6e8d9' },
}
function StatusPill({ label }: { label: keyof typeof pillConfig }) {
  const c = pillConfig[label]
  return (
    <span className="inline-flex rounded-full border px-2.5 py-0.5 text-xs font-black"
      style={{ color: c.text, background: c.bg, borderColor: c.border }}>
      {label}
    </span>
  )
}

// ─── Signal dot ──────────────────────────────────────────────────────────────

const dotColor = { Strong: '#0f8a77', Moderate: '#c97c1e', Low: '#176dff' }
function SignalDot({ level }: { level: 'Strong' | 'Moderate' | 'Low' }) {
  return <span className="inline-block h-2 w-2 rounded-full" style={{ background: dotColor[level] }} />
}

// ─── Source icon ─────────────────────────────────────────────────────────────

function SourceIcon({ type }: { type: string }) {
  const map: Record<string, React.ElementType> = {
    'Voice Session': Mic, 'Journal Entry': BookOpen, 'AI conversation': Sparkles,
    'Lens Scan': Scan, 'Text Chat': MessageSquare, 'Artifact': FileText, 'Transcript': FileText,
  }
  const Icon = map[type] ?? FileText
  return <Icon className="h-3.5 w-3.5 shrink-0 text-[#a0a8b8]" />
}

// ─── Map connection ───────────────────────────────────────────────────────────

function MapConnection({ chain, preview = true }: { chain: string[]; preview?: boolean }) {
  return (
    <div className="rounded-[10px] border border-[#ead7b9] bg-[#faf6f0] p-3">
      <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">Possible Map Connection</p>
      <div className="flex flex-wrap items-center gap-1 text-sm font-black text-[#06183a]">
        {chain.map((part, i) => (
          <span key={i} className="flex items-center gap-1">
            {part}
            {i < chain.length - 1 && <ArrowRight className="h-3 w-3 text-[#d3b98f]" />}
          </span>
        ))}
      </div>
      {preview && (
        <button className="mt-2 flex items-center gap-1.5 text-[11px] font-black text-[#6c37c6] hover:underline">
          <Map className="h-3 w-3" /> Preview in Map
        </button>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReflectionsPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [activeTab,  setActiveTab]  = useState<Tab>('all')
  const [activeSource, setActiveSource] = useState<Source>('all')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all',       label: 'All Reflections' },
    { key: 'new',       label: 'New (7)' },
    { key: 'ready',     label: 'Ready to Review (4)' },
    { key: 'saved',     label: 'Saved (18)' },
    { key: 'weak',      label: 'Needs More Signal (3)' },
    { key: 'dismissed', label: 'Dismissed (12)' },
  ]

  const sources: { key: Source; label: string }[] = [
    { key: 'all',        label: 'All Sources' },
    { key: 'voice',      label: 'Voice Sessions' },
    { key: 'chat',       label: 'Text Chat Sessions' },
    { key: 'journal',    label: 'Journals' },
    { key: 'artifact',   label: 'Artifacts' },
    { key: 'lens',       label: 'Lens Scans' },
    { key: 'transcript', label: 'Transcripts' },
    { key: 'ai',         label: 'AI Suggested' },
  ]

  return (
    <div className="flex min-h-screen bg-[#fffaf2] pb-20">

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Page header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Reflections</h1>
            <p className="mt-1 text-sm font-semibold text-[#344263]">
              Review emerging insights before they become part of your Self-Map.
            </p>
            {/* Trust line */}
            <div className="mt-2 flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
              <p className="text-xs font-semibold text-[#6b7280]">
                Reflections are suggested interpretations, not conclusions.{' '}
                <span className="font-black text-[#06183a]">Nothing becomes part of your Atlas unless you review and approve it.</span>
              </p>
            </div>
          </div>
          {/* Header actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
              <Plus className="h-4 w-4" /> New Reflection
            </button>
            <button className="flex items-center gap-2 rounded-[10px] bg-[#6c37c6] px-4 py-2 text-sm font-black text-white shadow-[0_4px_12px_rgba(108,55,198,0.3)] hover:bg-[#5a2aae] transition-colors">
              <Sparkles className="h-4 w-4" />
              Review Queue
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-[#6c37c6]">4</span>
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors">
              <CircleHelp className="h-5 w-5" />
            </button>
            <div className="relative">
              <button onClick={() => setAvatarOpen((v) => !v)}
                className="flex items-center gap-2 rounded-[12px] border border-[#ead7b9] bg-white px-3 py-2 hover:bg-[#fff8ee] transition-colors">
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

        {/* ── Stat cards ───────────────────────────────────────────────── */}
        <div className="mb-4 flex gap-3 overflow-x-auto pb-1">
          <StatCard icon={Sparkles}   iconColor="#6c37c6" iconBg="#f5f0ff" label="New Suggestions"          value="7"  caption="Generated from recent sessions and source reviews." />
          <StatCard icon={Eye}        iconColor="#c97c1e" iconBg="#fff8ee" label="Ready to Review"          value="4"  caption="May be strong enough to connect to your map." />
          <StatCard icon={BadgeCheck} iconColor="#0f8a77" iconBg="#f0faf6" label="Saved to Map"             value="18" caption="Reflections you approved and preserved." />
          <StatCard icon={TrendingUp} iconColor="#176dff" iconBg="#eff4ff" label="Needs More Signal"        value="3"  caption="Interesting patterns, but not enough evidence yet." />
          <StatCard icon={Flame}      iconColor="#c04060" iconBg="#fff0f3" label="Strongest Emerging Pattern" value="Identity & Boundaries" valueColor="#c04060" caption="Most repeated across your recent sources." compact />
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────── */}
        <div className="mb-3 border-b border-[#ead7b9]">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map(({ key, label }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-black transition-colors ${
                  activeTab === key
                    ? 'border-[#6c37c6] text-[#6c37c6]'
                    : 'border-transparent text-[#6b7280] hover:text-[#344263]'
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Source filter row ─────────────────────────────────────────── */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {sources.map(({ key, label }) => (
            <button key={key} onClick={() => setActiveSource(key)}
              className={`rounded-full border px-3 py-1.5 text-xs font-black transition-colors ${
                activeSource === key
                  ? 'border-[#6c37c6] bg-[#f5f0ff] text-[#6c37c6]'
                  : 'border-[#ead7b9] bg-white text-[#344263] hover:border-[#c4aaee]'
              }`}>
              {label}
            </button>
          ))}
          <div className="relative ml-auto">
            <select className="appearance-none rounded-full border border-[#ead7b9] bg-white py-1.5 pl-3 pr-7 text-xs font-black text-[#344263] focus:outline-none focus:border-[#6c37c6]">
              <option>Strongest Signals</option>
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-2 h-3.5 w-3.5 text-[#6b7280]" />
          </div>
        </div>

        {/* ── Reflection cards ──────────────────────────────────────────── */}
        <div className="space-y-3">

          {/* Card 1: Ready to Review */}
          <article className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]" style={{ borderLeft: '4px solid #6c37c6' }}>
            <div className="p-5">
              {/* Meta row */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#6b7280]">
                  <StatusPill label="Ready to Review" />
                  <span>·</span>
                  <span>Seen in 3 sources</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">Signal Strength: Strong <SignalDot level="Strong" /></span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag label="Identity" />
                  <Tag label="Family" />
                  <Tag label="Boundaries" />
                  <button className="text-[#d3b98f] hover:text-[#6c37c6] transition-colors" aria-label="Bookmark">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {/* Headline */}
              <h2 className="mb-4 font-serif text-xl font-bold leading-snug text-[#06183a]">
                You may be carrying the role of translator in relationships where others have not agreed to be translated.
              </h2>
              {/* Evidence */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-black text-[#344263]">Evidence (3)</p>
                <div className="space-y-2">
                  {[
                    { type: 'Voice Session',    date: 'June 6, 2025',   quote: '"I often explain things in ways others don\'t try to understand…"' },
                    { type: 'Journal Entry',    date: 'May 28, 2025',   quote: '"I feel responsible for making sure people understand me…"' },
                    { type: 'AI conversation', date: 'June 3, 2025',   quote: '"You described yourself as the bridge between two sides…"' },
                  ].map(({ type, date, quote }) => (
                    <div key={date} className="flex items-start gap-2.5 rounded-[8px] bg-[#faf6f0] px-3 py-2">
                      <SourceIcon type={type} />
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-black text-[#344263]">{type}</span>
                        <span className="mx-1.5 text-[11px] text-[#a0a8b8]">·</span>
                        <span className="text-[11px] font-semibold text-[#a0a8b8]">{date}</span>
                        <p className="mt-0.5 text-xs font-semibold italic text-[#6b7280]">{quote}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Map connection */}
              <div className="mb-4">
                <MapConnection chain={['Family System', 'Role Pattern', 'Interpreter / Translator']} />
              </div>
              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button className="flex items-center gap-2 rounded-[8px] bg-[#6c37c6] px-4 py-2 text-sm font-black text-white hover:bg-[#5a2aae] transition-colors">
                  Review &amp; Decide <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button className="flex items-center gap-2 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-sm font-semibold text-[#344263] hover:bg-[#faf6f0] transition-colors">
                  <Eye className="h-3.5 w-3.5" /> View Sources
                </button>
                <button className="flex items-center gap-2 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-sm font-semibold text-[#344263] hover:bg-[#faf6f0] transition-colors">
                  Mark Inaccurate
                </button>
                <button className="flex items-center gap-2 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-sm font-semibold text-[#344263] hover:bg-[#faf6f0] transition-colors">
                  Keep Watching
                </button>
                <button className="ml-auto text-[#a0a8b8] hover:text-[#344263] transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>

          {/* Card 2: New Suggestion */}
          <article className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]" style={{ borderLeft: '4px solid #c97c1e' }}>
            <div className="p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#6b7280]">
                  <StatusPill label="New Suggestion" />
                  <span>·</span>
                  <span>Seen in 2 sources</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">Signal Strength: Moderate <SignalDot level="Moderate" /></span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag label="Time"     color="#c97c1e" bg="#fff8ee" border="#ead7b9" />
                  <Tag label="Awareness" color="#c97c1e" bg="#fff8ee" border="#ead7b9" />
                  <Tag label="Meaning"  color="#c97c1e" bg="#fff8ee" border="#ead7b9" />
                  <button className="text-[#d3b98f] hover:text-[#c97c1e] transition-colors" aria-label="Bookmark">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h2 className="mb-2 font-serif text-xl font-bold leading-snug text-[#06183a]">
                Physical proximity does not equal contact.
              </h2>
              <p className="mb-4 text-sm font-semibold text-[#6b7280]">
                You describe how something can be near you physically but unreachable perceptually, emotionally, digitally, or dimensionally.
              </p>
              <div className="mb-4">
                <p className="mb-2 text-xs font-black text-[#344263]">Evidence (2)</p>
                <div className="space-y-2">
                  {[
                    { type: 'Journal Entry', date: 'June 5, 2025' },
                    { type: 'Lens Scan',     date: 'June 5, 2025' },
                  ].map(({ type, date }) => (
                    <div key={type + date} className="flex items-center gap-2.5 rounded-[8px] bg-[#faf6f0] px-3 py-2">
                      <SourceIcon type={type} />
                      <span className="text-[11px] font-black text-[#344263]">{type}</span>
                      <span className="text-[11px] text-[#a0a8b8]">·</span>
                      <span className="text-[11px] font-semibold text-[#a0a8b8]">{date}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <MapConnection chain={['Worldview', 'Perception Theory', 'Contact vs Proximity']} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="flex items-center gap-2 rounded-[8px] bg-[#c97c1e] px-4 py-2 text-sm font-black text-white hover:bg-[#b06a14] transition-colors">
                  Review &amp; Decide <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button className="flex items-center gap-2 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-sm font-semibold text-[#344263] hover:bg-[#faf6f0] transition-colors">
                  <Eye className="h-3.5 w-3.5" /> View Sources
                </button>
                <button className="flex items-center gap-2 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-sm font-semibold text-[#344263] hover:bg-[#faf6f0] transition-colors">
                  <Edit3 className="h-3.5 w-3.5" /> Edit Before Saving
                </button>
                <button className="flex items-center gap-2 rounded-[8px] border border-[#f5c5cf] bg-[#fff8f9] px-3 py-2 text-sm font-semibold text-[#c04060] hover:bg-[#fff0f3] transition-colors">
                  <Trash2 className="h-3.5 w-3.5" /> Dismiss
                </button>
                <button className="ml-auto text-[#a0a8b8] hover:text-[#344263] transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>

          {/* Card 3: Needs More Signal */}
          <article className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]" style={{ borderLeft: '4px solid #176dff' }}>
            <div className="p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#6b7280]">
                  <StatusPill label="Needs More Signal" />
                  <span>·</span>
                  <span>Seen in 1 source</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">Signal Strength: Low <SignalDot level="Low" /></span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag label="Work"             color="#344263" bg="#f3f4f6" border="#d1d5db" />
                  <Tag label="Product Direction" color="#344263" bg="#f3f4f6" border="#d1d5db" />
                  <Tag label="Self-Trust"        color="#344263" bg="#f3f4f6" border="#d1d5db" />
                  <button className="text-[#d3b98f] hover:text-[#176dff] transition-colors" aria-label="Bookmark">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h2 className="mb-2 font-serif text-xl font-bold leading-snug text-[#06183a]">
                You may trust the architecture before you trust the market.
              </h2>
              <p className="mb-4 text-sm font-semibold text-[#6b7280]">
                This shows in product and building conversations, but we need more real-world evidence.
              </p>
              <div className="mb-4">
                <p className="mb-2 text-xs font-black text-[#344263]">Evidence (1)</p>
                <div className="flex items-center gap-2.5 rounded-[8px] bg-[#faf6f0] px-3 py-2">
                  <SourceIcon type="AI conversation" />
                  <span className="text-[11px] font-black text-[#344263]">AI conversation</span>
                  <span className="text-[11px] text-[#a0a8b8]">·</span>
                  <span className="text-[11px] font-semibold text-[#a0a8b8]">June 4, 2025</span>
                </div>
              </div>
              <div className="mb-4">
                <MapConnection chain={['Work Identity', 'Building Patterns', 'Trust Sequence']} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="flex items-center gap-2 rounded-[8px] border border-[#c5d8ff] bg-[#eff4ff] px-4 py-2 text-sm font-black text-[#176dff] hover:bg-[#dbe9ff] transition-colors">
                  Keep Watching
                </button>
                <button className="flex items-center gap-2 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-sm font-semibold text-[#344263] hover:bg-[#faf6f0] transition-colors">
                  <Eye className="h-3.5 w-3.5" /> View Source
                </button>
                <button className="flex items-center gap-2 rounded-[8px] border border-[#f5c5cf] bg-[#fff8f9] px-3 py-2 text-sm font-semibold text-[#c04060] hover:bg-[#fff0f3] transition-colors">
                  <Trash2 className="h-3.5 w-3.5" /> Dismiss
                </button>
                <button className="ml-auto text-[#a0a8b8] hover:text-[#344263] transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>

        </div>
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Review Before Saving */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <p className="text-sm font-black text-[#06183a]">Review Before Saving</p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Reflections are suggested interpretations, not conclusions.
              Nothing becomes part of your Atlas unless you review and approve it.
              You decide what stays, what gets connected, and what gets dismissed.
            </p>
            <div className="mt-3 space-y-2">
              <button className="flex w-full items-center justify-between rounded-[8px] bg-[#6c37c6] px-3 py-2 text-xs font-black text-white hover:bg-[#5a2aae] transition-colors">
                <span>Open Review Queue</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#6c37c6]">4</span>
              </button>
              <button className="flex w-full items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
                View Saved Reflections <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Current Reflection Cluster */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <p className="text-sm font-black text-[#06183a]">Current Reflection Cluster</p>
            <p className="mt-1.5 text-xs font-black text-[#6c37c6]">Family / Awareness Pattern</p>
            <p className="mt-1 text-xs font-semibold leading-5 text-[#6b7280]">
              7 reflections may belong to the same underlying structure.
            </p>
            <button className="mt-3 w-full rounded-[8px] border border-[#e0d4f8] bg-[#f5f0ff] py-2 text-xs font-black text-[#6c37c6] hover:bg-[#ede8fb] transition-colors">
              Review Cluster
            </button>
          </div>

          {/* Most Active Domains */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <p className="text-sm font-black text-[#06183a]">Most Active Domains</p>
            <div className="mt-3 space-y-2">
              {[
                { label: 'Identity',       value: 12, max: 12 },
                { label: 'Relationships',  value: 9,  max: 12 },
                { label: 'Boundaries',     value: 8,  max: 12 },
                { label: 'Awareness',      value: 7,  max: 12 },
                { label: 'Purpose',        value: 5,  max: 12 },
              ].map(({ label, value, max }) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#344263]">
                    <span>{label}</span>
                    <span className="font-black">{value}</span>
                  </div>
                  <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-[#ead7b9]">
                    <div className="h-full rounded-full bg-[#6c37c6]" style={{ width: `${(value / max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View All Domains <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Last Saved Insight */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <p className="text-sm font-black text-[#06183a]">Last Saved Insight</p>
            <p className="mt-1 text-[11px] font-semibold text-[#a0a8b8]">Saved May 15, 2025</p>
            <p className="mt-2 text-xs font-semibold italic leading-5 text-[#344263]">
              &ldquo;I build systems so I can think clearly without having to hold everything in my head.&rdquo;
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="rounded-full border border-[#b6e8d9] bg-white px-2 py-0.5 text-[10px] font-black text-[#0f8a77]">Edited before saving</span>
            </div>
            <button className="mt-2 flex items-center gap-1 text-xs font-black text-[#0f8a77] hover:underline">
              View in Map <ArrowRight className="h-3 w-3" />
            </button>
          </div>

        </div>
      </aside>

      {/* ── Bottom review banner ─────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 ml-0 md:ml-64">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#b6e8d9] bg-[#f2faf6]/96 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#0f8a77]" />
            <div>
              <p className="text-sm font-black text-[#0a5c4e]">Your map grows through reviewed meaning.</p>
              <p className="text-xs font-semibold text-[#1a6b5a]">
                Reflections help you notice what is emerging. You decide what becomes part of your Atlas.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-[8px] border border-[#0f8a77] bg-white px-4 py-2 text-sm font-black text-[#0f8a77] hover:bg-[#f0faf6] transition-colors">
              Review New Reflections
            </button>
            <Link href="/dashboard/self-map"
              className="flex items-center gap-2 rounded-[8px] bg-[#06183a] px-4 py-2 text-sm font-black text-white hover:bg-[#0a2850] transition-colors">
              <Map className="h-4 w-4" /> Open Self-Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
