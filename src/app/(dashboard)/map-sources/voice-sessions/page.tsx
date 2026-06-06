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
  FileText,
  Heart,
  Link2,
  Mic,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  Tag,
  Upload,
  Wand2,
  Circle,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const voiceSessions = [
  {
    id: 'mother-function',
    title: 'Mother Function',
    domainLine: 'Family System · May 6, 2025 · 38 min',
    chips: ['Family System', 'Mother Imprint', 'Attachment'],
    signal: 'Warmth and distance both shaped how I learned to receive comfort and support.',
    taggedMoments: 8,
    status: 'Saved to Atlas',
    connectedDomains: 4,
    nextAction: 'Review connections',
    icon: Heart, iconColor: '#e05c6e', iconBg: '#fff0f0',
  },
  {
    id: 'father-function',
    title: 'Father Function',
    domainLine: 'Family System · May 1, 2025 · 41 min',
    chips: ['Family System', 'Father Imprint', 'Identity'],
    signal: 'I learned strength and independence but also pressure to always perform.',
    taggedMoments: 6,
    status: 'Saved to Atlas',
    connectedDomains: 3,
    nextAction: 'Review connections',
    icon: Wand2, iconColor: '#176dff', iconBg: '#eff4ff',
  },
  {
    id: 'inner-child-needs-safety',
    title: 'Inner Child — Needs & Safety',
    domainLine: 'Personal Core · Apr 27, 2025 · 35 min',
    chips: ['Inner Child', 'Safety', 'Emotions'],
    signal: 'Safety was inconsistent, so I learned to self-soothe and stay easy.',
    taggedMoments: 7,
    status: 'Partially Connected',
    connectedDomains: 2,
    nextAction: 'Finish connecting',
    icon: Star, iconColor: '#6c37c6', iconBg: '#f5f0ff',
  },
  {
    id: 'shame-self-worth',
    title: 'Shame & Self-Worth',
    domainLine: 'Beliefs & Identity · Apr 20, 2025 · 32 min',
    chips: ['Self-Worth', 'Shame', 'Identity'],
    signal: 'I carried unspoken shame for needing too much.',
    taggedMoments: 5,
    status: 'Partially Connected',
    connectedDomains: 2,
    nextAction: 'Finish connecting',
    icon: BadgeCheck, iconColor: '#c97c1e', iconBg: '#fff8ee',
  },
  {
    id: 'communication-patterns',
    title: 'Communication Patterns',
    domainLine: 'Relational Dynamics · Apr 15, 2025 · 44 min',
    chips: ['Communication', 'Relationship', 'Expression'],
    signal: 'I often stayed quiet to keep the peace and avoid conflict.',
    taggedMoments: 9,
    status: 'Not Connected',
    connectedDomains: 0,
    nextAction: 'Connect to map',
    icon: Link2, iconColor: '#0f8a77', iconBg: '#f0faf6',
  },
  {
    id: 'life-purpose-direction',
    title: 'Life Purpose & Direction',
    domainLine: 'Life Purpose · Apr 8, 2025 · 30 min',
    chips: ['Purpose', 'Direction', 'Values'],
    signal: "I'm here to help others heal through truth and empathy.",
    taggedMoments: 4,
    status: 'Saved to Atlas',
    connectedDomains: 1,
    nextAction: 'Review connections',
    icon: BookOpen, iconColor: '#5b35f0', iconBg: '#f0eeff',
  },
]

const sourceHealth = [
  { label: 'Processed', value: 21, icon: BadgeCheck, color: '#0f8a77' },
  { label: 'Needs Review', value: 3, icon: Clock, color: '#c97c1e' },
  { label: 'Connected to Map', value: 18, icon: Link2, color: '#176dff' },
  { label: 'Not Yet Saved', value: 2, icon: FileText, color: '#6b7280' },
]

const popularActions = [
  { icon: Play, label: 'Play recordings', sub: 'Listen and revisit anytime', color: '#c97c1e' },
  { icon: FileText, label: 'Read transcripts', sub: 'See your words in text', color: '#176dff' },
  { icon: Tag, label: 'Tag key moments', sub: 'Capture insights that matter', color: '#6c37c6' },
  { icon: Link2, label: 'Connect to your map', sub: 'Link to reflections and patterns', color: '#0f8a77' },
  { icon: Upload, label: 'Export or share', sub: 'Your data, your control', color: '#5b35f0' },
]

// ─── Status config ────────────────────────────────────────────────────────────

function statusConfig(status: string) {
  if (status === 'Saved to Atlas') return {
    icon: <BadgeCheck className="h-4 w-4 text-[#0f8a77]" />,
    label: 'text-[#0f8a77]', nextColor: 'text-[#0f8a77]',
  }
  if (status === 'Partially Connected') return {
    icon: <Clock className="h-4 w-4 text-[#c97c1e]" />,
    label: 'text-[#c97c1e]', nextColor: 'text-[#c97c1e]',
  }
  return {
    icon: <Circle className="h-4 w-4 text-[#a0a8b8]" />,
    label: 'text-[#6b7280]', nextColor: 'text-[#176dff]',
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
    'Communication': 'bg-[#eff4ff] text-[#174fbe]',
    'Relationship': 'bg-[#f0faf6] text-[#0b6e58]',
    'Expression': 'bg-[#fdf6e8] text-[#7a3e08]',
    'Purpose': 'bg-[#f5f0ff] text-[#4b23c7]',
    'Direction': 'bg-[#eff4ff] text-[#174fbe]',
    'Values': 'bg-[#f0faf6] text-[#0b6e58]',
  }
  return map[chip] ?? 'bg-[#faf6f0] text-[#344263]'
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VoiceSessionsLibraryPage() {
  const [search, setSearch] = useState('')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [moreOpen, setMoreOpen] = useState<string | null>(null)

  const filtered = voiceSessions.filter((s) =>
    search === '' ||
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.signal.toLowerCase().includes(search.toLowerCase()) ||
    s.chips.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Breadcrumb + top actions */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
            <span>Map Sources</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-black text-[#06183a]">Voice Sessions</span>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/voice-session" className="inline-flex items-center gap-2 rounded-[10px] border border-[#d9a461] bg-white px-4 py-2 text-sm font-black text-[#5b3609] hover:bg-[#fff2df] transition-colors">
              <Plus className="h-4 w-4" /> Record New Session
            </Link>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-5 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#fcd0a8] bg-[#fff8ee]">
            <Mic className="h-7 w-7 text-[#c97c1e]" />
          </div>
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Voice Sessions Library</h1>
            <p className="mt-1 text-sm font-semibold leading-6 text-[#344263]">
              Review past recordings, revisit transcripts, tag important moments, and see what has been saved to your map.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Mic, value: '24', label: 'Total Sessions', sub: 'All time', color: '#c97c1e', bg: '#fff8ee' },
            { icon: Clock, value: '16h 38m', label: 'Total Recording Time', sub: 'All recordings', color: '#176dff', bg: '#eff4ff' },
            { icon: Star, value: '87', label: 'Tagged Moments', sub: 'Across all sessions', color: '#6c37c6', bg: '#f5f0ff' },
            { icon: Link2, value: '18', label: 'Connected to Map', sub: 'Sessions with map connections', color: '#0f8a77', bg: '#f0faf6' },
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
              placeholder="Search your sessions..."
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

          {/* Table header */}
          <div className="grid grid-cols-[2.2fr_2fr_1.8fr_auto] gap-0 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-2.5">
            <p className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8]">Session<span className="block text-[10px] normal-case font-semibold">Domain · Module · Date · Duration</span></p>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8]">Key Extracted Signal<span className="block text-[10px] normal-case font-semibold">What this session revealed</span></p>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8]">Status & Map Connection<span className="block text-[10px] normal-case font-semibold">Where it&apos;s saved and next step</span></p>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8] pr-2">Tools</p>
          </div>

          {/* Rows */}
          {filtered.map((session, idx) => {
            const sc = statusConfig(session.status)
            const Icon = session.icon
            const isPlaying = playingId === session.id
            return (
              <div key={session.id} className={`group grid grid-cols-[2.2fr_2fr_1.8fr_auto] gap-0 items-start px-4 py-4 transition-colors hover:bg-[#fffaf2] ${idx < filtered.length - 1 ? 'border-b border-[#ead7b9]' : ''}`}>

                {/* Session col */}
                <div className="flex items-start gap-3 pr-4">
                  <button
                    onClick={() => setPlayingId(isPlaying ? null : session.id)}
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${isPlaying ? 'border-[#c97c1e] bg-[#c97c1e] text-white' : 'border-[#ead7b9] bg-white text-[#c97c1e] hover:border-[#c97c1e]'}`}
                    aria-label={isPlaying ? 'Stop' : 'Play'}
                  >
                    <Play className="h-3 w-3 translate-x-[1px]" />
                  </button>
                  <Link href={`/map-sources/voice-sessions/${session.id}`} className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: session.iconBg }}>
                        <Icon className="h-3.5 w-3.5" style={{ color: session.iconColor }} />
                      </div>
                      <span className="font-black text-[#06183a] hover:text-[#c97c1e] transition-colors leading-tight">{session.title}</span>
                    </div>
                    <p className="mt-1 pl-9 text-[11px] font-semibold text-[#6b7280]">{session.domainLine}</p>
                    <div className="mt-2 flex flex-wrap gap-1 pl-9">
                      {session.chips.map((chip) => (
                        <span key={chip} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${chipColor(chip)}`}>{chip}</span>
                      ))}
                    </div>
                  </Link>
                </div>

                {/* Signal col */}
                <div className="pr-4">
                  <div className="flex items-start gap-1.5">
                    <span className="mt-0.5 text-lg font-black leading-none text-[#d3b98f]">&ldquo;</span>
                    <div>
                      <p className="text-[11px] font-black text-[#a45f0d]">Signal:</p>
                      <p className="mt-0.5 text-sm font-semibold leading-5 text-[#344263]">{session.signal}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#a0a8b8]">
                    <Star className="h-3 w-3" />
                    {session.taggedMoments} tagged moments
                  </div>
                </div>

                {/* Status col */}
                <div className="pr-4">
                  <div className="flex items-center gap-1.5">
                    {sc.icon}
                    <span className={`text-sm font-black ${sc.label}`}>{session.status}</span>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-[#6b7280]">
                    {session.connectedDomains} domain{session.connectedDomains !== 1 ? 's' : ''} connected
                  </p>
                  <Link href={`/map-sources/voice-sessions/${session.id}?tab=connections`} className={`mt-1 inline-flex items-center gap-1 text-xs font-black hover:underline ${sc.nextColor}`}>
                    {session.nextAction} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                {/* Tools col */}
                <div className="flex items-start gap-0.5">
                  {[
                    { icon: Play, label: 'Play', tab: '' },
                    { icon: FileText, label: 'Transcript', tab: 'transcript' },
                    { icon: Tag, label: 'Tags', tab: 'tags' },
                    { icon: Link2, label: 'Connections', tab: 'connections' },
                  ].map(({ icon: TIcon, label, tab }) => (
                    <Link
                      key={label}
                      href={`/map-sources/voice-sessions/${session.id}${tab ? `?tab=${tab}` : ''}`}
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
          <p className="text-sm font-semibold text-[#6b7280]">Showing 1–{filtered.length} of 24 sessions</p>
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
            <h2 className="text-sm font-black text-[#06183a]">Source Health</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#344263]">The overall health of your voice sources.</p>
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
            <Link href="/map-sources/voice-sessions" className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View all sessions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* What happens here */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">What happens here</h2>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Map Sessions are where you create new source material.
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              This library is where you review, tag, connect, and manage what you&apos;ve already recorded.
            </p>
            <Link href="/how-it-works/map-sources" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Learn how sources build your Atlas <ArrowRight className="h-3.5 w-3.5" />
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
          </div>

          {/* Tips for Review */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Tips for Review</h2>
            <ul className="mt-3 space-y-2">
              {[
                { icon: Play, tip: 'Revisit with fresh perspective.' },
                { icon: Tag, tip: 'Tag what stands out.' },
                { icon: Star, tip: 'Look for patterns over time.' },
                { icon: Link2, tip: 'Connect insights to your map.' },
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
