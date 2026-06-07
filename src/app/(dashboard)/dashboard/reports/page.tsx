'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  CircleHelp,
  Clock,
  CreditCard,
  Eye,
  FileBarChart2,
  FileText,
  GitCompare,
  Link2,
  LogOut,
  Map,
  MoreHorizontal,
  Plus,
  Puzzle,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'generated' | 'create' | 'scheduled' | 'archived'

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',       href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',   href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',     href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',     href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts', href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, iconColor, iconBg, label, value, caption, valueColor, compact, linkLabel, linkHref }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  label: string; value: string; caption: string
  valueColor?: string; compact?: boolean; linkLabel?: string; linkHref?: string
}) {
  return (
    <div className="flex min-w-[155px] flex-1 flex-col gap-1.5 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]">
      <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <p className="text-[11px] font-semibold text-[#6b7280]">{label}</p>
      <p className={`font-serif font-bold ${compact ? 'text-base leading-tight' : 'text-3xl leading-none'}`}
        style={{ color: valueColor ?? '#06183a' }}>{value}</p>
      <p className="text-[11px] font-semibold leading-4 text-[#a0a8b8]">{caption}</p>
      {linkLabel && linkHref && (
        <Link href={linkHref} className="mt-0.5 flex items-center gap-1 text-[11px] font-black text-[#c97c1e] hover:underline">
          {linkLabel} <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}

// ─── Signal badge ─────────────────────────────────────────────────────────────

function SignalBadge({ level }: { level: 'Strong' | 'High' | 'Medium' | 'Low' | 'AI Suggested' }) {
  const config: Record<string, { color: string; bg: string; border: string; dot: string }> = {
    Strong:       { color: '#0f8a77', bg: '#f0faf6', border: '#b6e8d9', dot: '#0f8a77' },
    High:         { color: '#0f8a77', bg: '#f0faf6', border: '#b6e8d9', dot: '#0f8a77' },
    Medium:       { color: '#c97c1e', bg: '#fff8ee', border: '#ead7b9', dot: '#c97c1e' },
    Low:          { color: '#176dff', bg: '#eff4ff', border: '#c5d8ff', dot: '#176dff' },
    'AI Suggested': { color: '#6c37c6', bg: '#f5f0ff', border: '#e0d4f8', dot: '#6c37c6' },
  }
  const c = config[level] ?? config['Strong']
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-black"
      style={{ color: c.color, background: c.bg, borderColor: c.border }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.dot }} />
      {level === 'AI Suggested' ? 'AI Suggested' : `${level} signal`}
    </span>
  )
}

// ─── Map update strip ─────────────────────────────────────────────────────────

function MapUpdateStrip({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b border-t border-[#f0dca0] bg-[#fffbee] px-5 py-2 text-[11px] font-semibold text-[#7a5800]">
      <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#c97c1e]" />
      Contains {count} suggested map {count === 1 ? 'update' : 'updates'}
      <span className="text-[#d3b98f]">·</span>
      <span className="font-black">Review required before anything enters your Atlas</span>
    </div>
  )
}

// ─── Includes box ─────────────────────────────────────────────────────────────

function IncludesBox({ items }: { items: string[] }) {
  return (
    <div className="rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2.5">
      <p className="mb-1.5 text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">Includes</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-1.5 text-xs font-semibold text-[#344263]">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6c37c6]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Theme/pattern preview box ────────────────────────────────────────────────

function PreviewBox({ topLabel, value, subLabel }: { topLabel: string; value: string; subLabel: string }) {
  return (
    <div className="rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2.5">
      <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">{topLabel}</p>
      <p className="text-sm font-black text-[#6c37c6] leading-snug">{value}</p>
      <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{subLabel}</p>
    </div>
  )
}

// ─── Report card ──────────────────────────────────────────────────────────────

function ReportCard({
  icon: Icon, iconColor, iconBg, title, isNew = false,
  description, meta, signal, mapUpdates,
  includes, previewLabel, previewValue, previewSub,
  borderColor, href,
}: {
  icon: React.ElementType; iconColor: string; iconBg: string
  title: string; isNew?: boolean; description: string
  meta: { label: string; value: string }[]
  signal: 'Strong' | 'High' | 'Medium' | 'Low' | 'AI Suggested'
  mapUpdates: number
  includes: string[]
  previewLabel: string; previewValue: string; previewSub: string
  borderColor: string; href?: string
}) {
  return (
    <article className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]"
      style={{ borderLeft: `4px solid ${borderColor}` }}>
      {/* Card header */}
      <div className="flex items-start gap-3 p-5 pb-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]" style={{ background: iconBg }}>
          <Icon className="h-5 w-5" style={{ color: iconColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {href ? (
              <Link href={href} className="font-serif text-lg font-bold leading-snug text-[#06183a] hover:text-[#6c37c6] transition-colors">{title}</Link>
            ) : (
              <h2 className="font-serif text-lg font-bold leading-snug text-[#06183a]">{title}</h2>
            )}
            {isNew && (
              <span className="rounded-full border border-[#e0d4f8] bg-[#f5f0ff] px-2 py-0.5 text-[10px] font-black text-[#6c37c6]">NEW</span>
            )}
          </div>
          <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">{description}</p>
        </div>
        <button className="shrink-0 text-[#a0a8b8] hover:text-[#344263] transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 px-5 pb-3">
        {meta.map(({ label, value }) => (
          <span key={label} className="flex items-center gap-1 text-[11px] font-semibold text-[#a0a8b8]">
            <span className="font-black text-[#344263]">{value}</span>
            {label && <span className="text-[#c8bfb0]">{label}</span>}
          </span>
        ))}
        <SignalBadge level={signal} />
      </div>

      {/* Map update strip */}
      <MapUpdateStrip count={mapUpdates} />

      {/* Body: includes + preview */}
      <div className="grid grid-cols-2 gap-3 p-5">
        <IncludesBox items={includes} />
        <PreviewBox topLabel={previewLabel} value={previewValue} subLabel={previewSub} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-[#ead7b9] bg-[#faf6f0] px-5 py-3">
        {href ? (
          <Link href={href}
            className="flex items-center gap-2 rounded-[8px] bg-[#6c37c6] px-4 py-2 text-sm font-black text-white hover:bg-[#5a2aae] transition-colors">
            Open Report
          </Link>
        ) : (
          <button className="flex items-center gap-2 rounded-[8px] bg-[#6c37c6] px-4 py-2 text-sm font-black text-white hover:bg-[#5a2aae] transition-colors">
            Open Report
          </button>
        )}
        <button className="flex items-center gap-1.5 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-sm font-semibold text-[#344263] hover:bg-white transition-colors">
          <Eye className="h-3.5 w-3.5" /> Preview
        </button>
      </div>
    </article>
  )
}

// ─── Available-to-create card ─────────────────────────────────────────────────

function AvailableCard({ icon: Icon, iconColor, iconBg, title, description }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  title: string; description: string
}) {
  return (
    <button className="flex items-center gap-3 rounded-[12px] border border-[#ead7b9] bg-white p-3.5 text-left hover:border-[#e0d4f8] hover:bg-[#f8f5ff] transition-all group">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-black text-[#06183a] group-hover:text-[#6c37c6] transition-colors">{title}</p>
        <p className="text-[11px] font-semibold text-[#6b7280]">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-[#d3b98f] group-hover:text-[#6c37c6] transition-colors" />
    </button>
  )
}

// ─── Bar row (right rail) ─────────────────────────────────────────────────────

function BarRow({ label, value, max, color = '#6c37c6' }: { label: string; value: number; max: number; color?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold text-[#344263]">
        <span className="truncate pr-2">{label}</span>
        <span className="shrink-0 font-black">{value}</span>
      </div>
      <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-[#ead7b9]">
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [activeTab,  setActiveTab]  = useState<Tab>('generated')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'generated', label: 'Generated for You' },
    { key: 'create',    label: 'Available to Create' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'archived',  label: 'Archived' },
  ]

  return (
    <div className="flex min-h-screen bg-[#fffaf2] pb-20">

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Page header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Reports &amp; Insights</h1>
            <p className="mt-1 text-sm font-semibold text-[#344263]">
              Synthesis from your reviewed sources and reflections.
            </p>
            <div className="mt-2 flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
              <p className="text-xs font-semibold text-[#6b7280]">
                Reports summarize reviewed material. They may suggest map updates, but they{' '}
                <span className="font-black text-[#c04060]">do not change your Atlas without approval.</span>
              </p>
            </div>
          </div>
          {/* Header actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
              <Plus className="h-4 w-4" /> New Custom Report
            </button>
            <button className="flex items-center gap-2 rounded-[10px] bg-[#6c37c6] px-4 py-2 text-sm font-black text-white shadow-[0_4px_12px_rgba(108,55,198,0.3)] hover:bg-[#5a2aae] transition-colors">
              <Sparkles className="h-4 w-4" />
              Review Reports
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-[#6c37c6]">6</span>
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
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
          <StatCard icon={FileBarChart2} iconColor="#6c37c6" iconBg="#f5f0ff"
            label="Reports Ready"    value="6"  caption="New or updated reports ready to explore."
            linkLabel="View all" linkHref="#" />
          <StatCard icon={TrendingUp} iconColor="#0f8a77" iconBg="#f0faf6"
            label="New Insights Surfaced" value="27" caption="Unique insights surfaced in the last 14 days."
            linkLabel="View insights" linkHref="#" />
          <StatCard icon={Puzzle} iconColor="#c97c1e" iconBg="#fff8ee"
            label="Map Updates to Review" value="9" caption="Reports with suggested updates to your Atlas."
            linkLabel="Review updates" linkHref="#" />
          <StatCard icon={Star} iconColor="#176dff" iconBg="#eff4ff"
            label="Strongest Report Theme" value="Identity & Boundaries" valueColor="#176dff"
            caption="Most explored across your recent reports." compact
            linkLabel="See theme report" linkHref="#" />
          <StatCard icon={BarChart3} iconColor="#0f8a77" iconBg="#f0faf6"
            label="Atlas Coverage" value="62%" valueColor="#0f8a77"
            caption="Of your map now has strong or usable signal."
            linkLabel="View coverage" linkHref="#" />
        </div>

        {/* ── Tabs + filters ────────────────────────────────────────────── */}
        <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-[#ead7b9]">
          <div className="flex flex-1 overflow-x-auto">
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
          <div className="flex shrink-0 items-center gap-2 pb-1">
            <div className="relative">
              <select className="appearance-none rounded-full border border-[#ead7b9] bg-white py-1.5 pl-3 pr-7 text-xs font-black text-[#344263] focus:outline-none focus:border-[#6c37c6]">
                <option>All Types</option>
                <option>Weekly</option>
                <option>Domain Insight</option>
                <option>Pattern</option>
                <option>Session Summary</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-2 h-3.5 w-3.5 text-[#6b7280]" />
            </div>
            <div className="relative">
              <select className="appearance-none rounded-full border border-[#ead7b9] bg-white py-1.5 pl-3 pr-7 text-xs font-black text-[#344263] focus:outline-none focus:border-[#6c37c6]">
                <option>Most Recent</option>
                <option>Oldest First</option>
                <option>Most Reflections</option>
                <option>Strongest Signal</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-2 h-3.5 w-3.5 text-[#6b7280]" />
            </div>
          </div>
        </div>

        {/* ── Report card grid ──────────────────────────────────────────── */}
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">

          <ReportCard
            icon={FileText}    iconColor="#6c37c6" iconBg="#f5f0ff"
            title="Weekly Reflection Report" isNew
            description="Your week in review: key reflections, emerging themes, repeating patterns, and shifts."
            meta={[
              { label: '',               value: 'May 12 – May 18, 2025' },
              { label: 'reflections',    value: '24' },
              { label: 'sources',        value: '8' },
            ]}
            signal="Strong"  mapUpdates={4}
            includes={['3 repeated themes', '4 suggested map updates', '1 unresolved signal']}
            previewLabel="Strongest theme" previewValue="Identity & Boundaries" previewSub="Seen in 8 reflections"
            borderColor="#6c37c6"
            href="/dashboard/reports/weekly-reflection-report"
          />

          <ReportCard
            icon={Star}        iconColor="#176dff" iconBg="#eff4ff"
            title="Identity Domain Insight"
            description="A deep dive into your Identity domain: core beliefs, roles, needs, and internal narratives."
            meta={[
              { label: '',            value: 'Generated May 14, 2025' },
              { label: 'reflections', value: '18' },
              { label: 'sources',     value: '6' },
            ]}
            signal="High"  mapUpdates={3}
            includes={['Core beliefs summary', '3 key patterns', '2 growth edges']}
            previewLabel="Top pattern" previewValue="Translator / Bridge Role" previewSub="Seen in 7 reflections"
            borderColor="#176dff"
            href="/dashboard/reports/identity-domain-insight"
          />

          <ReportCard
            icon={FileBarChart2} iconColor="#0f8a77" iconBg="#f0faf6"
            title="Voice Session Summary"
            description="Synthesis of your May 10, 2025 voice session. Key insights, emotions, and patterns extracted."
            meta={[
              { label: '',           value: 'May 10, 2025' },
              { label: 'min',        value: '62' },
            ]}
            signal="AI Suggested"  mapUpdates={2}
            includes={['Emotional tone overview', '5 key insights', '2 pattern connections']}
            previewLabel="Dominant theme" previewValue="Clarity Through Expression" previewSub="Seen in this session"
            borderColor="#0f8a77"
            href="/dashboard/reports/voice-session-summary"
          />

          <ReportCard
            icon={TrendingUp}  iconColor="#c97c1e" iconBg="#fff8ee"
            title="People Pleasing Pattern Report"
            description="A focused look at the people pleasing pattern across your relationships and family system."
            meta={[
              { label: '',            value: 'Generated May 8, 2025' },
              { label: 'reflections', value: '12' },
              { label: 'sources',     value: '5' },
            ]}
            signal="Strong"  mapUpdates={2}
            includes={['Pattern definition', '4 supporting behaviors', 'Impact across domains']}
            previewLabel="Pattern strength" previewValue="High" previewSub="Seen across 6 domains"
            borderColor="#c97c1e"
            href="/dashboard/reports/people-pleasing-pattern-report"
          />

          <ReportCard
            icon={BarChart3}   iconColor="#344263" iconBg="#f3f4f6"
            title="Whole-Person Atlas Progress"
            description="Where your map is strong, where it is emerging, and where more signal is needed."
            meta={[
              { label: '',        value: 'Generated May 6, 2025' },
              { label: 'domains', value: '24' },
              { label: 'sources', value: '145' },
            ]}
            signal="Medium"  mapUpdates={6}
            includes={['Atlas coverage breakdown', 'Top 5 strong domains', 'Top 5 growth domains']}
            previewLabel="Overall signal" previewValue="Medium" previewSub="Steady growth"
            borderColor="#d4a017"
            href="/dashboard/reports/whole-person-atlas-progress"
          />

          <ReportCard
            icon={Clock}       iconColor="#6c37c6" iconBg="#f5f0ff"
            title="Quarterly Growth Report"
            description="Your growth over the last 90 days across key domains, patterns, and life areas."
            meta={[
              { label: '',            value: 'Q1 2025 · Jan – Mar' },
              { label: 'reflections', value: '91' },
              { label: 'sources',     value: '36' },
            ]}
            signal="Strong"  mapUpdates={5}
            includes={['Growth over time', 'Key shifts and drivers', "What's emerging next"]}
            previewLabel="Growth trend" previewValue="Upward" previewSub="Strong in 7 domains"
            borderColor="#6c37c6"
            href="/dashboard/reports/quarterly-growth-report"
          />

        </div>

        {/* ── Available to Create ───────────────────────────────────────── */}
        <section className="mb-6">
          <h2 className="mb-3 text-base font-black text-[#06183a]">Available to Create</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <AvailableCard icon={Star}         iconColor="#176dff" iconBg="#eff4ff" title="Domain Insight Report"   description="Deep dive into any Self-Map domain." />
            <AvailableCard icon={FileText}      iconColor="#6c37c6" iconBg="#f5f0ff" title="Source Summary Report"   description="Synthesis from a specific source or session." />
            <AvailableCard icon={TrendingUp}    iconColor="#c97c1e" iconBg="#fff8ee" title="Pattern Report"          description="Explore a recurring pattern in depth." />
            <AvailableCard icon={Clock}         iconColor="#0f8a77" iconBg="#f0faf6" title="Timeline Report"         description="See how themes and insights evolve over time." />
            <AvailableCard icon={GitCompare}    iconColor="#344263" iconBg="#f3f4f6" title="Compare Report"          description="Compare domains, periods, or patterns." />
            <AvailableCard icon={Sparkles}      iconColor="#6c37c6" iconBg="#f5f0ff" title="Custom Report"           description="Build a report tailored to your focus." />
          </div>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Create a Report */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <FileBarChart2 className="h-4 w-4 text-[#6c37c6]" />
              <p className="text-sm font-black text-[#06183a]">Create a Report</p>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Build a report from the exact sources, domains, or time periods you choose.
            </p>
            <button className="mt-3 w-full rounded-[8px] bg-[#6c37c6] py-2 text-xs font-black text-white hover:bg-[#5a2aae] transition-colors">
              Create Custom Report
            </button>
          </div>

          {/* Next Best Report */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#6c37c6]" />
              <p className="text-sm font-black text-[#06183a]">Next Best Report to Review</p>
            </div>
            <p className="mt-2 text-sm font-black text-[#06183a]">Identity Domain Insight</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-[#b6e8d9] bg-[#f0faf6] px-2 py-0.5 text-[10px] font-black text-[#0f8a77]">High signal</span>
              <span className="rounded-full border border-[#e0d4f8] bg-[#f5f0ff] px-2 py-0.5 text-[10px] font-black text-[#6c37c6]">3 suggested updates</span>
              <span className="rounded-full border border-[#ead7b9] bg-[#faf6f0] px-2 py-0.5 text-[10px] font-black text-[#6b7280]">6 sources</span>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#6b7280]">
              Deep patterns in your Identity domain are ready to explore.
            </p>
            <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-[8px] border border-[#e0d4f8] bg-[#f5f0ff] py-2 text-xs font-black text-[#6c37c6] hover:bg-[#ede8fb] transition-colors">
              Open Report <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Report Activity */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-[#06183a]">Report Activity</p>
              <p className="text-[11px] font-semibold text-[#a0a8b8]">Last 30 days</p>
            </div>
            <div className="mt-3 space-y-2.5">
              <BarRow label="Reports Generated" value={18} max={27} />
              <BarRow label="Reports Opened"    value={27} max={27} />
              <BarRow label="Insights Exported" value={6}  max={27} color="#0f8a77" />
              <BarRow label="Times Shared"      value={2}  max={27} color="#c97c1e" />
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View All Activity <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Strongest Themes */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-[#c97c1e]" />
                <p className="text-sm font-black text-[#06183a]">Strongest Themes</p>
              </div>
              <p className="text-[11px] font-semibold text-[#a0a8b8]">30 days</p>
            </div>
            <div className="mt-3 space-y-2.5">
              <BarRow label="Identity & Boundaries"    value={18} max={18} />
              <BarRow label="Relationships"            value={14} max={18} />
              <BarRow label="Translator / Bridge Role" value={11} max={18} />
              <BarRow label="Awareness & Insight"      value={8}  max={18} />
              <BarRow label="Purpose & Direction"      value={6}  max={18} />
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#6c37c6] hover:underline">
              View All Themes <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Recent Map Updates */}
          <div className="rounded-[14px] border border-[#f0dca0] bg-[#fffbee] p-4 shadow-[0_4px_12px_rgba(201,124,30,0.06)]">
            <div className="flex items-center gap-2">
              <Puzzle className="h-4 w-4 text-[#c97c1e]" />
              <p className="text-sm font-black text-[#06183a]">Recent Map Updates Suggested</p>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              9 updates across 4 reports await your review.
            </p>
            <button className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Review Updates <ArrowRight className="h-3 w-3" />
            </button>
          </div>

        </div>
      </aside>

      {/* ── Bottom review banner ─────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 md:ml-64">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#b6e8d9] bg-[#f2faf6]/96 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#0f8a77]" />
            <div>
              <p className="text-sm font-black text-[#0a5c4e]">Your map grows through reviewed meaning.</p>
              <p className="text-xs font-semibold text-[#1a6b5a]">
                Reports turn your reviewed reflections and sources into clarity you can use.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/reflections"
              className="flex items-center gap-2 rounded-[8px] border border-[#0f8a77] bg-white px-4 py-2 text-sm font-black text-[#0f8a77] hover:bg-[#f0faf6] transition-colors">
              Go to Reflections <ArrowRight className="h-4 w-4" />
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
