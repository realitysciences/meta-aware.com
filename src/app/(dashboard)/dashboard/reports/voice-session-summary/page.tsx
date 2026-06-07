'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock,
  Copy,
  CreditCard,
  Download,
  FileText,
  GitCompare,
  Link2,
  LogOut,
  Map,
  MessageCircle,
  Mic,
  MoreHorizontal,
  NotebookPen,
  Play,
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

function MetricCard({ icon: Icon, iconColor, iconBg, label, value, valueColor, sub, linkLabel }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  label: string; value: string; valueColor?: string; sub: string; linkLabel?: string
}) {
  return (
    <div className="flex flex-1 flex-col gap-1.5 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]" style={{ minWidth: 122 }}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <p className="text-[11px] font-semibold text-[#6b7280]">{label}</p>
      <p className="font-serif text-3xl font-bold leading-none" style={{ color: valueColor ?? '#06183a' }}>{value}</p>
      <p className="text-[11px] font-semibold text-[#a0a8b8]">{sub}</p>
      {linkLabel && (
        <button className="mt-0.5 flex items-center gap-1 text-[11px] font-black text-[#c97c1e] hover:underline">
          {linkLabel} <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

// ─── Circular review progress ─────────────────────────────────────────────────

function CircularProgress({ value, total }: { value: number; total: number }) {
  const r = 38; const circ = 2 * Math.PI * r
  const dash = circ * (value / total)
  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#ead7b9" strokeWidth="8" />
        <circle cx="48" cy="48" r={r} fill="none" stroke="#c97c1e" strokeWidth="8"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
      </svg>
      <div className="text-center">
        <p className="font-serif text-xl font-bold text-[#06183a]">{value} of {total}</p>
        <p className="text-[10px] font-semibold text-[#6b7280]">updates reviewed</p>
      </div>
    </div>
  )
}

// ─── Session signal donut (decorative SVG) ────────────────────────────────────

function SessionSignalDonut() {
  // Simple decorative donut: blue arc ~60%, orange arc ~25%, rest muted
  const r = 40; const circ = 2 * Math.PI * r
  const segments = [
    { pct: 0.35, color: '#176dff' },
    { pct: 0.28, color: '#c97c1e' },
    { pct: 0.20, color: '#0f8a77' },
    { pct: 0.10, color: '#6c37c6' },
    { pct: 0.07, color: '#ead7b9' },
  ]
  let offset = 0
  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96">
        {segments.map(({ pct, color }, i) => {
          const d = circ * pct
          const el = (
            <circle key={i} cx="48" cy="48" r={r} fill="none"
              stroke={color} strokeWidth="12"
              strokeDasharray={`${d} ${circ - d}`}
              strokeDashoffset={-offset}
            />
          )
          offset += d
          return el
        })}
      </svg>
      <div className="text-center">
        <p className="font-serif text-sm font-bold leading-tight text-[#06183a]">Moderate<br />Intensity</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VoiceSessionSummaryPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [expandRow,  setExpandRow]  = useState<number | null>(null)

  const mapUpdates = [
    { title: 'Add Translator / Bridge Role to Identity domain', desc: 'A recurring identity pattern involving translation, mediation, and making complexity understandable.', type: 'Add Pattern',          typeColor: '#6c37c6', typeBg: '#f5f0ff', signal: 4, signalLabel: 'High',   domain: 'Identity',           sources: 4 },
    { title: 'Strengthen Identity & Boundaries connection',     desc: 'Identity clarity increases when boundaries are named and held.',                                      type: 'Strengthen Connection', typeColor: '#0f8a77', typeBg: '#f0faf6', signal: 4, signalLabel: 'High',   domain: 'Boundaries',         sources: 5 },
    { title: 'Update Identity domain summary',                  desc: 'Identity signal centers on clarity, role awareness, values, and boundary formation.',                type: 'Update Summary',        typeColor: '#176dff', typeBg: '#eff4ff', signal: 3, signalLabel: 'Medium', domain: 'Purpose & Direction', sources: 6 },
  ]

  const keyMoments = [
    { ts: '05:12', icon: Mic,        iconColor: '#6c37c6', iconBg: '#f5f0ff', title: 'Translator Role Awareness',  body: 'You described how you naturally translate complex things for others.' },
    { ts: '14:38', icon: ShieldCheck, iconColor: '#0f8a77', iconBg: '#f0faf6', title: 'Boundary Recognition',       body: 'You recognized the cost of taking responsibility for things that are not yours.' },
    { ts: '28:46', icon: Zap,         iconColor: '#c97c1e', iconBg: '#fff8ee', title: 'Energy Impact',              body: 'You connected over-responsibility with mental and emotional depletion.' },
    { ts: '41:22', icon: Target,      iconColor: '#176dff', iconBg: '#eff4ff', title: 'Clarity Insight',            body: 'You named that clarity creates more space for meaningful work and relationships.' },
    { ts: '55:07', icon: Star,        iconColor: '#c97c1e', iconBg: '#fff8ee', title: 'Commitment',                 body: 'You committed to practicing clearer boundaries and protecting energy.' },
  ]

  const reflections = [
    { quote: '"You see yourself as someone who translates between complexity and clarity for others."',        theme: 'Identity',         signal: 'Strong Signal',   ts: '05:12', themeColor: '#6c37c6' },
    { quote: '"You recognized that you often carry responsibilities that are not truly yours."',               theme: 'Boundaries',       signal: 'Strong Signal',   ts: '14:38', themeColor: '#176dff' },
    { quote: '"You connected over-responsibility directly to mental and emotional drain."',                    theme: 'Energy & Capacity',signal: 'Moderate Signal', ts: '28:46', themeColor: '#c97c1e' },
    { quote: '"You stated that clarity creates space for meaningful work and better relationships."',          theme: 'Purpose & Direction', signal: 'Moderate Signal', ts: '41:22', themeColor: '#0f8a77' },
    { quote: '"You committed to practicing firmer boundaries and protecting energy."',                         theme: 'Commitment',       signal: 'Strong Signal',   ts: '55:07', themeColor: '#6c37c6' },
  ]

  const transcriptRows = [
    { ts: '05:12', quote: '"I think I naturally translate things that feel complicated so people can actually see what\'s going on."', tag: 'Translator Role',   tagColor: '#6c37c6' },
    { ts: '14:38', quote: '"I\'m realizing I take responsibility for things that aren\'t actually mine to hold."',                   tag: 'Boundaries',        tagColor: '#176dff' },
    { ts: '28:46', quote: '"When I\'m deep in what\'s mine, I have so much more energy for the work that actually matters."',        tag: 'Energy & Capacity', tagColor: '#c97c1e' },
    { ts: '41:22', quote: '"Clarity isn\'t just nice. It creates space for relationships and meaningful work."',                     tag: 'Purpose & Direction',tagColor: '#0f8a77' },
    { ts: '55:07', quote: '"I want to practice clearer boundaries and protect my energy."',                                          tag: 'Commitment',        tagColor: '#c97c1e' },
  ]

  return (
    <div className="flex min-h-screen bg-[#fffaf2] pb-24">

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#6b7280]">
          <Link href="/dashboard/reports" className="hover:text-[#c97c1e] transition-colors">Reports &amp; Insights</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#d3b98f]" />
          <span className="text-[#06183a]">Voice Session Summary</span>
        </div>

        {/* ── Page header ──────────────────────────────────────────── */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Voice Session Summary</h1>
            <p className="mt-1 text-sm font-semibold text-[#6b7280]">
              May 10, 2025 <span className="mx-1.5 text-[#d3b98f]">·</span> 62 minutes <span className="mx-1.5 text-[#d3b98f]">·</span> 10:24 AM – 11:26 AM
            </p>
            <div className="mt-2 flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
              <p className="text-xs font-semibold text-[#6b7280]">
                This report summarizes reviewed material from this voice session. It may suggest map updates, but{' '}
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
          <MetricCard icon={Clock}        iconColor="#6c37c6" iconBg="#f5f0ff" label="Session Duration"    value="62 min"   sub="Voice session"   linkLabel="Session details" />
          <MetricCard icon={MessageCircle} iconColor="#0f8a77" iconBg="#f0faf6" label="Reflections Surfaced" value="11"      sub="For review"      linkLabel="View reflections" />
          <MetricCard icon={Puzzle}       iconColor="#c97c1e" iconBg="#fff8ee" label="Suggested Updates"   value="3"        sub="Require review"  linkLabel="Review updates" />
          <MetricCard icon={GitCompare}   iconColor="#176dff" iconBg="#eff4ff" label="Domains Touched"     value="6"        sub="Primary domains" linkLabel="View domains" />
          <MetricCard icon={BarChart3}    iconColor="#0f8a77" iconBg="#f0faf6" label="Transcript State"    value="Complete" valueColor="#0f8a77"  sub="100% transcribed" linkLabel="Open transcript" />
        </div>

        {/* ── Session Summary ────────────────────────────────────────── */}
        <section className="mb-5 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f0ff]">
              <Mic className="h-4 w-4 text-[#6c37c6]" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#06183a]">Session Summary</h2>
          </div>
          <div className="p-5">
            <p className="text-sm font-semibold leading-6 text-[#344263]">
              This session explored identity, boundaries, and the ongoing shift toward more meaningful work.
              You spoke about your Translator / Bridge Role, the cost of over-responsibility, and how clarity
              and boundaries create more energy for what matters most.
            </p>
            <div className="mt-4 flex flex-wrap gap-8">
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">Primary Focus</p>
                <span className="rounded-full border border-[#e0d4f8] bg-[#f5f0ff] px-3 py-1 text-xs font-black text-[#6c37c6]">Identity &amp; Boundaries</span>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">Domains Touched</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Identity', 'Boundaries', 'Purpose & Direction', 'Energy & Capacity', 'Relationships', 'Meaningful Work'].map((d) => (
                    <span key={d} className="rounded-full border border-[#ead7b9] bg-[#faf6f0] px-2.5 py-0.5 text-[11px] font-semibold text-[#344263]">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Moments Timeline ───────────────────────────────────── */}
        <section className="mb-5 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Key Moments</h2>
              <p className="text-xs font-semibold text-[#6b7280]">The most important moments in this session.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View full timeline <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="overflow-x-auto p-5 pb-6">
            <div className="relative" style={{ minWidth: 640 }}>
              {/* Timeline spine */}
              <div className="absolute top-[14px] left-[20px] right-[20px] h-0.5 bg-[#6c37c6] opacity-30" />
              {/* Dots on spine */}
              <div className="flex justify-between px-5 mb-8">
                {keyMoments.map(({ ts }) => (
                  <div key={ts} className="relative flex flex-col items-center">
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-[#6c37c6] bg-[#6c37c6] shadow-[0_0_0_3px_#ede8fb]" />
                    <span className="mt-2 text-[11px] font-black text-[#6c37c6]">{ts}</span>
                  </div>
                ))}
              </div>
              {/* Cards */}
              <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${keyMoments.length}, 1fr)` }}>
                {keyMoments.map(({ ts, icon: Icon, iconColor, iconBg, title, body }) => (
                  <div key={ts} className="flex flex-col gap-2 rounded-[10px] border border-[#ead7b9] bg-[#faf6f0] p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
                      <Icon className="h-4 w-4" style={{ color: iconColor }} />
                    </div>
                    <p className="text-xs font-black leading-snug text-[#06183a]">{title}</p>
                    <p className="text-[11px] font-semibold leading-4 text-[#6b7280]">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Session Signal + Themes Surfaced ──────────────────────── */}
        <section className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Session Signal */}
          <div className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <h2 className="text-sm font-black text-[#06183a]">Session Signal</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Tone, pressure, clarity, and repeated emphasis.</p>
            </div>
            <div className="flex items-center gap-5 p-5">
              <SessionSignalDonut />
              <div className="flex-1 space-y-2.5">
                {[
                  { label: 'Clarity',           signal: 4, color: '#176dff', level: 'High' },
                  { label: 'Cognitive Load',    signal: 3, color: '#c97c1e', level: 'Moderate' },
                  { label: 'Emotional Pressure',signal: 3, color: '#c97c1e', level: 'Moderate' },
                  { label: 'Relief',            signal: 3, color: '#0f8a77', level: 'Moderate' },
                  { label: 'Uncertainty',       signal: 1, color: '#a0a8b8', level: 'Low' },
                ].map(({ label, signal, color, level }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="w-28 text-[11px] font-semibold text-[#344263]">{label}</span>
                    <SignalDots filled={signal} color={color} />
                    <span className="text-[11px] font-black" style={{ color }}>{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Themes Surfaced */}
          <div className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <h2 className="text-sm font-black text-[#06183a]">Themes Surfaced</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Primary themes that emerged in this session.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
              {[
                { icon: Users,       iconColor: '#6c37c6', iconBg: '#f5f0ff', label: 'Identity',           signal: 'Strong Signal',   signalColor: '#0f8a77' },
                { icon: ShieldCheck, iconColor: '#176dff', iconBg: '#eff4ff', label: 'Boundaries',         signal: 'Strong Signal',   signalColor: '#0f8a77' },
                { icon: MessageCircle, iconColor: '#0f8a77', iconBg: '#f0faf6', label: 'Communication',    signal: 'Strong Signal',   signalColor: '#0f8a77' },
                { icon: Target,      iconColor: '#6c37c6', iconBg: '#f5f0ff', label: 'Purpose & Direction',signal: 'Moderate Signal', signalColor: '#c97c1e' },
                { icon: Users,       iconColor: '#c97c1e', iconBg: '#fff8ee', label: 'Family System',      signal: 'Moderate Signal', signalColor: '#c97c1e' },
                { icon: Zap,         iconColor: '#0f8a77', iconBg: '#f0faf6', label: 'Energy & Capacity',  signal: 'Moderate Signal', signalColor: '#c97c1e' },
              ].map(({ icon: Icon, iconColor, iconBg, label, signal, signalColor }) => (
                <div key={label} className="flex flex-col gap-1.5 rounded-[10px] border border-[#ead7b9] bg-[#faf6f0] p-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: iconBg }}>
                    <Icon className="h-3.5 w-3.5" style={{ color: iconColor }} />
                  </div>
                  <p className="text-[11px] font-black text-[#06183a]">{label}</p>
                  <p className="text-[10px] font-semibold" style={{ color: signalColor }}>{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reviewable Reflections Surfaced ───────────────────────── */}
        <section className="mb-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Reviewable Reflections Surfaced</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Interpretations from this session for your review.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View all reflections <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {reflections.map(({ quote, theme, signal, ts, themeColor }) => (
              <div key={ts} className="flex w-52 shrink-0 flex-col gap-3 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]">
                <p className="flex-1 text-xs font-semibold italic leading-5 text-[#344263]">{quote}</p>
                <div className="space-y-1 border-t border-[#ead7b9] pt-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border px-2 py-0.5 text-[10px] font-black"
                      style={{ color: themeColor, borderColor: themeColor + '30', background: themeColor + '10' }}>{theme}</span>
                    <span className="text-[10px] font-semibold text-[#a0a8b8]">{ts}</span>
                  </div>
                  <p className="text-[10px] font-semibold" style={{ color: signal === 'Strong Signal' ? '#0f8a77' : '#c97c1e' }}>{signal}</p>
                </div>
              </div>
            ))}
            <button className="flex h-auto w-12 shrink-0 items-center justify-center self-stretch rounded-[14px] border border-[#ead7b9] bg-[#faf6f0] hover:bg-[#f5f0ff] transition-colors">
              <ChevronRight className="h-4 w-4 text-[#d3b98f]" />
            </button>
          </div>
        </section>

        {/* ── Transcript Evidence ────────────────────────────────────── */}
        <section className="mb-5 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Transcript Evidence</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Exact excerpts from the session transcript.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View full transcript <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="divide-y divide-[#ead7b9]">
            {transcriptRows.map(({ ts, quote, tag, tagColor }) => (
              <div key={ts} className="flex items-start gap-4 px-5 py-4 hover:bg-[#faf6f0] transition-colors">
                {/* Timestamp play button */}
                <button className="flex shrink-0 items-center gap-1.5 rounded-[6px] border border-[#e0d4f8] bg-[#f5f0ff] px-2 py-1 text-[11px] font-black text-[#6c37c6] hover:bg-[#ede8fb] transition-colors">
                  <Play className="h-2.5 w-2.5" /> {ts}
                </button>
                {/* Excerpt */}
                <p className="flex-1 text-xs font-semibold italic leading-5 text-[#344263]">{quote}</p>
                {/* Tag */}
                <span className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-black"
                  style={{ color: tagColor, borderColor: tagColor + '30', background: tagColor + '10' }}>{tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Suggested Map Updates ──────────────────────────────────── */}
        <section className="mb-5 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff8ee]">
                <Puzzle className="h-4 w-4 text-[#c97c1e]" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">Suggested Map Updates</h2>
                <p className="text-xs font-semibold text-[#6b7280]">AI-suggested updates based on this session.</p>
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
          <div className="hidden grid-cols-[2fr_130px_100px_150px_60px_80px] items-center gap-3 border-b border-[#ead7b9] bg-[#fafaf8] px-5 py-2 md:grid">
            {['Suggested Update', 'Update Type', 'Signal', 'Related Domain', 'Sources', 'Action'].map((h) => (
              <p key={h} className="text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">{h}</p>
            ))}
          </div>
          {/* Rows */}
          {mapUpdates.map((row, i) => (
            <div key={i}>
              <div className="grid grid-cols-1 items-start gap-3 border-b border-[#ead7b9] px-5 py-4 last:border-0 md:grid-cols-[2fr_130px_100px_150px_60px_80px] md:items-center">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#e0d4f8] bg-[#f5f0ff] text-[10px] font-black text-[#6c37c6]">{i + 1}</span>
                  <div>
                    <p className="text-sm font-black text-[#06183a]">{row.title}</p>
                    <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">{row.desc}</p>
                  </div>
                </div>
                <span className="w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-black"
                  style={{ color: row.typeColor, background: row.typeBg, borderColor: row.typeColor + '30' }}>
                  {row.type}
                </span>
                <div className="flex flex-col gap-0.5">
                  <SignalDots filled={row.signal} color="#c97c1e" />
                  <p className="text-[10px] font-semibold text-[#c97c1e]">{row.signalLabel}</p>
                </div>
                <p className="text-xs font-semibold text-[#344263]">{row.domain}</p>
                <p className="text-sm font-black text-[#06183a]">{row.sources}</p>
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
                  <p className="text-xs font-semibold text-[#344263]">Detailed review panel — full context and editing options go here.</p>
                </div>
              )}
            </div>
          ))}
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

      </div>

      {/* ── Right rail ──────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Session Playback */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-[#6c37c6]" />
              <p className="text-sm font-black text-[#06183a]">Session Playback</p>
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#6c37c6] py-2.5 text-sm font-black text-white hover:bg-[#5a2aae] transition-colors">
              <Play className="h-4 w-4" /> Play Recording
            </button>
            <div className="mt-2 space-y-1">
              {[
                { icon: FileText,    label: 'Open Transcript' },
                { icon: Clock,       label: 'View Timestamps' },
                { icon: NotebookPen, label: 'Add Note' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="flex w-full items-center gap-3 rounded-[8px] px-2 py-2.5 text-sm font-semibold text-[#344263] hover:bg-[#ede8fb] hover:text-[#6c37c6] transition-colors">
                  <Icon className="h-4 w-4 shrink-0 text-[#6c37c6]" /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Report Actions */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <p className="text-sm font-black text-[#06183a]">Report Actions</p>
            <div className="mt-3 space-y-1">
              {[
                { icon: Download,   label: 'Export PDF' },
                { icon: Share2,     label: 'Share Private Link' },
                { icon: GitCompare, label: 'Open in Connections & Patterns' },
                { icon: BookOpen,   label: 'View related reflections' },
                { icon: Copy,       label: 'Copy report link' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="flex w-full items-center gap-3 rounded-[8px] px-2 py-2.5 text-sm font-semibold text-[#344263] hover:bg-[#faf6f0] hover:text-[#6c37c6] transition-colors">
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
                { label: 'Report Type',     value: 'Voice Session Summary' },
                { label: 'Session Date',    value: 'May 10, 2025' },
                { label: 'Duration',        value: '62 minutes' },
                { label: 'Generated',       value: 'May 10, 2025 at 12:15 PM' },
                { label: 'Report ID',       value: 'VS-2025-05-10-01' },
                { label: 'Domains Touched', value: '6 primary domains' },
              ].map(({ label, value }) => (
                <div key={label} className="pt-2 first:pt-0">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">{label}</p>
                  <p className="text-xs font-semibold text-[#344263]">{value}</p>
                </div>
              ))}
              <div className="pt-2">
                <p className="text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">Domain Signal</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-black text-[#06183a]">High Signal</span>
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
              You&apos;re in control. Review what belongs in your Atlas.
            </p>
            <div className="my-4 flex justify-center">
              <CircularProgress value={1} total={3} />
            </div>
            <div className="space-y-2">
              {[
                { dot: '#0f8a77', label: '1', sub: 'Reviewed' },
                { dot: '#6c37c6', label: '0', sub: 'Approved' },
                { dot: '#c97c1e', label: '2', sub: 'Not reviewed' },
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
                { title: 'Identity Domain Insight',              sub: 'Updated May 14, 2025' },
                { title: 'Monthly Pattern Report',               sub: 'April 2025' },
                { title: 'Boundary Consistency Pattern Report',  sub: 'Generated May 8, 2025' },
                { title: 'Weekly Reflection Report',             sub: 'May 5 – May 11, 2025' },
              ].map(({ title, sub }, i) => (
                <button key={i} className="flex w-full flex-col gap-0.5 py-3 text-left first:pt-0 last:pb-0">
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
            <p className="mt-1.5 text-[11px] font-semibold text-[#6b7280]">How to get the most from this session.</p>
            <div className="mt-3 space-y-2">
              {['Review suggested updates', 'Explore key moments', 'Check related reflections', 'Add your own notes'].map((tip) => (
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
              <p className="text-sm font-black text-[#06183a]">This report helps you see what emerged in this session. Your review determines what becomes part of your Atlas.</p>
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
