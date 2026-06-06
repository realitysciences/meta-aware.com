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
} from 'lucide-react'

// ─── Static data ──────────────────────────────────────────────────────────────

const voiceSessions = [
  {
    id: 'mother-function',
    title: 'Mother Function',
    domainLine: 'Family System · May 6, 2025 · 38 min',
    date: '2025-05-06',
    duration: '38 min',
    chips: ['Family System', 'Mother Imprint', 'Attachment'],
    signal: 'Warmth and distance both shaped how I learned to receive comfort and support.',
    taggedMoments: 8,
    status: 'Saved to Atlas',
    connectedDomains: 4,
    nextAction: 'Review connections',
    icon: Heart,
    iconColor: '#e05c6e',
    iconBg: '#fff0f0',
  },
  {
    id: 'father-function',
    title: 'Father Function',
    domainLine: 'Family System · May 1, 2025 · 41 min',
    date: '2025-05-01',
    duration: '41 min',
    chips: ['Family System', 'Father Imprint', 'Identity'],
    signal: 'I learned strength and independence but also pressure to always perform.',
    taggedMoments: 6,
    status: 'Saved to Atlas',
    connectedDomains: 3,
    nextAction: 'Review connections',
    icon: Wand2,
    iconColor: '#176dff',
    iconBg: '#eff4ff',
  },
  {
    id: 'inner-child-needs-safety',
    title: 'Inner Child — Needs & Safety',
    domainLine: 'Personal Core · Apr 27, 2025 · 35 min',
    date: '2025-04-27',
    duration: '35 min',
    chips: ['Inner Child', 'Safety', 'Emotions'],
    signal: 'Safety was inconsistent, so I learned to self-soothe and stay easy.',
    taggedMoments: 7,
    status: 'Partially Connected',
    connectedDomains: 2,
    nextAction: 'Finish connecting',
    icon: Star,
    iconColor: '#6c37c6',
    iconBg: '#f5f0ff',
  },
  {
    id: 'shame-self-worth',
    title: 'Shame & Self-Worth',
    domainLine: 'Beliefs & Identity · Apr 20, 2025 · 32 min',
    date: '2025-04-20',
    duration: '32 min',
    chips: ['Self-Worth', 'Shame', 'Identity'],
    signal: 'I carried unspoken shame for needing too much.',
    taggedMoments: 5,
    status: 'Partially Connected',
    connectedDomains: 2,
    nextAction: 'Finish connecting',
    icon: BadgeCheck,
    iconColor: '#c97c1e',
    iconBg: '#fff8ee',
  },
  {
    id: 'communication-patterns',
    title: 'Communication Patterns',
    domainLine: 'Relational Dynamics · Apr 15, 2025 · 44 min',
    date: '2025-04-15',
    duration: '44 min',
    chips: ['Communication', 'Relationship', 'Expression'],
    signal: 'I often stayed quiet to keep the peace and avoid conflict.',
    taggedMoments: 9,
    status: 'Not Connected',
    connectedDomains: 0,
    nextAction: 'Connect to map',
    icon: Link2,
    iconColor: '#0f8a77',
    iconBg: '#f0faf6',
  },
  {
    id: 'life-purpose-direction',
    title: 'Life Purpose & Direction',
    domainLine: 'Life Purpose · Apr 8, 2025 · 30 min',
    date: '2025-04-08',
    duration: '30 min',
    chips: ['Purpose', 'Direction', 'Values'],
    signal: "I'm here to help others heal through truth and empathy.",
    taggedMoments: 4,
    status: 'Saved to Atlas',
    connectedDomains: 1,
    nextAction: 'Review connections',
    icon: BookOpen,
    iconColor: '#5b35f0',
    iconBg: '#f0eeff',
  },
]

const sourceHealth = [
  { label: 'Processed', value: 21, icon: BadgeCheck, color: '#0f8a77' },
  { label: 'Needs Review', value: 3, icon: Clock, color: '#c97c1e' },
  { label: 'Connected to Map', value: 18, icon: Link2, color: '#176dff' },
  { label: 'Not Yet Saved', value: 2, icon: Upload, color: '#6b7280' },
]

const popularActions = [
  { icon: Play, label: 'Play recordings', sub: 'Listen and revisit anytime', color: '#c97c1e' },
  { icon: FileText, label: 'Read transcripts', sub: 'See your words in text', color: '#176dff' },
  { icon: Tag, label: 'Tag key moments', sub: 'Capture insights that matter', color: '#6c37c6' },
  { icon: Link2, label: 'Connect to your map', sub: 'Link to reflections and patterns', color: '#0f8a77' },
  { icon: Upload, label: 'Export or share', sub: 'Your data, your control', color: '#5b35f0' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusStyle(status: string) {
  if (status === 'Saved to Atlas') return { dot: 'bg-[#0f8a77]', text: 'text-[#0f8a77]', badge: 'bg-[#f0faf6] border-[#b6e8d9]' }
  if (status === 'Partially Connected') return { dot: 'bg-[#c97c1e]', text: 'text-[#c97c1e]', badge: 'bg-[#fff8ee] border-[#f5d9a8]' }
  return { dot: 'bg-[#a0a8b8]', text: 'text-[#6b7280]', badge: 'bg-[#faf6f0] border-[#ead7b9]' }
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

// ─── Card shell ───────────────────────────────────────────────────────────────

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_12px_30px_rgba(48,27,5,0.04)] ${className}`}>
      {children}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VoiceSessionsLibraryPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [moreOpen, setMoreOpen] = useState<string | null>(null)

  const filtered = voiceSessions.filter((s) => {
    const matchSearch = search === '' ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.signal.toLowerCase().includes(search.toLowerCase()) ||
      s.chips.some((c) => c.toLowerCase().includes(search.toLowerCase()))
    const matchStatus = statusFilter === 'All Statuses' || s.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">
      {/* ── Main column ───────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Breadcrumb + top buttons */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
            <span>Map Sources</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#06183a]">Voice Sessions</span>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/voice-session" className="inline-flex items-center gap-2 rounded-[10px] border border-[#d9a461] bg-[#fff8ee] px-4 py-2 text-sm font-black text-[#5b3609] hover:bg-[#fff2df] transition-colors">
              <Plus className="h-4 w-4" /> Record New Session
            </Link>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#fcd0a8] bg-[#fff8ee]">
              <Mic className="h-5 w-5 text-[#c97c1e]" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#06183a] sm:text-4xl">Voice Sessions Library</h1>
          </div>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#344263]">
            Review past recordings, revisit transcripts, tag important moments, and see what has been saved to your map.
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Mic, value: '24', label: 'Total Sessions', sub: 'All time', color: '#c97c1e', bg: '#fff8ee' },
            { icon: Clock, value: '16h 38m', label: 'Total Recording Time', sub: 'All recordings', color: '#176dff', bg: '#eff4ff' },
            { icon: Star, value: '87', label: 'Tagged Moments', sub: 'Across all sessions', color: '#6c37c6', bg: '#f5f0ff' },
            { icon: Link2, value: '18', label: 'Connected to Map', sub: 'Sessions with map connections', color: '#0f8a77', bg: '#f0faf6' },
          ].map(({ icon: Icon, value, label, sub, color, bg }) => (
            <Card key={label} className="flex items-center gap-3 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: bg }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div>
                <p className="text-xl font-black text-[#06183a]">{value}</p>
                <p className="text-xs font-black text-[#344263]">{label}</p>
                <p className="text-[11px] font-semibold text-[#a0a8b8]">{sub}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Filter bar */}
        <Card className="mb-4 flex flex-wrap items-center gap-2 p-3">
          <div className="relative min-w-[180px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a0a8b8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your sessions..."
              className="w-full rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] py-2 pl-9 pr-3 text-sm font-semibold text-[#06183a] outline-none placeholder:text-[#a0a8b8] focus:border-[#d9a461]"
            />
          </div>
          {['All Domains', 'All Modules', 'All Statuses', 'Saved to Map'].map((f) => (
            <button key={f} onClick={() => f === 'All Statuses' ? setStatusFilter(statusFilter === 'All Statuses' ? 'Saved to Atlas' : 'All Statuses') : undefined}
              className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-bold text-[#344263] hover:border-[#d9a461] hover:bg-[#fff8ee] transition-colors">
              {f} <ChevronDown className="h-3.5 w-3.5" />
            </button>
          ))}
          <button className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-bold text-[#344263] hover:border-[#d9a461] hover:bg-[#fff8ee] transition-colors">
            <SlidersHorizontal className="h-3.5 w-3.5" /> More Filters
          </button>
          <button className="ml-auto inline-flex items-center gap-1.5 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-bold text-[#344263] hover:bg-[#fff8ee] transition-colors">
            Sort: Newest First <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </Card>

        {/* Column headers */}
        <div className="mb-2 hidden grid-cols-[2fr_2.2fr_1.6fr_auto] gap-4 px-4 text-[11px] font-black uppercase tracking-wider text-[#a0a8b8] sm:grid">
          <span>Session</span>
          <span>Key Extracted Signal</span>
          <span>Status & Map Connection</span>
          <span>Tools</span>
        </div>

        {/* Session rows */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <Card className="flex flex-col items-center py-14 text-center">
              <Mic className="h-10 w-10 text-[#d3b98f]" />
              <p className="mt-4 font-serif text-xl text-[#06183a]">No voice sessions yet</p>
              <p className="mt-2 max-w-sm text-sm font-semibold text-[#344263]">
                Voice sessions you record in Map Sessions will appear here. Once recorded, you can review transcripts, tag moments, connect insights, and save them to your Atlas.
              </p>
              <Link href="/voice-session" className="mt-5 inline-flex items-center gap-2 rounded-[10px] bg-[#c97c1e] px-5 py-2.5 text-sm font-black text-white hover:bg-[#b06a14] transition-colors">
                Start a Map Session
              </Link>
            </Card>
          ) : (
            filtered.map((session) => {
              const st = statusStyle(session.status)
              const Icon = session.icon
              const isPlaying = playingId === session.id
              return (
                <Card key={session.id} className="group transition-all hover:border-[#d9a461] hover:shadow-[0_12px_30px_rgba(48,27,5,0.07)]">
                  <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[2fr_2.2fr_1.6fr_auto] sm:items-center sm:gap-4">

                    {/* Session info */}
                    <div className="flex items-start gap-3">
                      <button
                        onClick={(e) => { e.preventDefault(); setPlayingId(isPlaying ? null : session.id) }}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${isPlaying ? 'border-[#c97c1e] bg-[#c97c1e] text-white' : 'border-[#ead7b9] bg-white text-[#c97c1e] group-hover:border-[#c97c1e]'}`}
                        aria-label={isPlaying ? 'Stop' : 'Play'}
                      >
                        <Play className="h-3.5 w-3.5 translate-x-[1px]" />
                      </button>
                      <Link href={`/map-sources/voice-sessions/${session.id}`} className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: session.iconBg }}>
                            <Icon className="h-3.5 w-3.5" style={{ color: session.iconColor }} />
                          </div>
                          <p className="font-black text-[#06183a] hover:text-[#c97c1e] transition-colors">{session.title}</p>
                        </div>
                        <p className="mt-0.5 pl-9 text-[11px] font-semibold text-[#6b7280]">{session.domainLine}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5 pl-9">
                          {session.chips.map((chip) => (
                            <span key={chip} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${chipColor(chip)}`}>{chip}</span>
                          ))}
                        </div>
                      </Link>
                    </div>

                    {/* Signal */}
                    <div className="pl-12 sm:pl-0">
                      <p className="text-xs font-black text-[#a45f0d]">Signal:</p>
                      <p className="mt-1 text-sm font-semibold italic leading-5 text-[#344263]">&ldquo;{session.signal}&rdquo;</p>
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#a0a8b8]">
                        <Star className="h-3 w-3" />
                        {session.taggedMoments} tagged moments
                      </div>
                    </div>

                    {/* Status */}
                    <div className="pl-12 sm:pl-0">
                      <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-black ${st.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                        <span className={st.text}>{session.status}</span>
                      </div>
                      <p className="mt-1.5 text-[11px] font-semibold text-[#6b7280]">{session.connectedDomains} domain{session.connectedDomains !== 1 ? 's' : ''} connected</p>
                      <Link href={`/map-sources/voice-sessions/${session.id}?tab=connections`} className={`mt-1 flex items-center gap-1 text-xs font-black hover:underline ${st.text}`}>
                        {session.nextAction} <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {/* Tools */}
                    <div className="flex items-center gap-1 pl-12 sm:pl-0">
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
                          title={label}
                        >
                          <TIcon className="h-4 w-4" />
                          <span className="hidden xl:block">{label}</span>
                        </Link>
                      ))}
                      <div className="relative">
                        <button
                          onClick={() => setMoreOpen(moreOpen === session.id ? null : session.id)}
                          className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-all"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="hidden xl:block">More</span>
                        </button>
                        {moreOpen === session.id && (
                          <div className="absolute right-0 top-10 z-10 min-w-[160px] rounded-[10px] border border-[#ead7b9] bg-white py-1 shadow-lg">
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
                </Card>
              )
            })
          )}
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-[#6b7280]">Showing 1–{filtered.length} of 24 sessions</p>
            <button className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-5 py-2.5 text-sm font-black text-[#06183a] hover:bg-[#fff8ee] transition-colors">
              Load more <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-80">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Source Health */}
          <Card className="p-4">
            <h2 className="text-sm font-black text-[#06183a]">Source Health</h2>
            <p className="mt-1 text-xs font-semibold text-[#344263]">The overall health of your voice sources.</p>
            <div className="mt-3 space-y-2">
              {sourceHealth.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color }} />
                    <span className="text-xs font-semibold text-[#344263]">{label}</span>
                  </div>
                  <span className="text-sm font-black" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
            <Link href="/map-sources/voice-sessions" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View all sessions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>

          {/* What happens here */}
          <Card className="p-4">
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
          </Card>

          {/* Popular Actions */}
          <Card className="p-4">
            <h2 className="text-sm font-black text-[#06183a]">Popular Actions</h2>
            <div className="mt-3 space-y-2">
              {popularActions.map(({ icon: Icon, label, sub, color }) => (
                <button key={label} className="flex w-full items-center gap-3 rounded-[8px] px-2 py-2 text-left hover:bg-[#fff8ee] transition-colors">
                  <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                  <div>
                    <p className="text-xs font-black text-[#06183a]">{label}</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Tips for Review */}
          <Card className="p-4">
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
          </Card>
        </div>
      </aside>
    </div>
  )
}
