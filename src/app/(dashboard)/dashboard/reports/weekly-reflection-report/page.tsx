'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  GitCompare,
  Leaf,
  Link2,
  LogOut,
  Map,
  MoreHorizontal,
  Puzzle,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Zap,
} from 'lucide-react'

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',       href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',   href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',     href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',     href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts', href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Signal dots ──────────────────────────────────────────────────────────────

function SignalDots({ filled, total = 5, color }: { filled: number; total?: number; color: string }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className="h-2 w-2 rounded-full"
          style={{ background: i < filled ? color : '#e5ddd0' }} />
      ))}
    </span>
  )
}

// ─── Metric card ──────────────────────────────────────────────────────────────

function MetricCard({ icon: Icon, iconColor, iconBg, label, value, sub, linkLabel, compact }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  label: string; value: string; sub: string; linkLabel?: string; compact?: boolean
}) {
  return (
    <div className="flex flex-1 flex-col gap-1.5 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]" style={{ minWidth: 130 }}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <p className="text-[11px] font-semibold text-[#6b7280]">{label}</p>
      <p className={`font-serif font-bold leading-none ${compact ? 'text-lg' : 'text-3xl'}`} style={{ color: '#06183a' }}>{value}</p>
      <p className="text-[11px] font-semibold text-[#a0a8b8]">{sub}</p>
      {linkLabel && (
        <button className="mt-0.5 flex items-center gap-1 text-[11px] font-black text-[#c97c1e] hover:underline">
          {linkLabel} <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

// ─── Theme card ───────────────────────────────────────────────────────────────

function ThemeCard({ icon: Icon, iconColor, iconBg, label, count, filled, dotColor }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  label: string; count: number; filled: number; dotColor: string
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-[12px] border border-[#ead7b9] bg-white p-4 text-center shadow-[0_2px_6px_rgba(48,27,5,0.04)]" style={{ minWidth: 110 }}>
      <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <p className="text-xs font-black leading-snug text-[#06183a]">{label}</p>
      <SignalDots filled={filled} color={dotColor} />
      <p className="text-[11px] font-semibold text-[#6b7280]">{count} reflections</p>
    </div>
  )
}

// ─── Circular review progress ─────────────────────────────────────────────────

function CircularProgress({ value, total }: { value: number; total: number }) {
  const pct = value / total
  const r = 38
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  const gap  = circ - dash
  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#ead7b9" strokeWidth="8" />
        <circle cx="48" cy="48" r={r} fill="none" stroke="#c97c1e" strokeWidth="8"
          strokeDasharray={`${dash} ${gap}`} strokeLinecap="round" />
      </svg>
      <div className="text-center">
        <p className="font-serif text-xl font-bold text-[#06183a]">{value} of {total}</p>
        <p className="text-[10px] font-semibold text-[#6b7280]">updates reviewed</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WeeklyReflectionReportPage() {
  const [avatarOpen, setAvatarOpen]   = useState(false)
  const [expandRow,  setExpandRow]    = useState<number | null>(null)

  const mapUpdates = [
    {
      title: 'Strengthening Personal Boundaries',
      desc: 'More clarity around limits and protecting your time from non-essential obligations.',
      type: 'Insight', signal: 4, theme: 'Identity & Boundaries', sources: 6,
    },
    {
      title: 'Shifting Toward Meaningful Work',
      desc: 'Increasing focus on work that aligns with your values and long-term direction.',
      type: 'Pattern', signal: 4, theme: 'Purpose & Direction', sources: 5,
    },
    {
      title: 'Energy Management Momentum',
      desc: 'Protecting energy through better boundaries and intentional recovery.',
      type: 'Insight', signal: 3, theme: 'Energy & Capacity', sources: 4,
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#fffaf2] pb-24">

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#6b7280]">
          <Link href="/dashboard/reports" className="hover:text-[#c97c1e] transition-colors">Reports &amp; Insights</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#d3b98f]" />
          <span className="text-[#06183a]">Weekly Reflection Report</span>
        </div>

        {/* ── Page header ──────────────────────────────────────────── */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Weekly Reflection Report</h1>
            <p className="mt-1 text-sm font-semibold text-[#6b7280]">
              May 12 – May 18, 2025 <span className="mx-1.5 text-[#d3b98f]">·</span> Generated May 19, 2025
            </p>
            <div className="mt-2 flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
              <p className="text-xs font-semibold text-[#6b7280]">
                This report summarizes reviewed material. It may suggest map updates, but{' '}
                <span className="font-black text-[#c04060]">nothing changes in your Atlas without your review and approval.</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/dashboard/reports"
              className="flex items-center gap-1.5 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
              ← Back to Reports
            </Link>
            <button className="flex items-center gap-2 rounded-[10px] bg-[#6c37c6] px-4 py-2 text-sm font-black text-white shadow-[0_4px_12px_rgba(108,55,198,0.3)] hover:bg-[#5a2aae] transition-colors">
              <Sparkles className="h-4 w-4" /> Review Updates
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-[#6c37c6]">3</span>
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

        {/* ── Metric row ─────────────────────────────────────────────── */}
        <div className="mb-5 flex gap-3 overflow-x-auto pb-1">
          <MetricCard icon={FileText}  iconColor="#6c37c6" iconBg="#f5f0ff"
            label="Sources Reviewed" value="24" sub="Across 8 types" linkLabel="View sources" />
          <MetricCard icon={TrendingUp} iconColor="#0f8a77" iconBg="#f0faf6"
            label="Key Themes"       value="6"  sub="Strongest signals" linkLabel="View themes" />
          <MetricCard icon={Puzzle}    iconColor="#c97c1e" iconBg="#fff8ee"
            label="Map Updates"      value="3"  sub="Suggested updates" linkLabel="Review updates" />
          <div className="flex flex-1 flex-col gap-1.5 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]" style={{ minWidth: 140 }}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eff4ff]">
              <Target className="h-4 w-4 text-[#176dff]" />
            </div>
            <p className="text-[11px] font-semibold text-[#6b7280]">Report Signal</p>
            <p className="font-serif text-xl font-bold text-[#06183a]">High Signal</p>
            <SignalDots filled={4} color="#6c37c6" />
            <p className="text-[11px] font-semibold text-[#a0a8b8]">Consistent signal</p>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]" style={{ minWidth: 130 }}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0faf6]">
              <BarChart3 className="h-4 w-4 text-[#0f8a77]" />
            </div>
            <p className="text-[11px] font-semibold text-[#6b7280]">Atlas Coverage</p>
            <p className="font-serif text-3xl font-bold text-[#0f8a77]">62%</p>
            <p className="text-[11px] font-semibold text-[#a0a8b8]">Increased 6% vs. prior 7 days</p>
          </div>
        </div>

        {/* ── Executive Summary ─────────────────────────────────────── */}
        <section className="mb-5 overflow-hidden rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] shadow-[0_4px_16px_rgba(108,55,198,0.08)]">
          <div className="flex items-center gap-3 border-b border-[#e0d4f8] bg-[#f0eafa] px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ede8fb]">
              <Sparkles className="h-5 w-5 text-[#6c37c6]" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#3b1d72]">Executive Summary</h2>
          </div>
          <div className="flex flex-wrap gap-6 p-6">
            <div className="flex-1" style={{ minWidth: 260 }}>
              <p className="text-sm font-semibold leading-6 text-[#344263]">
                This week&apos;s reflections highlight a strengthening sense of direction and boundaries.
                You&apos;re clarifying priorities, saying no to misaligned commitments, and investing more
                in work that feels meaningful.
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  'Clearer identity boundaries are reducing overload.',
                  'Meaning and contribution are driving motivation.',
                  'Momentum increases when your energy is protected.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6c37c6]" />
                    <span className="text-sm font-semibold text-[#344263]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-[12px] border border-[#e0d4f8] bg-white px-5 py-4 shadow-[0_2px_8px_rgba(108,55,198,0.06)]" style={{ minWidth: 190 }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#a0a8b8]">Strongest Theme</p>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f0ff]">
                  <Users className="h-3.5 w-3.5 text-[#6c37c6]" />
                </div>
                <p className="font-serif text-base font-bold text-[#6c37c6]">Identity &amp; Boundaries</p>
              </div>
              <p className="text-xs font-semibold leading-5 text-[#6b7280]">Consistent signal across<br />18 reflections</p>
            </div>
          </div>
        </section>

        {/* ── Key Themes ────────────────────────────────────────────── */}
        <section className="mb-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Key Themes</h2>
              <p className="text-xs font-semibold text-[#6b7280]">The most significant themes surfaced in your reflections this week.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View all themes <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            <ThemeCard icon={Users}      iconColor="#6c37c6" iconBg="#f5f0ff" label="Identity &amp; Boundaries" count={18} filled={5} dotColor="#6c37c6" />
            <ThemeCard icon={Target}     iconColor="#0f8a77" iconBg="#f0faf6" label="Purpose &amp; Direction"   count={14} filled={4} dotColor="#0f8a77" />
            <ThemeCard icon={Zap}        iconColor="#c97c1e" iconBg="#fff8ee" label="Energy &amp; Capacity"     count={12} filled={4} dotColor="#c97c1e" />
            <ThemeCard icon={Link2}      iconColor="#176dff" iconBg="#eff4ff" label="Relationships &amp; Connection" count={10} filled={3} dotColor="#176dff" />
            <ThemeCard icon={TrendingUp} iconColor="#0f8a77" iconBg="#f0faf6" label="Growth &amp; Learning"    count={9}  filled={3} dotColor="#0f8a77" />
            <ThemeCard icon={Leaf}       iconColor="#6b7280" iconBg="#f3f4f6" label="Health &amp; Wellbeing"   count={8}  filled={2} dotColor="#9ca3af" />
          </div>
        </section>

        {/* ── Suggested Map Updates ─────────────────────────────────── */}
        <section className="mb-5 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff8ee]">
                <Puzzle className="h-4 w-4 text-[#c97c1e]" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">Suggested Map Updates</h2>
                <p className="text-xs font-semibold text-[#6b7280]">AI-suggested updates based on this week&apos;s reviewed material.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[#f0dca0] bg-[#fffbee] px-3 py-1 text-xs font-black text-[#7a5800]">3 updates to review</span>
              <button className="rounded-[8px] border border-[#e0d4f8] bg-[#f5f0ff] px-4 py-2 text-xs font-black text-[#6c37c6] hover:bg-[#ede8fb] transition-colors">
                Review All
              </button>
            </div>
          </div>
          {/* Amber strip */}
          <div className="flex items-center gap-2 border-b border-[#f0dca0] bg-[#fffbee] px-5 py-2 text-xs font-semibold text-[#7a5800]">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#c97c1e]" />
            Review required before anything enters your Atlas
          </div>
          {/* Column headers */}
          <div className="hidden grid-cols-[2fr_80px_100px_140px_60px_80px] items-center gap-3 border-b border-[#ead7b9] bg-[#fafaf8] px-5 py-2 md:grid">
            {['Suggested Update', 'Type', 'Signal', 'Related Theme', 'Sources', 'Action'].map((h) => (
              <p key={h} className="text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">{h}</p>
            ))}
          </div>
          {/* Rows */}
          {mapUpdates.map((row, i) => (
            <div key={i}>
              <div className="grid grid-cols-1 items-start gap-3 border-b border-[#ead7b9] px-5 py-4 last:border-0 md:grid-cols-[2fr_80px_100px_140px_60px_80px] md:items-center">
                {/* Update */}
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#e0d4f8] bg-[#f5f0ff] text-[10px] font-black text-[#6c37c6]">{i + 1}</span>
                  <div>
                    <p className="text-sm font-black text-[#06183a]">{row.title}</p>
                    <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">{row.desc}</p>
                  </div>
                </div>
                {/* Type */}
                <span className="w-fit rounded-full border border-[#ead7b9] bg-[#faf6f0] px-2.5 py-0.5 text-[11px] font-black text-[#344263]">{row.type}</span>
                {/* Signal */}
                <div className="flex flex-col gap-0.5">
                  <SignalDots filled={row.signal} color="#c97c1e" />
                  <p className="text-[10px] font-semibold text-[#c97c1e]">{row.signal >= 4 ? 'High' : 'Medium'}</p>
                </div>
                {/* Theme */}
                <p className="text-xs font-semibold text-[#344263]">{row.theme}</p>
                {/* Sources */}
                <p className="text-sm font-black text-[#06183a]">{row.sources}</p>
                {/* Action */}
                <div className="flex items-center gap-1">
                  <button className="rounded-[8px] border border-[#e0d4f8] bg-[#f5f0ff] px-3 py-1.5 text-xs font-black text-[#6c37c6] hover:bg-[#ede8fb] transition-colors">
                    Review
                  </button>
                  <button onClick={() => setExpandRow(expandRow === i ? null : i)}
                    className="rounded-[6px] border border-[#ead7b9] bg-white p-1 text-[#6b7280] hover:bg-[#faf6f0] transition-colors">
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expandRow === i ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
              {expandRow === i && (
                <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-3">
                  <p className="text-xs font-semibold text-[#344263]">Expand view — detailed review panel goes here.</p>
                </div>
              )}
            </div>
          ))}
          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ead7b9] bg-[#faf6f0] px-5 py-3">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-3.5 w-3.5 text-[#a0a8b8]" />
              <p className="text-xs font-semibold text-[#6b7280]">Only updates you approve will be added to your Atlas.</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-black text-[#6c37c6] hover:underline">
              How review works <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </section>

        {/* ── Source Support + Reflection Highlights ────────────────── */}
        <section className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Source Support */}
          <div className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-3">
              <h2 className="text-sm font-black text-[#06183a]">Source Support</h2>
              <button className="flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
                View all sources <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="p-4">
              <p className="mb-3 text-[11px] font-semibold text-[#a0a8b8]">Sources that informed this report.</p>
              <table className="w-full text-xs">
                <tbody className="divide-y divide-[#ead7b9]">
                  {[
                    { label: 'Voice Sessions',     n: 6, pct: '25%' },
                    { label: 'Text Chat Sessions', n: 7, pct: '29%' },
                    { label: 'Journals',           n: 5, pct: '21%' },
                    { label: 'Artifacts',          n: 3, pct: '13%' },
                    { label: 'Lens Scans',         n: 2, pct: '8%' },
                    { label: 'Transcripts',        n: 1, pct: '4%' },
                  ].map(({ label, n, pct }) => (
                    <tr key={label} className="hover:bg-[#faf6f0] transition-colors">
                      <td className="py-2.5 font-semibold text-[#344263]">{label}</td>
                      <td className="py-2.5 text-center font-black text-[#06183a]">{n}</td>
                      <td className="py-2.5 text-right font-semibold text-[#a0a8b8]">{pct}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[#ead7b9]">
                    <td className="py-2.5 font-black text-[#06183a]">Total</td>
                    <td className="py-2.5 text-center font-black text-[#06183a]">24</td>
                    <td className="py-2.5 text-right font-black text-[#06183a]">100%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-[10px] font-semibold text-[#a0a8b8]">Only reviewed material contributes to this report.</p>
            </div>
          </div>

          {/* Reviewed Reflection Highlights */}
          <div className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-3">
              <h2 className="text-sm font-black text-[#06183a]">Reviewed Reflection Highlights</h2>
              <button className="flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
                View all reflections <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="divide-y divide-[#ead7b9] p-0">
              <p className="px-5 py-3 text-[11px] font-semibold text-[#a0a8b8]">Excerpts from your reviewed reflections.</p>
              {[
                { quote: "I'm realizing I don't have to say yes to everything. My time and energy are finite, and that's okay.", date: 'May 14', source: 'Journal', tag: 'Boundaries', tagColor: '#176dff' },
                { quote: "When I work on something that matters, I feel grounded and motivated. That's my signal.", date: 'May 16', source: 'Voice Session', tag: 'Purpose', tagColor: '#0f8a77' },
                { quote: "I'm learning that rest isn't a reward, it's part of how I do my best work.", date: 'May 17', source: 'Text Chat', tag: 'Energy', tagColor: '#c97c1e' },
              ].map(({ quote, date, source, tag, tagColor }) => (
                <div key={quote} className="flex items-start gap-3 px-5 py-4">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#0f8a77]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold italic leading-5 text-[#344263]">&ldquo;{quote}&rdquo;</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-semibold text-[#a0a8b8]">{date} · {source}</span>
                      <span className="rounded-full border px-2 py-0.5 text-[10px] font-black"
                        style={{ color: tagColor, borderColor: tagColor + '30', background: tagColor + '10' }}>{tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pattern Connections ───────────────────────────────────── */}
        <section className="mb-5 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Pattern Connections</h2>
              <p className="text-xs font-semibold text-[#6b7280]">How this report connects across your Atlas.</p>
            </div>
            <Link href="/patterns" className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              Explore in Connections &amp; Patterns <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto p-5">
            <div className="flex items-stretch gap-2" style={{ minWidth: 600 }}>
              {[
                { icon: Users,      iconColor: '#6c37c6', iconBg: '#f5f0ff', label: 'Identity & Boundaries',  sub: 'Strong signal in this report' },
                { icon: Zap,        iconColor: '#c97c1e', iconBg: '#fff8ee', label: 'Energy & Capacity',       sub: 'Connected through boundaries' },
                { icon: Target,     iconColor: '#0f8a77', iconBg: '#f0faf6', label: 'Purpose & Direction',     sub: 'Aligned with core values' },
                { icon: TrendingUp, iconColor: '#0f8a77', iconBg: '#f0faf6', label: 'Growth & Learning',       sub: 'Supported by consistent practice' },
              ].map(({ icon: Icon, iconColor, iconBg, label, sub }, i, arr) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-2 rounded-[12px] border border-[#ead7b9] bg-[#faf6f0] px-4 py-3 text-center" style={{ minWidth: 130 }}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: iconBg }}>
                      <Icon className="h-4 w-4" style={{ color: iconColor }} />
                    </div>
                    <p className="text-xs font-black leading-snug text-[#06183a]">{label}</p>
                    <p className="text-[10px] font-semibold leading-4 text-[#6b7280]">{sub}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#d3b98f]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Report Actions */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <p className="text-sm font-black text-[#06183a]">Report Actions</p>
            <div className="mt-3 space-y-1">
              {[
                { icon: Download,     label: 'Export PDF' },
                { icon: Share2,       label: 'Share (Private Link)' },
                { icon: GitCompare,   label: 'Open in Connections & Patterns' },
                { icon: BookOpen,     label: 'View related reflections' },
                { icon: Copy,         label: 'Copy report link' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="flex w-full items-center gap-3 rounded-[8px] px-2 py-2.5 text-sm font-semibold text-[#344263] hover:bg-[#ede8fb] hover:text-[#6c37c6] transition-colors">
                  <Icon className="h-4 w-4 shrink-0 text-[#6c37c6]" /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* About This Report */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#6c37c6]" />
              <p className="text-sm font-black text-[#06183a]">About This Report</p>
            </div>
            <div className="mt-3 space-y-2.5 divide-y divide-[#ead7b9]">
              {[
                { label: 'Report Type',    value: 'Weekly Reflection' },
                { label: 'Date Range',     value: 'May 12 – May 18, 2025' },
                { label: 'Generated',      value: 'May 19, 2025 at 9:41 AM' },
                { label: 'Report ID',      value: 'WR-2025-05-19-01' },
              ].map(({ label, value }) => (
                <div key={label} className="pt-2 first:pt-0">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">{label}</p>
                  <p className="text-xs font-semibold text-[#344263]">{value}</p>
                </div>
              ))}
              <div className="pt-2">
                <p className="text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">Report Signal</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-black text-[#06183a]">High</span>
                  <SignalDots filled={4} color="#6c37c6" />
                </div>
              </div>
            </div>
          </div>

          {/* Review Progress */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-[#c97c1e]" />
              <p className="text-sm font-black text-[#06183a]">Review Progress</p>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#6b7280]">
              You&apos;re in control. Review and approve what you want to add to your Atlas.
            </p>
            <div className="my-4 flex justify-center">
              <CircularProgress value={2} total={3} />
            </div>
            <div className="space-y-2">
              {[
                { dot: '#0f8a77', label: '2', sub: 'Reviewed' },
                { dot: '#6c37c6', label: '0', sub: 'Approved' },
                { dot: '#c97c1e', label: '1', sub: 'Not reviewed' },
              ].map(({ dot, label, sub }) => (
                <div key={sub} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
                    <span className="font-semibold text-[#344263]">{sub}</span>
                  </div>
                  <span className="font-black text-[#06183a]">{label}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-[8px] bg-[#6c37c6] py-2.5 text-sm font-black text-white hover:bg-[#5a2aae] transition-colors">
              Continue Review
            </button>
          </div>

          {/* Related Reports */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <p className="text-sm font-black text-[#06183a]">Related Reports</p>
            <div className="mt-3 space-y-0 divide-y divide-[#ead7b9]">
              {[
                { title: 'Daily Reflection Report',   sub: 'May 18, 2025' },
                { title: 'Weekly Reflection Report',  sub: 'May 5 – May 11, 2025' },
                { title: 'Monthly Reflection Report', sub: 'April 2025' },
              ].map(({ title, sub }) => (
                <button key={title} className="flex w-full flex-col gap-0.5 py-3 text-left hover:text-[#6c37c6] transition-colors first:pt-0 last:pb-0">
                  <p className="text-xs font-black text-[#06183a] hover:text-[#6c37c6] transition-colors">{title}</p>
                  <p className="text-[10px] font-semibold text-[#a0a8b8]">{sub}</p>
                </button>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View all reports <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Report Tips */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#0f8a77]" />
              <p className="text-sm font-black text-[#06183a]">Report Tips</p>
            </div>
            <p className="mt-1.5 text-[11px] font-semibold text-[#6b7280]">How to get the most from this report.</p>
            <div className="mt-3 space-y-2">
              {['Review suggested updates', 'Explore source highlights', 'Check related patterns', 'Add your own notes'].map((tip) => (
                <div key={tip} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
                  <p className="text-xs font-semibold text-[#344263]">{tip}</p>
                </div>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#0f8a77] hover:underline">
              Learn more <ArrowRight className="h-3 w-3" />
            </button>
          </div>

        </div>
      </aside>

      {/* ── Bottom report banner ─────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 md:ml-64">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ead7b9] bg-[#fffaf2]/96 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#0f8a77]" />
            <div>
              <p className="text-sm font-black text-[#06183a]">This report helps you see structure. Your review determines what becomes part of your Atlas.</p>
              <p className="text-xs font-semibold text-[#6b7280]">You can edit, dismiss, or keep anything watching. Your map is built by you.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/reports"
              className="flex items-center gap-2 rounded-[8px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
              ← Back to Reports
            </Link>
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
