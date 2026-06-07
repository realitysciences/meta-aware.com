'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  Bell,
  BookOpen,
  Brain,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CircleUser,
  CreditCard,
  Database,
  Link2,
  Lock,
  LogOut,
  Map,
  Palette,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Upload,
  User,
  Zap,
} from 'lucide-react'

// ─── Settings cards ───────────────────────────────────────────────────────────

const settingsCards = [
  {
    n: 1,
    title: 'Account & Profile',
    desc: 'Manage your personal information, avatar, timezone, and language.',
    icon: User, iconColor: '#c97c1e', iconBg: '#fff8ee',
    href: '/dashboard/settings/account',
  },
  {
    n: 2,
    title: 'Privacy & Data',
    desc: 'Control your privacy, data permissions, encryption, export and delete options.',
    icon: ShieldCheck, iconColor: '#0f8a77', iconBg: '#f0faf6',
    href: '/dashboard/settings/privacy-data',
  },
  {
    n: 3,
    title: 'AI Memory & Saving',
    desc: 'Control what Reality Scientist AI may remember, suggest, or add to your map.',
    icon: Database, iconColor: '#176dff', iconBg: '#eff4ff',
    href: '/dashboard/settings/ai-memory-saving',
  },
  {
    n: 4,
    title: 'Reality Scientist AI Preferences',
    desc: 'Customize AI behavior, context mode, tone, and map update preferences.',
    icon: Brain, iconColor: '#6c37c6', iconBg: '#f5f0ff',
    href: '/dashboard/settings/reality-scientist-ai',
  },
  {
    n: 5,
    title: 'Map Preferences',
    desc: 'Set your default domain focus, session style, domain visibility, and Atlas preferences.',
    icon: Map, iconColor: '#c97c1e', iconBg: '#fff8ee',
    href: '/dashboard/settings/map-preferences',
  },
  {
    n: 6,
    title: 'Sources & Imports',
    desc: 'Manage file types, uploads, transcript imports, and connected sources.',
    icon: Upload, iconColor: '#176dff', iconBg: '#eff4ff',
    href: '/dashboard/settings/sources-imports',
  },
  {
    n: 7,
    title: 'Notifications',
    desc: 'Choose reminders, review prompts, weekly summaries, and alerts.',
    icon: Bell, iconColor: '#c97c1e', iconBg: '#fff8ee',
    href: '/dashboard/settings/notifications',
  },
  {
    n: 8,
    title: 'Billing & Plan',
    desc: 'View your plan, usage, invoices, and payment methods.',
    icon: CreditCard, iconColor: '#f0a638', iconBg: '#fffbee',
    href: '/dashboard/settings/billing',
  },
  {
    n: 9,
    title: 'Connected Accounts',
    desc: 'Manage Google, Apple, email and other connected accounts.',
    icon: Link2, iconColor: '#0f8a77', iconBg: '#f0faf6',
    href: '/dashboard/settings/connected-accounts',
  },
  {
    n: 10,
    title: 'Appearance',
    desc: 'Customize theme, color accents, and interface density.',
    icon: Palette, iconColor: '#6c37c6', iconBg: '#f5f0ff',
    href: '/dashboard/settings/appearance',
  },
  {
    n: 11,
    title: 'Security',
    desc: 'Manage password, authentication, sessions, and devices.',
    icon: Lock, iconColor: '#176dff', iconBg: '#eff4ff',
    href: '/dashboard/settings/security',
  },
  {
    n: 12,
    title: 'Help & Support',
    desc: 'Get help, view guides, and contact support.',
    icon: CircleHelp, iconColor: '#6c37c6', iconBg: '#f5f0ff',
    href: '/dashboard/settings/help-support',
  },
]

const avatarMenuItems = [
  { label: 'View Profile',       href: '/dashboard/settings/account',           icon: User },
  { label: 'Account Settings',   href: '/dashboard/settings/account',           icon: Settings },
  { label: 'Privacy Center',     href: '/dashboard/settings/privacy-data',      icon: ShieldCheck },
  { label: 'Billing / Plan',     href: '/dashboard/settings/billing',           icon: CreditCard },
  { label: 'Connected Accounts', href: '/dashboard/settings/connected-accounts',icon: Link2 },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 xl:pr-4">

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Settings</h1>
            <p className="mt-1.5 text-sm font-semibold leading-6 text-[#344263]">
              Manage your account, privacy, map preferences, AI behavior, and data.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>

            {/* Avatar menu */}
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
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#344263] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-colors"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-[#6b7280]" />
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-[#ead7b9] pt-1">
                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#c04060] hover:bg-[#fff0f0] transition-colors">
                      <LogOut className="h-4 w-4 shrink-0" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {avatarOpen && <div className="fixed inset-0 z-20" onClick={() => setAvatarOpen(false)} />}

        {/* 12-card grid */}
        <div className="grid gap-3 sm:grid-cols-2">
          {settingsCards.map(({ n, title, desc, icon: Icon, iconColor, iconBg, href }) => (
            <Link
              key={n}
              href={href}
              className="group flex items-center gap-4 rounded-[14px] border border-[#ead7b9] bg-white/76 p-5 shadow-[0_4px_12px_rgba(48,27,5,0.04)] transition-all hover:border-[#d9a461] hover:shadow-[0_8px_24px_rgba(48,27,5,0.08)]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: iconBg }}>
                <Icon className="h-7 w-7" style={{ color: iconColor }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black text-[#06183a]">
                  <span className="text-[#a0a8b8]">{n}. </span>
                  {title}
                </p>
                <p className="mt-1 text-sm font-semibold leading-5 text-[#6b7280]">{desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-[#d3b98f] transition-transform group-hover:translate-x-0.5 group-hover:text-[#c97c1e]" />
            </Link>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-4 flex items-center justify-between overflow-hidden rounded-[14px] border border-[#d9c49a] bg-[#fdf6e8] px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff8ee]">
              <Star className="h-5 w-5 text-[#c97c1e]" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[#5b3609]">You control how Meta-Aware grows with you.</p>
              <p className="mt-0.5 text-sm font-semibold text-[#7a5020]">Adjust your settings to protect your data, guide your map, and shape your transformation.</p>
            </div>
          </div>
          <Sparkles className="h-16 w-16 shrink-0 text-[#d9c49a] opacity-60" />
        </div>
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-6">

          {/* Privacy priority */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-black text-[#06183a]">Your privacy is our priority.</h2>
                <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
                  Your data is end-to-end encrypted and never shared.
                </p>
                <Link href="/dashboard/settings/privacy-data" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#0f8a77] hover:underline">
                  Visit Privacy Center <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0faf6]">
                <Lock className="h-6 w-6 text-[#0f8a77]" />
              </div>
            </div>
          </div>

          {/* Need help? */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-black text-[#06183a]">Need help?</h2>
                <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
                  Explore guides and articles to make the most of Meta-Aware.
                </p>
                <Link href="/dashboard/settings/help-support" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
                  Visit Help Center <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff8ee]">
                <BookOpen className="h-6 w-6 text-[#c97c1e]" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Quick Links</h2>
            <div className="mt-3 space-y-1">
              {[
                { label: 'How It Works',       href: '/#how-it-works', icon: CircleHelp },
                { label: 'Guidance & Exercises',href: '/guidance',     icon: Zap },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href} className="flex items-center justify-between rounded-[8px] px-2 py-2.5 hover:bg-[#fff8ee] transition-colors">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#c97c1e]" />
                    <span className="text-xs font-bold text-[#344263]">{label}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#d3b98f]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Account Menu Shortcuts */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Account Menu Shortcuts</h2>
            <div className="mt-3 space-y-0.5">
              {avatarMenuItems.map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href} className="flex items-center gap-2.5 rounded-[8px] px-2 py-2 text-xs font-semibold text-[#344263] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-colors">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#6b7280]" />
                  {label}
                </Link>
              ))}
              <div className="my-2 border-t border-[#ead7b9]" />
              <button className="flex w-full items-center gap-2.5 rounded-[8px] px-2 py-2 text-xs font-semibold text-[#c04060] hover:bg-[#fff0f0] transition-colors">
                <LogOut className="h-3.5 w-3.5 shrink-0" />
                Sign Out
              </button>
            </div>
            <p className="mt-3 flex items-start gap-1.5 text-[11px] font-semibold leading-4 text-[#a0a8b8]">
              <CircleHelp className="mt-0.5 h-3 w-3 shrink-0" />
              The menu above matches the shortcuts available in your account menu.
            </p>
          </div>

        </div>
      </aside>
    </div>
  )
}
