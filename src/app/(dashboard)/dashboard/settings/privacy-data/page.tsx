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
  Download,
  Eye,
  Globe,
  Key,
  Link2,
  Lock,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react'

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',             icon: User },
  { label: 'Account Settings',    href: '/dashboard/settings/account',             icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',        icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',             icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts',  icon: Link2 },
]

const permissionRows = [
  {
    icon: Brain,
    iconColor: '#6c37c6',
    iconBg: '#f5f0ff',
    label: 'AI Memory & Saving',
    desc: 'Allow Reality Scientist AI to remember and learn from your data.',
    status: 'Custom',
    statusColor: '#6c37c6',
    href: '/dashboard/settings/ai-memory-saving',
  },
  {
    icon: TrendingUp,
    iconColor: '#0f8a77',
    iconBg: '#f0faf6',
    label: 'Map Growth & Updates',
    desc: 'Allow AI to suggest and add things to your map.',
    status: 'On',
    statusColor: '#0f8a77',
    href: null,
  },
  {
    icon: Zap,
    iconColor: '#c97c1e',
    iconBg: '#fff8ee',
    label: 'Source-to-Map Suggestions',
    desc: 'Allow Meta-Aware to suggest connections from sessions, journals, transcripts, artifacts, and lens scans.',
    status: 'On',
    statusColor: '#0f8a77',
    href: null,
  },
  {
    icon: Sparkles,
    iconColor: '#176dff',
    iconBg: '#eff4ff',
    label: 'Insights & Summaries',
    desc: 'Allow AI to generate insights and summaries from your data.',
    status: 'On',
    statusColor: '#0f8a77',
    href: null,
  },
  {
    icon: Eye,
    iconColor: '#6b7280',
    iconBg: '#f3f4f6',
    label: 'Usage Analytics (Private)',
    desc: 'Help improve Meta-Aware with private, anonymized analytics.',
    status: 'Off',
    statusColor: '#6b7280',
    href: null,
  },
]

const dataManagementCards = [
  {
    icon: Download,
    iconColor: '#176dff',
    iconBg: '#eff4ff',
    label: 'Export Your Data',
    desc: 'Download a copy of your data.',
    href: '/dashboard/settings/privacy-data/export',
    danger: false,
  },
  {
    icon: Eye,
    iconColor: '#0f8a77',
    iconBg: '#f0faf6',
    label: 'Review Your Data',
    desc: 'See and manage what we store.',
    href: '/dashboard/settings/privacy-data/review',
    danger: false,
  },
  {
    icon: Trash2,
    iconColor: '#c04060',
    iconBg: '#fff0f3',
    label: 'Delete Your Data',
    desc: 'Permanently delete your data.',
    href: '/dashboard/settings/privacy-data/delete',
    danger: true,
  },
  {
    icon: Clock,
    iconColor: '#6c37c6',
    iconBg: '#f5f0ff',
    label: 'Retention Settings',
    desc: 'Choose how long we keep data.',
    href: '/dashboard/settings/privacy-data/retention',
    danger: false,
  },
]

const securityRows = [
  {
    icon: Lock,
    iconColor: '#0f8a77',
    label: 'Encryption',
    desc: 'End-to-end encryption for all data.',
    status: 'Active',
    statusColor: '#0f8a77',
    badge: true,
    href: null,
  },
  {
    icon: Globe,
    iconColor: '#176dff',
    label: 'Data Location',
    desc: 'Stored securely in the United States.',
    status: 'US',
    statusColor: '#344263',
    badge: false,
    href: '/dashboard/settings/privacy-data/data-location',
  },
  {
    icon: Key,
    iconColor: '#0f8a77',
    label: 'Access',
    desc: 'Only you and authorized AI systems.',
    status: 'Private',
    statusColor: '#0f8a77',
    badge: true,
    href: null,
  },
  {
    icon: ShieldCheck,
    iconColor: '#0f8a77',
    label: 'Data Sharing',
    desc: 'We never sell or share your data.',
    status: 'Never',
    statusColor: '#0f8a77',
    badge: true,
    href: null,
  },
]

export default function PrivacyDataPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)

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
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Privacy &amp; Data</h1>
            <p className="mt-1.5 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Control what Meta-Aware saves, what Reality Scientist AI may use, and how your map data is protected.
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
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f2c78c] to-[#8a4b25] font-serif text-sm font-bold text-white">
                  D
                </div>
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
                      <LogOut className="h-4 w-4 shrink-0" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {avatarOpen && <div className="fixed inset-0 z-20" onClick={() => setAvatarOpen(false)} />}

        {/* ── Hero privacy card ─────────────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
          <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center">
            {/* Left */}
            <div className="flex flex-1 items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e0f5ee]">
                <ShieldCheck className="h-8 w-8 text-[#0f8a77]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0a5c4e]">Your privacy is our foundation.</h2>
                <p className="mt-1.5 text-sm font-semibold leading-6 text-[#1a6b5a]">
                  Your data is end-to-end encrypted and never shared.<br />
                  You&apos;re in control of what&apos;s saved, used, and deleted.
                </p>
                <Link
                  href="/privacy"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-[#0f8a77] hover:underline"
                >
                  Learn more about our privacy <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            {/* Right checklist */}
            <div className="shrink-0 sm:border-l sm:border-[#b6e8d9] sm:pl-6">
              <ul className="space-y-2">
                {[
                  'End-to-end encrypted',
                  'You own your data',
                  'You control what AI may remember or use',
                  'You can delete anything, anytime',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-[#0a5c4e]">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-[#0f8a77]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 1: Data Permissions & Control ────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <h2 className="text-base font-black text-[#06183a]">Data Permissions &amp; Control</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">
              Choose what Meta-Aware can access and how your data is used.
            </p>
          </div>
          <div className="divide-y divide-[#ead7b9]">
            {permissionRows.map(({ icon: Icon, iconColor, iconBg, label, desc, status, statusColor, href }) => {
              const inner = (
                <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#faf6f0] transition-colors">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: iconBg }}
                  >
                    <Icon className="h-4.5 w-4.5" style={{ color: iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-[#06183a]">{label}</p>
                    <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">{desc}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-sm font-black" style={{ color: statusColor }}>{status}</span>
                    <ChevronRight className="h-4 w-4 text-[#d3b98f]" />
                  </div>
                </div>
              )
              return href ? (
                <Link key={label} href={href} className="block">
                  {inner}
                </Link>
              ) : (
                <button key={label} className="w-full text-left">
                  {inner}
                </button>
              )
            })}
          </div>
        </section>

        {/* ── Section 2: Data Management ───────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <h2 className="text-base font-black text-[#06183a]">Data Management</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Export, review, or delete your data.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
            {dataManagementCards.map(({ icon: Icon, iconColor, iconBg, label, desc, href, danger }) => (
              <Link
                key={label}
                href={href}
                className={`group flex flex-col gap-3 rounded-[12px] border p-4 transition-all hover:shadow-[0_6px_18px_rgba(48,27,5,0.07)] ${
                  danger
                    ? 'border-[#f5c5cf] bg-[#fff8f9] hover:border-[#e89aaa]'
                    : 'border-[#ead7b9] bg-white hover:border-[#d9a461]'
                }`}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: iconBg }}
                >
                  <Icon className="h-5 w-5" style={{ color: iconColor }} />
                </div>
                <div>
                  <p className={`text-sm font-black ${danger ? 'text-[#c04060]' : 'text-[#06183a]'}`}>{label}</p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">{desc}</p>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${danger ? 'text-[#e89aaa]' : 'text-[#d3b98f]'}`} />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Section 3: Security & Encryption ─────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <h2 className="text-base font-black text-[#06183a]">Security &amp; Encryption</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">How your data is protected in Meta-Aware.</p>
          </div>
          <div className="grid grid-cols-1 gap-0 divide-y divide-[#ead7b9] sm:grid-cols-2 sm:divide-y-0">
            {securityRows.map(({ icon: Icon, iconColor, label, desc, status, statusColor, badge, href }, idx) => {
              const borderClass =
                idx === 0 ? 'sm:border-r sm:border-b border-[#ead7b9]' :
                idx === 1 ? 'sm:border-b border-[#ead7b9]' :
                idx === 2 ? 'sm:border-r border-[#ead7b9]' : ''

              const inner = (
                <div className={`flex items-center gap-3 px-5 py-4 hover:bg-[#faf6f0] transition-colors ${borderClass}`}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0faf6]">
                    <Icon className="h-4 w-4" style={{ color: iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-[#06183a]">{label}</p>
                    <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">{desc}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="text-sm font-black" style={{ color: statusColor }}>{status}</span>
                    {badge ? (
                      <BadgeCheck className="h-4 w-4 text-[#0f8a77]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-[#d3b98f]" />
                    )}
                  </div>
                </div>
              )

              return href ? (
                <Link key={label} href={href} className="block">
                  {inner}
                </Link>
              ) : (
                <div key={label}>{inner}</div>
              )
            })}
          </div>
        </section>

        {/* ── Bottom control banner ─────────────────────────────────────── */}
        <section className="mb-4 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] px-6 py-5 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0f5ee]">
              <ShieldCheck className="h-6 w-6 text-[#0f8a77]" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[#0a5c4e]">You are in control.</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1a6b5a]">
                Nothing is added to your map without your review.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/settings/privacy-data"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#0f8a77] bg-white px-5 py-2.5 text-sm font-black text-[#0f8a77] shadow-[0_4px_12px_rgba(15,138,119,0.1)] hover:bg-[#f0faf6] transition-colors"
          >
            View Privacy Center <ChevronRight className="h-4 w-4" />
          </Link>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Privacy First */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0f8a77]" />
              <h2 className="text-sm font-black text-[#06183a]">Privacy First</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Your data is yours.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              We never sell it, rent it, or share it. You&apos;re always in control.
            </p>
            <Link
              href="/privacy"
              className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#0f8a77] hover:underline"
            >
              Learn more about our privacy <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* AI Memory & Saving */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">AI Memory &amp; Saving</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Control what Reality Scientist AI can remember, suggest, or add to your map.
            </p>
            <Link
              href="/dashboard/settings/ai-memory-saving"
              className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline"
            >
              Manage AI Memory Settings <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Related Settings */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Related Settings</h2>
            <div className="mt-3 space-y-1">
              {[
                { icon: User,       color: '#c97c1e', label: 'Account & Profile',   sub: 'Manage your identity and display.',    href: '/dashboard/settings/account' },
                { icon: Link2,      color: '#176dff', label: 'Connected Accounts',  sub: 'Manage linked sign-in methods.',       href: '/dashboard/settings/connected-accounts' },
                { icon: CreditCard, color: '#f0a638', label: 'Billing & Plan',      sub: 'View your plan and invoices.',         href: '/dashboard/settings/billing' },
              ].map(({ icon: Icon, color, label, sub, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-start gap-3 rounded-[8px] px-2 py-2.5 hover:bg-[#fff8ee] transition-colors"
                >
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
