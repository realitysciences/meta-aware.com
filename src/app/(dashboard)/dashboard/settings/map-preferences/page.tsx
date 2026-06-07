'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Brain,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock,
  CreditCard,
  Flag,
  Grid3X3,
  Heart,
  History,
  Layers3,
  Lightbulb,
  Link2,
  LogOut,
  Map,
  MapPin,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  ZoomIn,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type MapView      = 'structured' | 'focus' | 'timeline'
type DomainVis    = 'all' | 'selected' | 'hidden'
type DetailLevel  = 0 | 1 | 2 | 3
type InsightDens  = 0 | 1 | 2 | 3
type GrowthStyle  = 'organic' | 'guided' | 'intentional'
type StartPoint   = 'whole-atlas' | 'current-focus' | 'suggested' | 'recent'
type HistoryTrack = 'important' | 'all' | 'minimal'

type FocusKey = 'strengths' | 'growth' | 'goals' | 'values' | 'insights' | 'relationships'

const DEFAULTS = {
  mapView:  'structured'   as MapView,
  domainVis:'all'          as DomainVis,
  focus:    new Set<FocusKey>(['strengths','growth','goals','values','insights','relationships']),
  detail:   1              as DetailLevel,
  density:  1              as InsightDens,
  growth:   'organic'      as GrowthStyle,
  start:    'whole-atlas'  as StartPoint,
  history:  'important'    as HistoryTrack,
}

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: Users },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Shared: Option card ──────────────────────────────────────────────────────

function OptionCard<T extends string>({
  value, selected, label, desc, icon: Icon, iconColor, iconBg, onChange,
}: {
  value: T; selected: boolean; label: string; desc: string
  icon?: React.ElementType; iconColor?: string; iconBg?: string
  onChange: (v: T) => void
}) {
  return (
    <button
      onClick={() => onChange(value)}
      className={`relative flex flex-1 flex-col items-start gap-1.5 rounded-[12px] border p-3.5 text-left transition-all ${
        selected
          ? 'border-[#6c37c6] bg-[#f5f0ff] shadow-[0_0_0_1px_#6c37c6]'
          : 'border-[#ead7b9] bg-white hover:border-[#c4aaee] hover:bg-[#faf5ff]'
      }`}
    >
      {selected && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#6c37c6]">
          <BadgeCheck className="h-3.5 w-3.5 text-white" />
        </span>
      )}
      {Icon && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg ?? '#f5f0ff' }}>
          <Icon className="h-4 w-4" style={{ color: iconColor ?? '#6c37c6' }} />
        </div>
      )}
      <p className={`text-sm font-black ${selected ? 'text-[#6c37c6]' : 'text-[#06183a]'}`}>{label}</p>
      <p className="text-[11px] font-semibold leading-4 text-[#6b7280]">{desc}</p>
    </button>
  )
}

// ─── Shared: Step slider ─────────────────────────────────────────────────────

function StepSlider<T extends number>({
  steps, value, onChange,
}: {
  steps: { label: string; desc: string }[]
  value: T
  onChange: (v: T) => void
}) {
  const max = steps.length - 1
  return (
    <div className="px-2">
      <div className="relative h-1.5 rounded-full bg-[#e5e7eb]">
        <div className="absolute left-0 top-0 h-full rounded-full bg-[#6c37c6] transition-all" style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <div className="absolute top-0 flex w-full -translate-y-[3px] items-center justify-between px-2">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i as T)}
            className={`h-4 w-4 rounded-full border-2 transition-all ${
              value === i ? 'border-[#6c37c6] bg-[#6c37c6] scale-110'
              : value > i ? 'border-[#6c37c6] bg-white'
              : 'border-[#d1d5db] bg-white'
            }`}
            aria-label={steps[i].label}
          />
        ))}
      </div>
      <div className="mt-5 flex justify-between">
        {steps.map((s, i) => (
          <button key={i} onClick={() => onChange(i as T)} className="flex w-1/4 flex-col items-center gap-0.5 text-center">
            <p className={`text-xs font-black transition-colors ${value === i ? 'text-[#6c37c6]' : 'text-[#06183a]'}`}>{s.label}</p>
            <p className="hidden text-[10px] font-semibold leading-3 text-[#a0a8b8] sm:block">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MapPreferencesPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)

  const [mapView,   setMapView]    = useState<MapView>(DEFAULTS.mapView)
  const [domainVis, setDomainVis]  = useState<DomainVis>(DEFAULTS.domainVis)
  const [focus,     setFocus]      = useState<Set<FocusKey>>(new Set(DEFAULTS.focus))
  const [detail,    setDetail]     = useState<DetailLevel>(DEFAULTS.detail)
  const [density,   setDensity]    = useState<InsightDens>(DEFAULTS.density)
  const [growth,    setGrowth]     = useState<GrowthStyle>(DEFAULTS.growth)
  const [start,     setStart]      = useState<StartPoint>(DEFAULTS.start)
  const [history,   setHistory]    = useState<HistoryTrack>(DEFAULTS.history)

  function toggleFocus(key: FocusKey) {
    setFocus((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const detailSteps = [
    { label: 'Overview',      desc: 'Big picture only.' },
    { label: 'Moderate',      desc: 'Balanced detail.' },
    { label: 'Detailed',      desc: 'More depth & context.' },
    { label: 'Comprehensive', desc: 'Maximum depth & nuance.' },
  ]
  const detailHelpers: Record<DetailLevel, string> = {
    0: 'Overview gives you the big picture without noise.',
    1: 'Moderate is a great balance for most users.',
    2: 'Detailed shows richer context across your map.',
    3: 'Comprehensive gives you maximum depth and nuance.',
  }

  const densitySteps = [
    { label: 'Light',         desc: 'Fewer insights, less complexity.' },
    { label: 'Balanced',      desc: 'Helpful insights and connections.' },
    { label: 'Rich',          desc: 'More insights and patterns.' },
    { label: 'Comprehensive', desc: 'Maximum insight and depth.' },
  ]
  const densityHelpers: Record<InsightDens, string> = {
    0: 'Light keeps your map clean and uncluttered.',
    1: 'Balanced keeps your map clear and meaningful.',
    2: 'Rich surfaces more patterns and connections.',
    3: 'Comprehensive maximizes insight across all domains.',
  }

  const focusChips: { key: FocusKey; label: string; icon: React.ElementType; color: string; bg: string }[] = [
    { key: 'strengths',     label: 'Strengths',        icon: Zap,         color: '#c97c1e', bg: '#fff8ee' },
    { key: 'growth',        label: 'Growth Areas',     icon: TrendingUp,  color: '#0f8a77', bg: '#f0faf6' },
    { key: 'goals',         label: 'Goals & Priorities',icon: Flag,        color: '#176dff', bg: '#eff4ff' },
    { key: 'values',        label: 'Values & Beliefs', icon: Heart,       color: '#c04060', bg: '#fff0f3' },
    { key: 'insights',      label: 'Insights & Patterns',icon: Lightbulb, color: '#6c37c6', bg: '#f5f0ff' },
    { key: 'relationships', label: 'Relationships',    icon: Users,       color: '#344263', bg: '#f0f2f8' },
  ]

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
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Map Preferences</h1>
            <p className="mt-1.5 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Customize how your Self-Map is organized, displayed, and evolves.
              You control what&apos;s visible, how it grows, and how it supports your journey.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setAvatarOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-[12px] border border-[#ead7b9] bg-white px-3 py-2 hover:bg-[#fff8ee] transition-colors"
              >
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
                        <Icon className="h-4 w-4 shrink-0 text-[#6b7280]" />
                        {label}
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
                <Map className="h-8 w-8 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#3b1d72]">Your map. Your rules.</h2>
                <p className="mt-1.5 text-sm font-semibold leading-6 text-[#4a2b8a]">
                  You decide what matters, what&apos;s visible,<br />
                  and how your Self-Map grows over time.
                </p>
                <Link href="/how-it-works/self-map" className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-[#6c37c6] hover:underline">
                  Learn more about your Self-Map <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="shrink-0 sm:border-l sm:border-[#e0d4f8] sm:pl-6">
              <ul className="space-y-2">
                {[
                  'You control what appears on your map',
                  'You can focus on what matters most',
                  'You decide how your map evolves',
                  'You can change these settings anytime',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-[#3b1d72]">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-[#6c37c6]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Sections 1 + 2: Map View + Domain Visibility ─────────────── */}
        <div className="mb-3 grid gap-3 lg:grid-cols-2">

          {/* 1. Map View */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Grid3X3 className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">1. Map View</h2>
                <p className="text-xs font-semibold text-[#6b7280]">Choose how you view your Self-Map.</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 sm:flex-row">
              {([
                { value: 'structured', label: 'Structured (24 Domains)', desc: 'See your map across all domains.', icon: Grid3X3 },
                { value: 'focus',      label: 'Focus Mode',              desc: 'Focus on a few domains at a time.', icon: ZoomIn },
                { value: 'timeline',   label: 'Timeline View',           desc: 'See how your map evolves over time.', icon: Clock },
              ] as { value: MapView; label: string; desc: string; icon: React.ElementType }[]).map((o) => (
                <OptionCard key={o.value} value={o.value} selected={mapView === o.value} label={o.label} desc={o.desc} icon={o.icon} onChange={(v) => setMapView(v as MapView)} />
              ))}
            </div>
          </section>

          {/* 2. Domain Visibility */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                  <Layers3 className="h-4 w-4 text-[#6c37c6]" />
                </div>
                <div>
                  <h2 className="text-base font-black text-[#06183a]">2. Domain Visibility</h2>
                  <p className="text-xs font-semibold text-[#6b7280]">Choose which domains appear in your map.</p>
                </div>
              </div>
              <Link href="/dashboard/settings/map-preferences/domains"
                className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#e0d4f8] bg-white px-3 py-1.5 text-xs font-black text-[#6c37c6] hover:bg-[#f5f0ff] transition-colors">
                Customize Domains <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-[#ead7b9] px-5 py-1">
              {([
                { value: 'all',      label: 'Show all 24 domains',      desc: 'Display every domain in your map.' },
                { value: 'selected', label: 'Show my selected domains',  desc: 'Choose the domains you want to see.' },
                { value: 'hidden',   label: 'Hide certain domains',      desc: 'Hide domains you prefer not to view.' },
              ] as { value: DomainVis; label: string; desc: string }[]).map((o) => (
                <label key={o.value} className="flex cursor-pointer items-start gap-3 py-3.5 hover:opacity-80 transition-opacity">
                  <input type="radio" name="domainVis" value={o.value} checked={domainVis === o.value}
                    onChange={() => setDomainVis(o.value)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#6c37c6]" />
                  <div>
                    <p className="text-sm font-black text-[#06183a]">{o.label}</p>
                    <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">{o.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* ── Section 3: Map Focus ──────────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
              <Target className="h-4 w-4 text-[#6c37c6]" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">3. Map Focus</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Highlight what matters most right now.</p>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {focusChips.map(({ key, label, icon: Icon, color, bg }) => {
                const on = focus.has(key)
                return (
                  <button
                    key={key}
                    onClick={() => toggleFocus(key)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition-all ${
                      on
                        ? 'border-[#6c37c6] bg-[#f5f0ff] text-[#6c37c6]'
                        : 'border-[#ead7b9] bg-white text-[#344263] hover:border-[#c4aaee]'
                    }`}
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: on ? '#ede8fb' : bg }}>
                      <Icon className="h-3 w-3" style={{ color: on ? '#6c37c6' : color }} />
                    </div>
                    {label}
                    {on && <BadgeCheck className="h-3.5 w-3.5 text-[#6c37c6]" />}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-xs font-semibold text-[#6b7280]">These focus areas appear prominently in your map and insights.</p>
          </div>
        </section>

        {/* ── Sections 4 + 5: Detail Level + Insight Density ───────────── */}
        <div className="mb-3 grid gap-3 lg:grid-cols-2">

          {/* 4. Detail Level */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Layers3 className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">4. Detail Level</h2>
                <p className="text-xs font-semibold text-[#6b7280]">Control how much detail is shown in your map.</p>
              </div>
            </div>
            <div className="p-5 pt-4">
              <div className="relative">
                <StepSlider steps={detailSteps} value={detail} onChange={setDetail} />
              </div>
              <p className="mt-2 text-xs font-semibold text-[#6b7280]">{detailHelpers[detail]}</p>
            </div>
          </section>

          {/* 5. Insight Density */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Sparkles className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">5. Insight Density</h2>
                <p className="text-xs font-semibold text-[#6b7280]">Control how many insights and connections appear.</p>
              </div>
            </div>
            <div className="p-5 pt-4">
              <div className="relative">
                <StepSlider steps={densitySteps} value={density} onChange={setDensity} />
              </div>
              <p className="mt-2 text-xs font-semibold text-[#6b7280]">{densityHelpers[density]}</p>
            </div>
          </section>
        </div>

        {/* ── Sections 6 + 7 + 8: Growth + Start + History ─────────────── */}
        <div className="mb-3 grid gap-3 lg:grid-cols-3">

          {/* 6. Map Growth Style */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <TrendingUp className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">6. Map Growth Style</h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">How should your map evolve over time?</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-3.5">
              {([
                { value: 'organic',     label: 'Organic',     desc: 'Let your map grow naturally from your data.' },
                { value: 'guided',      label: 'Guided',      desc: 'AI suggests areas to explore and develop.' },
                { value: 'intentional', label: 'Intentional', desc: 'You decide what to add and develop.' },
              ] as { value: GrowthStyle; label: string; desc: string }[]).map((o) => (
                <OptionCard key={o.value} value={o.value} selected={growth === o.value} label={o.label} desc={o.desc} onChange={(v) => setGrowth(v as GrowthStyle)} />
              ))}
              <p className="mt-1 text-[11px] font-semibold text-[#6b7280]">
                {growth === 'organic' ? 'Organic growth is a great default. You stay in control.'
                : growth === 'guided' ? 'Guided helps you discover areas you might not explore alone.'
                : 'Intentional keeps you fully in the driver\'s seat.'}
              </p>
            </div>
          </section>

          {/* 7. Default Map Starting Point */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <MapPin className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">7. Default Map Starting Point</h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">What should you see first when you open your Self-Map?</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-3.5">
              {([
                { value: 'whole-atlas',    label: 'Whole Atlas',           desc: 'See your full 24-domain map.', icon: Map },
                { value: 'current-focus',  label: 'Current Focus Domain',  desc: 'Start in your current focus.', icon: ZoomIn },
                { value: 'suggested',      label: 'Suggested Next Step',   desc: 'Start with what matters now.', icon: Zap },
                { value: 'recent',         label: 'Recent Changes',        desc: 'See your latest changes first.', icon: History },
              ] as { value: StartPoint; label: string; desc: string; icon: React.ElementType }[]).map((o) => (
                <OptionCard key={o.value} value={o.value} selected={start === o.value} label={o.label} desc={o.desc} icon={o.icon} onChange={(v) => setStart(v as StartPoint)} />
              ))}
              <p className="mt-1 text-[11px] font-semibold text-[#6b7280]">You can always switch views anytime.</p>
            </div>
          </section>

          {/* 8. Change & History Tracking */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <History className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">8. Change &amp; History Tracking</h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">Choose how changes are tracked and highlighted.</p>
              </div>
            </div>
            <div className="divide-y divide-[#ead7b9] px-4 py-1">
              {([
                { value: 'important', label: 'Highlight important changes', desc: 'Show significant shifts and milestones.' },
                { value: 'all',       label: 'Show all changes',            desc: 'Display every change in your map.' },
                { value: 'minimal',   label: 'Minimal tracking',            desc: 'Show only major updates.' },
              ] as { value: HistoryTrack; label: string; desc: string }[]).map((o) => (
                <label key={o.value} className="flex cursor-pointer items-start gap-3 py-3 hover:opacity-80 transition-opacity">
                  <input type="radio" name="history" value={o.value} checked={history === o.value}
                    onChange={() => setHistory(o.value)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#6c37c6]" />
                  <div>
                    <p className="text-xs font-black text-[#06183a]">{o.label}</p>
                    <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">{o.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            {/* Trust note */}
            <div className="m-3 rounded-[10px] border border-[#b6e8d9] bg-[#f2faf6] px-3 py-2.5">
              <p className="text-[11px] font-black text-[#0a5c4e]">You&apos;ll always be in control.</p>
              <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#1a6b5a]">
                You can review, edit, or remove anything on your map.
              </p>
              <Link href="/how-it-works/map-control" className="mt-1.5 flex items-center gap-1 text-[11px] font-black text-[#0f8a77] hover:underline">
                Learn more <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </section>
        </div>

        {/* ── Bottom control banner ─────────────────────────────────────── */}
        <section className="mb-2 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] px-6 py-5 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0f5ee]">
              <ShieldCheck className="h-6 w-6 text-[#0f8a77]" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[#0a5c4e]">Your map reflects you.</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1a6b5a]">
                You control what&apos;s visible, how your map grows, and what matters most.
              </p>
            </div>
          </div>
          <Link href="/dashboard/self-map"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#0f8a77] bg-white px-5 py-2.5 text-sm font-black text-[#0f8a77] shadow-[0_4px_12px_rgba(15,138,119,0.1)] hover:bg-[#f0faf6] transition-colors">
            Review My Map <ChevronRight className="h-4 w-4" />
          </Link>
        </section>
        <p className="mb-4 flex items-center gap-1.5 text-[11px] font-semibold text-[#a0a8b8]">
          <ShieldCheck className="h-3 w-3 shrink-0 text-[#0f8a77]" />
          Your Self-Map is yours. You&apos;re always in control of what appears, what evolves, and what stays private.
        </p>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* About Map Preferences */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">About Map Preferences</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              These settings help you customize your Self-Map experience.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              They do not affect your data permissions or what AI may remember.
            </p>
            <Link href="/how-it-works/self-map" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Map Preferences do not change your data */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0f8a77]" />
              <h2 className="text-sm font-black text-[#06183a]">Map Preferences do not change your data.</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              These settings only change how your map is displayed, prioritized, and explored.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              They do not affect what Reality Scientist AI may remember or how your data is used.
            </p>
            <Link href="/dashboard/settings/privacy-data" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#0f8a77] hover:underline">
              View Privacy Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Related Settings */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Related Settings</h2>
            <div className="mt-3 space-y-1">
              {[
                { icon: Brain,     color: '#6c37c6', label: 'AI Memory & Saving',              sub: 'Control memory, duration, and review.',  href: '/dashboard/settings/ai-memory-saving' },
                { icon: Settings,  color: '#6c37c6', label: 'Reality Scientist AI Preferences', sub: 'Customize how AI responds.',              href: '/dashboard/settings/reality-scientist-ai' },
                { icon: ShieldCheck,color:'#0f8a77', label: 'Privacy & Data',                  sub: 'Manage permissions and data use.',        href: '/dashboard/settings/privacy-data' },
                { icon: Sparkles,  color: '#c97c1e', label: 'Source-to-Map Suggestions',       sub: 'Manage what AI can suggest.',             href: '/dashboard/settings/privacy-data' },
                { icon: Lightbulb, color: '#176dff', label: 'Insights & Summaries',            sub: 'Control how insights are generated.',     href: '/dashboard/settings/privacy-data' },
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
