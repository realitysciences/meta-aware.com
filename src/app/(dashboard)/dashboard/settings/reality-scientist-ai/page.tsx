'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BadgeCheck,
  Brain,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Globe,
  Heart,
  Layers3,
  Lightbulb,
  Link2,
  LogOut,
  Map,
  MessageSquare,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  Zap,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type CollabStyle  = 'concise' | 'balanced' | 'expansive' | 'socratic' | 'encouraging'
type DepthLevel   = 0 | 1 | 2 | 3 | 4
type Tone         = 'professional' | 'warm' | 'neutral' | 'playful' | 'reflective'
type Stance       = 'neutral' | 'challenging' | 'supportive' | 'growth-oriented'
type Proactivity  = 'minimal' | 'occasional' | 'regular' | 'high'
type ContextMode  = 'session-only' | 'session-recent' | 'connected' | 'broad'
type MapPref      = 'never' | 'highly-relevant' | 'regularly'

const DEFAULTS = {
  collab:   'balanced'      as CollabStyle,
  depth:    2               as DepthLevel,
  tone:     'warm'          as Tone,
  stance:   'neutral'       as Stance,
  proact:   'regular'       as Proactivity,
  context:  'connected'     as ContextMode,
  mapPref:  'highly-relevant' as MapPref,
}

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function Pill<T extends string>({
  options, value, onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full border px-4 py-1.5 text-sm font-black transition-colors ${
            value === o.value
              ? 'border-[#6c37c6] bg-[#f5f0ff] text-[#6c37c6]'
              : 'border-[#ead7b9] bg-white text-[#344263] hover:border-[#c4aaee] hover:bg-[#faf5ff]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

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
        <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
          <Icon className="h-4 w-4" style={{ color: iconColor }} />
        </div>
      )}
      <p className={`text-sm font-black ${selected ? 'text-[#6c37c6]' : 'text-[#06183a]'}`}>{label}</p>
      <p className="text-[11px] font-semibold leading-4 text-[#6b7280]">{desc}</p>
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RealityScientistAIPreferencesPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [saved,      setSaved]      = useState(false)

  const [collab,   setCollab]   = useState<CollabStyle>(DEFAULTS.collab)
  const [depth,    setDepth]    = useState<DepthLevel>(DEFAULTS.depth)
  const [tone,     setTone]     = useState<Tone>(DEFAULTS.tone)
  const [stance,   setStance]   = useState<Stance>(DEFAULTS.stance)
  const [proact,   setProact]   = useState<Proactivity>(DEFAULTS.proact)
  const [context,  setContext]  = useState<ContextMode>(DEFAULTS.context)
  const [mapPref,  setMapPref]  = useState<MapPref>(DEFAULTS.mapPref)

  function resetToDefaults() {
    setCollab(DEFAULTS.collab)
    setDepth(DEFAULTS.depth)
    setTone(DEFAULTS.tone)
    setStance(DEFAULTS.stance)
    setProact(DEFAULTS.proact)
    setContext(DEFAULTS.context)
    setMapPref(DEFAULTS.mapPref)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const depthSteps: { label: string; desc: string }[] = [
    { label: 'Surface',       desc: 'High-level overview.' },
    { label: 'Moderate',      desc: 'Helpful detail and context.' },
    { label: 'Deep',          desc: 'Meaningful patterns and connections.' },
    { label: 'Comprehensive', desc: 'Thorough and multi-layered.' },
    { label: 'Intensive',     desc: 'Maximum depth and nuance.' },
  ]

  const depthHelpers: Record<DepthLevel, string> = {
    0: 'Surface gives you quick, high-level overviews.',
    1: 'Moderate adds helpful context without going too deep.',
    2: 'Deep analysis helps uncover patterns and insights without overwhelm.',
    3: 'Comprehensive gives you thorough, multi-layered analysis.',
    4: 'Intensive offers the maximum depth and nuance available.',
  }

  const toneHelpers: Record<Tone, string> = {
    professional: 'Professional is clear, precise, and direct.',
    warm:         'Warm is friendly, human, and encouraging.',
    neutral:      'Neutral is balanced and without added emotion.',
    playful:      'Playful keeps things light and energetic.',
    reflective:   'Reflective is thoughtful and introspective.',
  }

  const stanceHelpers: Record<Stance, string> = {
    'neutral':        'Neutral offers balanced, objective insights.',
    'challenging':    'Challenging pushes you to think deeper.',
    'supportive':     'Supportive emphasizes affirmation and encouragement.',
    'growth-oriented':'Growth-Oriented focuses on development and possibility.',
  }

  const proactHelpers: Record<Proactivity, string> = {
    minimal:    'Minimal means AI waits for you to ask.',
    occasional: 'Occasional adds useful suggestions from time to time.',
    regular:    'Regular helps you grow without feeling overwhelmed.',
    high:       'High means AI actively looks for ways to help.',
  }

  const contextHelpers: Record<ContextMode, string> = {
    'session-only':    'Session-Only keeps AI focused on the current conversation.',
    'session-recent':  'Session + Recent adds context from your recent activity.',
    'connected':       'Connected provides the best balance of relevance and context.',
    'broad':           'Broad Map Context uses all available context over time.',
  }

  const mapPrefHelpers: Record<MapPref, string> = {
    'never':           'AI will not suggest map additions. You\'ll handle updates yourself.',
    'highly-relevant': 'AI suggests only when something is clearly valuable to your map.',
    'regularly':       'AI offers frequent suggestions for your review.',
  }

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Back + header */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              href="/dashboard/settings"
              className="mb-3 flex items-center gap-1.5 text-xs font-bold text-[#6b7280] hover:text-[#c97c1e] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Settings
            </Link>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Reality Scientist AI Preferences</h1>
            <p className="mt-1.5 max-w-2xl text-sm font-semibold leading-6 text-[#344263]">
              Shape how Reality Scientist AI shows up, responds, and supports you.{' '}
              These preferences guide style, depth, and interaction{' '}
              <span className="font-black text-[#6c37c6]">— not memory.</span>
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

        {/* Toast */}
        {saved && (
          <div className="mb-4 flex items-center gap-2 rounded-[10px] border border-[#b6e8d9] bg-[#f0faf6] px-4 py-2.5 text-sm font-black text-[#0f8a77]">
            <BadgeCheck className="h-4 w-4" /> Preferences reset to defaults.
          </div>
        )}

        {/* ── Hero card ─────────────────────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
          <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#ede8fb]">
                <Atom className="h-8 w-8 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#3b1d72]">
                  Reality Scientist AI adapts to how you want to work with your map.
                </h2>
                <p className="mt-1.5 text-sm font-semibold leading-6 text-[#4a2b8a]">
                  These preferences shape our collaboration —<br />
                  not what AI remembers or what enters your map.
                </p>
                <Link href="/how-it-works/ai-preferences" className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-[#6c37c6] hover:underline">
                  Learn more about AI preferences <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="shrink-0 sm:border-l sm:border-[#e0d4f8] sm:pl-6">
              <ul className="space-y-2">
                {[
                  'You shape the style and depth',
                  'You can change preferences anytime',
                  'These do not affect what AI may remember',
                  'You remain in control of your map',
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

        {/* ── Section 1: Collaboration Style ───────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
              <MessageSquare className="h-4 w-4 text-[#6c37c6]" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">1. Collaboration Style</h2>
              <p className="text-xs font-semibold text-[#6b7280]">How conversational and expressive should AI be?</p>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2 sm:flex-nowrap">
              {([
                { value: 'concise',     label: 'Concise',     desc: 'Straightforward and to the point.',     icon: MessageSquare, iconColor: '#6b7280', iconBg: '#f3f4f6' },
                { value: 'balanced',    label: 'Balanced',    desc: 'Clear, helpful, and well-rounded.',      icon: Layers3,       iconColor: '#6c37c6', iconBg: '#f5f0ff' },
                { value: 'expansive',   label: 'Expansive',   desc: 'Detailed and thoughtful.',              icon: Sparkles,      iconColor: '#c97c1e', iconBg: '#fff8ee' },
                { value: 'socratic',    label: 'Socratic',    desc: 'Asks questions to help you think.',     icon: CircleHelp,    iconColor: '#176dff', iconBg: '#eff4ff' },
                { value: 'encouraging', label: 'Encouraging', desc: 'Warm, supportive, and motivating.',     icon: Heart,         iconColor: '#c04060', iconBg: '#fff0f3' },
              ] as { value: CollabStyle; label: string; desc: string; icon: React.ElementType; iconColor: string; iconBg: string }[]).map((o) => (
                <OptionCard
                  key={o.value}
                  value={o.value}
                  selected={collab === o.value}
                  label={o.label}
                  desc={o.desc}
                  icon={o.icon}
                  iconColor={o.iconColor}
                  iconBg={o.iconBg}
                  onChange={(v) => setCollab(v as CollabStyle)}
                />
              ))}
            </div>
            <p className="mt-3 text-xs font-semibold text-[#6b7280]">
              {collab === 'balanced' ? 'Balanced is a great default for most users.' :
               collab === 'concise' ? 'Concise keeps things focused and efficient.' :
               collab === 'expansive' ? 'Expansive gives you rich, detailed responses.' :
               collab === 'socratic' ? 'Socratic helps you discover insights through questions.' :
               'Encouraging keeps your growth journey warm and motivating.'}
            </p>
          </div>
        </section>

        {/* ── Section 2: Depth & Analysis ──────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
              <Target className="h-4 w-4 text-[#6c37c6]" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">2. Depth &amp; Analysis</h2>
              <p className="text-xs font-semibold text-[#6b7280]">How deeply should AI explore, connect, and analyze your information?</p>
            </div>
          </div>
          <div className="p-5">
            {/* Slider track */}
            <div className="relative px-2">
              <div className="relative h-1.5 rounded-full bg-[#e5e7eb]">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-[#6c37c6] transition-all"
                  style={{ width: `${(depth / 4) * 100}%` }}
                />
              </div>
              {/* Dots */}
              <div className="absolute top-0 flex w-full -translate-y-[3px] items-center justify-between px-2">
                {depthSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setDepth(i as DepthLevel)}
                    className={`h-4 w-4 rounded-full border-2 transition-all ${
                      depth === i
                        ? 'border-[#6c37c6] bg-[#6c37c6] scale-110'
                        : depth > i
                        ? 'border-[#6c37c6] bg-white'
                        : 'border-[#d1d5db] bg-white'
                    }`}
                    aria-label={depthSteps[i].label}
                  />
                ))}
              </div>
            </div>
            {/* Labels */}
            <div className="mt-5 flex justify-between">
              {depthSteps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setDepth(i as DepthLevel)}
                  className="flex w-1/5 flex-col items-center gap-0.5 text-center"
                >
                  <p className={`text-xs font-black transition-colors ${depth === i ? 'text-[#6c37c6]' : 'text-[#06183a]'}`}>{s.label}</p>
                  <p className="hidden text-[10px] font-semibold leading-3 text-[#a0a8b8] sm:block">{s.desc}</p>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs font-semibold text-[#6b7280]">{depthHelpers[depth]}</p>
          </div>
        </section>

        {/* ── Sections 3 + 4: Tone + Stance ────────────────────────────── */}
        <div className="mb-3 grid gap-3 lg:grid-cols-2">

          {/* Response Tone */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Heart className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">3. Response Tone</h2>
                <p className="text-xs font-semibold text-[#6b7280]">What tone should AI use in your conversations?</p>
              </div>
            </div>
            <div className="p-5">
              <Pill<Tone>
                options={[
                  { value: 'professional', label: 'Professional' },
                  { value: 'warm',         label: 'Warm' },
                  { value: 'neutral',      label: 'Neutral' },
                  { value: 'playful',      label: 'Playful' },
                  { value: 'reflective',   label: 'Reflective' },
                ]}
                value={tone}
                onChange={setTone}
              />
              <p className="mt-3 text-xs font-semibold text-[#6b7280]">{toneHelpers[tone]}</p>
            </div>
          </section>

          {/* Interpretive Stance */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Target className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">4. Interpretive Stance</h2>
                <p className="text-xs font-semibold text-[#6b7280]">How should AI frame insights and responses?</p>
              </div>
            </div>
            <div className="p-5">
              <Pill<Stance>
                options={[
                  { value: 'neutral',         label: 'Neutral' },
                  { value: 'challenging',      label: 'Challenging' },
                  { value: 'supportive',       label: 'Supportive' },
                  { value: 'growth-oriented',  label: 'Growth-Oriented' },
                ]}
                value={stance}
                onChange={setStance}
              />
              <p className="mt-3 text-xs font-semibold text-[#6b7280]">{stanceHelpers[stance]}</p>
            </div>
          </section>
        </div>

        {/* ── Sections 5 + 6: Proactivity + Context Mode ───────────────── */}
        <div className="mb-3 grid gap-3 lg:grid-cols-2">

          {/* Proactivity */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Zap className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">5. Proactivity</h2>
                <p className="text-xs font-semibold text-[#6b7280]">How proactive should AI be in offering insights and suggestions?</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-2 sm:flex-row">
                {([
                  { value: 'minimal',    label: 'Minimal',    desc: 'Only when requested.' },
                  { value: 'occasional', label: 'Occasional', desc: 'Sometimes offers helpful insights.' },
                  { value: 'regular',    label: 'Regular',    desc: 'Often shares insights and ideas.' },
                  { value: 'high',       label: 'High',       desc: 'Actively looks for opportunities to help.' },
                ] as { value: Proactivity; label: string; desc: string }[]).map((o) => (
                  <OptionCard key={o.value} value={o.value} selected={proact === o.value} label={o.label} desc={o.desc} onChange={(v) => setProact(v as Proactivity)} />
                ))}
              </div>
              <p className="mt-3 text-xs font-semibold text-[#6b7280]">{proactHelpers[proact]}</p>
            </div>
          </section>

          {/* Context Mode */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Globe className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">6. Context Mode</h2>
                <p className="text-xs font-semibold text-[#6b7280]">How should AI use context across sessions and sources?</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-2 sm:flex-row">
                {([
                  { value: 'session-only',   label: 'Session-Only',    desc: 'Use only current conversation.' },
                  { value: 'session-recent', label: 'Session + Recent', desc: 'Use this session and recent activity.' },
                  { value: 'connected',      label: 'Connected Sources',desc: 'Use relevant context across sources.' },
                  { value: 'broad',          label: 'Broad Map Context',desc: 'Use all relevant context over time.' },
                ] as { value: ContextMode; label: string; desc: string }[]).map((o) => (
                  <OptionCard key={o.value} value={o.value} selected={context === o.value} label={o.label} desc={o.desc} onChange={(v) => setContext(v as ContextMode)} />
                ))}
              </div>
              <p className="mt-3 text-xs font-semibold text-[#6b7280]">{contextHelpers[context]}</p>
            </div>
          </section>
        </div>

        {/* ── Section 7: Map Update Preference ─────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
              <Map className="h-4 w-4 text-[#6c37c6]" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">7. Map Update Preference</h2>
              <p className="text-xs font-semibold text-[#6b7280]">How often should AI suggest additions or updates to your Self-Map?</p>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-col gap-2 sm:flex-row">
              {([
                { value: 'never',           label: 'Never suggest map updates',  desc: 'I\'ll add things myself.' },
                { value: 'highly-relevant', label: 'Suggest when highly relevant',desc: 'Only when it\'s clearly valuable.' },
                { value: 'regularly',       label: 'Suggest regularly',           desc: 'Offer suggestions often for my review.' },
              ] as { value: MapPref; label: string; desc: string }[]).map((o) => (
                <OptionCard key={o.value} value={o.value} selected={mapPref === o.value} label={o.label} desc={o.desc} onChange={(v) => setMapPref(v as MapPref)} />
              ))}
            </div>
            <p className="mt-3 text-xs font-semibold text-[#6b7280]">{mapPrefHelpers[mapPref]}</p>
            {/* Trust note */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-[#b6e8d9] bg-[#f2faf6] px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0a5c4e]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#0f8a77]" />
                All suggestions require your review before anything is added to your map.
              </div>
              <Link
                href="/dashboard/settings/ai-memory-saving"
                className="flex items-center gap-1 text-xs font-black text-[#0f8a77] hover:underline"
              >
                Manage memory and saving rules <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Bottom control banner ─────────────────────────────────────── */}
        <section className="mb-4 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] px-6 py-5 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0f5ee]">
              <ShieldCheck className="h-6 w-6 text-[#0f8a77]" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[#0a5c4e]">You guide the collaboration.</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1a6b5a]">
                Reality Scientist AI follows your preferences, but your map remains yours. You can change anything anytime.
              </p>
            </div>
          </div>
          <button
            onClick={resetToDefaults}
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#0f8a77] bg-white px-5 py-2.5 text-sm font-black text-[#0f8a77] shadow-[0_4px_12px_rgba(15,138,119,0.1)] hover:bg-[#f0faf6] transition-colors"
          >
            <RefreshCw className="h-4 w-4" /> Reset to Defaults
          </button>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* About These Preferences */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">About These Preferences</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              These settings shape how Reality Scientist AI communicates and collaborates with you.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              They do not affect what AI may remember or how your data is protected.
            </p>
            <Link href="/how-it-works/ai-preferences" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Memory & Data */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-[#0f8a77]" />
              <h2 className="text-sm font-black text-[#06183a]">Memory &amp; Data</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Control what AI may remember, how long it keeps it, and how it can use it.
            </p>
            <Link
              href="/dashboard/settings/ai-memory-saving"
              className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#0f8a77] hover:underline"
            >
              Manage AI Memory &amp; Saving <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Related Settings */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Related Settings</h2>
            <div className="mt-3 space-y-1">
              {[
                { icon: ShieldCheck, color: '#0f8a77', label: 'Privacy & Data',           sub: 'Control permissions and data use.',      href: '/dashboard/settings/privacy-data' },
                { icon: Brain,       color: '#6c37c6', label: 'AI Memory & Saving',        sub: 'Manage memory, duration, and review.',    href: '/dashboard/settings/ai-memory-saving' },
                { icon: Lightbulb,   color: '#176dff', label: 'Insights & Summaries',      sub: 'Control how insights are generated.',     href: '/dashboard/settings/privacy-data' },
                { icon: Sparkles,    color: '#c97c1e', label: 'Source-to-Map Suggestions', sub: 'Manage what AI can suggest.',             href: '/dashboard/settings/privacy-data' },
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
