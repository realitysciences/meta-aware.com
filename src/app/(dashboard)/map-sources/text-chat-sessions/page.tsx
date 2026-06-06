'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock,
  ExternalLink,
  FileText,
  Heart,
  Link2,
  MessageSquare,
  MoreHorizontal,
  PenLine,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Tag,
  Wand2,
  Circle,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const textSessions = [
  {
    id: 'mother-function-text',
    title: 'Mother Function — Text Chat',
    meta: 'Family System · May 6, 2025 · 14 responses',
    chips: ['Family System', 'Mother Imprint', 'Attachment'],
    prompt: 'Start by describing what your mother was like when you needed comfort.',
    signal: 'I described my mother as emotionally warm but not always reachable.',
    taggedMoments: 8,
    status: 'Saved to Atlas',
    connectedDomains: 4,
    connectionNote: '4 domains connected',
    nextAction: 'Review connections',
    nextActionTab: 'connections',
    icon: Heart, iconColor: '#e05c6e', iconBg: '#fff0f0',
  },
  {
    id: 'father-function-text',
    title: 'Father Function — Text Chat',
    meta: 'Family System · May 1, 2025 · 12 responses',
    chips: ['Family System', 'Father Imprint', 'Identity'],
    prompt: 'What did your father teach you about growing up that still shapes you today?',
    signal: 'I connected strength with pressure and learned to perform instead of ask.',
    taggedMoments: 6,
    status: 'Saved to Atlas',
    connectedDomains: 3,
    connectionNote: '3 domains connected',
    nextAction: 'Review connections',
    nextActionTab: 'connections',
    icon: Wand2, iconColor: '#176dff', iconBg: '#eff4ff',
  },
  {
    id: 'inner-child-needs-safety-text',
    title: 'Inner Child — Needs & Safety',
    meta: 'Inner World · Apr 27, 2025 · 10 responses',
    chips: ['Inner Child', 'Safety', 'Emotions'],
    prompt: "What did you need more of as a child, but didn't always receive?",
    signal: 'Safety felt conditional, so I learned to self-soothe and stay easy.',
    taggedMoments: 7,
    status: 'Partially Connected',
    connectedDomains: 2,
    connectionNote: '2 domains connected',
    nextAction: 'Finish connecting',
    nextActionTab: 'connections',
    icon: Star, iconColor: '#6c37c6', iconBg: '#f5f0ff',
  },
  {
    id: 'communication-patterns-text',
    title: 'Communication Patterns',
    meta: 'Relationship Dynamics · Apr 15, 2025 · 16 responses',
    chips: ['Communication', 'Conflict', 'Expression'],
    prompt: 'How do you typically handle conflict or hard conversations?',
    signal: 'I often stayed quiet to keep peace and avoid emotional escalation.',
    taggedMoments: 9,
    status: 'Needs Review',
    connectedDomains: 0,
    connectionNote: 'AI extracted 6 possible map signals',
    nextAction: 'Review signals',
    nextActionTab: 'tags',
    icon: MessageSquare, iconColor: '#0f8a77', iconBg: '#f0faf6',
  },
  {
    id: 'self-worth-shame-text',
    title: 'Self-Worth & Shame',
    meta: 'Identity · Apr 9, 2025 · 11 responses',
    chips: ['Self-Worth', 'Shame', 'Belonging'],
    prompt: 'When do you feel most "not enough"?',
    signal: 'I carried the feeling that needing too much made me harder to love.',
    taggedMoments: 5,
    status: 'Not Yet Saved',
    connectedDomains: 0,
    connectionNote: 'Ready for review',
    nextAction: 'Save to Atlas',
    nextActionTab: '',
    icon: BookOpen, iconColor: '#5b35f0', iconBg: '#f0eeff',
  },
]

const sourceHealth = [
  { label: 'Processed', value: 26, icon: BadgeCheck, color: '#0f8a77' },
  { label: 'Needs Review', value: 4, icon: Clock, color: '#c97c1e' },
  { label: 'Connected to Map', value: 22, icon: Link2, color: '#176dff' },
  { label: 'Not Yet Saved', value: 5, icon: FileText, color: '#6b7280' },
]

const popularActions = [
  { icon: ExternalLink, label: 'Open a session', sub: 'Revisit your guided answers', color: '#c97c1e' },
  { icon: FileText, label: 'Review transcript', sub: 'Read full written exchange', color: '#176dff' },
  { icon: Tag, label: 'Tag key moments', sub: 'Capture lines that matter', color: '#6c37c6' },
  { icon: Link2, label: 'Connect to your map', sub: 'Link answers to domains and patterns', color: '#0f8a77' },
]

// ─── Status config ────────────────────────────────────────────────────────────

function statusConfig(status: string) {
  if (status === 'Saved to Atlas') return {
    icon: <BadgeCheck className="h-4 w-4 text-[#0f8a77]" />,
    labelClass: 'text-[#0f8a77]',
    nextClass: 'text-[#0f8a77]',
  }
  if (status === 'Partially Connected') return {
    icon: <Clock className="h-4 w-4 text-[#c97c1e]" />,
    labelClass: 'text-[#c97c1e]',
    nextClass: 'text-[#c97c1e]',
  }
  if (status === 'Needs Review') return {
    icon: <Clock className="h-4 w-4 text-[#c97c1e]" />,
    labelClass: 'text-[#c97c1e]',
    nextClass: 'text-[#c97c1e]',
  }
  return {
    icon: <Circle className="h-4 w-4 text-[#a0a8b8]" />,
    labelClass: 'text-[#6b7280]',
    nextClass: 'text-[#176dff]',
  }
}

function chipColor(chip: string) {
  const map: Record<string, string> = {
    'Family System': 'bg-[#eff4ff] text-[#174fbe]',
    'Mother Imprint': 'bg-[#fff0f0] text-[#c04060]',
    'Father Imprint': 'bg-[#eff4ff] text-[#174fbe]',
    'Attachment': 'bg-[#f5f0ff] text-[#4b23c7]',
    'Identity': 'bg-[#fdf6e8] text-[#7a3e08]',
    'Inner Child': 'bg-[#f5f0ff] text-[#4b23c7]',
    'Safety': 'bg-[#f0faf6] text-[#0b6e58]',
    'Emotions': 'bg-[#fff0f0] text-[#c04060]',
    'Self-Worth': 'bg-[#fdf6e8] text-[#7a3e08]',
    'Shame': 'bg-[#faf0ff] text-[#6c37c6]',
    'Belonging': 'bg-[#f0faf6] text-[#0b6e58]',
    'Communication': 'bg-[#eff4ff] text-[#174fbe]',
    'Conflict': 'bg-[#fff0f0] text-[#c04060]',
    'Expression': 'bg-[#fdf6e8] text-[#7a3e08]',
  }
  return map[chip] ?? 'bg-[#faf6f0] text-[#344263]'
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TextChatSessionsLibraryPage() {
  const [search, setSearch] = useState('')
  const [moreOpen, setMoreOpen] = useState<string | null>(null)

  const filtered = textSessions.filter((s) =>
    search === '' ||
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.signal.toLowerCase().includes(search.toLowerCase()) ||
    s.prompt.toLowerCase().includes(search.toLowerCase()) ||
    s.chips.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Breadcrumb + top action */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
            <span>Map Sources</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-black text-[#06183a]">Text Chat Sessions</span>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/voice-session?style=text-chat"
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#d9a461] bg-white px-4 py-2 text-sm font-black text-[#5b3609] hover:bg-[#fff2df] transition-colors"
            >
              <Plus className="h-4 w-4" /> Start New Text Session
            </Link>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="font-serif text-4xl font-bold text-[#06183a]">Text Chat Sessions Library</h1>
          <p className="mt-1.5 max-w-2xl text-sm font-semibold leading-6 text-[#344263]">
            Review past guided text sessions, revisit your answers, tag important moments, and see what has been saved to your map.
          </p>
        </div>

        {/* Trust banner */}
        <div className="mb-5 flex items-center gap-3 rounded-[10px] border border-[#d9c49a] bg-[#fdf6e8] px-4 py-2.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#c97c1e]" />
          <p className="text-sm font-semibold text-[#5b3609]">
            These are <span className="font-black">guided Map Sessions.</span> You control what becomes part of your Atlas.
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: MessageSquare, value: '31',  label: 'Total Text Sessions',  sub: 'All time',               color: '#c97c1e', bg: '#fff8ee' },
            { icon: PenLine,       value: '486', label: 'Answered Prompts',     sub: 'Across all sessions',    color: '#176dff', bg: '#eff4ff' },
            { icon: Star,          value: '96',  label: 'Tagged Moments',       sub: 'Key insights captured',  color: '#6c37c6', bg: '#f5f0ff' },
            { icon: Link2,         value: '22',  label: 'Connected to Map',     sub: 'Sessions with map connections', color: '#0f8a77', bg: '#f0faf6' },
          ].map(({ icon: Icon, value, label, sub, color, bg }) => (
            <div key={label} className="flex items-center gap-3 rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ background: bg }}>
                <Icon className="h-6 w-6" style={{ color }} />
              </div>
              <div>
                <p className="text-2xl font-black leading-none text-[#06183a]">{value}</p>
                <p className="mt-0.5 text-xs font-black text-[#344263]">{label}</p>
                <p className="text-[11px] font-semibold text-[#a0a8b8]">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-[12px] border border-[#ead7b9] bg-white/76 p-2.5">
          <div className="relative min-w-[190px] flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#a0a8b8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search text sessions..."
              className="w-full rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] py-2 pl-8 pr-3 text-sm font-semibold text-[#06183a] outline-none placeholder:text-[#a0a8b8] focus:border-[#d9a461]"
            />
          </div>
          {['All Domains', 'All Modules', 'All Statuses', 'Saved to Map'].map((f) => (
            <button key={f} className="inline-flex items-center gap-1 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-bold text-[#344263] hover:border-[#d9a461] hover:bg-[#fff8ee] transition-colors whitespace-nowrap">
              {f} <ChevronDown className="h-3 w-3" />
            </button>
          ))}
          <button className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-bold text-[#344263] hover:bg-[#fff8ee] transition-colors">
            <SlidersHorizontal className="h-3.5 w-3.5" /> More Filters
          </button>
          <button className="ml-auto inline-flex items-center gap-1 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-bold text-[#344263] hover:bg-[#fff8ee] transition-colors whitespace-nowrap">
            Sort: Newest First <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">

          {/* Header */}
          <div className="grid grid-cols-[2fr_2.2fr_1.7fr_auto] gap-0 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-2.5">
            <p className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8]">
              Session
              <span className="block text-[10px] normal-case font-semibold">Domain · Module · Date · Responses</span>
            </p>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8]">
              Prompt &amp; Key Extracted Signal
              <span className="block text-[10px] normal-case font-semibold">What was asked and what was revealed</span>
            </p>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8]">
              Status &amp; Map Connection
              <span className="block text-[10px] normal-case font-semibold">Where it&apos;s saved and next step</span>
            </p>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8] pr-2">Tools</p>
          </div>

          {/* Rows */}
          {filtered.map((session, idx) => {
            const sc = statusConfig(session.status)
            const Icon = session.icon
            return (
              <div
                key={session.id}
                className={`group grid grid-cols-[2fr_2.2fr_1.7fr_auto] gap-0 items-start px-4 py-4 transition-colors hover:bg-[#fffaf2] ${idx < filtered.length - 1 ? 'border-b border-[#ead7b9]' : ''}`}
              >
                {/* Session col */}
                <div className="flex items-start gap-3 pr-4">
                  <Link href={`/map-sources/text-chat-sessions/${session.id}`} className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: session.iconBg }}>
                        <Icon className="h-4 w-4" style={{ color: session.iconColor }} />
                      </div>
                      <span className="font-black text-[#06183a] hover:text-[#c97c1e] transition-colors leading-tight">{session.title}</span>
                    </div>
                    <p className="mt-1 pl-10 text-[11px] font-semibold text-[#6b7280]">{session.meta}</p>
                    <div className="mt-2 flex flex-wrap gap-1 pl-10">
                      {session.chips.map((chip) => (
                        <span key={chip} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${chipColor(chip)}`}>{chip}</span>
                      ))}
                    </div>
                  </Link>
                </div>

                {/* Prompt + Signal col */}
                <div className="pr-4">
                  <div className="space-y-1.5">
                    <p className="text-[11px] leading-5 text-[#344263]">
                      <span className="font-black text-[#c97c1e]">Prompt: </span>
                      {session.prompt}
                    </p>
                    <p className="text-[11px] leading-5 text-[#344263]">
                      <span className="font-black text-[#0f8a77]">Signal: </span>
                      {session.signal}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#a0a8b8]">
                    <Star className="h-3 w-3" />
                    {session.taggedMoments} tagged moments
                  </div>
                </div>

                {/* Status col */}
                <div className="pr-3">
                  <div className="flex items-center gap-1.5">
                    {sc.icon}
                    <span className={`text-sm font-black ${sc.labelClass}`}>{session.status}</span>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-[#6b7280]">{session.connectionNote}</p>
                  <Link
                    href={`/map-sources/text-chat-sessions/${session.id}${session.nextActionTab ? `?tab=${session.nextActionTab}` : ''}`}
                    className={`mt-1 inline-flex items-center gap-1 text-xs font-black hover:underline ${sc.nextClass}`}
                  >
                    {session.nextAction} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                {/* Tools col */}
                <div className="flex items-start gap-0.5">
                  {[
                    { icon: ExternalLink, label: 'Open', tab: '' },
                    { icon: FileText,     label: 'Transcript', tab: 'transcript' },
                    { icon: Tag,          label: 'Tags',       tab: 'tags' },
                    { icon: Link2,        label: 'Connections', tab: 'connections' },
                  ].map(({ icon: TIcon, label, tab }) => (
                    <Link
                      key={label}
                      href={`/map-sources/text-chat-sessions/${session.id}${tab ? `?tab=${tab}` : ''}`}
                      className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-all"
                    >
                      <TIcon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                  <div className="relative">
                    <button
                      onClick={() => setMoreOpen(moreOpen === session.id ? null : session.id)}
                      className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-all"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      More
                    </button>
                    {moreOpen === session.id && (
                      <div className="absolute right-0 top-10 z-20 min-w-[150px] rounded-[10px] border border-[#ead7b9] bg-white py-1 shadow-lg">
                        {['Save to Atlas', 'Export session', 'Delete session'].map((action) => (
                          <button key={action} onClick={() => setMoreOpen(null)} className="w-full px-4 py-2 text-left text-xs font-semibold text-[#344263] hover:bg-[#fff8ee] hover:text-[#c97c1e]">
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-[#6b7280]">Showing 1–{filtered.length} of 31 sessions</p>
          <button className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-5 py-2.5 text-sm font-black text-[#06183a] hover:bg-[#fff8ee] transition-colors">
            Load more <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[300px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Source Health */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-[#c97c1e]" />
              <h2 className="text-sm font-black text-[#06183a]">Source Health</h2>
            </div>
            <p className="mt-0.5 text-xs font-semibold text-[#344263]">The overall health of your text sources.</p>
            <div className="mt-3 space-y-1.5">
              {sourceHealth.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between rounded-[8px] px-2 py-2 hover:bg-[#faf6f0] transition-colors">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                    <span className="text-xs font-semibold text-[#344263]">{label}</span>
                  </div>
                  <span className="text-sm font-black" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
            <Link href="/map-sources/text-chat-sessions" className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View all sessions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* What happens here */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#c97c1e]" />
              <h2 className="text-sm font-black text-[#06183a]">What happens here</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Text Chat Sessions are guided written Map Sessions you&apos;ve already completed.
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Review your answers, tag important moments, connect insights to your domains, and control what becomes part of your Atlas.
            </p>
            <Link href="/how-it-works/map-sources" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Learn how text sessions build your Atlas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Popular Actions */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Popular Actions</h2>
            <div className="mt-2 space-y-0.5">
              {popularActions.map(({ icon: Icon, label, sub, color }) => (
                <button key={label} className="flex w-full items-center gap-3 rounded-[8px] px-2 py-2.5 text-left hover:bg-[#fff8ee] transition-colors">
                  <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                  <div>
                    <p className="text-xs font-black text-[#06183a]">{label}</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">{sub}</p>
                  </div>
                </button>
              ))}
            </div>
            <button className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View all actions <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Tips for Review */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Tips for Review</h2>
            <ul className="mt-3 space-y-2">
              {[
                { icon: FileText, tip: 'Look for repeated phrases.' },
                { icon: Star,     tip: 'Notice where emotion sharpens.' },
                { icon: Link2,    tip: 'Connect insights to more than one domain.' },
              ].map(({ icon: Icon, tip }) => (
                <li key={tip} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#344263]">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c97c1e]" />
                  {tip}
                </li>
              ))}
            </ul>
            <Link href="/guidance/reviewing-sources" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              More review tips <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </aside>
    </div>
  )
}
