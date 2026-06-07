'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock,
  CreditCard,
  Droplets,
  Feather,
  FileText,
  Flame,
  Heart,
  Leaf,
  Link2,
  LogOut,
  Map,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Wind,
  Zap,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'recommended' | 'all' | 'focus' | 'quick' | 'journaling' | 'skill' | 'integration'

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',       href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',   href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',     href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',     href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts', href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, iconColor, iconBg, label, value, caption, valueColor, compact, linkLabel }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  label: string; value: string; caption: string
  valueColor?: string; compact?: boolean; linkLabel?: string
}) {
  return (
    <div className="flex min-w-[150px] flex-1 flex-col gap-1.5 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]">
      <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <p className="text-[11px] font-semibold text-[#6b7280]">{label}</p>
      <p className={`font-serif font-bold ${compact ? 'text-xl leading-tight' : 'text-3xl leading-none'}`}
        style={{ color: valueColor ?? '#06183a' }}>{value}</p>
      <p className="text-[11px] font-semibold leading-4 text-[#a0a8b8]">{caption}</p>
      {linkLabel && (
        <button className="mt-0.5 flex items-center gap-1 text-[11px] font-black text-[#c97c1e] hover:underline">
          {linkLabel} <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

// ─── Practice metadata pill ───────────────────────────────────────────────────

function MetaPill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#6b7280]">
      <Icon className="h-3 w-3 text-[#a0a8b8]" />
      {label}
    </span>
  )
}

// ─── Why recommended box ──────────────────────────────────────────────────────

function WhyBox({ text }: { text: string }) {
  return (
    <div className="rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2.5">
      <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">Why this was recommended</p>
      <p className="text-xs font-semibold leading-5 text-[#344263]">{text}</p>
    </div>
  )
}

// ─── Recommendation practice card ────────────────────────────────────────────

function RecommendedCard({ focusLabel, focusColor, icon: Icon, iconColor, iconBg, title, description,
  time, type, level, whyText, accentBorder }: {
  focusLabel: string; focusColor: string
  icon: React.ElementType; iconColor: string; iconBg: string
  title: string; description: string
  time: string; type: string; level: string
  whyText: string; accentBorder: string
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]"
      style={{ borderTop: `3px solid ${accentBorder}` }}>
      <div className="flex-1 p-5">
        {/* Focus label */}
        <p className="mb-3 text-[10px] font-black uppercase tracking-widest" style={{ color: focusColor }}>
          Focus: {focusLabel}
        </p>
        {/* Icon + title */}
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px]" style={{ background: iconBg }}>
            <Icon className="h-6 w-6" style={{ color: iconColor }} />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold leading-snug text-[#06183a]">{title}</h2>
            <p className="mt-1 text-xs font-semibold leading-5 text-[#6b7280]">{description}</p>
          </div>
        </div>
        {/* Metadata row */}
        <div className="mb-4 flex flex-wrap items-center gap-3 border-t border-[#ead7b9] pt-3">
          <MetaPill icon={Clock}     label={time} />
          <MetaPill icon={BookOpen}  label={type} />
          <span className="rounded-full border border-[#ead7b9] bg-[#faf6f0] px-2 py-0.5 text-[10px] font-black text-[#6b7280]">{level}</span>
        </div>
        {/* Why recommended */}
        <WhyBox text={whyText} />
      </div>
      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-[#ead7b9] bg-[#faf6f0] px-4 py-3">
        <button className="flex items-center gap-1.5 rounded-[8px] px-4 py-2 text-sm font-black text-white transition-colors"
          style={{ background: accentBorder }}>
          Begin Practice
        </button>
        <button className="rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-sm font-semibold text-[#344263] hover:bg-white transition-colors">
          Preview
        </button>
        <button className="rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-sm font-semibold text-[#6b7280] hover:bg-[#faf6f0] transition-colors">
          Not relevant now
        </button>
        <button className="ml-auto text-[#a0a8b8] hover:text-[#344263] transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}

// ─── In-progress card ─────────────────────────────────────────────────────────

function InProgressCard({ icon: Icon, iconColor, iconBg, title, pct, description, time, type }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  title: string; pct: number; description: string; time: string; type: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-5 w-5" style={{ color: iconColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-black text-[#06183a]">{title}</p>
          <span className="shrink-0 text-[11px] font-black text-[#6c37c6]">{pct}% complete</span>
        </div>
        {/* Progress bar */}
        <div className="my-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#ead7b9]">
          <div className="h-full rounded-full bg-[#6c37c6]" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs font-semibold leading-5 text-[#6b7280]">{description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <MetaPill icon={Clock}    label={time} />
          <MetaPill icon={BookOpen} label={type} />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button className="rounded-[8px] border border-[#e0d4f8] bg-[#f5f0ff] px-4 py-2 text-sm font-black text-[#6c37c6] hover:bg-[#ede8fb] transition-colors">
          Continue
        </button>
        <button className="text-[#a0a8b8] hover:text-[#344263] transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Quick practice card ──────────────────────────────────────────────────────

function QuickCard({ icon: Icon, iconColor, iconBg, title, description, time }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  title: string; description: string; time: string
}) {
  return (
    <button className="flex flex-col gap-2 rounded-[12px] border border-[#ead7b9] bg-white p-4 text-left hover:border-[#e0d4f8] hover:bg-[#f8f5ff] transition-all group">
      <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <p className="text-sm font-black text-[#06183a] group-hover:text-[#6c37c6] transition-colors">{title}</p>
      <p className="text-[11px] font-semibold leading-4 text-[#6b7280]">{description}</p>
      <span className="flex items-center gap-1 text-[11px] font-black text-[#a0a8b8]">
        <Clock className="h-3 w-3" /> {time}
      </span>
    </button>
  )
}

// ─── Bar row ──────────────────────────────────────────────────────────────────

function BarRow({ label, value, display, max, color = '#6c37c6' }: {
  label: string; value: number; display?: string; max: number; color?: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold text-[#344263]">
        <span className="truncate pr-2">{label}</span>
        <span className="shrink-0 font-black">{display ?? value}</span>
      </div>
      <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-[#ead7b9]">
        <div className="h-full rounded-full" style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: color }} />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GuidancePage() {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [activeTab,  setActiveTab]  = useState<Tab>('recommended')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'recommended',  label: 'Recommended for You' },
    { key: 'all',          label: 'Browse All' },
    { key: 'focus',        label: 'By Focus Area' },
    { key: 'quick',        label: 'Quick Practices' },
    { key: 'journaling',   label: 'Journaling Prompts' },
    { key: 'skill',        label: 'Skill Building' },
    { key: 'integration',  label: 'Integration Practices' },
  ]

  return (
    <div className="flex min-h-screen bg-[#fffaf2] pb-20">

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* ── Page header ───────────────────────────────────────────── */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Guidance &amp; Exercises</h1>
            <p className="mt-1 text-sm font-semibold text-[#344263]">
              Map-informed practices to help you explore, test, and integrate what your map is showing.
            </p>
            <div className="mt-2 flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
              <p className="text-xs font-semibold text-[#6b7280]">
                Guidance is suggested from your reviewed map material.{' '}
                <span className="font-black text-[#06183a]">You choose what is useful, what to ignore, and what to return to later.</span>
              </p>
            </div>
          </div>
          {/* Header actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
              <Plus className="h-4 w-4" /> New Custom Practice
            </button>
            <button className="flex items-center gap-2 rounded-[10px] bg-[#6c37c6] px-4 py-2 text-sm font-black text-white shadow-[0_4px_12px_rgba(108,55,198,0.3)] hover:bg-[#5a2aae] transition-colors">
              <Star className="h-4 w-4" />
              Practice Log
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-[#6c37c6]">12</span>
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

        {/* ── Stat cards ─────────────────────────────────────────────── */}
        <div className="mb-4 flex gap-3 overflow-x-auto pb-1">
          <StatCard icon={FileText}   iconColor="#6c37c6" iconBg="#f5f0ff"
            label="Recommended for You" value="6"  caption="Map-informed practices chosen for your focus."
            linkLabel="See recommendations" />
          <StatCard icon={BadgeCheck} iconColor="#0f8a77" iconBg="#f0faf6"
            label="In Progress" value="3" caption="Practices you've started and can continue."
            linkLabel="Continue practice" />
          <StatCard icon={Star}       iconColor="#c97c1e" iconBg="#fff8ee"
            label="Integrated" value="18" caption="Practices you completed, reviewed, or returned to."
            linkLabel="View integrated" />
          <StatCard icon={Target}     iconColor="#176dff" iconBg="#eff4ff"
            label="Focus Areas" value="5" caption="Areas selected from your map and patterns."
            linkLabel="Review focus areas" />
          <StatCard icon={Droplets}   iconColor="#0f8a77" iconBg="#f0faf6"
            label="Practice Rhythm" value="7 days" valueColor="#0f8a77"
            caption="Active this month. Small steps, no pressure." compact
            linkLabel="View rhythm" />
        </div>

        {/* ── Tabs ───────────────────────────────────────────────────── */}
        <div className="mb-5 border-b border-[#ead7b9]">
          <div className="flex overflow-x-auto">
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

        {/* ── Section 1: Recommended for You ────────────────────────── */}
        <section className="mb-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-base font-black text-[#06183a]">
                Recommended for You
                <CircleHelp className="h-3.5 w-3.5 text-[#a0a8b8]" />
              </h2>
              <p className="text-xs font-semibold text-[#6b7280]">
                Practices recommended from your reflections, patterns, and current focus areas.
              </p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              See all recommendations <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <RecommendedCard
              focusLabel="Boundaries" focusColor="#0f8a77"
              icon={Map} iconColor="#0f8a77" iconBg="#f0faf6"
              title="Boundary Clarity Mapping"
              description="Explore where your boundaries are clear, where they're challenged, and where you want more clarity."
              time="20–30 min" type="Reflection + Mapping" level="Intermediate"
              whyText="Your recent reflections show boundary tension in relationships and decision-making."
              accentBorder="#0f8a77"
            />
            <RecommendedCard
              focusLabel="Identity" focusColor="#c97c1e"
              icon={Target} iconColor="#c97c1e" iconBg="#fff8ee"
              title="Core Values Clarification"
              description="Connect with what matters most to you and how your values show up in daily choices."
              time="15–25 min" type="Reflection" level="Beginner"
              whyText="Strengthening your values can support clearer decisions and stronger self-trust."
              accentBorder="#c97c1e"
            />
            <RecommendedCard
              focusLabel="Communication" focusColor="#6c37c6"
              icon={MessageCircle} iconColor="#6c37c6" iconBg="#f5f0ff"
              title="Clear Statement Practice"
              description="Practice stating what you need, think, or feel with clarity and respect."
              time="15–20 min" type="Audio Guided" level="Beginner"
              whyText="Your patterns suggest opportunities to express your needs more consistently."
              accentBorder="#6c37c6"
            />
          </div>
        </section>

        {/* ── Section 2: Continue In Progress ───────────────────────── */}
        <section className="mb-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Continue Your In Progress Practices</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Pick up where you left off.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View all in progress <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            <InProgressCard
              icon={Brain}  iconColor="#6c37c6" iconBg="#f5f0ff"
              title="Limiting Beliefs Inquiry" pct={60}
              description="Identify and challenge beliefs that may be holding you back."
              time="25 min total" type="Reflection"
            />
            <InProgressCard
              icon={Heart}  iconColor="#c97c1e" iconBg="#fff8ee"
              title="Emotional Pattern Decoder" pct={40}
              description="Explore your emotional patterns and what they're trying to tell you."
              time="30 min total" type="Deep Dive"
            />
            <InProgressCard
              icon={Users}  iconColor="#0f8a77" iconBg="#f0faf6"
              title="Evidence of Support Review" pct={75}
              description="Identify support, resources, and people you can rely on."
              time="15 min total" type="Journaling"
            />
          </div>
        </section>

        {/* ── Section 3: Quick Practices ─────────────────────────────── */}
        <section className="mb-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Quick Practices (5–10 minutes)</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Short, map-informed practices for any moment.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View all quick practices <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <QuickCard icon={Leaf}    iconColor="#0f8a77" iconBg="#f0faf6"
              title="Present Contact Reset"   description="Re-center yourself in the present moment." time="5 min" />
            <QuickCard icon={Wind}    iconColor="#176dff" iconBg="#eff4ff"
              title="Nervous System Check"    description="Notice and settle your nervous system." time="5 min" />
            <QuickCard icon={Target}  iconColor="#c97c1e" iconBg="#fff8ee"
              title="Focus Check-In"          description="Reconnect with what matters now." time="5 min" />
            <QuickCard icon={Heart}   iconColor="#c04060" iconBg="#fff0f3"
              title="Pressure Release Check"  description="Notice internal pressure and release it." time="5 min" />
            <QuickCard icon={Zap}     iconColor="#0f8a77" iconBg="#f0faf6"
              title="Energy Signal Scan"      description="Notice and name your current energy." time="5 min" />
            {/* View all card */}
            <button className="flex flex-col items-center justify-center gap-2 rounded-[12px] border border-dashed border-[#ead7b9] bg-[#faf6f0] p-4 text-center hover:border-[#c4aaee] hover:bg-[#f8f5ff] transition-all group">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white group-hover:border-[#e0d4f8] group-hover:bg-[#f5f0ff] transition-colors">
                <Plus className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <p className="text-xs font-black text-[#6c37c6]">View all quick practices</p>
            </button>
          </div>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Today's Small Practice */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#6c37c6]" />
              <p className="text-sm font-black text-[#06183a]">Today&apos;s Small Practice</p>
            </div>
            <p className="mt-1.5 text-[11px] font-semibold text-[#6b7280]">Based on your current focus area:</p>
            <span className="mt-1 inline-block rounded-full border border-[#b6e8d9] bg-[#f0faf6] px-2.5 py-0.5 text-[11px] font-black text-[#0f8a77]">Boundaries</span>
            <p className="mt-3 font-serif text-base font-bold leading-snug text-[#06183a]">
              Name the boundary before explaining it.
            </p>
            <p className="mt-1 text-[11px] font-semibold text-[#a0a8b8]">5 minutes · Optional</p>
            <button className="mt-3 w-full rounded-[8px] border border-[#e0d4f8] bg-white py-2 text-sm font-black text-[#6c37c6] hover:bg-[#ede8fb] transition-colors">
              Try it now
            </button>
            <button className="mt-2 flex items-center gap-1 text-xs font-black text-[#6c37c6] hover:underline">
              See more small practices <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Current Focus Areas */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-[#176dff]" />
              <p className="text-sm font-black text-[#06183a]">Current Focus Areas</p>
            </div>
            <div className="mt-3 space-y-0 divide-y divide-[#ead7b9]">
              {[
                { icon: ShieldCheck, iconColor: '#0f8a77',  label: 'Boundaries',         sub: 'Strengthen and clarify' },
                { icon: MessageCircle, iconColor: '#6c37c6',label: 'Communication',       sub: 'Express with confidence' },
                { icon: Heart,       iconColor: '#c04060',  label: 'Self-Worth',          sub: 'Build self-trust' },
                { icon: Target,      iconColor: '#176dff',  label: 'Decision-Making',     sub: 'Align choices with values' },
                { icon: Brain,       iconColor: '#c97c1e',  label: 'Emotional Awareness', sub: 'Understand and regulate' },
              ].map(({ icon: Icon, iconColor, label, sub }) => (
                <div key={label} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: iconColor }} />
                    <div>
                      <p className="text-xs font-black text-[#06183a]">{label}</p>
                      <p className="text-[10px] font-semibold text-[#6b7280]">{sub}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#d3b98f]" />
                </div>
              ))}
            </div>
            <button className="mt-2 flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              Review focus areas <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Practice Log */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#6c37c6]" />
                <p className="text-sm font-black text-[#06183a]">Your Practice Log</p>
              </div>
              <p className="text-[11px] font-semibold text-[#a0a8b8]">This Month</p>
            </div>
            <div className="mt-3 space-y-2.5">
              <BarRow label="Practices Started"    value={12} max={18} />
              <BarRow label="In Progress"          value={3}  max={18} color="#0f8a77" />
              <BarRow label="Practices Integrated" value={18} max={18} color="#c97c1e" />
              <BarRow label="Reflections Added"    value={9}  max={18} color="#176dff" />
              <BarRow label="Practice Rhythm"      value={7}  max={18} display="7 days" color="#0f8a77" />
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View full practice log <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* How Map-Guidance Works */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0f8a77]" />
              <p className="text-sm font-black text-[#06183a]">How Map-Guidance Works</p>
            </div>
            <div className="mt-3 space-y-2">
              {[
                'Suggestions come from your reviewed map.',
                'You stay in control of what you explore.',
                'Small, consistent steps create lasting change.',
                'Nothing is pushed on you. Ever.',
              ].map((text) => (
                <div key={text} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
                  <p className="text-xs font-semibold leading-5 text-[#344263]">{text}</p>
                </div>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#0f8a77] hover:underline">
              Learn more <ArrowRight className="h-3 w-3" />
            </button>
          </div>

        </div>
      </aside>

      {/* ── Bottom review banner ───────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 md:ml-64">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#b6e8d9] bg-[#f2faf6]/96 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#0f8a77]" />
            <div>
              <p className="text-sm font-black text-[#0a5c4e]">You are the final authority on your map.</p>
              <p className="text-xs font-semibold text-[#1a6b5a]">
                Review patterns, connections, and suggestions before anything enters your Atlas.
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
