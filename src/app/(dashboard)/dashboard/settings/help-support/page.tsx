'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Headphones,
  Lightbulb,
  Link2,
  LogOut,
  Mail,
  Map,
  MessageCircle,
  Mic,
  Newspaper,
  PlayCircle,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Wrench,
} from 'lucide-react'

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

const helpTopics = [
  { icon: Sparkles,    iconColor: '#6c37c6', iconBg: '#f5f0ff', label: 'Getting Started',        desc: 'New to Meta-Aware? Learn the basics and start with confidence.',    href: '/help/getting-started' },
  { icon: Map,         iconColor: '#176dff', iconBg: '#eff4ff', label: 'Understanding Your Map', desc: 'How to read domains, signals, insights, and connections.',           href: '/help/understanding-your-map' },
  { icon: Mic,         iconColor: '#0f8a77', iconBg: '#f0faf6', label: 'Map Sessions',            desc: 'Record, transcribe, and reflect on guided sessions.',                href: '/help/map-sessions' },
  { icon: ShieldCheck, iconColor: '#0f8a77', iconBg: '#f0faf6', label: 'Privacy & Security',     desc: 'Your privacy, data, security, and control explained.',               href: '/help/privacy-security' },
  { icon: CreditCard,  iconColor: '#c97c1e', iconBg: '#fff8ee', label: 'Billing & Account',      desc: 'Manage your plan, billing, and account settings.',                   href: '/help/billing-account' },
  { icon: Wrench,      iconColor: '#344263', iconBg: '#f3f4f6', label: 'Troubleshooting',         desc: 'Fix issues and get solutions to common problems.',                   href: '/help/troubleshooting' },
]

const popularSearches = ['Self-Map', 'Map Sessions', 'Privacy & Data', 'Export Data', 'Billing']

export default function HelpSupportPage() {
  const [avatarOpen, setAvatarOpen]   = useState(false)
  const [query,      setQuery]        = useState('')

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Header */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/dashboard/settings" className="mb-3 flex items-center gap-1.5 text-xs font-bold text-[#6b7280] hover:text-[#c97c1e] transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Settings
            </Link>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Help &amp; Support</h1>
            <p className="mt-1 text-sm font-semibold leading-6 text-[#344263]">
              Find guidance, answers, and support for using Meta-Aware safely and clearly.
            </p>
            <p className="text-sm font-semibold text-[#6b7280]">Search help articles, explore topics, or contact our team.</p>
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

        {/* Search card */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ede8fb]">
              <Headphones className="h-7 w-7 text-[#6c37c6]" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-xl font-bold text-[#3b1d72]">How can we help?</h2>
              <p className="mt-0.5 text-sm font-semibold text-[#4a2b8a]">Search our help center for articles, guides, and answers.</p>
              {/* Search input */}
              <div className="relative mt-3">
                <input value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search help articles..."
                  className="w-full rounded-[10px] border border-[#e0d4f8] bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-[#06183a] placeholder:text-[#a0a8b8] focus:border-[#6c37c6] focus:outline-none" />
                <Search className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#a0a8b8]" />
              </div>
              {/* Popular searches */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-[#6b7280]">Popular searches:</span>
                {popularSearches.map((s) => (
                  <button key={s} className="rounded-full border border-[#e0d4f8] bg-white px-3 py-1 text-xs font-semibold text-[#6c37c6] hover:bg-[#f5f0ff] transition-colors">{s}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Explore help topics */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <h2 className="text-base font-black text-[#06183a]">Explore help topics</h2>
          </div>
          <div className="grid grid-cols-1 gap-[1px] bg-[#ead7b9] sm:grid-cols-2 lg:grid-cols-3">
            {helpTopics.map(({ icon: Icon, iconColor, iconBg, label, desc, href }) => (
              <Link key={label} href={href}
                className="group flex items-start gap-3 bg-white p-5 hover:bg-[#faf6f0] transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: iconBg }}>
                  <Icon className="h-4.5 w-4.5" style={{ color: iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-[#06183a] group-hover:text-[#6c37c6] transition-colors">{label}</p>
                  <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">{desc}</p>
                </div>
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#d3b98f] group-hover:text-[#6c37c6] transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Personal support */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Users className="h-5 w-5 text-[#6c37c6]" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#06183a]">Need personal support from our team?</h2>
                <p className="text-xs font-semibold text-[#6b7280]">Our support team typically replies within 24 hours.</p>
              </div>
            </div>
            <Link href="/support/contact"
              className="inline-flex items-center gap-2 rounded-[8px] border border-[#e0d4f8] bg-white px-4 py-2 text-sm font-black text-[#6c37c6] hover:bg-[#f5f0ff] transition-colors">
              Contact Support
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
            {/* Send a message */}
            <div className="flex flex-col gap-3 rounded-[12px] border border-[#ead7b9] bg-white p-4 hover:border-[#e0d4f8] hover:bg-[#f8f5ff] transition-all">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f0ff]">
                <Send className="h-4 w-4 text-[#6c37c6]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-[#06183a]">Send us a message</p>
                <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Describe your issue and we&apos;ll get back to you.</p>
              </div>
              <Link href="/support/contact" className="flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
                Open contact form <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {/* Live chat */}
            <div className="flex flex-col gap-3 rounded-[12px] border border-[#ead7b9] bg-white p-4 hover:border-[#b6e8d9] hover:bg-[#f2faf6] transition-all">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0faf6]">
                  <MessageCircle className="h-4 w-4 text-[#0f8a77]" />
                </div>
                <span className="rounded-full bg-[#e0f5ee] px-2 py-0.5 text-[10px] font-black text-[#0f8a77]">Available</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-[#06183a]">Live chat</p>
                <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Chat with support during business hours.</p>
              </div>
              <Link href="/support/chat" className="flex items-center gap-1.5 text-xs font-black text-[#0f8a77] hover:underline">
                Start live chat <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {/* Email */}
            <div className="flex flex-col gap-3 rounded-[12px] border border-[#ead7b9] bg-white p-4 hover:border-[#ead7b9] hover:bg-[#faf6f0] transition-all">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff8ee]">
                <Mail className="h-4 w-4 text-[#c97c1e]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-[#06183a]">Support email</p>
                <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Prefer email? Reach us anytime.</p>
              </div>
              <a href="mailto:support@meta-aware.ai" className="text-xs font-black text-[#c97c1e] hover:underline">
                support@meta-aware.ai
              </a>
            </div>
          </div>
        </section>

        {/* Status & updates */}
        <section className="mb-4 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <h2 className="text-base font-black text-[#06183a]">Status &amp; updates</h2>
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-[#6b7280]">Check system status and the latest updates from Meta-Aware.</p>
              <Link href="/status" className="flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline whitespace-nowrap">
                View status page <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 rounded-[10px] border border-[#b6e8d9] bg-[#f2faf6] px-4 py-3">
              <BadgeCheck className="h-5 w-5 shrink-0 text-[#0f8a77]" />
              <div>
                <p className="text-sm font-black text-[#0a5c4e]">All systems operational</p>
                <p className="text-xs font-semibold text-[#6b7280]">Last updated: Today at 9:41 AM</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Right rail */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Helpful resources */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">Helpful resources</h2>
            </div>
            <div className="mt-3 space-y-3 divide-y divide-[#e0d4f8]">
              {[
                { icon: BookOpen,    color: '#6c37c6', label: 'Help Center',       desc: 'Browse all articles and guides.',        cta: 'Visit Help Center',  href: '/help' },
                { icon: PlayCircle,  color: '#176dff', label: 'Video Tutorials',   desc: 'Watch short videos to learn key features.', cta: 'Watch videos',   href: '/help/videos' },
                { icon: Newspaper,   color: '#c97c1e', label: 'What\'s New',       desc: 'See the latest features and improvements.', cta: 'View updates',   href: '/updates' },
              ].map(({ icon: Icon, color, label, desc, cta, href }) => (
                <div key={label} className="pt-3 first:pt-0">
                  <div className="flex items-start gap-2">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />
                    <div className="flex-1">
                      <p className="text-xs font-black text-[#06183a]">{label}</p>
                      <p className="text-[11px] font-semibold text-[#6b7280]">{desc}</p>
                      <Link href={href} className="mt-1 flex items-center gap-1 text-xs font-black hover:underline" style={{ color }}>
                        {cta} <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Not emergency support */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0f8a77]" />
              <h2 className="text-sm font-black leading-tight text-[#06183a]">Meta-Aware is not emergency support.</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              If you are in immediate danger or crisis, contact local emergency services or a crisis line.
            </p>
            <Link href="/help/crisis-resources" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#0f8a77] hover:underline">
              Find help in your area <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Urgent help */}
          <div className="rounded-[14px] border border-[#f5c5cf] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#c04060]" />
              <h2 className="text-sm font-black leading-tight text-[#06183a]">Need urgent help?</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              If you believe your account has been compromised or you need urgent assistance, take action now.
            </p>
            <Link href="/support/urgent"
              className="mt-3 flex items-center justify-center gap-2 rounded-[8px] border border-[#f5c5cf] bg-[#fff0f3] px-4 py-2 text-sm font-black text-[#c04060] hover:bg-[#ffe0e8] transition-colors">
              Report an urgent issue <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </aside>
    </div>
  )
}
