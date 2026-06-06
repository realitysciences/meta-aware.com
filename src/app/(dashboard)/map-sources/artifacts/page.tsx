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
  Compass,
  FileText,
  GitBranch,
  Heart,
  Link2,
  List,
  MoreHorizontal,
  PenLine,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Upload,
  Bookmark,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const artifacts = [
  {
    id: 'my-core-values',
    title: 'My Core Values',
    typeLine: 'Reflection · Map Session',
    date: 'May 6, 2025',
    preserves: 'A clarified list of the values that repeatedly guide my decisions and boundaries.',
    tags: ['values', 'clarity', 'identity'],
    domain: 'Identity',
    connections: 3,
    connectionDomains: 'Core Identity, Purpose, Boundaries',
    status: 'Connected to Map',
    favorite: true,
    icon: Compass, iconColor: '#c97c1e', iconBg: '#fff8ee',
  },
  {
    id: 'mother-relationship-timeline',
    title: 'Mother Relationship Timeline',
    typeLine: 'Timeline · Text Chat Session',
    date: 'May 1, 2025',
    preserves: 'Key emotional turning points in how I learned closeness, need, and distance.',
    tags: ['family', 'timeline', 'imprint'],
    domain: 'Family System',
    connections: 4,
    connectionDomains: 'Mother Imprint, Attachment, Family Patterns',
    status: 'Connected to Map',
    favorite: false,
    icon: GitBranch, iconColor: '#e05c6e', iconBg: '#fff0f0',
  },
  {
    id: 'inner-child-needs-list',
    title: 'Inner Child Needs List',
    typeLine: 'List · Journaling',
    date: 'Apr 27, 2025',
    preserves: 'The needs I learned to minimize, translate, or meet alone.',
    tags: ['inner child', 'needs', 'safety'],
    domain: 'Inner World',
    connections: 2,
    connectionDomains: 'Inner Child, Safety',
    status: 'Partially Connected',
    favorite: true,
    icon: List, iconColor: '#6c37c6', iconBg: '#f5f0ff',
  },
  {
    id: 'core-belief-reframe',
    title: 'Core Belief Reframe',
    typeLine: 'Reframe · Map Session',
    date: 'Apr 15, 2025',
    preserves: 'An old belief, the life it came from, and the newer interpretation I am practicing.',
    tags: ['beliefs', 'reframe', 'growth'],
    domain: 'Belief System',
    connections: 3,
    connectionDomains: 'Core Beliefs, Self-Worth, Growth',
    status: 'Needs Review',
    favorite: false,
    icon: RefreshCw, iconColor: '#176dff', iconBg: '#eff4ff',
  },
  {
    id: 'lessons-im-integrating',
    title: "Lessons I'm Integrating",
    typeLine: 'Integration Note · Journaling',
    date: 'Apr 9, 2025',
    preserves: 'The insights I am trying to carry into daily behavior.',
    tags: ['lessons', 'integration', 'wisdom'],
    domain: 'Personal Growth',
    connections: 2,
    connectionDomains: 'Growth Mindset, Integration',
    status: 'Connected to Map',
    favorite: true,
    icon: Sparkles, iconColor: '#0f8a77', iconBg: '#f0faf6',
  },
  {
    id: 'turning-point-letter-2023',
    title: 'My Turning Point Letter (2023)',
    typeLine: 'Uploaded File · Document',
    date: 'Apr 2, 2025',
    preserves: 'A letter I wrote to myself during a major life transition.',
    tags: ['transition', 'courage', 'strength'],
    domain: 'Life Transitions',
    connections: 2,
    connectionDomains: 'Purpose, Resilience',
    status: 'Connected to Map',
    favorite: false,
    icon: FileText, iconColor: '#5b35f0', iconBg: '#f0eeff',
  },
]

const artifactHealth = [
  { label: 'Connected to Map',  value: 24, icon: Link2,      color: '#0f8a77' },
  { label: 'Needs Review',      value: 9,  icon: Clock,      color: '#c97c1e' },
  { label: 'Favorites',         value: 8,  icon: Star,       color: '#f0a638' },
  { label: 'Not Yet Connected', value: 10, icon: CircleHelp, color: '#6b7280' },
  { label: 'Recently Created',  value: 5,  icon: BadgeCheck, color: '#176dff' },
]

const popularActions = [
  { icon: BookOpen, label: 'Open an artifact',    sub: 'Review and reflect',                 color: '#c97c1e' },
  { icon: PenLine,  label: 'Edit or expand',      sub: 'Enhance, add details, or restructure', color: '#176dff' },
  { icon: Link2,    label: 'Connect to your map', sub: 'Link insights to domains',           color: '#0f8a77' },
  { icon: Star,     label: 'Mark as favorite',    sub: 'Keep important artifacts close',     color: '#f0a638' },
]

function statusConfig(status: string) {
  if (status === 'Connected to Map')    return { color: 'text-[#0f8a77]', dot: 'bg-[#0f8a77]', badge: 'bg-[#f0faf6] text-[#0f8a77]' }
  if (status === 'Partially Connected') return { color: 'text-[#c97c1e]', dot: 'bg-[#c97c1e]', badge: 'bg-[#fff8ee] text-[#c97c1e]' }
  if (status === 'Needs Review')        return { color: 'text-[#c97c1e]', dot: 'bg-[#f0a638]', badge: 'bg-[#fff8ee] text-[#c97c1e]' }
  return { color: 'text-[#6b7280]', dot: 'bg-[#a0a8b8]', badge: 'bg-[#faf6f0] text-[#6b7280]' }
}

const tagColor: Record<string, string> = {
  values:       'bg-[#eff4ff] text-[#174fbe]',
  clarity:      'bg-[#f0faf6] text-[#0b6e58]',
  identity:     'bg-[#fdf6e8] text-[#7a3e08]',
  family:       'bg-[#fff0f0] text-[#c04060]',
  timeline:     'bg-[#eff4ff] text-[#174fbe]',
  imprint:      'bg-[#f5f0ff] text-[#4b23c7]',
  'inner child':'bg-[#f5f0ff] text-[#4b23c7]',
  needs:        'bg-[#fff8ee] text-[#7a4a08]',
  safety:       'bg-[#f0faf6] text-[#0b6e58]',
  beliefs:      'bg-[#fdf6e8] text-[#7a3e08]',
  reframe:      'bg-[#eff4ff] text-[#174fbe]',
  growth:       'bg-[#f0faf6] text-[#0b6e58]',
  lessons:      'bg-[#fdf6e8] text-[#7a3e08]',
  integration:  'bg-[#eff4ff] text-[#174fbe]',
  wisdom:       'bg-[#f5f0ff] text-[#4b23c7]',
  transition:   'bg-[#fff0f0] text-[#c04060]',
  courage:      'bg-[#fff8ee] text-[#7a4a08]',
  strength:     'bg-[#f0faf6] text-[#0b6e58]',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArtifactsLibraryPage() {
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(artifacts.filter((a) => a.favorite).map((a) => a.id))
  )
  const [moreOpen, setMoreOpen] = useState<string | null>(null)

  const filtered = artifacts.filter((a) =>
    search === '' ||
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.preserves.toLowerCase().includes(search.toLowerCase()) ||
    a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
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

        {/* Breadcrumb + actions */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
            <span>Map Sources</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-black text-[#06183a]">Artifacts</span>
          </nav>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-[10px] border border-[#d9a461] bg-white px-4 py-2 text-sm font-black text-[#5b3609] hover:bg-[#fff2df] transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Artifact
                <ChevronDown className="h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-11 z-30 w-72 rounded-[14px] border border-[#ead7b9] bg-white p-2 shadow-[0_12px_30px_rgba(48,27,5,0.12)]">
                  {[
                    { icon: Sparkles, color: '#c97c1e', bg: '#fff8ee', label: 'Create from Source', desc: 'Turn a session, journal, reflection, scan, or transcript into an artifact.', href: '/map-sources/artifacts/new?mode=source' },
                    { icon: Upload,   color: '#176dff', bg: '#eff4ff', label: 'Upload File',         desc: 'Add a document, image, PDF, note, screenshot, or voice memo.',           href: '/map-sources/artifacts/new?mode=upload' },
                    { icon: PenLine,  color: '#0f8a77', bg: '#f0faf6', label: 'Write Manually',      desc: 'Create a new artifact directly.',                                        href: '/map-sources/artifacts/new?mode=manual' },
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
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#fcd0a8] bg-[#fff8ee]">
              <ShieldCheck className="h-5 w-5 text-[#c97c1e]" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Artifacts Library</h1>
          </div>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#344263]">
            Review the meaning objects created from your sessions, journals, reflections, and map work or uploaded life material.
          </p>
        </div>

        {/* Banner */}
        <div className="mb-5 flex items-start gap-3 rounded-[10px] border border-[#d9c49a] bg-[#fdf6e8] px-4 py-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#c97c1e]" />
          <p className="text-sm font-semibold text-[#5b3609]">
            Artifacts are <span className="font-black">distilled meaning objects</span> from your map work or uploaded life material. You decide what matters and how it connects to your Atlas.
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {[
            { icon: ShieldCheck, value: '42', label: 'Total Artifacts',    sub: 'All time',       color: '#c97c1e', bg: '#fff8ee' },
            { icon: FileText,    value: '18', label: 'From Sessions',      sub: 'Map Sessions',   color: '#0f8a77', bg: '#f0faf6' },
            { icon: BookOpen,    value: '16', label: 'From Journals',      sub: 'Your writing',   color: '#176dff', bg: '#eff4ff' },
            { icon: Star,        value: '8',  label: 'Favorites',          sub: 'Quick access',   color: '#f0a638', bg: '#fffbee' },
            { icon: Link2,       value: '24', label: 'Connected to Map',   sub: 'Artifacts linked',color: '#0f8a77', bg: '#f0faf6' },
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
              placeholder="Search artifacts..."
              className="w-full rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] py-2 pl-8 pr-3 text-sm font-semibold text-[#06183a] outline-none placeholder:text-[#a0a8b8] focus:border-[#d9a461]"
            />
          </div>
          {['All Types', 'All Domains', 'All Sources', 'All Tags'].map((f) => (
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
          <div className="grid grid-cols-[2fr_2.4fr_1.7fr_auto] gap-0 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-2.5">
            {[
              ['Artifact',          'Type · Source · Date'],
              ['What It Preserves', 'The meaning captured here'],
              ['Map Connection',    'Where it belongs'],
              ['Tools',             ''],
            ].map(([col, sub]) => (
              <p key={col} className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8]">
                {col}
                {sub && <span className="block text-[10px] normal-case font-semibold">{sub}</span>}
              </p>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((artifact, idx) => {
            const sc = statusConfig(artifact.status)
            const Icon = artifact.icon
            const isFav = favorites.has(artifact.id)
            return (
              <div
                key={artifact.id}
                className={`group grid grid-cols-[2fr_2.4fr_1.7fr_auto] gap-0 items-start px-4 py-4 transition-colors hover:bg-[#fffaf2] ${idx < filtered.length - 1 ? 'border-b border-[#ead7b9]' : ''}`}
              >
                {/* Artifact col */}
                <div className="flex items-start gap-3 pr-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#ead7b9]" style={{ background: artifact.iconBg }}>
                    <Icon className="h-4 w-4" style={{ color: artifact.iconColor }} />
                  </div>
                  <Link href={`/map-sources/artifacts/${artifact.id}`} className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-[#06183a] hover:text-[#c97c1e] transition-colors leading-tight">{artifact.title}</span>
                      {isFav && <Star className="h-3.5 w-3.5 shrink-0 fill-[#f0a638] text-[#f0a638]" />}
                    </div>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{artifact.typeLine}</p>
                    <p className="text-[11px] font-semibold text-[#a0a8b8]">{artifact.date}</p>
                  </Link>
                </div>

                {/* What It Preserves col */}
                <div className="pr-4">
                  <p className="text-sm font-semibold leading-5 text-[#344263]">{artifact.preserves}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {artifact.tags.map((tag) => (
                      <span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tagColor[tag] ?? 'bg-[#faf6f0] text-[#344263]'}`}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Map Connection col */}
                <div className="pr-3">
                  <p className="font-black text-sm" style={{ color: artifact.status === 'Connected to Map' ? '#176dff' : artifact.status === 'Partially Connected' ? '#c97c1e' : '#6c37c6' }}>
                    {artifact.domain}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{artifact.connections} connection{artifact.connections !== 1 ? 's' : ''}</p>
                  <p className="text-[11px] font-semibold text-[#a0a8b8]">{artifact.connectionDomains}</p>
                  <span className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${sc.badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                    {artifact.status}
                  </span>
                </div>

                {/* Tools col */}
                <div className="flex items-start gap-1">
                  <Link
                    href={`/map-sources/artifacts/${artifact.id}`}
                    className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-all"
                  >
                    <BookOpen className="h-4 w-4" />
                    Open
                  </Link>
                  <button
                    onClick={() => toggleFav(artifact.id)}
                    className={`flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold transition-all ${isFav ? 'text-[#f0a638] hover:bg-[#fff8ee]' : 'text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#f0a638]'}`}
                    aria-label="Favorite"
                  >
                    <Bookmark className={`h-4 w-4 ${isFav ? 'fill-[#f0a638]' : ''}`} />
                    {isFav ? 'Saved' : 'Save'}
                  </button>
                  <Link
                    href={`/map-sources/artifacts/${artifact.id}?tab=connections`}
                    className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-all"
                  >
                    <Link2 className="h-4 w-4" />
                    Connect
                  </Link>
                  <div className="relative">
                    <button
                      onClick={() => setMoreOpen(moreOpen === artifact.id ? null : artifact.id)}
                      className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-all"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      More
                    </button>
                    {moreOpen === artifact.id && (
                      <div className="absolute right-0 top-10 z-20 min-w-[180px] rounded-[10px] border border-[#ead7b9] bg-white py-1 shadow-lg">
                        {['Edit or expand', 'Connect to domain', 'Add to lens scan', 'Export artifact', 'Delete artifact'].map((action) => (
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
          <p className="text-sm font-semibold text-[#6b7280]">Showing 1–{filtered.length} of 42 artifacts</p>
          <button className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-5 py-2.5 text-sm font-black text-[#06183a] hover:bg-[#fff8ee] transition-colors">
            Load more <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[290px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Artifact Health */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Artifact Health</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#344263]">A snapshot of your artifact library.</p>
            <div className="mt-3 space-y-1.5">
              {artifactHealth.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between rounded-[8px] px-2 py-2 hover:bg-[#faf6f0] transition-colors">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                    <span className="text-xs font-semibold text-[#344263]">{label}</span>
                  </div>
                  <span className="text-sm font-black" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
            <Link href="/map-sources/artifacts" className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View all artifacts <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* What artifacts are */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-[#c97c1e]" />
              <h2 className="text-sm font-black text-[#06183a]">What artifacts are</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Artifacts are distilled meaning objects from your map work or uploaded life material.
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              They turn sessions, journals, reflections, and scans into something you can revisit, refine, and connect to your Atlas.
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              You decide what matters and how it fits into your map.
            </p>
            <Link href="/how-it-works/artifacts" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Learn how artifacts strengthen your Atlas <ArrowRight className="h-3.5 w-3.5" />
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

          {/* Tips */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Tips for Using Artifacts</h2>
            <ul className="mt-3 space-y-2">
              {[
                { icon: BookOpen, tip: 'Treat artifacts as living meaning.' },
                { icon: RefreshCw, tip: 'Revisit and refine over time.' },
                { icon: Link2, tip: 'Connect across multiple domains.' },
              ].map(({ icon: Icon, tip }) => (
                <li key={tip} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#344263]">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c97c1e]" />
                  {tip}
                </li>
              ))}
            </ul>
            <Link href="/guidance/artifacts" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              More tips <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </aside>
    </div>
  )
}
