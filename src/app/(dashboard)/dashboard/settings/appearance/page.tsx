'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Eye,
  Grid2X2,
  Heart,
  Keyboard,
  Link2,
  LogOut,
  Monitor,
  Moon,
  Palette,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Type,
  User,
  Users,
  Zap,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Theme           = 'light' | 'dark' | 'system'
type TextSize        = 0 | 1 | 2 | 3
type ReadingComfort  = 'calm' | 'standard' | 'high-contrast'
type Density         = 'comfortable' | 'balanced' | 'compact'
type AccentColor     = 'purple' | 'indigo' | 'blue' | 'teal' | 'green' | 'amber' | 'rose' | 'slate'
type AccentIntensity = 0 | 1 | 2 | 3 | 4

const DEFAULTS = {
  theme:           'light'       as Theme,
  textSize:        1             as TextSize,
  reading:         'standard'    as ReadingComfort,
  density:         'comfortable' as Density,
  contentWidth:    'Standard (Recommended)',
  accent:          'purple'      as AccentColor,
  intensity:       2             as AccentIntensity,
  navIcons:        true,
  domainColors:    true,
  reduceMotion:    false,
  reduceIntensity: true,
  highContrast:    false,
  showTips:        true,
}

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Accent colours ───────────────────────────────────────────────────────────

const accentColors: { key: AccentColor; label: string; hex: string }[] = [
  { key: 'purple', label: 'Purple', hex: '#6c37c6' },
  { key: 'indigo', label: 'Indigo', hex: '#4f46e5' },
  { key: 'blue',   label: 'Blue',   hex: '#176dff' },
  { key: 'teal',   label: 'Teal',   hex: '#0f8a77' },
  { key: 'green',  label: 'Green',  hex: '#16a34a' },
  { key: 'amber',  label: 'Amber',  hex: '#d97706' },
  { key: 'rose',   label: 'Rose',   hex: '#e11d48' },
  { key: 'slate',  label: 'Slate',  hex: '#475569' },
]

// ─── Theme preview skeletons ──────────────────────────────────────────────────

function LightPreview() {
  return (
    <div className="mt-2 overflow-hidden rounded-[6px] border border-[#e5e7eb] bg-[#fffaf2]" style={{ height: 64 }}>
      <div className="flex h-full gap-0">
        <div className="w-10 border-r border-[#ead7b9] bg-[#fff8ee] p-1">
          {[1,2,3,4].map(i => <div key={i} className="mb-1 h-1.5 rounded-full bg-[#d9c49a]" style={{ width: `${60+i*5}%` }} />)}
        </div>
        <div className="flex-1 p-1.5 space-y-1">
          <div className="h-2 w-3/4 rounded-full bg-[#ead7b9]" />
          <div className="h-1.5 w-1/2 rounded-full bg-[#ead7b9] opacity-60" />
          <div className="mt-1 grid grid-cols-2 gap-1">
            <div className="h-5 rounded bg-[#f5f0ff] border border-[#e0d4f8]" />
            <div className="h-5 rounded bg-[#f0faf6] border border-[#b6e8d9]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function DarkPreview() {
  return (
    <div className="mt-2 overflow-hidden rounded-[6px] border border-[#374151] bg-[#111827]" style={{ height: 64 }}>
      <div className="flex h-full gap-0">
        <div className="w-10 border-r border-[#1f2937] bg-[#0f172a] p-1">
          {[1,2,3,4].map(i => <div key={i} className="mb-1 h-1.5 rounded-full bg-[#374151]" style={{ width: `${60+i*5}%` }} />)}
        </div>
        <div className="flex-1 p-1.5 space-y-1">
          <div className="h-2 w-3/4 rounded-full bg-[#374151]" />
          <div className="h-1.5 w-1/2 rounded-full bg-[#374151] opacity-60" />
          <div className="mt-1 grid grid-cols-2 gap-1">
            <div className="h-5 rounded bg-[#1e1b4b] border border-[#312e81]" />
            <div className="h-5 rounded bg-[#064e3b] border border-[#065f46]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SystemPreview() {
  return (
    <div className="mt-2 overflow-hidden rounded-[6px] border border-[#e5e7eb]" style={{ height: 64 }}>
      <div className="flex h-full">
        <div className="w-1/2 bg-[#fffaf2] p-1">
          <div className="h-1.5 w-3/4 rounded-full bg-[#ead7b9] mb-1" />
          <div className="h-1.5 w-1/2 rounded-full bg-[#ead7b9] opacity-60 mb-1" />
          <div className="h-4 w-full rounded bg-[#f5f0ff] border border-[#e0d4f8]" />
        </div>
        <div className="w-1/2 bg-[#111827] p-1">
          <div className="h-1.5 w-3/4 rounded-full bg-[#374151] mb-1" />
          <div className="h-1.5 w-1/2 rounded-full bg-[#374151] opacity-60 mb-1" />
          <div className="h-4 w-full rounded bg-[#1e1b4b] border border-[#312e81]" />
        </div>
      </div>
    </div>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button role="switch" aria-checked={on} onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? 'bg-[#6c37c6]' : 'bg-[#d1d5db]'}`}>
      <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

// ─── Pill selector ────────────────────────────────────────────────────────────

function PillOption<T extends string>({ value, selected, label, desc, onChange }: {
  value: T; selected: boolean; label: string; desc: string; onChange: (v: T) => void
}) {
  return (
    <button onClick={() => onChange(value)}
      className={`flex-1 rounded-[10px] border px-3 py-2.5 text-left transition-all ${
        selected
          ? 'border-[#6c37c6] bg-[#f5f0ff] shadow-[0_0_0_1px_#6c37c6]'
          : 'border-[#ead7b9] bg-white hover:border-[#c4aaee] hover:bg-[#faf5ff]'
      }`}>
      <p className={`text-xs font-black ${selected ? 'text-[#6c37c6]' : 'text-[#06183a]'}`}>{label}</p>
      <p className="mt-0.5 text-[10px] font-semibold text-[#6b7280]">{desc}</p>
    </button>
  )
}

// ─── Step slider ─────────────────────────────────────────────────────────────

function StepSlider({ steps, value, onChange }: {
  steps: string[]; value: number; onChange: (v: number) => void
}) {
  const max = steps.length - 1
  return (
    <div className="relative px-1">
      <div className="relative h-1.5 rounded-full bg-[#e5e7eb]">
        <div className="absolute left-0 top-0 h-full rounded-full bg-[#6c37c6] transition-all" style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <div className="absolute -top-[1px] flex w-full items-center justify-between px-1">
        {steps.map((_, i) => (
          <button key={i} onClick={() => onChange(i)}
            className={`h-4 w-4 rounded-full border-2 transition-all ${value === i ? 'border-[#6c37c6] bg-[#6c37c6] scale-110' : value > i ? 'border-[#6c37c6] bg-white' : 'border-[#d1d5db] bg-white'}`}
            aria-label={steps[i]} />
        ))}
      </div>
      <div className="mt-5 flex justify-between">
        {steps.map((s, i) => (
          <button key={i} onClick={() => onChange(i)}
            className={`text-[11px] font-semibold transition-colors ${value === i ? 'font-black text-[#6c37c6]' : 'text-[#6b7280]'}`}>
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AppearancePage() {
  const [avatarOpen,  setAvatarOpen]  = useState(false)
  const [saved,       setSaved]       = useState(false)

  const [theme,           setTheme]           = useState<Theme>(DEFAULTS.theme)
  const [textSize,        setTextSize]        = useState<TextSize>(DEFAULTS.textSize)
  const [reading,         setReading]         = useState<ReadingComfort>(DEFAULTS.reading)
  const [density,         setDensity]         = useState<Density>(DEFAULTS.density)
  const [contentWidth,    setContentWidth]    = useState(DEFAULTS.contentWidth)
  const [accent,          setAccent]          = useState<AccentColor>(DEFAULTS.accent)
  const [intensity,       setIntensity]       = useState<AccentIntensity>(DEFAULTS.intensity)
  const [navIcons,        setNavIcons]        = useState(DEFAULTS.navIcons)
  const [domainColors,    setDomainColors]    = useState(DEFAULTS.domainColors)
  const [reduceMotion,    setReduceMotion]    = useState(DEFAULTS.reduceMotion)
  const [reduceIntensity, setReduceIntensity] = useState(DEFAULTS.reduceIntensity)
  const [highContrast,    setHighContrast]    = useState(DEFAULTS.highContrast)
  const [showTips,        setShowTips]        = useState(DEFAULTS.showTips)

  function resetToDefaults() {
    setTheme(DEFAULTS.theme); setTextSize(DEFAULTS.textSize); setReading(DEFAULTS.reading)
    setDensity(DEFAULTS.density); setContentWidth(DEFAULTS.contentWidth)
    setAccent(DEFAULTS.accent); setIntensity(DEFAULTS.intensity)
    setNavIcons(DEFAULTS.navIcons); setDomainColors(DEFAULTS.domainColors)
    setReduceMotion(DEFAULTS.reduceMotion); setReduceIntensity(DEFAULTS.reduceIntensity)
    setHighContrast(DEFAULTS.highContrast); setShowTips(DEFAULTS.showTips)
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const themeCards: { key: Theme; label: string; desc: string; icon: React.ElementType; Preview: () => React.ReactElement }[] = [
    { key: 'light',  label: 'Light',  desc: 'Clean, warm, and bright.',    icon: Sun,     Preview: LightPreview },
    { key: 'dark',   label: 'Dark',   desc: 'Easy on the eyes in low light.', icon: Moon, Preview: DarkPreview },
    { key: 'system', label: 'System', desc: 'Matches your device setting.', icon: Monitor,Preview: SystemPreview },
  ]

  const interfaceToggles = [
    { icon: Grid2X2, color: '#6c37c6', label: 'Show icons in navigation',  desc: 'Display icons next to menu items.',                                       value: navIcons,        set: setNavIcons },
    { icon: Palette, color: '#176dff', label: 'Show domain colors',         desc: 'Use colors for domains and categories.',                                  value: domainColors,    set: setDomainColors },
    { icon: Zap,     color: '#6b7280', label: 'Reduce motion',              desc: 'Minimize animations and transitions.',                                    value: reduceMotion,    set: setReduceMotion },
    { icon: Heart,   color: '#6c37c6', label: 'Reduce emotional intensity', desc: 'Softens strong colors, badges, alerts, and high-intensity styling.',      value: reduceIntensity, set: setReduceIntensity },
    { icon: Eye,     color: '#6b7280', label: 'High contrast mode',         desc: 'Improve contrast for better visibility.',                                  value: highContrast,    set: setHighContrast },
    { icon: Sparkles,color: '#c97c1e', label: 'Show tips and guidance',     desc: 'Helpful hints throughout the experience.',                                 value: showTips,        set: setShowTips },
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
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Appearance</h1>
            <p className="mt-1.5 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Customize how Meta-Aware looks, feels, and supports your focus while you work with your Self-Map.
              These settings change the interface, not your data, map, or insights.
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
            <BadgeCheck className="h-4 w-4" /> Appearance reset to defaults.
          </div>
        )}

        {/* ── Section 1: Theme ──────────────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6c37c6] text-xs font-black text-white">1</div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">Theme</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Choose the theme that works best for your eyes and environment.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3">
            {themeCards.map(({ key, label, desc, icon: Icon, Preview }) => (
              <button key={key} onClick={() => setTheme(key)}
                className={`relative rounded-[12px] border p-4 text-left transition-all ${
                  theme === key
                    ? 'border-[#6c37c6] bg-[#f5f0ff] shadow-[0_0_0_1px_#6c37c6]'
                    : 'border-[#ead7b9] bg-white hover:border-[#c4aaee]'
                }`}>
                {/* Radio */}
                <div className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${theme === key ? 'border-[#6c37c6] bg-[#6c37c6]' : 'border-[#d1d5db] bg-white'}`}>
                  {theme === key && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${theme === key ? 'text-[#6c37c6]' : 'text-[#6b7280]'}`} />
                  <p className={`text-sm font-black ${theme === key ? 'text-[#6c37c6]' : 'text-[#06183a]'}`}>{label}</p>
                </div>
                <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{desc}</p>
                <Preview />
              </button>
            ))}
          </div>
        </section>

        {/* ── Section 2: Display, Layout & Reading Comfort ─────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6c37c6] text-xs font-black text-white">2</div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">Display, Layout &amp; Reading Comfort</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Adjust text size, spacing, layout density, and reading comfort for longer reflection.</p>
            </div>
          </div>
          <div className="p-5 space-y-6">
            {/* Row 1: Text size + Reading comfort + Density */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {/* Text size */}
              <div>
                <div className="mb-3 flex items-start gap-2">
                  <Type className="mt-0.5 h-4 w-4 shrink-0 text-[#6c37c6]" />
                  <div>
                    <p className="text-sm font-black text-[#06183a]">Text size</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">Choose the size that feels most comfortable to read.</p>
                  </div>
                </div>
                <StepSlider steps={['Small','Medium','Large','Extra Large']} value={textSize} onChange={(v) => setTextSize(v as TextSize)} />
              </div>

              {/* Reading comfort */}
              <div>
                <div className="mb-3 flex items-start gap-2">
                  <Eye className="mt-0.5 h-4 w-4 shrink-0 text-[#6c37c6]" />
                  <div>
                    <p className="text-sm font-black text-[#06183a]">Reading comfort</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">Choose the visual style that reduces strain and supports longer reflection.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <PillOption<ReadingComfort> value="calm"          selected={reading==='calm'}          label="Calm"          desc="Soft and soothing."   onChange={setReading} />
                  <PillOption<ReadingComfort> value="standard"      selected={reading==='standard'}      label="Standard"      desc="Balanced and clear."  onChange={setReading} />
                  <PillOption<ReadingComfort> value="high-contrast" selected={reading==='high-contrast'} label="High Contrast" desc="Maximum clarity."     onChange={setReading} />
                </div>
              </div>

              {/* Density */}
              <div>
                <div className="mb-3 flex items-start gap-2">
                  <Grid2X2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6c37c6]" />
                  <div>
                    <p className="text-sm font-black text-[#06183a]">Density</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">Control how much content fits on screen.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <PillOption<Density> value="comfortable" selected={density==='comfortable'} label="Comfortable" desc="More spacing."  onChange={setDensity} />
                  <PillOption<Density> value="balanced"    selected={density==='balanced'}    label="Balanced"    desc="Default."       onChange={setDensity} />
                  <PillOption<Density> value="compact"     selected={density==='compact'}     label="Compact"     desc="More content."  onChange={setDensity} />
                </div>
              </div>
            </div>

            {/* Content width */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-[#ead7b9] bg-[#faf6f0] px-4 py-3">
              <div>
                <p className="text-sm font-black text-[#06183a]">Content width</p>
                <p className="text-[11px] font-semibold text-[#6b7280]">Choose how wide the main content area appears.</p>
              </div>
              <div className="relative">
                <select value={contentWidth} onChange={(e) => setContentWidth(e.target.value)}
                  className="appearance-none rounded-[8px] border border-[#ead7b9] bg-white py-2 pl-3 pr-8 text-sm font-semibold text-[#344263] focus:outline-none focus:border-[#6c37c6]">
                  {['Standard (Recommended)','Narrow','Wide','Full'].map((o) => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-[#6b7280]" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Sections 3 + 4 side by side ──────────────────────────────── */}
        <div className="mb-3 grid gap-3 lg:grid-cols-2">

          {/* Section 3: Color & Accent */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6c37c6] text-xs font-black text-white">3</div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">Color &amp; Accent</h2>
                <p className="text-xs font-semibold text-[#6b7280]">Personalize Meta-Aware with your favorite accent color.</p>
              </div>
            </div>
            <div className="p-5 space-y-5">
              {/* Color chips */}
              <div className="flex flex-wrap gap-3">
                {accentColors.map(({ key, label, hex }) => (
                  <button key={key} onClick={() => setAccent(key)}
                    className="flex flex-col items-center gap-1.5" aria-label={label}>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                        accent === key ? 'border-[#06183a] scale-110 shadow-[0_0_0_3px_rgba(108,55,198,0.3)]' : 'border-white shadow hover:scale-105'
                      }`}
                      style={{ background: hex }}>
                      {accent === key && <Check className="h-4 w-4 text-white" />}
                    </div>
                    <p className={`text-[10px] font-semibold ${accent === key ? 'font-black text-[#06183a]' : 'text-[#6b7280]'}`}>{label}</p>
                  </button>
                ))}
              </div>
              {/* Accent intensity */}
              <div>
                <p className="mb-1 text-xs font-black text-[#06183a]">Accent intensity</p>
                <p className="mb-3 text-[11px] font-semibold text-[#6b7280]">Adjust how strong accent colors appear.</p>
                <div className="relative px-1">
                  <div className="relative h-1.5 rounded-full bg-[#e5e7eb]">
                    <div className="absolute left-0 top-0 h-full rounded-full bg-[#6c37c6] transition-all" style={{ width: `${(intensity / 4) * 100}%` }} />
                  </div>
                  <div className="absolute -top-[1px] flex w-full items-center justify-between px-1">
                    {[0,1,2,3,4].map((i) => (
                      <button key={i} onClick={() => setIntensity(i as AccentIntensity)}
                        className={`h-4 w-4 rounded-full border-2 transition-all ${intensity === i ? 'border-[#6c37c6] bg-[#6c37c6] scale-110' : intensity > i ? 'border-[#6c37c6] bg-white' : 'border-[#d1d5db] bg-white'}`}
                        aria-label={['Subtle','','Balanced','','Vibrant'][i]} />
                    ))}
                  </div>
                  <div className="mt-5 flex justify-between">
                    {['Subtle','','Balanced','','Vibrant'].map((s, i) => (
                      s ? <button key={i} onClick={() => setIntensity(i as AccentIntensity)}
                        className={`text-[11px] font-semibold ${intensity === i ? 'font-black text-[#6c37c6]' : 'text-[#6b7280]'}`}>{s}</button>
                        : <span key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Interface Options */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6c37c6] text-xs font-black text-white">4</div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">Interface Options</h2>
                <p className="text-xs font-semibold text-[#6b7280]">Adjust small interface details that affect clarity, motion, and comfort.</p>
              </div>
            </div>
            <div className="divide-y divide-[#ead7b9]">
              {interfaceToggles.map(({ icon: Icon, color, label, desc, value, set }) => (
                <div key={label} className="flex items-start gap-3 px-5 py-3.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: `${color}18` }}>
                    <Icon className="h-3.5 w-3.5" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-[#06183a]">{label}</p>
                    <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">{desc}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 pt-0.5">
                    <span className="text-[11px] font-black" style={{ color: value ? '#0f8a77' : '#6b7280' }}>{value ? 'On' : 'Off'}</span>
                    <Toggle on={value} onChange={set} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Section 5: Live Preview ───────────────────────────────────── */}
        <section className="mb-4 overflow-hidden rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
          <div className="flex flex-wrap items-center gap-5 p-5">
            {/* Monitor illustration */}
            <div className="flex h-16 w-20 shrink-0 flex-col items-center">
              <div className="flex-1 w-full overflow-hidden rounded-[6px] border-2 border-[#c4aaee] bg-[#ede8fb] p-1.5">
                <div className="flex h-full gap-1">
                  <div className="w-4 bg-[#d9ccf5] rounded-sm" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 rounded-full bg-[#c4aaee]" />
                    <div className="h-1 rounded-full bg-[#c4aaee] w-2/3" />
                    <div className="grid grid-cols-2 gap-0.5 mt-1">
                      <div className="h-3 rounded-sm bg-[#c4aaee] opacity-60" />
                      <div className="h-3 rounded-sm bg-[#b6e8d9] opacity-60" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-0.5 h-1.5 w-6 bg-[#c4aaee] rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-lg font-bold text-[#3b1d72]">Live Preview</p>
              <p className="mt-0.5 text-sm font-semibold text-[#4a2b8a]">
                See your settings in action across Dashboard, Self-Map, and key pages.
              </p>
              <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">This preview reflects your current selections.</p>
            </div>
            <Link href="/dashboard?preview=appearance"
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#6c37c6] bg-white px-5 py-2.5 text-sm font-black text-[#6c37c6] shadow-[0_4px_12px_rgba(108,55,198,0.1)] hover:bg-[#f5f0ff] transition-colors whitespace-nowrap">
              Open Dashboard Preview <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* About Appearance */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">About Appearance</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Appearance changes how Meta-Aware feels, not what your map contains.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              Your data, maps, and insights remain exactly the same.
            </p>
            <Link href="/how-it-works/appearance" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Your experience matters */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0f8a77]" />
              <h2 className="text-sm font-black text-[#06183a]">Your experience matters.</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              A comfortable, clear environment helps you stay focused and reflect with clarity.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              You can change these settings anytime.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">Quick Actions</h2>
            </div>
            <div className="mt-3 space-y-1">
              <button onClick={resetToDefaults} className="flex w-full items-start gap-3 rounded-[8px] px-2 py-2.5 text-left hover:bg-[#fff8ee] transition-colors">
                <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-[#c97c1e]" />
                <div className="flex-1">
                  <p className="text-xs font-black text-[#06183a]">Reset to defaults</p>
                  <p className="text-[11px] font-semibold text-[#6b7280]">Restore the original appearance.</p>
                </div>
                <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d3b98f]" />
              </button>
              <button className="flex w-full items-start gap-3 rounded-[8px] px-2 py-2.5 text-left hover:bg-[#fff8ee] transition-colors">
                <Eye className="mt-0.5 h-4 w-4 shrink-0 text-[#6c37c6]" />
                <div className="flex-1">
                  <p className="text-xs font-black text-[#06183a]">Accessibility settings</p>
                  <p className="text-[11px] font-semibold text-[#6b7280]">More options to support your needs.</p>
                </div>
                <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d3b98f]" />
              </button>
              <button className="flex w-full items-start gap-3 rounded-[8px] px-2 py-2.5 text-left hover:bg-[#fff8ee] transition-colors">
                <Keyboard className="mt-0.5 h-4 w-4 shrink-0 text-[#176dff]" />
                <div className="flex-1">
                  <p className="text-xs font-black text-[#06183a]">Keyboard shortcuts</p>
                  <p className="text-[11px] font-semibold text-[#6b7280]">View and customize shortcuts.</p>
                </div>
                <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d3b98f]" />
              </button>
            </div>
          </div>

          {/* Need help? */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#c97c1e]" />
              <h2 className="text-sm font-black text-[#06183a]">Need help?</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Our support team is here if you have any questions.
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

// ─── Inline check icon (avoids extra import) ──────────────────────────────────
function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
