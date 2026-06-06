'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock,
  FileSearch,
  FileText,
  Layers3,
  Link2,
  MoreHorizontal,
  Plus,
  Scale,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Upload,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const lensColors: Record<string, { bg: string; text: string; border: string }> = {
  'Attachment Lens':   { bg: '#eff4ff', text: '#174fbe', border: '#c3d4fb' },
  'Pattern Lens':      { bg: '#fdf6e8', text: '#7a3e08', border: '#f5d9a8' },
  'Values Lens':       { bg: '#f0faf6', text: '#0b6e58', border: '#b6e8d9' },
  'Power Lens':        { bg: '#fff0f0', text: '#c04060', border: '#fcd0d0' },
  'Core Beliefs Lens': { bg: '#f5f0ff', text: '#4b23c7', border: '#d9c4ff' },
  'Shadow Lens':       { bg: '#faf0ff', text: '#6c37c6', border: '#d9c4ff' },
  'Gottman Lens':      { bg: '#f0faf6', text: '#0b6e58', border: '#b6e8d9' },
  'Subtext Lens':      { bg: '#eff4ff', text: '#174fbe', border: '#c3d4fb' },
  'DARVO Lens':        { bg: '#fff0f0', text: '#c04060', border: '#fcd0d0' },
}

const scans = [
  {
    id: 'relationship-pattern-scan',
    title: 'Relationship Pattern Scan',
    lens: 'Attachment Lens',
    meta: 'Map Session · May 3, 2025',
    appliedTo: 'Map Session',
    appliedDate: 'Apr 30, 2025',
    appliedLabel: 'Couples Check-In',
    findings: ['People-pleasing still active', 'Attachment wounds healing', 'Boundaries improving'],
    moreFindings: 1,
    domain: 'Family System',
    connections: 8,
    connectionDomains: 'Mother, Attachment, Siblings, Patterns',
    status: 'Completed',
    statusDate: 'May 3, 2025',
    progress: null,
    icon: Sparkles, iconColor: '#174fbe', iconBg: '#eff4ff',
    favorite: false,
  },
  {
    id: 'growth-mindset-scan',
    title: 'Growth Mindset Scan',
    lens: 'Pattern Lens',
    meta: 'Journal Entry · May 6, 2025',
    appliedTo: 'Journal Entry',
    appliedDate: 'May 1, 2025',
    appliedLabel: 'Morning Reflections',
    findings: ['Resilience pattern is strong', 'Growth spikes after reflection', 'Perfectionism creates friction'],
    moreFindings: 2,
    domain: 'Personal Growth',
    connections: 6,
    connectionDomains: 'Mindset, Beliefs, Habits',
    status: 'Completed',
    statusDate: 'May 3, 2025',
    progress: null,
    icon: BarChart2, iconColor: '#c97c1e', iconBg: '#fff8ee',
    favorite: true,
  },
  {
    id: 'work-alignment-scan',
    title: 'Work Alignment Scan',
    lens: 'Values Lens',
    meta: 'Text Chat Session · Apr 28, 2025',
    appliedTo: 'Text Chat Session',
    appliedDate: 'Apr 28, 2025',
    appliedLabel: 'Career Clarity Chat',
    findings: ['Purpose alignment 68%', 'Meaning driven by impact', 'Energy drains need review'],
    moreFindings: 2,
    domain: 'Purpose',
    connections: 5,
    connectionDomains: 'Values, Work, Calling',
    status: 'In Progress',
    statusDate: '70% complete',
    progress: 70,
    icon: Layers3, iconColor: '#0f8a77', iconBg: '#f0faf6',
    favorite: false,
  },
  {
    id: 'power-dynamics-scan',
    title: 'Power Dynamics Scan',
    lens: 'Power Lens',
    meta: 'Transcript · Apr 22, 2025',
    appliedTo: 'Transcript',
    appliedDate: 'Apr 22, 2025',
    appliedLabel: 'Difficult Conversation',
    findings: ['Control tactics identified', 'DARVO pattern present', 'Power imbalance clear'],
    moreFindings: 1,
    domain: 'Relationship Dynamics',
    connections: 9,
    connectionDomains: 'Power, Boundaries, Communication',
    status: 'In Progress',
    statusDate: '40% complete',
    progress: 40,
    icon: Scale, iconColor: '#c04060', iconBg: '#fff0f0',
    favorite: false,
  },
  {
    id: 'self-worth-scan',
    title: 'Self-Worth Scan',
    lens: 'Core Beliefs Lens',
    meta: 'Journal Entry · Apr 25, 2025',
    appliedTo: 'Journal Entry',
    appliedDate: 'Apr 25, 2025',
    appliedLabel: 'Evening Reflection',
    findings: ['Conditional worth patterns', 'Inner critic still active', 'Self-acceptance rising'],
    moreFindings: 2,
    domain: 'Identity',
    connections: 7,
    connectionDomains: 'Core Beliefs, Worth, Inner Voice',
    status: 'Completed',
    statusDate: 'Apr 25, 2025',
    progress: null,
    icon: FileSearch, iconColor: '#4b23c7', iconBg: '#f5f0ff',
    favorite: true,
  },
]

const overviewItems = [
  { label: 'Completed',          value: 16, color: '#0f8a77', icon: BadgeCheck },
  { label: 'In Progress',        value: 10, color: '#c97c1e', icon: Clock },
  { label: 'Not Started',        value: 5,  color: '#6b7280', icon: Clock },
  { label: 'Key Insights Marked',value: 12, color: '#f0a638', icon: Star },
  { label: 'Connected to Map',   value: 22, color: '#176dff', icon: Link2 },
]

const popularLenses = [
  'Pattern Lens', 'Attachment Lens', 'Power Lens', 'Values Lens',
  'Gottman Lens', 'Subtext Lens', 'Shadow Lens', 'DARVO Lens',
]

const howItWorks = [
  { n: 1, title: 'Choose what to scan',  body: 'Select a source, domain, or pasted text to examine.' },
  { n: 2, title: 'Choose a lens',        body: 'Pick the perspective or framework to apply.' },
  { n: 3, title: 'Review key findings',  body: 'See patterns, blind spots, contradictions, and signals.' },
  { n: 4, title: 'Connect what matters', body: 'Add insights to your map where they belong.' },
]

function statusConfig(status: string) {
  if (status === 'Completed')  return { color: 'text-[#0f8a77]', dot: 'bg-[#0f8a77]' }
  if (status === 'In Progress')return { color: 'text-[#c97c1e]', dot: 'bg-[#c97c1e]' }
  return { color: 'text-[#6b7280]', dot: 'bg-[#a0a8b8]' }
}

function LensChip({ lens }: { lens: string }) {
  const cfg = lensColors[lens] ?? { bg: '#faf6f0', text: '#344263', border: '#ead7b9' }
  return (
    <span className="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-black" style={{ background: cfg.bg, color: cfg.text, borderColor: cfg.border }}>
      {lens}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LensScansLibraryPage() {
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState<string | null>(null)

  const filtered = scans.filter((s) =>
    search === '' ||
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.lens.toLowerCase().includes(search.toLowerCase()) ||
    s.findings.some((f) => f.toLowerCase().includes(search.toLowerCase())) ||
    s.domain.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Breadcrumb + actions */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
            <span>Map Sources</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-black text-[#06183a]">Lens Scans</span>
          </nav>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-[10px] border border-[#c4b0ff] bg-white px-4 py-2 text-sm font-black text-[#4b23c7] hover:bg-[#f5f0ff] transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Lens Scan
                <ChevronDown className="h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-11 z-30 w-72 rounded-[14px] border border-[#ead7b9] bg-white p-2 shadow-[0_12px_30px_rgba(48,27,5,0.12)]">
                  {[
                    { icon: Upload,     color: '#6c37c6', bg: '#f5f0ff', label: 'Scan Text or File',   desc: 'Paste text or upload a file to analyze with a lens.',               href: '/map-sources/lens-scans/new?mode=text-file' },
                    { icon: FileSearch, color: '#c97c1e', bg: '#fff8ee', label: 'Scan a Map Source',   desc: 'Apply a lens to a session, journal, transcript, or artifact.',       href: '/map-sources/lens-scans/new?mode=source'    },
                    { icon: Layers3,    color: '#176dff', bg: '#eff4ff', label: 'Scan a Domain',       desc: 'Analyze an entire domain or sub-domain.',                            href: '/map-sources/lens-scans/new?mode=domain'    },
                    { icon: Scale,      color: '#0f8a77', bg: '#f0faf6', label: 'Compare Two Sources', desc: 'Use a lens to compare two sources side by side.',                    href: '/map-sources/lens-scans/new?mode=compare'   },
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
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d9c4ff] bg-[#f5f0ff]">
            <FileSearch className="h-5 w-5 text-[#6c37c6]" />
          </div>
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Lens Scans Library</h1>
            <p className="mt-1.5 max-w-2xl text-sm font-semibold leading-6 text-[#344263]">
              Review interpretive scans that examined your sources, domains, and map through specific lenses.
            </p>
          </div>
        </div>

        {/* Banner */}
        <div className="mb-5 flex items-start gap-3 rounded-[10px] border border-[#d9c4ff] bg-[#f9f5ff] px-4 py-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#6c37c6]" />
          <p className="text-sm font-semibold text-[#3d1a7a]">
            Lens Scans are <span className="font-black">interpretive passes over existing material.</span> You choose the source, choose the lens, and decide which findings belong in your map.
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {[
            { icon: FileSearch, value: '31', label: 'Total Lens Scans',    sub: 'All time',          color: '#6c37c6', bg: '#f5f0ff' },
            { icon: BadgeCheck, value: '16', label: 'Completed',           sub: 'Fully processed',   color: '#0f8a77', bg: '#f0faf6' },
            { icon: Clock,      value: '10', label: 'In Progress',         sub: 'Being analyzed',    color: '#c97c1e', bg: '#fff8ee' },
            { icon: Star,       value: '12', label: 'Key Findings Marked', sub: 'Saved as key',      color: '#f0a638', bg: '#fffbee' },
            { icon: Link2,      value: '22', label: 'Connected to Map',    sub: 'Driving clarity',   color: '#176dff', bg: '#eff4ff' },
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
              placeholder="Search lens scans..."
              className="w-full rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] py-2 pl-8 pr-3 text-sm font-semibold text-[#06183a] outline-none placeholder:text-[#a0a8b8] focus:border-[#c4b0ff]"
            />
          </div>
          {['All Status', 'All Lens Types', 'All Sources', 'All Domains', 'All Time'].map((f) => (
            <button key={f} className="inline-flex items-center gap-1 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-bold text-[#344263] hover:border-[#c4b0ff] hover:bg-[#f5f0ff] transition-colors whitespace-nowrap">
              {f} <ChevronDown className="h-3 w-3" />
            </button>
          ))}
          <button className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-bold text-[#344263] hover:bg-[#f5f0ff] transition-colors">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
          </button>
          <button className="ml-auto inline-flex items-center gap-1 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-bold text-[#344263] hover:bg-[#fff8ee] transition-colors whitespace-nowrap">
            Sort: Newest First <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">

          {/* Header */}
          <div className="grid grid-cols-[1.8fr_1.4fr_1.8fr_1.6fr_1fr_auto] gap-0 border-b border-[#ead7b9] bg-[#faf6f0] px-4 py-2.5">
            {[
              ['Lens Scan',       'Type · Lens · Date'],
              ['Applied To',      'What the lens examined'],
              ['Key Findings',    'What the lens revealed'],
              ['Map Connection',  'Where it connects'],
              ['Status',          ''],
              ['Actions',         ''],
            ].map(([col, sub]) => (
              <p key={col} className="text-[11px] font-black uppercase tracking-wider text-[#a0a8b8]">
                {col}
                {sub && <span className="block text-[10px] normal-case font-semibold">{sub}</span>}
              </p>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((scan, idx) => {
            const sc = statusConfig(scan.status)
            const Icon = scan.icon
            return (
              <div
                key={scan.id}
                className={`group grid grid-cols-[1.8fr_1.4fr_1.8fr_1.6fr_1fr_auto] gap-0 items-start px-4 py-4 transition-colors hover:bg-[#fffaf2] ${idx < filtered.length - 1 ? 'border-b border-[#ead7b9]' : ''}`}
              >
                {/* Scan title col */}
                <div className="flex items-start gap-2.5 pr-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#ead7b9]" style={{ background: scan.iconBg }}>
                    <Icon className="h-4 w-4" style={{ color: scan.iconColor }} />
                  </div>
                  <div className="min-w-0">
                    <Link href={`/map-sources/lens-scans/${scan.id}`} className="font-black text-[#06183a] hover:text-[#6c37c6] transition-colors leading-tight">
                      {scan.title}
                    </Link>
                    <div className="mt-1">
                      <LensChip lens={scan.lens} />
                    </div>
                    <p className="mt-1 text-[11px] font-semibold text-[#a0a8b8]">{scan.meta}</p>
                  </div>
                </div>

                {/* Applied To col */}
                <div className="pr-3">
                  <p className="text-xs font-black text-[#344263]">{scan.appliedTo}</p>
                  <p className="text-[11px] font-semibold text-[#a0a8b8]">{scan.appliedDate}</p>
                  <p className="mt-1 text-xs font-semibold italic text-[#6b7280]">{scan.appliedLabel}</p>
                </div>

                {/* Key Findings col */}
                <div className="pr-3">
                  <ul className="space-y-1">
                    {scan.findings.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-xs font-semibold leading-5 text-[#344263]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6c37c6]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {scan.moreFindings > 0 && (
                    <button className="mt-1 text-[11px] font-black text-[#6c37c6] hover:underline">
                      +{scan.moreFindings} more insight{scan.moreFindings !== 1 ? 's' : ''}
                    </button>
                  )}
                </div>

                {/* Map Connection col */}
                <div className="pr-3">
                  <p className="font-black text-sm text-[#6c37c6]">{scan.domain}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{scan.connections} connections</p>
                  <p className="text-[11px] font-semibold text-[#a0a8b8]">{scan.connectionDomains}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#f0faf6] border border-[#b6e8d9] px-2 py-0.5 text-[10px] font-black text-[#0f8a77]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0f8a77]" />
                    Connected to Map
                  </span>
                </div>

                {/* Status col */}
                <div className="pr-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${sc.dot}`} />
                    <span className={`text-sm font-black ${sc.color}`}>{scan.status}</span>
                  </div>
                  {scan.progress !== null ? (
                    <div className="mt-1.5">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#ead7b9]">
                        <div className="h-1.5 rounded-full bg-[#c97c1e]" style={{ width: `${scan.progress}%` }} />
                      </div>
                      <p className="mt-0.5 text-[11px] font-semibold text-[#6b7280]">{scan.statusDate}</p>
                    </div>
                  ) : (
                    <p className="mt-0.5 text-[11px] font-semibold text-[#a0a8b8]">{scan.statusDate}</p>
                  )}
                </div>

                {/* Actions col */}
                <div className="flex items-start gap-0.5">
                  {[
                    { icon: FileSearch, label: 'View',     tab: ''        },
                    { icon: BarChart2,  label: 'Insights', tab: 'insights'},
                  ].map(({ icon: TIcon, label, tab }) => (
                    <Link
                      key={label}
                      href={`/map-sources/lens-scans/${scan.id}${tab ? `?tab=${tab}` : ''}`}
                      className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#f5f0ff] hover:text-[#6c37c6] transition-all"
                    >
                      <TIcon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                  <div className="relative">
                    <button
                      onClick={() => setMoreOpen(moreOpen === scan.id ? null : scan.id)}
                      className="flex flex-col items-center gap-1 rounded-[8px] px-2 py-2 text-[10px] font-bold text-[#6b7280] hover:bg-[#f5f0ff] hover:text-[#6c37c6] transition-all"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      More
                    </button>
                    {moreOpen === scan.id && (
                      <div className="absolute right-0 top-10 z-20 min-w-[180px] rounded-[10px] border border-[#ead7b9] bg-white py-1 shadow-lg">
                        {['Add finding to map', 'Re-run with different lens', 'Export findings', 'Delete scan'].map((action) => (
                          <button key={action} onClick={() => setMoreOpen(null)} className="w-full px-4 py-2 text-left text-xs font-semibold text-[#344263] hover:bg-[#f5f0ff] hover:text-[#6c37c6]">
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
          <p className="text-sm font-semibold text-[#6b7280]">Showing 1–{filtered.length} of 31 lens scans</p>
          <button className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-5 py-2.5 text-sm font-black text-[#06183a] hover:bg-[#f5f0ff] transition-colors">
            Load more <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[290px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Lens Scans Overview */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Lens Scans Overview</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#344263]">A snapshot of your scan activity.</p>
            <div className="mt-3 space-y-1.5">
              {overviewItems.map(({ label, value, color, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between rounded-[8px] px-2 py-2 hover:bg-[#faf6f0] transition-colors">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                    <span className="text-xs font-semibold text-[#344263]">{label}</span>
                  </div>
                  <span className="text-sm font-black" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
            <Link href="/map-sources/lens-scans" className="mt-2 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              View all lens scans <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* How Lens Scans Work */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">How Lens Scans Work</h2>
            </div>
            <div className="mt-3 space-y-3">
              {howItWorks.map(({ n, title, body }) => (
                <div key={n} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff] text-[11px] font-black text-[#6c37c6]">{n}</span>
                  <div>
                    <p className="text-xs font-black text-[#06183a]">{title}</p>
                    <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/how-it-works/lens-scans" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              Learn how lens scans deepen your Atlas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Popular Lenses */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Popular Lenses</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularLenses.map((lens) => (
                <Link key={lens} href={`/map-sources/lens-scans/new?lens=${encodeURIComponent(lens)}`}>
                  <LensChip lens={lens} />
                </Link>
              ))}
            </div>
            <Link href="/map-sources/lens-scans/lenses" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              Explore all lenses <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Tips */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Tips for Using Lens Scans</h2>
            <ul className="mt-3 space-y-2">
              {[
                { icon: FileSearch, tip: 'Try different lenses on the same source.' },
                { icon: BarChart2,  tip: 'Compare insights across perspectives.' },
                { icon: Sparkles,   tip: 'Look for patterns across your map.' },
                { icon: Link2,      tip: 'What you connect is what transforms.' },
              ].map(({ icon: Icon, tip }) => (
                <li key={tip} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#344263]">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6c37c6]" />
                  {tip}
                </li>
              ))}
            </ul>
            <Link href="/guidance/lens-scans" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              More tips <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </aside>
    </div>
  )
}
