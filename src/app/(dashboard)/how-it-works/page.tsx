'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  CreditCard,
  ExternalLink,
  FileText,
  GitCompare,
  Lock,
  LogOut,
  Map,
  Play,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
  Link2,
} from 'lucide-react'

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',       href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',   href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',     href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',     href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts', href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Ontology layer card ──────────────────────────────────────────────────────

function OntologyCard({ num, icon: Icon, iconColor, iconBg, title, subtitle, body, tagline, taglineColor, borderColor }: {
  num: string; icon: React.ElementType; iconColor: string; iconBg: string
  title: string; subtitle: string; body: string
  tagline: string; taglineColor: string; borderColor: string
}) {
  return (
    <div className="flex flex-1 flex-col rounded-[14px] border border-[#ead7b9] bg-white p-6 shadow-[0_4px_12px_rgba(48,27,5,0.04)]"
      style={{ borderTop: `3px solid ${borderColor}` }}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px]" style={{ background: iconBg }}>
        <Icon className="h-6 w-6" style={{ color: iconColor }} />
      </div>
      <p className="font-serif text-xl font-bold text-[#06183a]">{num}. {title}</p>
      <p className="mt-0.5 text-sm font-black text-[#6b7280]">{subtitle}</p>
      <p className="mt-3 flex-1 text-sm font-semibold leading-6 text-[#344263]">{body}</p>
      <p className="mt-5 text-xs font-black" style={{ color: taglineColor }}>{tagline}</p>
    </div>
  )
}

// ─── Process step card ────────────────────────────────────────────────────────

function ProcessStep({ num, icon: Icon, iconColor, iconBg, title, body, tag, tagColor, tagBg }: {
  num: number; icon: React.ElementType; iconColor: string; iconBg: string
  title: string; body: string; tag: string; tagColor: string; tagBg: string
}) {
  return (
    <div className="flex flex-1 flex-col items-center rounded-[14px] border border-[#ead7b9] bg-white px-4 py-5 text-center shadow-[0_2px_8px_rgba(48,27,5,0.04)]" style={{ minWidth: 130 }}>
      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full border-2 font-black text-xs"
        style={{ borderColor: iconColor, color: iconColor }}>
        {num}
      </div>
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-5 w-5" style={{ color: iconColor }} />
      </div>
      <p className="font-serif text-base font-bold text-[#06183a]">{title}</p>
      <p className="mt-2 flex-1 text-xs font-semibold leading-5 text-[#6b7280]">{body}</p>
      <span className="mt-4 rounded-full border px-3 py-1 text-[11px] font-black"
        style={{ color: tagColor, background: tagBg, borderColor: tagColor + '40' }}>
        {tag}
      </span>
    </div>
  )
}

// ─── Trust band ───────────────────────────────────────────────────────────────

function TrustBand({ icon: Icon, iconColor, text, subtext }: {
  icon: React.ElementType; iconColor: string; text: string; subtext?: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-[12px] border border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: iconColor }} />
      <div>
        <p className="text-sm font-black text-[#06183a]">{text}</p>
        {subtext && <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">{subtext}</p>}
      </div>
    </div>
  )
}

// ─── Value card ───────────────────────────────────────────────────────────────

function ValueCard({ icon: Icon, iconColor, iconBg, title, body }: {
  icon: React.ElementType; iconColor: string; iconBg: string; title: string; body: string
}) {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-[14px] border border-[#ead7b9] bg-white p-5 shadow-[0_2px_8px_rgba(48,27,5,0.04)]" style={{ minWidth: 160 }}>
      <div className="flex h-10 w-10 items-center justify-center rounded-[10px]" style={{ background: iconBg }}>
        <Icon className="h-5 w-5" style={{ color: iconColor }} />
      </div>
      <p className="font-serif text-base font-bold text-[#06183a]">{title}</p>
      <p className="flex-1 text-xs font-semibold leading-5 text-[#6b7280]">{body}</p>
    </div>
  )
}

// ─── Arrow connector ──────────────────────────────────────────────────────────

function Arrow() {
  return (
    <div className="flex shrink-0 items-center text-[#d3b98f]">
      <svg width="24" height="2" viewBox="0 0 24 2"><line x1="0" y1="1" x2="20" y2="1" stroke="#d3b98f" strokeWidth="1.5" strokeDasharray="4 2" /></svg>
      <svg width="8" height="10" viewBox="0 0 8 10"><path d="M0,0 L8,5 L0,10 Z" fill="#d3b98f" /></svg>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* ── Page header ───────────────────────────────────────────── */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">How It Works</h1>
            <p className="mt-1 text-sm font-semibold text-[#344263]">
              Understand how Meta-Aware turns your experiences into a self-map you control.
            </p>
            <div className="mt-2 flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
              <p className="text-xs font-semibold text-[#6b7280]">
                <span className="font-black text-[#06183a]">You are the final authority on your map.</span>{' '}
                Nothing enters your Atlas without your review and approval.
              </p>
            </div>
          </div>
          {/* Header actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
              <Play className="h-4 w-4 text-[#6c37c6]" /> Watch Overview (4 min)
            </button>
            <button className="flex items-center gap-2 rounded-[10px] bg-[#6c37c6] px-4 py-2 text-sm font-black text-white shadow-[0_4px_12px_rgba(108,55,198,0.3)] hover:bg-[#5a2aae] transition-colors">
              <Zap className="h-4 w-4" /> Explore a Live Example
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

        {/* ── Section 1: Ontology ────────────────────────────────────── */}
        <section className="mb-6">
          <h2 className="mb-1 font-serif text-2xl font-bold text-[#06183a]">
            The Meta-Aware Ontology: Three Essential Layers
          </h2>
          <div className="mb-4 flex gap-4 overflow-x-auto pb-1">
            <OntologyCard
              num="1" icon={FileText} iconColor="#6c37c6" iconBg="#f5f0ff"
              title="Sources" subtitle="What You Bring In"
              body="You capture your experiences from voice, text, artifacts, scans, journals, and more."
              tagline="Raw material. Only you can add."
              taglineColor="#6c37c6" borderColor="#6c37c6"
            />
            <OntologyCard
              num="2" icon={Brain} iconColor="#176dff" iconBg="#eff4ff"
              title="Reflections" subtitle="What AI Suggests"
              body="Reality Scientist AI (TranscEngine) analyzes your sources and suggests reflections, patterns, and report-ready insights."
              tagline="Suggested interpretations. Not in your Atlas."
              taglineColor="#176dff" borderColor="#176dff"
            />
            <OntologyCard
              num="3" icon={ShieldCheck} iconColor="#0f8a77" iconBg="#f0faf6"
              title="Atlas" subtitle="What You Approve"
              body="You review, edit, connect, and approve what becomes part of your Atlas."
              tagline="Your reviewed truth. This is your map."
              taglineColor="#0f8a77" borderColor="#0f8a77"
            />
          </div>
          <TrustBand
            icon={ShieldCheck} iconColor="#0f8a77"
            text="The Atlas is your reviewed, connected, and synthesized understanding of yourself."
            subtext="Only what you approve is stored in your Atlas. You can remove or change anything at any time."
          />
        </section>

        {/* ── Section 2: Process ─────────────────────────────────────── */}
        <section className="mb-6">
          <h2 className="mb-1 font-serif text-2xl font-bold text-[#06183a]">
            The Meta-Aware Process: From Input to Atlas
          </h2>
          <p className="mb-4 text-sm font-semibold text-[#6b7280]">You are in control at every step.</p>

          <div className="overflow-x-auto pb-1">
            <div className="flex items-stretch gap-2" style={{ minWidth: 760 }}>
              <ProcessStep num={1} icon={FileText}    iconColor="#6c37c6" iconBg="#f5f0ff"
                title="Capture"
                body="You capture experiences from voice, text, artifacts, journals, and more."
                tag="Raw Input" tagColor="#6c37c6" tagBg="#f5f0ff" />
              <Arrow />
              <ProcessStep num={2} icon={Brain}       iconColor="#176dff" iconBg="#eff4ff"
                title="Understand"
                body="AI analyzes your inputs using TranscEngine to suggest reflections, patterns, and signals."
                tag="Suggested Views" tagColor="#176dff" tagBg="#eff4ff" />
              <Arrow />
              <ProcessStep num={3} icon={BadgeCheck}  iconColor="#0f8a77" iconBg="#f0faf6"
                title="Review"
                body="You review each suggestion. Keep, edit, dismiss, or keep watching."
                tag="You Decide" tagColor="#0f8a77" tagBg="#f0faf6" />
              <Arrow />
              <ProcessStep num={4} icon={GitCompare}  iconColor="#c97c1e" iconBg="#fff8ee"
                title="Connect"
                body="You connect insights across time and domains to reveal relationships."
                tag="Build Understanding" tagColor="#c97c1e" tagBg="#fff8ee" />
              <Arrow />
              <ProcessStep num={5} icon={TrendingUp}  iconColor="#6c37c6" iconBg="#f5f0ff"
                title="Synthesize"
                body="Reports & Insights summarize patterns and provide structured understanding."
                tag="Clear & Organized" tagColor="#6c37c6" tagBg="#f5f0ff" />
              <Arrow />
              <ProcessStep num={6} icon={ShieldCheck} iconColor="#0f8a77" iconBg="#f0faf6"
                title="Integrate"
                body="You choose what enters your Atlas. Guidance and practices are optional."
                tag="Approved by You" tagColor="#0f8a77" tagBg="#f0faf6" />
            </div>
          </div>

          <div className="mt-4">
            <TrustBand
              icon={Lock} iconColor="#344263"
              text="You can stop, change direction, or remove anything at any time. Your Atlas evolves with you."
            />
          </div>
        </section>

        {/* ── Section 3: What You Get ────────────────────────────────── */}
        <section className="mb-6">
          <h2 className="mb-1 font-serif text-2xl font-bold text-[#06183a]">What You Get</h2>
          <p className="mb-4 text-sm font-semibold text-[#6b7280]">
            Everything works together to help you see clearly and build a map that lasts.
          </p>
          <div className="flex gap-4 overflow-x-auto pb-1">
            <ValueCard icon={Users}     iconColor="#6c37c6" iconBg="#f5f0ff"
              title="Whole-Person Atlas"
              body="A complete, connected view of your thoughts, patterns, values, and experiences — built from your life." />
            <ValueCard icon={Lock}      iconColor="#0f8a77" iconBg="#f0faf6"
              title="Reviewed Source Memory"
              body="Your map is private, secure, and encrypted. We never share your data. Only you have access." />
            <ValueCard icon={GitCompare} iconColor="#c97c1e" iconBg="#fff8ee"
              title="Pattern Visibility"
              body="See connections across time, domains, and life areas that you may not see on your own." />
            <ValueCard icon={FileText}  iconColor="#6c37c6" iconBg="#f5f0ff"
              title="Synthesis Reports"
              body="Clear, structured reports that reveal what matters and what's changing." />
            <ValueCard icon={Sparkles}  iconColor="#0f8a77" iconBg="#f0faf6"
              title="Map-Informed Practices"
              body="Optional practices and prompts suggested from your map." />
          </div>
        </section>

        {/* ── Bottom disclaimer banner ───────────────────────────────── */}
        <div className="mb-4 flex items-start gap-3 rounded-[12px] border border-[#f0dca0] bg-[#fffbee] px-5 py-4">
          <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-[#c97c1e]" />
          <div>
            <p className="text-sm font-black text-[#06183a]">
              Meta-Aware is a private self-map and reflection system.
            </p>
            <p className="text-xs font-semibold text-[#6b7280]">
              It is not medical care, therapy, diagnosis, or professional advice.
            </p>
          </div>
        </div>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Core Principles */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <p className="text-sm font-black text-[#06183a]">Core Principles</p>
            <div className="mt-3 space-y-0 divide-y divide-[#e0d4f8]">
              {[
                { icon: Users,      iconColor: '#c97c1e', label: 'You Own Your Map',      sub: 'Your Atlas belongs to you.' },
                { icon: BadgeCheck, iconColor: '#0f8a77', label: 'We Guide, You Decide',  sub: 'We suggest. You choose.' },
                { icon: ShieldCheck,iconColor: '#6c37c6', label: 'Review Before Saving',  sub: 'Only reviewed material becomes part of your Atlas.' },
                { icon: Lock,       iconColor: '#176dff', label: 'Privacy by Design',     sub: 'Security and privacy are built into everything we do.' },
              ].map(({ icon: Icon, iconColor, label, sub }) => (
                <div key={label} className="flex items-start gap-2.5 py-3 first:pt-0 last:pb-0">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_1px_4px_rgba(108,55,198,0.1)]">
                    <Icon className="h-3.5 w-3.5" style={{ color: iconColor }} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#06183a]">{label}</p>
                    <p className="text-[10px] font-semibold leading-4 text-[#6b7280]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What Meta-Aware Is */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <p className="text-sm font-black text-[#06183a]">What Meta-Aware Is</p>
            <div className="mt-3 space-y-2">
              {[
                'A system for self-understanding',
                'A tool for clarity and self-understanding',
                'A map built from your life',
                'Private, secure, and you-controlled',
              ].map((text) => (
                <div key={text} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
                  <p className="text-xs font-semibold leading-5 text-[#344263]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Meta-Aware Is Not */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <p className="text-sm font-black text-[#06183a]">What Meta-Aware Is Not</p>
            <div className="mt-3 space-y-2">
              {[
                'Not therapy or medical care',
                'Not a diagnostic tool',
                'Not a replacement for professional advice',
                'Not a social platform',
                'Not about tracking or scoring you',
              ].map((text) => (
                <div key={text} className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#fff0f3]">
                    <X className="h-2.5 w-2.5 text-[#c04060]" />
                  </div>
                  <p className="text-xs font-semibold leading-5 text-[#344263]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Learn More */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <p className="text-sm font-black text-[#06183a]">Learn More</p>
            <div className="mt-3 space-y-0 divide-y divide-[#ead7b9]">
              {[
                'Privacy & Security',
                'Atlas & Data Ownership',
                'AI & How We Work',
                'Frequently Asked Questions',
                'Product Principles',
              ].map((label) => (
                <button key={label}
                  className="flex w-full items-center justify-between py-2.5 text-xs font-semibold text-[#344263] hover:text-[#6c37c6] transition-colors first:pt-0 last:pb-0">
                  {label}
                  <ExternalLink className="h-3 w-3 shrink-0 text-[#d3b98f]" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </aside>

    </div>
  )
}
