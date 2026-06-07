'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Brain,
  Calendar,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Heart,
  Lightbulb,
  Link2,
  LogOut,
  MessageSquare,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  User,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Duration = 'forever' | '90days' | '30days' | 'none'

// ─── Data ─────────────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',             icon: User },
  { label: 'Account Settings',    href: '/dashboard/settings/account',             icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',        icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',             icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts',  icon: Link2 },
]

const memoryCategories = [
  {
    icon: User,
    iconColor: '#6c37c6',
    iconBg: '#f5f0ff',
    label: 'About You',
    desc: 'Core facts about you that help AI understand who you are.',
    status: 'Custom',
    statusColor: '#6c37c6',
    href: '/dashboard/settings/ai-memory-saving/about-you',
  },
  {
    icon: Target,
    iconColor: '#0f8a77',
    iconBg: '#f0faf6',
    label: 'Goals & Intentions',
    desc: 'Your goals, intentions, and what matters most to you.',
    status: 'On',
    statusColor: '#0f8a77',
    href: '/dashboard/settings/ai-memory-saving/goals-intentions',
  },
  {
    icon: Heart,
    iconColor: '#c04060',
    iconBg: '#fff0f3',
    label: 'Values & Beliefs',
    desc: 'Your values, beliefs, and guiding principles.',
    status: 'On',
    statusColor: '#0f8a77',
    href: '/dashboard/settings/ai-memory-saving/values-beliefs',
  },
  {
    icon: Lightbulb,
    iconColor: '#c97c1e',
    iconBg: '#fff8ee',
    label: 'Insights & Patterns',
    desc: 'Insights, patterns, and themes discovered in your data.',
    status: 'Custom',
    statusColor: '#6c37c6',
    href: '/dashboard/settings/ai-memory-saving/insights-patterns',
  },
  {
    icon: Calendar,
    iconColor: '#176dff',
    iconBg: '#eff4ff',
    label: 'Preferences & Habits',
    desc: 'Preferences, routines, and habits you\'ve shared.',
    status: 'On',
    statusColor: '#0f8a77',
    href: '/dashboard/settings/ai-memory-saving/preferences-habits',
  },
  {
    icon: MessageSquare,
    iconColor: '#6c37c6',
    iconBg: '#f5f0ff',
    label: 'Conversations',
    desc: 'Key takeaways and context from your conversations.',
    status: 'Custom',
    statusColor: '#6c37c6',
    href: '/dashboard/settings/ai-memory-saving/conversations',
  },
]

const durationOptions: { value: Duration; label: string; desc: string }[] = [
  { value: 'forever', label: 'Keep until I change it', desc: 'Remain in memory until you update or delete it.' },
  { value: '90days',  label: 'Keep for 90 days',       desc: 'Automatically remove after 90 days.' },
  { value: '30days',  label: 'Keep for 30 days',       desc: 'Automatically remove after 30 days.' },
  { value: 'none',    label: 'Don\'t keep',            desc: 'Only use in the moment. Don\'t remember.' },
]

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? 'bg-[#6c37c6]' : 'bg-[#d1d5db]'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIMemorySavingPage() {
  const [avatarOpen, setAvatarOpen]     = useState(false)
  const [duration, setDuration]         = useState<Duration>('forever')
  const [personalize, setPersonalize]   = useState(true)
  const [connections, setConnections]   = useState(true)
  const [proactive, setProactive]       = useState(false)
  const [mapSuggest, setMapSuggest]     = useState(true)

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Back + header */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              href="/dashboard/settings/privacy-data"
              className="mb-3 flex items-center gap-1.5 text-xs font-bold text-[#6b7280] hover:text-[#c97c1e] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Privacy &amp; Data
            </Link>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">AI Memory &amp; Saving</h1>
            <p className="mt-1.5 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Choose what Reality Scientist AI may remember, how long it can keep it,
              and how it can use your data to support your self-map.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors"
              aria-label="Help"
            >
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

        {/* ── Hero memory card ──────────────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
          <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#ede8fb]">
                <Brain className="h-8 w-8 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#3b1d72]">You&apos;re in control of AI memory.</h2>
                <p className="mt-1.5 text-sm font-semibold leading-6 text-[#4a2b8a]">
                  Reality Scientist AI only remembers what you allow.<br />
                  You can change these settings anytime.
                </p>
                <Link href="/how-it-works/ai-memory" className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-[#6c37c6] hover:underline">
                  Learn more about AI memory <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="shrink-0 sm:border-l sm:border-[#e0d4f8] sm:pl-6">
              <ul className="space-y-2">
                {[
                  'You decide what gets remembered',
                  'AI only uses what you allow',
                  'Nothing is added to your map without your review',
                  'You can clear or pause memory anytime',
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

        {/* ── Section 1: What Reality Scientist AI May Remember ────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div>
              <h2 className="text-base font-black text-[#06183a]">What Reality Scientist AI May Remember</h2>
              <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">
                Choose the types of information AI may remember about you. You&apos;re always in control.
              </p>
            </div>
            <div className="text-right">
              <Link
                href="/dashboard/settings/ai-memory-saving/review"
                className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#e0d4f8] bg-white px-3 py-2 text-xs font-black text-[#6c37c6] hover:bg-[#f5f0ff] transition-colors"
              >
                Review Remembered Items <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <p className="mt-1 text-[11px] font-semibold text-[#a0a8b8]">See, edit, or delete what AI currently remembers.</p>
            </div>
          </div>
          <div className="divide-y divide-[#ead7b9]">
            {memoryCategories.map(({ icon: Icon, iconColor, iconBg, label, desc, status, statusColor, href }) => (
              <Link key={label} href={href} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#faf6f0] transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: iconBg }}>
                  <Icon className="h-4 w-4" style={{ color: iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-[#06183a]">{label}</p>
                  <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">{desc}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-black" style={{ color: statusColor }}>{status}</span>
                  <ChevronRight className="h-4 w-4 text-[#d3b98f]" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Sections 2 + 3: Duration & Behavior ─────────────────────── */}
        <div className="mb-3 grid gap-3 lg:grid-cols-2">

          {/* Memory Duration */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div>
                <h2 className="text-base font-black text-[#06183a]">Memory Duration</h2>
                <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Choose how long AI can keep remembered information.</p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Sparkles className="h-4 w-4 text-[#6c37c6]" />
              </div>
            </div>
            <div className="space-y-1 p-4">
              {durationOptions.map(({ value, label, desc }) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-start gap-3 rounded-[10px] border p-3.5 transition-colors ${
                    duration === value
                      ? 'border-[#c4aaee] bg-[#f5f0ff]'
                      : 'border-transparent hover:bg-[#faf6f0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="duration"
                    value={value}
                    checked={duration === value}
                    onChange={() => setDuration(value)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#6c37c6]"
                  />
                  <div>
                    <p className="text-sm font-black text-[#06183a]">{label}</p>
                    <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="border-t border-[#ead7b9] bg-[#faf6f0] px-5 py-3">
              <p className="flex items-center gap-2 text-xs font-semibold text-[#6b7280]">
                <CircleHelp className="h-3.5 w-3.5 shrink-0 text-[#6c37c6]" />
                You can also pause or clear all memory anytime.
              </p>
              <Link
                href="/dashboard/settings/ai-memory-saving/controls"
                className="mt-1.5 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline"
              >
                Manage Memory Controls <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </section>

          {/* Memory Behavior */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div>
                <h2 className="text-base font-black text-[#06183a]">Memory Behavior</h2>
                <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Control how AI uses what it remembers.</p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Settings className="h-4 w-4 text-[#6c37c6]" />
              </div>
            </div>
            <div className="divide-y divide-[#ead7b9]">
              {[
                {
                  label: 'Use memory to personalize responses',
                  desc: 'AI tailors responses based on what you\'ve shared.',
                  value: personalize,
                  set: setPersonalize,
                },
                {
                  label: 'Suggest connections across my data',
                  desc: 'AI connects dots across sessions and sources.',
                  value: connections,
                  set: setConnections,
                },
                {
                  label: 'Offer proactive insights',
                  desc: 'AI may offer insights based on remembered patterns.',
                  value: proactive,
                  set: setProactive,
                },
                {
                  label: 'Suggest map additions, requiring review',
                  desc: 'AI can suggest additions to your Self-Map. Nothing is added without your review.',
                  value: mapSuggest,
                  set: setMapSuggest,
                },
              ].map(({ label, desc, value, set }) => (
                <div key={label} className="flex items-start gap-4 px-5 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-[#06183a]">{label}</p>
                    <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">{desc}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 pt-0.5">
                    <span className="text-xs font-black" style={{ color: value ? '#0f8a77' : '#6b7280' }}>
                      {value ? 'On' : 'Off'}
                    </span>
                    <Toggle on={value} onChange={set} />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#ead7b9] bg-[#faf6f0] px-5 py-3">
              <Link
                href="/dashboard/settings/ai-memory-saving/examples"
                className="flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline"
              >
                See examples of how this works <ArrowRight className="h-3 w-3" />
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
              <p className="font-serif text-lg font-bold text-[#0a5c4e]">You are in control.</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1a6b5a]">
                AI only remembers what you allow, and nothing is added to your map without your review.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/settings/ai-memory-saving/review"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#0f8a77] bg-white px-5 py-2.5 text-sm font-black text-[#0f8a77] shadow-[0_4px_12px_rgba(15,138,119,0.1)] hover:bg-[#f0faf6] transition-colors"
          >
            Review My Memory <ChevronRight className="h-4 w-4" />
          </Link>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Memory Summary */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">Memory Summary</h2>
            </div>
            <p className="mt-1 text-[11px] font-semibold text-[#6b7280]">A snapshot of your AI memory settings.</p>
            <div className="mt-3 divide-y divide-[#e0d4f8]">
              {[
                { label: 'Status',            value: 'Custom',       valueColor: '#6c37c6', chevron: true },
                { label: 'Last updated',      value: 'May 16, 2025', valueColor: '#344263', chevron: false },
                { label: 'Items remembered',  value: '36',           valueColor: '#344263', chevron: false },
              ].map(({ label, value, valueColor, chevron }) => (
                <div key={label} className="flex items-center justify-between py-2.5">
                  <p className="text-xs font-semibold text-[#6b7280]">{label}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black" style={{ color: valueColor }}>{value}</span>
                    {chevron && <ChevronRight className="h-3 w-3 text-[#c4aaee]" />}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/settings/ai-memory-saving/review"
              className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline"
            >
              View remembered items <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Privacy First */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0f8a77]" />
              <h2 className="text-sm font-black text-[#06183a]">Privacy First</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              AI memory is private to you.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              It&apos;s never shared or used to train models.
            </p>
            <Link
              href="/dashboard/settings/privacy-data"
              className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#0f8a77] hover:underline"
            >
              Learn more about our approach <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Related Settings */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Related Settings</h2>
            <div className="mt-3 space-y-1">
              {[
                { icon: ShieldCheck, color: '#0f8a77', label: 'Privacy & Data',          sub: 'Control permissions and data use.',     href: '/dashboard/settings/privacy-data' },
                { icon: Sparkles,    color: '#c97c1e', label: 'Source-to-Map Suggestions',sub: 'Manage what AI can suggest.',           href: '/dashboard/settings/privacy-data' },
                { icon: Lightbulb,   color: '#176dff', label: 'Insights & Summaries',     sub: 'Control how insights are generated.',   href: '/dashboard/settings/privacy-data' },
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
            <Link
              href="/dashboard/settings/help-support"
              className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline"
            >
              Go to Help Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </aside>
    </div>
  )
}
