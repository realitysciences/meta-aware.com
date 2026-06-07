'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart2,
  BookOpen,
  Brain,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock,
  CreditCard,
  Database,
  Download,
  HardDrive,
  Headphones,
  History,
  Link2,
  Lock,
  LogOut,
  Map,
  MessageSquare,
  Pause,
  Plus,
  RefreshCw,
  Settings,
  ShieldCheck,
  Star,
  Users,
  XCircle,
  Zap,
} from 'lucide-react'

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: Users },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Feature grid ─────────────────────────────────────────────────────────────

const planFeatures = [
  { icon: Map,        color: '#6c37c6', bg: '#f5f0ff', label: 'Unlimited Map Domains',    desc: 'Explore and develop all 24 domains.' },
  { icon: Database,   color: '#176dff', bg: '#eff4ff', label: 'Unlimited Sources',        desc: 'Add unlimited voice, text, images, and documents.' },
  { icon: Brain,      color: '#6c37c6', bg: '#f5f0ff', label: 'Advanced AI Insights',     desc: 'Deeper insights with Reality Scientist AI.' },
  { icon: BarChart2,  color: '#176dff', bg: '#eff4ff', label: 'Reports & Comparisons',    desc: 'Unlimited reports, comparisons, and exports.' },
  { icon: BookOpen,   color: '#0f8a77', bg: '#f0faf6', label: 'Guidance & Exercises',     desc: 'Full access to personalized guidance and exercises.' },
  { icon: Headphones, color: '#c97c1e', bg: '#fff8ee', label: 'Priority Support',         desc: 'Faster support when you need it.' },
  { icon: Lock,       color: '#0f8a77', bg: '#f0faf6', label: 'Encrypted & Private',      desc: 'End-to-end encrypted. Your data is never shared.' },
  { icon: Zap,        color: '#c97c1e', bg: '#fff8ee', label: 'Early Access',             desc: 'Get early access to new features and tools.' },
]

// ─── Usage rows ───────────────────────────────────────────────────────────────

const usageRows = [
  { icon: MessageSquare, color: '#6c37c6', label: 'AI conversations',    value: 46,  max: null, display: '46 / Unlimited' },
  { icon: Map,           color: '#6c37c6', label: 'Map sources added',   value: 32,  max: null, display: '32 / Unlimited' },
  { icon: BarChart2,     color: '#176dff', label: 'Reports generated',   value: 12,  max: null, display: '12 / Unlimited' },
  { icon: HardDrive,     color: '#c97c1e', label: 'Storage used',        value: 2.1, max: null, display: '2.1 GB / Unlimited' },
]

// ─── Billing history ──────────────────────────────────────────────────────────

const billingRows = [
  { date: 'May 5, 2025',  desc: 'Premium Plan — Monthly', amount: '$19.99', status: 'Paid' },
  { date: 'Apr 5, 2025',  desc: 'Premium Plan — Monthly', amount: '$19.99', status: 'Paid' },
  { date: 'Mar 5, 2025',  desc: 'Premium Plan — Monthly', amount: '$19.99', status: 'Paid' },
  { date: 'Feb 5, 2025',  desc: 'Premium Plan — Monthly', amount: '$19.99', status: 'Paid' },
  { date: 'Jan 5, 2025',  desc: 'Premium Plan — Monthly', amount: '$19.99', status: 'Paid' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BillingPlanPage() {
  const [avatarOpen,   setAvatarOpen]   = useState(false)
  const [downloading,  setDownloading]  = useState<string | null>(null)

  function handleDownload(date: string) {
    setDownloading(date)
    setTimeout(() => setDownloading(null), 1800)
  }

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
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Billing &amp; Plan</h1>
            <p className="mt-1.5 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Manage your plan, billing, and subscription. You&apos;re in control and can change or cancel anytime.
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

        {/* Download toast */}
        {downloading && (
          <div className="mb-4 flex items-center gap-2 rounded-[10px] border border-[#b6e8d9] bg-[#f0faf6] px-4 py-2.5 text-sm font-black text-[#0f8a77]">
            <BadgeCheck className="h-4 w-4" /> Receipt download started.
          </div>
        )}

        {/* ── Hero / Current Plan card ──────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
          <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#ede8fb]">
                <ShieldCheck className="h-8 w-8 text-[#6c37c6]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#6b7280]">Your current plan</p>
                <h2 className="font-serif text-2xl font-bold text-[#6c37c6]">Premium Member</h2>
                <p className="mt-1 text-sm font-semibold leading-5 text-[#4a2b8a]">
                  Full access to your Self-Map, Reality Scientist AI,<br className="hidden sm:block" />
                  sources, reports, and privacy controls.
                </p>
                <Link href="/dashboard/settings/billing/plans" className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-[#6c37c6] hover:underline">
                  Compare plans <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            {/* Billing details */}
            <div className="shrink-0 space-y-2.5 sm:border-l sm:border-[#e0d4f8] sm:pl-6">
              {[
                { label: 'Billing status',  value: null,         badge: 'Active' },
                { label: 'Price',           value: '$19.99 / month', badge: null },
                { label: 'Next billing date',value: 'June 5, 2025', badge: null },
              ].map(({ label, value, badge }) => (
                <div key={label} className="flex items-center justify-between gap-6">
                  <p className="text-xs font-semibold text-[#6b7280]">{label}</p>
                  {badge ? (
                    <span className="rounded-full bg-[#e0f5ee] px-2.5 py-0.5 text-xs font-black text-[#0f8a77]">{badge}</span>
                  ) : (
                    <p className="text-sm font-black text-[#06183a]">{value}</p>
                  )}
                </div>
              ))}
              {/* Payment method */}
              <div className="flex items-center justify-between gap-6">
                <p className="text-xs font-semibold text-[#6b7280]">Payment method</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-[6px] border border-[#ead7b9] bg-white px-2 py-1">
                    <CreditCard className="h-3.5 w-3.5 text-[#176dff]" />
                    <span className="text-xs font-black text-[#06183a]">•••• 4242</span>
                  </div>
                  <Link href="/dashboard/settings/billing/payment-method" className="text-xs font-black text-[#c97c1e] hover:underline">Update</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Included in Your Plan ─────────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Included in Your Plan</h2>
            </div>
            <Link href="/dashboard/settings/billing/plans" className="flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              See all features <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-0 divide-y divide-[#ead7b9] p-5 sm:grid-cols-2 sm:divide-y-0 sm:gap-4 sm:p-5">
            {planFeatures.map(({ icon: Icon, color, bg, label, desc }) => (
              <div key={label} className="flex items-start gap-3 py-2 sm:py-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: bg }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-black text-[#06183a]">{label}</p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Usage + Billing History + Payment Method (3-col) ──────────── */}
        <div className="mb-3 grid gap-3 lg:grid-cols-3">

          {/* Usage This Cycle */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <BarChart2 className="h-4 w-4 text-[#6c37c6]" />
              <div>
                <h2 className="text-sm font-black text-[#06183a]">Usage This Cycle</h2>
                <p className="text-[10px] font-semibold text-[#6b7280]">Your activity since May 5, 2025.</p>
              </div>
            </div>
            <div className="divide-y divide-[#ead7b9] px-4 py-1">
              {usageRows.map(({ icon: Icon, color, label, display }) => (
                <div key={label} className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                      <p className="text-xs font-semibold text-[#344263]">{label}</p>
                    </div>
                    <p className="text-xs font-black text-[#06183a]">{display}</p>
                  </div>
                  {/* Progress bar — unlimited shows a gentle filled bar */}
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#ead7b9]">
                    <div className="h-full rounded-full bg-[#6c37c6] opacity-30" style={{ width: '100%' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#ead7b9] px-4 py-2.5">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#a0a8b8]">
                <Clock className="h-3 w-3 shrink-0" /> Usage resets on June 5, 2025.
              </p>
            </div>
          </section>

          {/* Billing History */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <History className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">Billing History</h2>
            </div>
            <div className="divide-y divide-[#ead7b9]">
              {billingRows.map((row) => (
                <div key={row.date} className="flex items-center gap-2 px-4 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-[#06183a]">{row.amount}</p>
                    <p className="text-[10px] font-semibold text-[#a0a8b8]">{row.date}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#e0f5ee] px-2 py-0.5 text-[10px] font-black text-[#0f8a77]">{row.status}</span>
                  <button onClick={() => handleDownload(row.date)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border border-[#ead7b9] bg-white text-[#6b7280] hover:bg-[#faf6f0] transition-colors" aria-label="Download receipt">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-[#ead7b9] px-4 py-2.5">
              <Link href="/dashboard/settings/billing/history" className="flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
                View full billing history <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* Payment Method */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-3.5">
              <CreditCard className="h-4 w-4 text-[#6c37c6]" />
              <div>
                <h2 className="text-sm font-black text-[#06183a]">Payment Method</h2>
                <p className="text-[10px] font-semibold text-[#6b7280]">Manage how you pay.</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {/* Primary card */}
              <div className="flex items-center justify-between rounded-[10px] border border-[#e0d4f8] bg-[#f8f5ff] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-14 items-center justify-center rounded-[6px] border border-[#e0d4f8] bg-white">
                    <span className="text-xs font-black text-[#176dff]">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#06183a]">•••• 4242</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">Expires 04/28</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#e0f5ee] px-2 py-0.5 text-[10px] font-black text-[#0f8a77]">Default</span>
                  <ChevronRight className="h-4 w-4 text-[#d3b98f]" />
                </div>
              </div>
              {/* Add method */}
              <button className="flex w-full items-center gap-2 rounded-[10px] border border-dashed border-[#d3b98f] px-4 py-3 text-sm font-black text-[#c97c1e] hover:bg-[#fff8ee] transition-colors">
                <Plus className="h-4 w-4" /> Add payment method
              </button>
              {/* Security note */}
              <div className="flex items-start gap-2">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
                <p className="text-[11px] font-semibold leading-4 text-[#6b7280]">
                  Your payment information is secure and encrypted.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ── Manage Your Subscription ──────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <h2 className="text-base font-black text-[#06183a]">Manage Your Subscription</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">You&apos;re in control. Change, pause, or cancel anytime.</p>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {/* Change Plan */}
              <Link href="/dashboard/settings/billing/plans"
                className="group flex flex-col gap-2 rounded-[12px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 transition-all hover:border-[#6c37c6] hover:shadow-[0_4px_12px_rgba(108,55,198,0.1)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ede8fb]">
                  <RefreshCw className="h-4 w-4 text-[#6c37c6]" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#6c37c6]">Change Plan</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Switch to a different plan.</p>
                </div>
              </Link>
              {/* Pause */}
              <button className="group flex flex-col gap-2 rounded-[12px] border border-[#ead7b9] bg-white p-4 text-left transition-all hover:border-[#d9a461] hover:bg-[#faf6f0]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff8ee]">
                  <Pause className="h-4 w-4 text-[#c97c1e]" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#5b3609]">Pause Subscription</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Pause for up to 60 days.</p>
                </div>
              </button>
              {/* Cancel */}
              <button className="group flex flex-col gap-2 rounded-[12px] border border-[#f5c5cf] bg-[#fff8f9] p-4 text-left transition-all hover:border-[#e89aaa] hover:bg-[#fff0f3]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff0f3]">
                  <XCircle className="h-4 w-4 text-[#c04060]" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#c04060]">Cancel Subscription</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Cancel at the end of your billing period.</p>
                </div>
              </button>
            </div>
            {/* FAQ row */}
            <div className="mt-4 flex flex-wrap items-start gap-3 rounded-[10px] border border-[#ead7b9] bg-[#faf6f0] px-4 py-3">
              <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-[#c97c1e]" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-[#06183a]">Questions about your plan?</p>
                <p className="text-[11px] font-semibold text-[#6b7280]">View FAQs about billing, payment, and subscriptions.</p>
              </div>
              <Link href="/help/billing" className="flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
                View FAQs <ArrowRight className="h-3.5 w-3.5" />
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
              <p className="font-serif text-lg font-bold text-[#0a5c4e]">You&apos;re always in control.</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1a6b5a]">
                Change your plan, update your payment method, or cancel anytime. No long-term contracts. No hidden fees.
              </p>
            </div>
          </div>
          <Link href="/help/billing"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#0f8a77] bg-white px-5 py-2.5 text-sm font-black text-[#0f8a77] shadow-[0_4px_12px_rgba(15,138,119,0.1)] hover:bg-[#f0faf6] transition-colors">
            View FAQs <ChevronRight className="h-4 w-4" />
          </Link>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* About Billing & Plan */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">About Billing &amp; Plan</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Your subscription supports the ongoing development of Meta-Aware and keeps your self-map private and secure.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              You can change, pause, or cancel anytime.
            </p>
            <Link href="/how-it-works/billing" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Your data. Your choice. */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0f8a77]" />
              <h2 className="text-sm font-black text-[#06183a]">Your data. Your choice.</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Plan &amp; billing are separate from your data.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              Changing or canceling your plan does <strong className="font-black">not</strong> delete your Self-Map.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              Data deletion is controlled under{' '}
              <Link href="/dashboard/settings/privacy-data" className="font-black text-[#0f8a77] hover:underline">Privacy &amp; Data</Link>.
            </p>
            <Link href="/dashboard/settings/privacy-data" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#0f8a77] hover:underline">
              View Privacy Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">Quick Actions</h2>
            </div>
            <div className="mt-3 space-y-1">
              {[
                { icon: CreditCard, color: '#c97c1e', label: 'Update payment method', sub: 'Change how you pay.',              href: '/dashboard/settings/billing/payment-method' },
                { icon: History,    color: '#176dff', label: 'View billing history',  sub: 'See your past transactions.',     href: '/dashboard/settings/billing/history' },
                { icon: Download,   color: '#0f8a77', label: 'Download receipts',     sub: 'Get invoices and receipts.',      href: '/dashboard/settings/billing/history' },
                { icon: RefreshCw,  color: '#6c37c6', label: 'Manage subscription',   sub: 'Change, pause, or cancel.',      href: '/dashboard/settings/billing/plans' },
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
