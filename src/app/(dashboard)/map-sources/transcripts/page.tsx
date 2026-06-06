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
  Eye,
  FileSearch,
  FileText,
  Link2,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Upload,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const transcripts = [
  {
    id: 'mother-function-voice',
    title: 'Mother Function Voice Session',
    meta: 'Voice Session · May 6, 2025 · 38 min',
    quality: { label: 'High Quality', color: 'text-[#0f8a77]', bg: 'bg-[#f0faf6]', border: 'border-[#b6e8d9]' },
    sourceType: 'Voice Session',
    sourceDate: 'May 6, 2025',
    sourceLabel: null,
    themes: ['mother imprint', 'attachment', 'self-worth', 'nurturing'],
    visibleThemes: ['mother imprint', 'attachment', 'self-worth'],
    extraThemes: 2,
    connections: ['Mother Imprint', 'Attachment Styles', 'Self-Worth & Shame'],
    connectionCount: 3,
    status: 'Reviewed',
    statusDate: 'May 6, 2025',
    highlights: 8,
    progress: null,
    icon: Mic, iconColor: '#c97c1e', iconBg: '#fff8ee',
    favorite: false,
  },
  {
    id: 'reality-scientist-session',
    title: 'Reality Scientist AI Session',
    meta: 'Text Chat Session · May 5, 2025 · 52 min',
    quality: null,
    sourceType: 'Text Chat Session',
    sourceDate: 'May 5, 2025',
    sourceLabel: null,
    themes: ['impact', 'meaning', 'purpose', 'clarity'],
    visibleThemes: ['impact', 'meaning', 'purpose'],
    extraThemes: 1,
    connections: ['Life Purpose', 'Core Values', 'Identity'],
    connectionCount: 4,
    status: 'Needs Review',
    statusDate: 'May 5, 2025',
    highlights: 11,
    progress: null,
    icon: MessageSquare, iconColor: '#6c37c6', iconBg: '#f5f0ff',
    favorite: false,
  },
  {
    id: 'father-wound-session',
    title: 'Father Wound Voice Session',
    meta: 'Voice Session · May 3, 2025 · 45 min',
    quality: { label: 'High Quality', color: 'text-[#0f8a77]', bg: 'bg-[#f0faf6]', border: 'border-[#b6e8d9]' },
    sourceType: 'Voice Session',
    sourceDate: 'May 3, 2025',
    sourceLabel: null,
    themes: ['father', 'wound', 'validation', 'approval'],
    visibleThemes: ['father', 'wound', 'validation'],
    extraThemes: 3,
    connections: ['Father Imprint', 'Self-Worth & Shame', 'Inner Child'],
    connectionCount: 3,
    status: 'Reviewed',
    statusDate: 'May 3, 2025',
    highlights: 9,
    progress: null,
    icon: Mic, iconColor: '#c97c1e', iconBg: '#fff8ee',
    favorite: false,
  },
  {
    id: 'boundaries-session',
    title: 'Boundaries Session',
    meta: 'Text Chat Session · May 1, 2025 · 31 min',
    quality: null,
    sourceType: 'Text Chat Session',
    sourceDate: 'May 1, 2025',
    sourceLabel: null,
    themes: ['boundaries', 'communication', 'self-protection'],
    visibleThemes: ['boundaries', 'communication'],
    extraThemes: 0,
    connections: ['Relationships', 'Communication Patterns', 'Self-Protection'],
    connectionCount: 3,
    status: 'Connected',
    statusDate: 'May 1, 2025',
    highlights: 6,
    progress: null,
    icon: MessageSquare, iconColor: '#176dff', iconBg: '#eff4ff',
    favorite: false,
  },
  {
    id: 'abundance-beliefs-session',
    title: 'Abundance Beliefs Voice Session',
    meta: 'Voice Session · Apr 29, 2025 · 42 min',
    quality: null,
    sourceType: 'Voice Session',
    sourceDate: 'Apr 29, 2025',
    sourceLabel: null,
    themes: ['abundance', 'scarcity', 'worth'],
    visibleThemes: ['abundance', 'scarcity', 'worth'],
    extraThemes: 0,
    connections: ['Abundance Mindset', 'Money Relationship', 'Self-Worth'],
    connectionCount: 3,
    status: 'Needs Review',
    statusDate: 'Apr 29, 2025',
    highlights: 5,
    progress: null,
    icon: Mic, iconColor: '#c97c1e', iconBg: '#fff8ee',
    favorite: false,
  },
  {
    id: 'imported-journal-transcript',
    title: 'Imported Journal Transcript',
    meta: 'Imported · Apr 27, 2025 · 12 min',
    quality: { label: 'Imported Text', color: 'text-[#176dff]', bg: 'bg-[#eff4ff]', border: 'border-[#c3d4fb]' },
    sourceType: 'Imported',
    sourceDate: 'Apr 27, 2025',
    sourceLabel: 'From Journal Entry',
    themes: ['gratitude', 'reflection', 'joy'],
    visibleThemes: ['gratitude', 'reflection', 'joy'],
    extraThemes: 0,
    connections: ['Well-Being', 'Gratitude Practice', 'Identity'],
    connectionCount: 2,
    status: 'Reviewed',
    statusDate: 'Apr 27, 2025',
    highlights: 3,
    progress: null,
    icon: Upload, iconColor: '#176dff', iconBg: '#eff4ff',
    favorite: false,
  },
]

const activityItems = [
  { label: 'Total Transcripts',   value: 64, icon: FileText,  color: '#c97c1e' },
  { label: 'Needs Review',        value: 18, icon: Eye,       color: '#c97c1e' },
  { label: 'Tagged Highlights',   value: 36, icon: Tag,       color: '#6c37c6' },
  { label: 'Turned Into Artifacts',value: 22, icon: Star,     color: '#f0a638' },
  { label: 'Connected to Map',    value: 41, icon: Link2,     color: '#0f8a77' },
]

const popularActions = [
  { icon: Mic,         label: 'Create transcript',       sub: 'Generate from a voice recording', color: '#c97c1e' },
  { icon: MessageSquare,label: 'Capture chat transcript', sub: 'Save a chat as a transcript',    color: '#6c37c6' },
  { icon: Tag,         label: 'Tag key moments',         sub: 'Mark insight and emotion',         color: '#176dff' },
  { icon: Sparkles,    label: 'Apply lens scan',         sub: 'Analyze language and patterns',   color: '#0f8a77' },
]

function statusConfig(status: string) {
  if (status === 'Reviewed')    return { color: 'text-[#0f8a77]', dot: 'bg-[#0f8a77]' }
  if (status === 'Connected')   return { color: 'text-[#0f8a77]', dot: 'bg-[#0f8a77]' }
  if (status === 'Needs Review')return { color: 'text-[#c97c1e]', dot: 'bg-[#c97c1e]' }
  if (status === 'In Progress') return { color: 'text-[#c97c1e]', dot: 'bg-[#c97c1e]' }
  return { color: 'text-[#6b7280]', dot: 'bg-[#a0a8b8]' }
}

const themeChipColor = (theme: string) => {
  const map: Record<string, string> = {
    'mother imprint': 'bg-[#fff0f0] text-[#c04060]',
    attachment:  'bg-[#eff4ff] text-[#174fbe]',
    'self-worth':'bg-[#fdf6e8] text-[#7a3e08]',
    nurturing:   'bg-[#f0faf6] text-[#0b6e58]',
    impact:      'bg-[#fdf6e8] text-[#7a3e08]',
    meaning:     'bg-[#f5f0ff] text-[#4b23c7]',
    purpose:     'bg-[#f5f0ff] text-[#4b23c7]',
    clarity:     'bg-[#eff4ff] text-[#174fbe]',
    father:      'bg-[#eff4ff] text-[#174fbe]',
    wound:       'bg-[#fff0f0] text-[#c04060]',
    validation:  'bg-[#fdf6e8] text-[#7a3e08]',
    approval:    'bg-[#f0faf6] text-[#0b6e58]',
    boundaries:  'bg-[#fdf6e8] text-[#7a3e08]',
    communication:'bg-[#eff4ff] text-[#174fbe]',
    'self-protection':'bg-[#f5f0ff] text-[#4b23c7]',
    abundance:   'bg-[#f0faf6] text-[#0b6e58]',
    scarcity:    'bg-[#fff0f0] text-[#c04060]',
    worth:       'bg-[#fdf6e8] text-[#7a3e08]',
    gratitude:   'bg-[#f0faf6] text-[#0b6e58]',
    reflection:  'bg-[#f5f0ff] text-[#4b23c7]',
    joy:         'bg-[#fff8ee] text-[#7a4a08]',
    'personal power': 'bg-[#f5f0ff] text-[#4b23c7]',
  }
  return map[theme] ?? 'bg-[#faf6f0] text-[#344263]'
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TranscriptsLibraryPage() {
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [moreOpen, setMoreOpen] = useState<string | null>(null)

  const filtered = transcripts.filter((t) =>
    search === '' ||
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.themes.some((th) => th.toLowerCase().includes(search.toLowerCase())) ||
    t.connections.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  )

  function toggleFav(id: string) {
    setFavorites((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Breadcrumb + actions */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
            <span>Map Sources</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-black text-[#06183a]">Transcripts</span>
          </nav>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-[10px] border border-[#d9a461] bg-white px-4 py-2 text-sm font-black text-[#5b3609] hover:bg-[#fff2df] transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Transcript
                <ChevronDown className="h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-11 z-30 w-72 rounded-[14px] border border-[#ead7b9] bg-white p-2 shadow-[0_12px_30px_rgba(48,27,5,0.12)]">
                  {[
                    { icon: Mic,           color: '#c97c1e', bg: '#fff8ee', label: 'From Voice Session',     desc: 'Generate a transcript from a recorded session.',    href: '/map-sources/transcripts/new?mode=voice'     },
                    { icon: MessageSquare, color: '#6c37c6', bg: '#f5f0ff', label: 'From Text Chat Session', desc: 'Generate a transcript from a text chat session.',   href: '/map-sources/transcripts/new?mode=text-chat'  },
                    { icon: Upload,        color: '#176dff', bg: '#eff4ff', label: 'Import Transcript',      desc: 'Upload or paste existing text.',                    href: '/map-sources/transcripts/new?mode=import'    },
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
        {dropdownOpen && <div className="fixed inset-0 z-20" onClick={() => setDropdownOpen(false)} />}

        {/* Title */}
        <div className="mb-4">
          <h1 className="font-serif text-4xl font-bold text-[#06183a]">Transcripts Library</h1>
          <p className="mt-1.5 max-w-2xl text-sm font-semibold leading-6 text-[#344263]">
            The written records of your spoken and guided sessions. Review what was said, highlight what matters, and turn insights into your map.
          </p>
        </div>

        {/* Banner */}
        <div className="mb-5 flex items-start gap-3 rounded-[10px] border border-[#d9c49a] bg-[#fdf6e8] px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#fcd0a8] bg-[#fff8ee]">
            <FileText className="h-4 w-4 text-[#c97c1e]" />
          </div>
          <div>
            <p className="text-sm font-black text-[#5b3609]">Transcripts turn <span className="italic">speech into clarity.</span></p>
            <p className="mt-0.5 text-sm font-semibold text-[#5b3609]">Search, highlight, tag, and discover the meaning inside your words.</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {[
            { icon: FileText, value: '64', label: 'Total Transcripts',   sub: 'All time',          color: '#c97c1e', bg: '#fff8ee' },
            { icon: Eye,      value: '18', label: 'Needs Review',         sub: 'Not yet reviewed',  color: '#c97c1e', bg: '#fff8ee' },
            { icon: Tag,      value: '36', label: 'Tagged Highlights',    sub: 'Key moments saved', color: '#6c37c6', bg: '#f5f0ff' },
            { icon: Star,     value: '22', label: 'Turned Into Artifacts',sub: 'Distilled meaning', color: '#f0a638', bg: '#fffbee' },
            { icon: Link2,    value: '41', label: 'Connected to Map',     sub: 'Has map links',     color: '#0f8a77', bg: '#f0faf6' },
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
          <div className="relative min-w-[180px] flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#a0a8b8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transcripts..."
              className="w-full rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] py-2 pl-8 pr-3 text-sm font-semibold text-[#06183a] outline-none placeholder:text-[#a0a8b8] focus:border-[#d9a461]"
            />
          </div>
          {['All Sources', 'All Themes', 'All Statuses', 'All Time'].map((f) => (
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
          <div className="grid grid-cols-[1.8fr_1.2fr_1.6fr_1.6fr_1fr_auto] gap-0 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-2.5">
            {[
              ['Transcript',       'Title · Date · Duration'],
              ['Source Session',   'Type · Date'],
              ['Key Themes',       'Main themes & focus'],
              ['Map Connections',  'Where it may belong'],
              ['Status',           'Where it is now'],
              ['Actions',          ''],
            ].map(([col, sub]) => (
              <p key={col} className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8]">
                {col}
                {sub && <span className="block text-[10px] normal-case font-semibold">{sub}</span>}
              </p>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((t, idx) => {
            const sc = statusConfig(t.status)
            const Icon = t.icon
            const isFav = favorites.has(t.id)
            return (
              <div
                key={t.id}
                className={`group grid grid-cols-[1.8fr_1.2fr_1.6fr_1.6fr_1fr_auto] gap-0 items-start px-4 py-4 transition-colors hover:bg-[#fffaf2] ${idx < filtered.length - 1 ? 'border-b border-[#ead7b9]' : ''}`}
              >
                {/* Transcript col */}
                <div className="flex items-start gap-2.5 pr-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: t.iconBg }}>
                    <Icon className="h-4 w-4" style={{ color: t.iconColor }} />
                  </div>
                  <div className="min-w-0">
                    <Link href={`/map-sources/transcripts/${t.id}`} className="font-black text-[#06183a] hover:text-[#c97c1e] transition-colors leading-tight">
                      {t.title}
                    </Link>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{t.meta}</p>
                    {t.quality && (
                      <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold ${t.quality.bg} ${t.quality.color} ${t.quality.border}`}>
                        {t.quality.label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Source Session col */}
                <div className="pr-3">
                  <p className="text-xs font-black text-[#344263]">{t.sourceType}</p>
                  <p className="text-[11px] font-semibold text-[#a0a8b8]">{t.sourceDate}</p>
                  {t.sourceLabel && <p className="mt-1 text-[11px] font-semibold italic text-[#6b7280]">{t.sourceLabel}</p>}
                </div>

                {/* Key Themes col */}
                <div className="pr-3">
                  <div className="flex flex-wrap gap-1">
                    {t.visibleThemes.map((th) => (
                      <span key={th} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${themeChipColor(th)}`}>{th}</span>
                    ))}
                    {t.extraThemes > 0 && (
                      <span className="rounded-full bg-[#faf6f0] px-2 py-0.5 text-[10px] font-bold text-[#6b7280]">+{t.extraThemes}</span>
                    )}
                  </div>
                </div>

                {/* Map Connections col */}
                <div className="pr-3">
                  <div className="space-y-0.5">
                    {t.connections.map((c) => (
                      <p key={c} className="text-xs font-semibold text-[#344263]">{c}</p>
                    ))}
                  </div>
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#faf6f0] px-2 py-0.5 text-[10px] font-black text-[#6b7280]">
                    {t.connectionCount} connection{t.connectionCount !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Status col */}
                <div className="pr-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${sc.dot}`} />
                    <span className={`text-sm font-black ${sc.color}`}>{t.status}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#a0a8b8]">{t.statusDate}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-[#6b7280]">
                    <Tag className="h-3 w-3" />
                    {t.highlights} highlights
                  </p>
                </div>

                {/* Actions col */}
                <div className="flex items-start gap-0.5">
                  <Link
                    href={`/map-sources/transcripts/${t.id}`}
                    className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-all"
                  >
                    <Eye className="h-4 w-4" />
                    Open
                  </Link>
                  <Link
                    href={`/map-sources/transcripts/${t.id}?tab=tag`}
                    className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-all"
                  >
                    <Tag className="h-4 w-4" />
                    Tag
                  </Link>
                  <button
                    onClick={() => toggleFav(t.id)}
                    className={`flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold transition-all ${isFav ? 'text-[#f0a638] hover:bg-[#fff8ee]' : 'text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#f0a638]'}`}
                    aria-label="Favorite"
                  >
                    <Star className={`h-4 w-4 ${isFav ? 'fill-[#f0a638]' : ''}`} />
                    {isFav ? 'Saved' : 'Save'}
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setMoreOpen(moreOpen === t.id ? null : t.id)}
                      className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-all"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      More
                    </button>
                    {moreOpen === t.id && (
                      <div className="absolute right-0 top-10 z-20 min-w-[190px] rounded-[10px] border border-[#ead7b9] bg-white py-1 shadow-lg">
                        {['Turn into artifact', 'Apply lens scan', 'Connect to domain', 'Export transcript', 'Delete'].map((action) => (
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
          <p className="text-sm font-semibold text-[#6b7280]">Showing 1–{filtered.length} of 64 transcripts</p>
          <button className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-5 py-2.5 text-sm font-black text-[#06183a] hover:bg-[#fff8ee] transition-colors">
            Load more <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[290px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Transcript Activity */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Transcript Activity</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#344263]">A snapshot of your transcripts.</p>
            <div className="mt-3 space-y-1.5">
              {activityItems.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between rounded-[8px] px-2 py-2 hover:bg-[#faf6f0] transition-colors">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                    <span className="text-xs font-semibold text-[#344263]">{label}</span>
                  </div>
                  <span className="text-sm font-black" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
            <Link href="/map-sources/transcripts" className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View all transcripts <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* What transcripts are */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#c97c1e]" />
              <h2 className="text-sm font-black text-[#06183a]">What transcripts are</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Transcripts are the written records of your spoken and guided sessions.
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              They help you revisit your words, discover patterns, highlight key moments, and connect insights to your Self-Map.
            </p>
            <Link href="/how-it-works/transcripts" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Learn how transcripts build your Atlas <ArrowRight className="h-3.5 w-3.5" />
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

          {/* Tips for Reviewing */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Tips for Reviewing</h2>
            <ul className="mt-3 space-y-2">
              {[
                { icon: Eye,      tip: 'Read with curiosity, not judgment.' },
                { icon: Tag,      tip: 'Highlight what stands out.' },
                { icon: Sparkles, tip: 'Tag themes and repeating patterns.' },
                { icon: Link2,    tip: 'Connect insights to your map.' },
              ].map(({ icon: Icon, tip }) => (
                <li key={tip} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#344263]">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c97c1e]" />
                  {tip}
                </li>
              ))}
            </ul>
            <Link href="/guidance/transcripts" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              More tips <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </aside>
    </div>
  )
}
