'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Copy,
  CreditCard,
  Download,
  FileText,
  GitCompare,
  Heart,
  Leaf,
  Link2,
  LogOut,
  Map,
  MinusCircle,
  MoreHorizontal,
  Puzzle,
  RefreshCw,
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

function MetricCard({ icon: Icon, iconColor, iconBg, label, value, sub, linkLabel, compact, customContent }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  label: string; value?: string; sub: string; linkLabel?: string; compact?: boolean
  customContent?: React.ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col gap-1.5 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]" style={{ minWidth: 128 }}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <p className="text-[11px] font-semibold text-[#6b7280]">{label}</p>
      {customContent ?? (
        <p className={`font-serif font-bold leading-none ${compact ? 'text-lg' : 'text-3xl'}`} style={{ color: '#06183a' }}>{value}</p>
      )}
      <p className="text-[11px] font-semibold text-[#a0a8b8]">{sub}</p>
      {linkLabel && (
        <button className="mt-0.5 flex items-center gap-1 text-[11px] font-black text-[#c97c1e] hover:underline">
          {linkLabel} <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

// ─── Pattern movement card ────────────────────────────────────────────────────

function MovementCard({ icon: Icon, iconColor, iconBg, borderColor, label, count, sub, items }: {
  icon: React.ElementType; iconColor: string; iconBg: string; borderColor: string
  label: string; count: number; sub: string; items: string[]
}) {
  return (
    <div className="flex flex-1 flex-col rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]"
      style={{ borderTop: `3px solid ${borderColor}`, minWidth: 140 }}>
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
          <Icon className="h-4 w-4" style={{ color: iconColor }} />
        </div>
        <div>
          <p className="text-sm font-black" style={{ color: iconColor }}>{label}</p>
          <p className="text-[10px] font-semibold text-[#a0a8b8]">{sub}</p>
        </div>
        <span className="ml-auto font-serif text-2xl font-bold text-[#06183a]">{count}</span>
      </div>
      <ul className="mt-1 space-y-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-1.5 text-[11px] font-semibold text-[#6b7280]">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ background: borderColor }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Key pattern card ─────────────────────────────────────────────────────────

function PatternCard({ icon: Icon, iconColor, iconBg, label, count, filled, dotColor }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  label: string; count: number; filled: number; dotColor: string
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-[12px] border border-[#ead7b9] bg-white p-3 text-center shadow-[0_2px_6px_rgba(48,27,5,0.04)]" style={{ minWidth: 105 }}>
      <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <p className="text-[11px] font-black leading-snug text-[#06183a]">{label}</p>
      <SignalDots filled={filled} color={dotColor} />
      <p className="text-[10px] font-semibold text-[#6b7280]">{count} reflections</p>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MonthlyPatternReportPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [expandRow,  setExpandRow]  = useState<number | null>(null)

  const mapUpdates = [
    { title: 'Meaningful Work Alignment Strengthened', desc: 'Consistent alignment with core values now drives most decisions and commitments.', type: 'Strengthen',       typeColor: '#0f8a77', typeBg: '#f0faf6', signal: 5, signalLabel: 'Very High', pattern: 'Purpose & Direction',      sources: 11 },
    { title: 'Boundary Consistency Stabilized',        desc: 'Boundaries are clearer and easier to maintain across contexts.',               type: 'Strengthen',       typeColor: '#0f8a77', typeBg: '#f0faf6', signal: 4, signalLabel: 'High',      pattern: 'Identity & Boundaries',   sources: 9  },
    { title: 'Energy Recovery Rhythm Added',           desc: 'Regular recovery practices now form part of weekly structure.',               type: 'Add Pattern',      typeColor: '#6c37c6', typeBg: '#f5f0ff', signal: 4, signalLabel: 'High',      pattern: 'Energy Recovery Rhythm',  sources: 8  },
    { title: 'Deliberate Practice Loop Strengthened',  desc: 'Consistent learning and skill development are compounding.',                  type: 'Strengthen',       typeColor: '#0f8a77', typeBg: '#f0faf6', signal: 3, signalLabel: 'Medium',    pattern: 'Deliberate Practice Loop',sources: 6  },
    { title: 'Relationship Prioritization Direction',  desc: 'Clarifying who and what deserves your time and energy.',                     type: 'Update Direction', typeColor: '#176dff', typeBg: '#eff4ff', signal: 3, signalLabel: 'Medium',    pattern: 'Relationship Prioritization', sources: 5 },
  ]

  return (
    <div className="flex min-h-screen bg-[#fffaf2] pb-24">

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#6b7280]">
          <Link href="/dashboard/reports" className="hover:text-[#c97c1e] transition-colors">Reports &amp; Insights</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#d3b98f]" />
          <span className="text-[#06183a]">Monthly Pattern Report</span>
        </div>

        {/* ── Page header ──────────────────────────────────────────── */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Monthly Pattern Report</h1>
            <p className="mt-1 text-sm font-semibold text-[#6b7280]">
              April 2025 <span className="mx-1.5 text-[#d3b98f]">·</span> Generated May 1, 2025 at 8:12 AM
            </p>
            <div className="mt-2 flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
              <p className="text-xs font-semibold text-[#6b7280]">
                This report summarizes reviewed material across the month. It may suggest map updates, but{' '}
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
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-[#6c37c6]">5</span>
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
          <MetricCard icon={FileText}   iconColor="#6c37c6" iconBg="#f5f0ff"
            label="Sources Reviewed" value="138" sub="Across 8 types" linkLabel="View sources" />
          <MetricCard icon={TrendingUp} iconColor="#0f8a77" iconBg="#f0faf6"
            label="Key Patterns" value="8" sub="Strongest signals" linkLabel="View patterns" />
          <MetricCard icon={Puzzle}     iconColor="#c97c1e" iconBg="#fff8ee"
            label="Map Updates" value="5" sub="Suggested updates" linkLabel="Review updates" />
          {/* Report Signal with dots */}
          <div className="flex flex-1 flex-col gap-1.5 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]" style={{ minWidth: 148 }}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eff4ff]">
              <Target className="h-4 w-4 text-[#176dff]" />
            </div>
            <p className="text-[11px] font-semibold text-[#6b7280]">Report Signal</p>
            <p className="font-serif text-xl font-bold text-[#06183a]">Very High</p>
            <SignalDots filled={5} color="#6c37c6" />
            <p className="text-[11px] font-semibold text-[#a0a8b8]">Strong, consistent patterns</p>
          </div>
          {/* Atlas Coverage */}
          <div className="flex flex-1 flex-col gap-1.5 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]" style={{ minWidth: 128 }}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0faf6]">
              <BarChart3 className="h-4 w-4 text-[#0f8a77]" />
            </div>
            <p className="text-[11px] font-semibold text-[#6b7280]">Atlas Coverage</p>
            <p className="font-serif text-3xl font-bold text-[#0f8a77]">68%</p>
            <p className="text-[11px] font-semibold text-[#a0a8b8]">Increased 9% vs. prior 30 days</p>
          </div>
        </div>

        {/* ── Monthly Pattern Summary ─────────────────────────────────── */}
        <section className="mb-5 overflow-hidden rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] shadow-[0_4px_16px_rgba(108,55,198,0.08)]">
          <div className="flex items-center gap-3 border-b border-[#e0d4f8] bg-[#f0eafa] px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ede8fb]">
              <Sparkles className="h-5 w-5 text-[#6c37c6]" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#3b1d72]">Monthly Pattern Summary</h2>
          </div>
          <div className="flex flex-wrap gap-6 p-6">
            <div className="flex-1" style={{ minWidth: 260 }}>
              <p className="text-sm font-semibold leading-6 text-[#344263]">
                April reveals a clear pattern of intentional realignment. You strengthened boundaries,
                clarified priorities, and stabilized energy rhythms. Meaningful work and contribution
                consistently drive motivation and direction.
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  'Boundaries and priorities improved across work, time, and relationships.',
                  'Meaning and impact remained the strongest driver of motivation.',
                  'Energy recovery became more consistent and intentional.',
                  'Deliberate practice and learning created compounding momentum.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6c37c6]" />
                    <span className="text-sm font-semibold text-[#344263]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-[12px] border border-[#e0d4f8] bg-white px-5 py-4 shadow-[0_2px_8px_rgba(108,55,198,0.06)]" style={{ minWidth: 190 }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#a0a8b8]">Strongest Pattern</p>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f0ff]">
                  <Target className="h-3.5 w-3.5 text-[#6c37c6]" />
                </div>
                <p className="font-serif text-base font-bold text-[#6c37c6]">Purpose &amp; Direction</p>
              </div>
              <p className="text-xs font-semibold leading-5 text-[#6b7280]">Consistent signal across<br />31 reflections</p>
            </div>
          </div>
        </section>

        {/* ── Pattern Movement This Month ────────────────────────────── */}
        <section className="mb-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Pattern Movement This Month</h2>
              <p className="text-xs font-semibold text-[#6b7280]">How your patterns shifted, strengthened, emerged, or faded.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              How we detect movement <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            <MovementCard icon={ArrowUp}      iconColor="#0f8a77" iconBg="#f0faf6" borderColor="#0f8a77"
              label="Strengthened" count={3} sub="Clearer and stronger"
              items={['Purpose & Direction', 'Energy Recovery Rhythm', 'Deliberate Practice Loop']} />
            <MovementCard icon={RefreshCw}    iconColor="#6c37c6" iconBg="#f5f0ff" borderColor="#6c37c6"
              label="Stabilized"   count={2} sub="Holding steady"
              items={['Identity & Boundaries', 'Meaningful Work Alignment']} />
            <MovementCard icon={Sparkles}     iconColor="#176dff" iconBg="#eff4ff" borderColor="#176dff"
              label="Emerging"    count={1} sub="New or increasing"
              items={['Energy Rhythm']} />
            <MovementCard icon={ArrowDown}    iconColor="#c97c1e" iconBg="#fff8ee" borderColor="#c97c1e"
              label="Faded"       count={1} sub="Less frequent"
              items={['Overextension Pattern']} />
            <MovementCard icon={MinusCircle}  iconColor="#6b7280" iconBg="#f3f4f6" borderColor="#9ca3af"
              label="Needs Review" count={1} sub="Mixed or unclear"
              items={['Relationship Prioritization']} />
          </div>
        </section>

        {/* ── Key Patterns This Month ────────────────────────────────── */}
        <section className="mb-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Key Patterns This Month</h2>
              <p className="text-xs font-semibold text-[#6b7280]">The most significant patterns across April.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View all patterns <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            <PatternCard icon={Target}     iconColor="#6c37c6" iconBg="#f5f0ff" label="Purpose & Direction"        count={31} filled={5} dotColor="#6c37c6" />
            <PatternCard icon={Users}      iconColor="#6c37c6" iconBg="#f5f0ff" label="Identity & Boundaries"      count={28} filled={5} dotColor="#6c37c6" />
            <PatternCard icon={Zap}        iconColor="#c97c1e" iconBg="#fff8ee" label="Energy Recovery Rhythm"     count={24} filled={4} dotColor="#c97c1e" />
            <PatternCard icon={Star}       iconColor="#0f8a77" iconBg="#f0faf6" label="Meaningful Work Alignment"  count={20} filled={4} dotColor="#0f8a77" />
            <PatternCard icon={Link2}      iconColor="#176dff" iconBg="#eff4ff" label="Relationship Prioritization" count={16} filled={3} dotColor="#176dff" />
            <PatternCard icon={TrendingUp} iconColor="#0f8a77" iconBg="#f0faf6" label="Deliberate Practice Loop"   count={14} filled={3} dotColor="#0f8a77" />
            <PatternCard icon={Heart}      iconColor="#c97c1e" iconBg="#fff8ee" label="Health & Wellbeing"         count={12} filled={3} dotColor="#c97c1e" />
          </div>
        </section>

        {/* ── Month Arc ──────────────────────────────────────────────── */}
        <section className="mb-5 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Month Arc: The Flow of Your Patterns</h2>
              <p className="text-xs font-semibold text-[#6b7280]">The flow of your patterns across April.</p>
            </div>
            <Link href="/timeline" className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View in Timeline &amp; Comparisons <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto p-5">
            <div className="flex items-stretch gap-3" style={{ minWidth: 620 }}>
              {[
                { icon: Users,      iconColor: '#c04060', iconBg: '#fff0f3', week: 'Week 1', range: 'Apr 1 – Apr 7',   title: 'Boundary strain recognized',                       body: 'High cognitive and schedule overload led to clearer boundary needs.' },
                { icon: Target,     iconColor: '#6c37c6', iconBg: '#f5f0ff', week: 'Week 2', range: 'Apr 8 – Apr 14',  title: 'Value clarification and priority realignment',      body: 'Core values surfaced, commitments were evaluated, and priorities realigned.' },
                { icon: Zap,        iconColor: '#0f8a77', iconBg: '#f0faf6', week: 'Week 3', range: 'Apr 15 – Apr 21', title: 'Energy stabilization and recovery practices take hold', body: 'Recovery rhythms were implemented; energy became more consistent.' },
                { icon: Star,       iconColor: '#c97c1e', iconBg: '#fff8ee', week: 'Week 4', range: 'Apr 22 – Apr 30', title: 'Meaningful work alignment and momentum',            body: 'Focus aligned with purpose and contribution increased.' },
              ].map(({ icon: Icon, iconColor, iconBg, week, range, title, body }, i, arr) => (
                <div key={week} className="flex items-center gap-3">
                  <div className="flex flex-1 flex-col gap-2 rounded-[12px] border border-[#ead7b9] bg-[#faf6f0] p-4" style={{ minWidth: 145 }}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: iconBg }}>
                      <Icon className="h-4 w-4" style={{ color: iconColor }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">{week}</p>
                      <p className="text-[11px] font-semibold text-[#6b7280]">{range}</p>
                    </div>
                    <p className="text-xs font-black leading-snug text-[#06183a]">{title}</p>
                    <p className="text-[11px] font-semibold leading-4 text-[#6b7280]">{body}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#d3b98f]" />
                  )}
                </div>
              ))}
            </div>
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
                <p className="text-xs font-semibold text-[#6b7280]">AI-suggested updates based on this month&apos;s reviewed material.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[#f0dca0] bg-[#fffbee] px-3 py-1 text-xs font-black text-[#7a5800]">5 updates to review</span>
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
          {/* Column headers (desktop) */}
          <div className="hidden grid-cols-[2fr_110px_110px_160px_60px_80px] items-center gap-3 border-b border-[#ead7b9] bg-[#fafaf8] px-5 py-2 md:grid">
            {['Suggested Update', 'Update Type', 'Signal', 'Related Pattern', 'Sources', 'Action'].map((h) => (
              <p key={h} className="text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">{h}</p>
            ))}
          </div>
          {/* Rows */}
          {mapUpdates.map((row, i) => (
            <div key={i}>
              <div className="grid grid-cols-1 items-start gap-3 border-b border-[#ead7b9] px-5 py-4 last:border-0 md:grid-cols-[2fr_110px_110px_160px_60px_80px] md:items-center">
                {/* Update */}
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#e0d4f8] bg-[#f5f0ff] text-[10px] font-black text-[#6c37c6]">{i + 1}</span>
                  <div>
                    <p className="text-sm font-black text-[#06183a]">{row.title}</p>
                    <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">{row.desc}</p>
                  </div>
                </div>
                {/* Type */}
                <span className="w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-black"
                  style={{ color: row.typeColor, background: row.typeBg, borderColor: row.typeColor + '30' }}>
                  {row.type}
                </span>
                {/* Signal */}
                <div className="flex flex-col gap-0.5">
                  <SignalDots filled={row.signal} color="#c97c1e" />
                  <p className="text-[10px] font-semibold text-[#c97c1e]">{row.signalLabel}</p>
                </div>
                {/* Pattern */}
                <p className="text-xs font-semibold text-[#344263]">{row.pattern}</p>
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
                  <p className="text-xs font-semibold text-[#344263]">Detailed review panel — full context and editing options go here.</p>
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

        {/* ── Evidence: Source Support + Highlights + Pattern Connections ── */}
        <section className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Source Support */}
          <div className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3">
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
                    { label: 'Voice Sessions',     n: 28, pct: '20%' },
                    { label: 'Text Chat Sessions', n: 35, pct: '25%' },
                    { label: 'Journals',           n: 32, pct: '23%' },
                    { label: 'Artifacts',          n: 16, pct: '11%' },
                    { label: 'Lens Scans',         n: 9,  pct: '6%' },
                    { label: 'Transcripts',        n: 18, pct: '13%' },
                  ].map(({ label, n, pct }) => (
                    <tr key={label} className="hover:bg-[#faf6f0] transition-colors">
                      <td className="py-2 font-semibold text-[#344263]">{label}</td>
                      <td className="py-2 text-center font-black text-[#06183a]">{n}</td>
                      <td className="py-2 text-right font-semibold text-[#a0a8b8]">{pct}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[#ead7b9]">
                    <td className="py-2 font-black text-[#06183a]">Total</td>
                    <td className="py-2 text-center font-black text-[#06183a]">138</td>
                    <td className="py-2 text-right font-black text-[#06183a]">100%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-[10px] font-semibold text-[#a0a8b8]">Only reviewed material contributes to this report.</p>
            </div>
          </div>

          {/* Reflection Highlights */}
          <div className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3">
              <h2 className="text-sm font-black text-[#06183a]">Reviewed Reflection Highlights</h2>
              <button className="flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
                View all reflections <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="divide-y divide-[#ead7b9]">
              <p className="px-4 py-2 text-[11px] font-semibold text-[#a0a8b8]">Excerpts from your reviewed reflections.</p>
              {[
                { quote: "I'm choosing work that feels aligned, even if it's slower. It matters more that it's meaningful.", date: 'Apr 12', source: 'Journal',       tag: 'Purpose',    tagColor: '#6c37c6' },
                { quote: "I've gotten much better at saying no without guilt. My time is valuable and limited.",             date: 'Apr 18', source: 'Voice Session', tag: 'Boundaries', tagColor: '#176dff' },
                { quote: "Rest days aren't lazy days. They're the reason I can do my best work on the days that matter.",    date: 'Apr 26', source: 'Text Chat',    tag: 'Energy',     tagColor: '#c97c1e' },
              ].map(({ quote, date, source, tag, tagColor }) => (
                <div key={date} className="flex items-start gap-3 px-4 py-3">
                  <ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
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

          {/* Pattern Connections */}
          <div className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3">
              <h2 className="text-sm font-black text-[#06183a]">Pattern Connections</h2>
              <Link href="/patterns" className="flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
                Explore <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="p-4">
              <p className="mb-3 text-[11px] font-semibold text-[#a0a8b8]">How this report connects across your Atlas.</p>
              <div className="space-y-0 divide-y divide-[#ead7b9]">
                {[
                  { icon: Target,     iconColor: '#6c37c6', iconBg: '#f5f0ff', label: 'Purpose & Direction',     sub: 'Strengthened through alignment' },
                  { icon: Zap,        iconColor: '#c97c1e', iconBg: '#fff8ee', label: 'Energy Recovery Rhythm',   sub: 'Stabilized through boundaries' },
                  { icon: Users,      iconColor: '#176dff', iconBg: '#eff4ff', label: 'Identity & Boundaries',    sub: 'Consistent across contexts' },
                  { icon: TrendingUp, iconColor: '#0f8a77', iconBg: '#f0faf6', label: 'Deliberate Practice Loop', sub: 'Momentum through consistency' },
                ].map(({ icon: Icon, iconColor, iconBg, label, sub }) => (
                  <div key={label} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: iconBg }}>
                      <Icon className="h-4 w-4" style={{ color: iconColor }} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#06183a]">{label}</p>
                      <p className="text-[10px] font-semibold text-[#6b7280]">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                { icon: Download,   label: 'Export PDF' },
                { icon: Share2,     label: 'Share (Private Link)' },
                { icon: GitCompare, label: 'Open in Connections & Patterns' },
                { icon: BookOpen,   label: 'View related reflections' },
                { icon: Copy,       label: 'Copy report link' },
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
                { label: 'Report Type',  value: 'Monthly Pattern' },
                { label: 'Date Range',   value: 'April 1 – April 30, 2025' },
                { label: 'Generated',    value: 'May 1, 2025 at 8:12 AM' },
                { label: 'Report ID',    value: 'MP-2025-04-01-01' },
              ].map(({ label, value }) => (
                <div key={label} className="pt-2 first:pt-0">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">{label}</p>
                  <p className="text-xs font-semibold text-[#344263]">{value}</p>
                </div>
              ))}
              <div className="pt-2">
                <p className="text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">Report Signal</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-black text-[#06183a]">Very High</span>
                  <SignalDots filled={5} color="#6c37c6" />
                </div>
              </div>
            </div>
          </div>

          {/* Pattern Movement (mirror) */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#6c37c6]" />
              <p className="text-sm font-black text-[#06183a]">Pattern Movement</p>
            </div>
            <div className="mt-3 space-y-2">
              {[
                { icon: ArrowUp,     color: '#0f8a77', label: 'Strengthened', count: 3 },
                { icon: RefreshCw,   color: '#6c37c6', label: 'Stabilized',   count: 2 },
                { icon: Sparkles,    color: '#176dff', label: 'Emerging',     count: 1 },
                { icon: ArrowDown,   color: '#c97c1e', label: 'Faded',        count: 1 },
                { icon: MinusCircle, color: '#6b7280', label: 'Needs Review', count: 1 },
              ].map(({ icon: Icon, color, label, count }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                    <span className="text-xs font-semibold text-[#344263]">{label}</span>
                  </div>
                  <span className="font-black text-sm text-[#06183a]">{count}</span>
                </div>
              ))}
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
              <CircularProgress value={2} total={5} />
            </div>
            <div className="space-y-2">
              {[
                { dot: '#0f8a77', label: '2', sub: 'Reviewed' },
                { dot: '#6c37c6', label: '0', sub: 'Approved' },
                { dot: '#c97c1e', label: '3', sub: 'Not reviewed' },
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
                { title: 'Weekly Reflection Report',  sub: 'Apr 28 – May 4, 2025' },
                { title: 'Weekly Reflection Report',  sub: 'Apr 21 – Apr 27, 2025' },
                { title: 'Daily Reflection Report',   sub: 'Apr 30, 2025' },
                { title: 'Monthly Pattern Report',    sub: 'March 2025' },
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
