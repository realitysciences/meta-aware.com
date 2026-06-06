'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock,
  Download,
  Eye,
  FileText,
  Heart,
  Layers3,
  MoreHorizontal,
  PenLine,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  X,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const moodConfig: Record<string, { label: string; color: string; dots: number; emoji: string }> = {
  Calm:       { label: 'Calm',       color: '#0f8a77', dots: 5, emoji: '😌' },
  Reflective: { label: 'Reflective', color: '#6c37c6', dots: 4, emoji: '🤔' },
  Overwhelmed:{ label: 'Overwhelmed',color: '#c97c1e', dots: 2, emoji: '😓' },
  Curious:    { label: 'Curious',    color: '#176dff', dots: 4, emoji: '🌙' },
  Peaceful:   { label: 'Peaceful',   color: '#0f8a77', dots: 5, emoji: '😊' },
  Grateful:   { label: 'Grateful',   color: '#e05c6e', dots: 5, emoji: '🙏' },
}

const entries = [
  {
    id: 'morning-reflection',
    title: 'Morning Reflection',
    meta: 'Reflection · May 6, 2025',
    about: 'Starting the day with presence, gratitude, and intention.',
    tags: ['gratitude', 'intention'],
    mood: 'Calm',
    connections: ['Identity', 'Purpose', 'Inner World'],
    connectionNote: '3 possible connections',
    connectionHighlight: '',
    status: 'Completed',
    statusDate: 'May 6, 2025',
    statusProgress: null,
    icon: Sun, iconColor: '#c97c1e', iconBg: '#fff8ee',
  },
  {
    id: 'post-session-integration',
    title: 'Post-Session Integration',
    meta: 'Integration Note · May 5, 2025',
    about: 'Processed insights from today\'s session about boundaries.',
    tags: ['boundaries', 'self-worth'],
    mood: 'Reflective',
    connections: ['Relationships', 'Boundaries', 'Communication Patterns'],
    connectionNote: 'Strong candidate',
    connectionHighlight: 'strong',
    status: 'In Progress',
    statusDate: '60% written',
    statusProgress: 60,
    icon: PenLine, iconColor: '#6c37c6', iconBg: '#f5f0ff',
  },
  {
    id: 'evening-journal',
    title: 'Evening Journal',
    meta: 'Free Write · May 4, 2025',
    about: 'Overwhelm, work stress, feeling behind.',
    tags: ['stress', 'overwhelm'],
    mood: 'Overwhelmed',
    connections: ['Work Life', 'Identity', 'Self-Worth'],
    connectionNote: '2 possible connections',
    connectionHighlight: '',
    status: 'Completed',
    statusDate: 'May 4, 2025',
    statusProgress: null,
    icon: BookOpen, iconColor: '#0f8a77', iconBg: '#f0faf6',
  },
  {
    id: 'dream-journal',
    title: 'Dream Journal',
    meta: 'Dream · May 3, 2025',
    about: 'Recurring dream about being back in my childhood home.',
    tags: ['dreams', 'childhood'],
    mood: 'Curious',
    connections: ['Inner Child', 'Family System', 'Memory & Imprints'],
    connectionNote: 'Possible artifact',
    connectionHighlight: 'artifact',
    status: 'Marked for Review',
    statusDate: 'May 3, 2025',
    statusProgress: null,
    icon: Sparkles, iconColor: '#176dff', iconBg: '#eff4ff',
  },
  {
    id: 'weekend-reflection',
    title: 'Weekend Reflection',
    meta: 'Reflection · May 2, 2025',
    about: 'What brought me peace this weekend.',
    tags: ['peace', 'connection'],
    mood: 'Peaceful',
    connections: ['Self-Care', 'Personal Growth', 'Well-Being'],
    connectionNote: '2 possible connections',
    connectionHighlight: '',
    status: 'Completed',
    statusDate: 'May 2, 2025',
    statusProgress: null,
    icon: Heart, iconColor: '#e05c6e', iconBg: '#fff0f0',
  },
  {
    id: 'gratitude-list',
    title: 'Gratitude List',
    meta: 'List · May 1, 2025',
    about: 'People, moments, and things I\'m grateful for.',
    tags: ['gratitude', 'abundance'],
    mood: 'Grateful',
    connections: ['Identity', 'Abundance Mindset', 'Relationships'],
    connectionNote: '1 possible connection',
    connectionHighlight: '',
    status: 'Completed',
    statusDate: 'May 1, 2025',
    statusProgress: null,
    icon: Heart, iconColor: '#e05c6e', iconBg: '#fff0f0',
  },
]

const tagColor: Record<string, string> = {
  gratitude: 'bg-[#f0faf6] text-[#0b6e58]',
  intention: 'bg-[#eff4ff] text-[#174fbe]',
  boundaries: 'bg-[#fdf6e8] text-[#7a3e08]',
  'self-worth': 'bg-[#fff0f0] text-[#c04060]',
  stress: 'bg-[#fff8ee] text-[#7a4a08]',
  overwhelm: 'bg-[#fff0f0] text-[#c04060]',
  dreams: 'bg-[#f5f0ff] text-[#4b23c7]',
  childhood: 'bg-[#eff4ff] text-[#174fbe]',
  peace: 'bg-[#f0faf6] text-[#0b6e58]',
  connection: 'bg-[#fdf6e8] text-[#7a3e08]',
  abundance: 'bg-[#f5f0ff] text-[#4b23c7]',
}

function statusConfig(status: string) {
  if (status === 'Completed')        return { color: 'text-[#0f8a77]', bg: 'bg-[#f0faf6]', dot: 'bg-[#0f8a77]' }
  if (status === 'In Progress')      return { color: 'text-[#c97c1e]', bg: 'bg-[#fff8ee]', dot: 'bg-[#c97c1e]' }
  if (status === 'Marked for Review')return { color: 'text-[#c97c1e]', bg: 'bg-[#fff8ee]', dot: 'bg-[#f0a638]' }
  return { color: 'text-[#6b7280]', bg: 'bg-[#faf6f0]', dot: 'bg-[#a0a8b8]' }
}

function MoodDots({ mood }: { mood: string }) {
  const cfg = moodConfig[mood]
  if (!cfg) return null
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-lg leading-none">{cfg.emoji}</span>
      <div>
        <p className="text-xs font-black" style={{ color: cfg.color }}>{cfg.label}</p>
        <div className="mt-1 flex gap-0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-full" style={{ backgroundColor: i < cfg.dots ? cfg.color : '#e5e7eb' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JournalsLibraryPage() {
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [moreOpen, setMoreOpen] = useState<string | null>(null)

  const filtered = entries.filter((e) =>
    search === '' ||
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.about.toLowerCase().includes(search.toLowerCase()) ||
    e.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  )

  function toggleFav(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Breadcrumb + header actions */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
            <span>Map Sources</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-black text-[#06183a]">Journals</span>
          </nav>
          <div className="flex items-center gap-2">
            {/* New Journal Entry dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-[10px] border border-[#d9a461] bg-white px-4 py-2 text-sm font-black text-[#5b3609] hover:bg-[#fff2df] transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Journal Entry
                <ChevronDown className="h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-11 z-30 w-64 rounded-[14px] border border-[#ead7b9] bg-white p-2 shadow-[0_12px_30px_rgba(48,27,5,0.12)]">
                  {[
                    { icon: PenLine,   color: '#c97c1e', bg: '#fff8ee', label: 'Blank Entry',    desc: 'Start with a clean page.',                href: '/map-sources/journals/new?mode=blank'   },
                    { icon: Sparkles,  color: '#6c37c6', bg: '#f5f0ff', label: 'Guided Prompt',  desc: 'Use a prompt to inspire your writing.',   href: '/map-sources/journals/new?mode=guided'  },
                    { icon: Download,  color: '#176dff', bg: '#eff4ff', label: 'Import Entry',   desc: 'Import from a file or paste existing writing.', href: '/map-sources/journals/new?mode=import' },
                  ].map(({ icon: Icon, color, bg, label, desc, href }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-start gap-3 rounded-[10px] p-3 hover:bg-[#faf6f0] transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: bg }}>
                        <Icon className="h-4 w-4" style={{ color }} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#06183a]">{label}</p>
                        <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">{desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* Backdrop to close dropdown */}
        {dropdownOpen && <div className="fixed inset-0 z-20" onClick={() => setDropdownOpen(false)} />}

        {/* Title */}
        <div className="mb-4">
          <h1 className="font-serif text-4xl font-bold text-[#06183a]">Journals Library</h1>
          <p className="mt-1.5 max-w-2xl text-sm font-semibold leading-6 text-[#344263]">
            Your private space for reflective writing, thoughts, feelings, and integrations.
          </p>
        </div>

        {/* Banner */}
        <div className="mb-5 flex items-start gap-3 rounded-[10px] border border-[#d9c49a] bg-[#fdf6e8] px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#fcd0a8] bg-[#fff8ee]">
            <PenLine className="h-4 w-4 text-[#c97c1e]" />
          </div>
          <div>
            <p className="text-sm font-black text-[#5b3609]">Journals are your <span className="italic">living writing stream.</span></p>
            <p className="mt-0.5 text-sm font-semibold text-[#5b3609]">Write freely, notice patterns, and turn what matters into your map.</p>
          </div>
        </div>

        {/* Stats row — 5 cards */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {[
            { icon: BookOpen,  value: '87', label: 'Total Entries',          sub: 'All time',          color: '#c97c1e', bg: '#fff8ee' },
            { icon: Clock,     value: '12', label: 'In Progress',            sub: 'Still being written',color: '#6c37c6', bg: '#f5f0ff' },
            { icon: Eye,       value: '9',  label: 'Marked for Review',      sub: 'Needs attention',   color: '#176dff', bg: '#eff4ff' },
            { icon: Star,      value: '14', label: 'Turned Into Artifacts',  sub: 'Distilled meaning', color: '#f0a638', bg: '#fffbee' },
            { icon: Calendar,  value: '23', label: 'Written This Week',      sub: 'Keep it going',     color: '#0f8a77', bg: '#f0faf6' },
          ].map(({ icon: Icon, value, label, sub, color, bg }) => (
            <div key={label} className="flex items-center gap-3 rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: bg }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div>
                <p className="text-xl font-black leading-none text-[#06183a]">{value}</p>
                <p className="mt-0.5 text-[11px] font-black text-[#344263]">{label}</p>
                <p className="text-[10px] font-semibold text-[#a0a8b8]">{sub}</p>
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
              placeholder="Search journal entries..."
              className="w-full rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] py-2 pl-8 pr-3 text-sm font-semibold text-[#06183a] outline-none placeholder:text-[#a0a8b8] focus:border-[#d9a461]"
            />
          </div>
          {['All Types', 'All Themes', 'All Moods', 'All Time'].map((f) => (
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
          <div className="grid grid-cols-[1.6fr_1.7fr_0.8fr_1.4fr_1fr_auto] gap-0 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-2.5">
            {[
              ['Journal Entry',           'Type · Date'],
              ['What This Entry Is About', 'Themes & focus'],
              ['Mood',                     'How I felt'],
              ['Connections',              'Where this may belong'],
              ['Status',                   'Where it is now'],
              ['Actions',                  ''],
            ].map(([col, sub]) => (
              <p key={col} className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8]">
                {col}
                {sub && <span className="block text-[10px] normal-case font-semibold">{sub}</span>}
              </p>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((entry, idx) => {
            const sc = statusConfig(entry.status)
            const Icon = entry.icon
            const isFav = favorites.has(entry.id)
            return (
              <div
                key={entry.id}
                className={`group grid grid-cols-[1.6fr_1.7fr_0.8fr_1.4fr_1fr_auto] gap-0 items-start px-4 py-4 transition-colors hover:bg-[#fffaf2] ${idx < filtered.length - 1 ? 'border-b border-[#ead7b9]' : ''}`}
              >
                {/* Entry col */}
                <div className="flex items-start gap-2.5 pr-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: entry.iconBg }}>
                    <Icon className="h-4 w-4" style={{ color: entry.iconColor }} />
                  </div>
                  <Link href={`/map-sources/journals/${entry.id}`} className="min-w-0">
                    <p className="font-black text-[#06183a] hover:text-[#c97c1e] transition-colors leading-tight">{entry.title}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{entry.meta}</p>
                  </Link>
                </div>

                {/* About col */}
                <div className="pr-3">
                  <p className="text-sm font-semibold leading-5 text-[#344263]">{entry.about}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tagColor[tag] ?? 'bg-[#faf6f0] text-[#344263]'}`}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Mood col */}
                <div className="pr-3">
                  <MoodDots mood={entry.mood} />
                </div>

                {/* Connections col */}
                <div className="pr-3">
                  <p className="text-xs font-semibold leading-5 text-[#344263]">
                    {entry.connections.slice(0, 2).join(', ')}
                  </p>
                  {entry.connections[2] && (
                    <p className="text-[11px] font-semibold text-[#6b7280]">{entry.connections[2]}</p>
                  )}
                  <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-black ${
                    entry.connectionHighlight === 'strong'
                      ? 'bg-[#f5f0ff] text-[#4b23c7]'
                      : entry.connectionHighlight === 'artifact'
                      ? 'bg-[#fff8ee] text-[#a45f0d]'
                      : 'bg-[#faf6f0] text-[#6b7280]'
                  }`}>
                    {entry.connectionNote}
                  </span>
                </div>

                {/* Status col */}
                <div className="pr-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${sc.dot}`} />
                    <span className={`text-sm font-black ${sc.color}`}>{entry.status}</span>
                  </div>
                  {entry.statusProgress !== null ? (
                    <div className="mt-1.5">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#ead7b9]">
                        <div className="h-1.5 rounded-full bg-[#c97c1e]" style={{ width: `${entry.statusProgress}%` }} />
                      </div>
                      <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{entry.statusDate}</p>
                    </div>
                  ) : (
                    <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{entry.statusDate}</p>
                  )}
                </div>

                {/* Actions col */}
                <div className="flex items-start gap-1">
                  <Link href={`/map-sources/journals/${entry.id}`} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#6b7280] hover:border-[#d9a461] hover:text-[#c97c1e] transition-all" aria-label="Open">
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => toggleFav(entry.id)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${isFav ? 'border-[#d9a461] bg-[#fff8ee] text-[#c97c1e]' : 'border-[#ead7b9] bg-white text-[#6b7280] hover:border-[#d9a461] hover:text-[#c97c1e]'}`}
                    aria-label="Favorite"
                  >
                    <Star className={`h-4 w-4 ${isFav ? 'fill-[#c97c1e]' : ''}`} />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setMoreOpen(moreOpen === entry.id ? null : entry.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#6b7280] hover:border-[#d9a461] hover:text-[#c97c1e] transition-all"
                      aria-label="More"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {moreOpen === entry.id && (
                      <div className="absolute right-0 top-9 z-20 min-w-[180px] rounded-[10px] border border-[#ead7b9] bg-white py-1 shadow-lg">
                        {['Turn into artifact', 'Add to lens scan', 'Connect to domain', 'Export entry', 'Delete entry'].map((action) => (
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
          <p className="text-sm font-semibold text-[#6b7280]">Showing 1–{filtered.length} of 87 journal entries</p>
          <button className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-5 py-2.5 text-sm font-black text-[#06183a] hover:bg-[#fff8ee] transition-colors">
            Load more <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[290px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Journal Activity */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Journal Activity</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#344263]">A snapshot of your writing.</p>
            <div className="mt-3 space-y-1.5">
              {[
                { icon: BookOpen, label: 'Total Entries',         value: 87,  color: '#c97c1e' },
                { icon: Clock,    label: 'In Progress',           value: 12,  color: '#6c37c6' },
                { icon: Eye,      label: 'Marked for Review',     value: 9,   color: '#176dff' },
                { icon: Star,     label: 'Turned Into Artifacts', value: 14,  color: '#f0a638' },
                { icon: Calendar, label: 'Written This Week',     value: 23,  color: '#0f8a77' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between rounded-[8px] px-2 py-2 hover:bg-[#faf6f0] transition-colors">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                    <span className="text-xs font-semibold text-[#344263]">{label}</span>
                  </div>
                  <span className="text-sm font-black" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
            <Link href="/map-sources/journals" className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View all journals <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* What journals are */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#c97c1e]" />
              <h2 className="text-sm font-black text-[#06183a]">What journals are</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Journals are your raw writing stream. They capture your thoughts, feelings, insights, and daily experiences.
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Use your writing to deepen self-understanding and discover what matters most.
            </p>
            <Link href="/how-it-works/journals" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Learn how journals build your Atlas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Popular Actions */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Popular Actions</h2>
            <div className="mt-2 space-y-0.5">
              {[
                { icon: PenLine,  label: 'New journal entry', sub: 'Start writing',                  color: '#c97c1e', href: '/map-sources/journals/new?mode=blank' },
                { icon: Sparkles, label: 'Use a prompt',      sub: 'Get inspired',                   color: '#6c37c6', href: '/map-sources/journals/new?mode=guided' },
                { icon: Star,     label: 'Turn into artifact', sub: 'Distill and preserve meaning',  color: '#f0a638', href: '/map-sources/journals' },
                { icon: Eye,      label: 'Review themes',     sub: "See what's emerging",            color: '#176dff', href: '/map-sources/journals' },
              ].map(({ icon: Icon, label, sub, color, href }) => (
                <Link key={label} href={href} className="flex w-full items-center gap-3 rounded-[8px] px-2 py-2.5 text-left hover:bg-[#fff8ee] transition-colors">
                  <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                  <div>
                    <p className="text-xs font-black text-[#06183a]">{label}</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">{sub}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View all actions <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Tips for Journaling */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Tips for Journaling</h2>
            <ul className="mt-3 space-y-2">
              {[
                { icon: PenLine,  tip: 'Write freely and honestly.' },
                { icon: Sparkles, tip: 'Use prompts when you need direction.' },
                { icon: Eye,      tip: 'Revisit and reflect over time.' },
                { icon: Star,     tip: 'Turn what matters into artifacts.' },
              ].map(({ icon: Icon, tip }) => (
                <li key={tip} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#344263]">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c97c1e]" />
                  {tip}
                </li>
              ))}
            </ul>
            <Link href="/guidance/journaling" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              More tips <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </aside>
    </div>
  )
}
