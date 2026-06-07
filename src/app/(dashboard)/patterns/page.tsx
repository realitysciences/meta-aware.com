'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  CircleHelp,
  Clock,
  CreditCard,
  Edit3,
  Eye,
  GitCompare,
  Heart,
  Link2,
  LogOut,
  Map,
  Maximize2,
  MessageCircle,
  Minus,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Zap,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'clusters' | 'connections' | 'themes' | 'behavioral' | 'domain'

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',       href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',   href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',     href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',     href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts', href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, iconColor, iconBg, label, value, caption, valueColor, compact, linkLabel, linkHref }: {
  icon: React.ElementType; iconColor: string; iconBg: string
  label: string; value: string; caption: string
  valueColor?: string; compact?: boolean; linkLabel?: string; linkHref?: string
}) {
  return (
    <div className="flex min-w-[155px] flex-1 flex-col gap-1.5 rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]">
      <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <p className="text-[11px] font-semibold text-[#6b7280]">{label}</p>
      <p className={`font-serif font-bold ${compact ? 'text-lg leading-tight' : 'text-3xl leading-none'}`}
        style={{ color: valueColor ?? '#06183a' }}>{value}</p>
      <p className="text-[11px] font-semibold leading-4 text-[#a0a8b8]">{caption}</p>
      {linkLabel && (
        <button className="mt-0.5 flex items-center gap-1 text-[11px] font-black text-[#c97c1e] hover:underline">
          {linkLabel} <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

// ─── Signal badge ─────────────────────────────────────────────────────────────

function SignalBadge({ level }: { level: 'Strong' | 'Moderate' | 'Emerging' | 'Weak' }) {
  const config = {
    Strong:   { color: '#0f8a77', bg: '#f0faf6', border: '#b6e8d9', dot: '#0f8a77' },
    Moderate: { color: '#c97c1e', bg: '#fff8ee', border: '#ead7b9', dot: '#c97c1e' },
    Emerging: { color: '#176dff', bg: '#eff4ff', border: '#c5d8ff', dot: '#176dff' },
    Weak:     { color: '#6b7280', bg: '#f3f4f6', border: '#d1d5db', dot: '#9ca3af' },
  }
  const c = config[level]
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-black"
      style={{ color: c.color, background: c.bg, borderColor: c.border }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.dot }} />
      {level} signal
    </span>
  )
}

// ─── Bar row ──────────────────────────────────────────────────────────────────

function BarRow({ label, value, max, color = '#6c37c6' }: {
  label: string; value: number; max: number; color?: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold text-[#344263]">
        <span className="truncate pr-2">{label}</span>
        <span className="shrink-0 font-black">{value}</span>
      </div>
      <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-[#ead7b9]">
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
    </div>
  )
}

// ─── Connection map ────────────────────────────────────────────────────────────
// Node positions for a 760px × 440px canvas.
// Primary row: top=168, height=82, bottom=250, center_y=209
// Secondary row: top=316, height=76, bottom=392, center_y=354
// Hub top: top=8, height=80, bottom=88, center_y=48

// Node x-centers (left + half-width):
// Hub (250px wide, centered): left=255, center_x=380
// Family (120px):  left=0,   center_x=60
// Identity (120px):left=143, center_x=203
// Boundaries (120px):left=286,center_x=346
// Communication (120px):left=429,center_x=489
// Expression (120px):left=572,center_x=632
// PeoplePleasing (155px):left=5,  center_x=82
// BoundaryDelay (155px): left=280,center_x=357
// ClarityThru (185px):   left=555, center_x=647

const PRIMARY_Y_TOP = 168
const PRIMARY_Y_MID = 209
const PRIMARY_Y_BOT = 250
const SEC_Y_TOP = 316
const HUB_Y_BOT = 88

const hubX = 380

function ConnectionMap() {
  const nodes = {
    hub:   { lx: 255, ly: 8,   w: 250, h: 80, cx: 380,  cy: 48 },
    fam:   { lx: 0,   ly: PRIMARY_Y_TOP, w: 120, h: 82, cx: 60,  cy: PRIMARY_Y_MID },
    iden:  { lx: 143, ly: PRIMARY_Y_TOP, w: 120, h: 82, cx: 203, cy: PRIMARY_Y_MID },
    bnd:   { lx: 286, ly: PRIMARY_Y_TOP, w: 120, h: 82, cx: 346, cy: PRIMARY_Y_MID },
    comm:  { lx: 429, ly: PRIMARY_Y_TOP, w: 120, h: 82, cx: 489, cy: PRIMARY_Y_MID },
    expr:  { lx: 572, ly: PRIMARY_Y_TOP, w: 120, h: 82, cx: 632, cy: PRIMARY_Y_MID },
    pp:    { lx: 5,   ly: SEC_Y_TOP, w: 155, h: 76, cx: 82,  cy: 354 },
    bd:    { lx: 280, ly: SEC_Y_TOP, w: 155, h: 76, cx: 357, cy: 354 },
    cte:   { lx: 555, ly: SEC_Y_TOP, w: 185, h: 76, cx: 647, cy: 354 },
  }

  return (
    <div className="overflow-x-auto">
      <div className="relative h-[440px] min-w-[760px]" style={{ width: 760 }}>

        {/* SVG connection lines */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arr-navy" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#344263" />
            </marker>
            <marker id="arr-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#6c37c6" />
            </marker>
            <marker id="arr-gray" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#a0a8b8" />
            </marker>
          </defs>

          {/* ── Primary horizontal flow (solid navy arrows) ─────────────── */}
          <line x1={120} y1={PRIMARY_Y_MID} x2={141} y2={PRIMARY_Y_MID} stroke="#344263" strokeWidth={1.5} markerEnd="url(#arr-navy)" />
          <line x1={263} y1={PRIMARY_Y_MID} x2={284} y2={PRIMARY_Y_MID} stroke="#344263" strokeWidth={1.5} markerEnd="url(#arr-navy)" />
          <line x1={406} y1={PRIMARY_Y_MID} x2={427} y2={PRIMARY_Y_MID} stroke="#344263" strokeWidth={1.5} markerEnd="url(#arr-navy)" />
          <line x1={549} y1={PRIMARY_Y_MID} x2={570} y2={PRIMARY_Y_MID} stroke="#344263" strokeWidth={1.5} markerEnd="url(#arr-navy)" />

          {/* ── Dashed purple from hub to Identity, Boundaries, Communication ── */}
          <line x1={hubX} y1={HUB_Y_BOT} x2={203} y2={PRIMARY_Y_TOP} stroke="#6c37c6" strokeWidth={1.5} strokeDasharray="5 3" markerEnd="url(#arr-purple)" />
          <line x1={hubX} y1={HUB_Y_BOT} x2={346} y2={PRIMARY_Y_TOP} stroke="#6c37c6" strokeWidth={1.5} strokeDasharray="5 3" markerEnd="url(#arr-purple)" />
          <line x1={hubX} y1={HUB_Y_BOT} x2={489} y2={PRIMARY_Y_TOP} stroke="#6c37c6" strokeWidth={1.5} strokeDasharray="5 3" markerEnd="url(#arr-purple)" />

          {/* ── Upward arrows from secondary row ──────────────────────────── */}
          {/* People Pleasing → Family System */}
          <line x1={72}  y1={SEC_Y_TOP} x2={60}  y2={PRIMARY_Y_BOT} stroke="#a0a8b8" strokeWidth={1.5} markerEnd="url(#arr-gray)" />
          {/* People Pleasing → Identity */}
          <line x1={140} y1={SEC_Y_TOP} x2={203} y2={PRIMARY_Y_BOT} stroke="#a0a8b8" strokeWidth={1.5} markerEnd="url(#arr-gray)" />
          {/* Boundary Delay → Boundaries */}
          <line x1={340} y1={SEC_Y_TOP} x2={346} y2={PRIMARY_Y_BOT} stroke="#a0a8b8" strokeWidth={1.5} markerEnd="url(#arr-gray)" />
          {/* Boundary Delay → Communication */}
          <line x1={410} y1={SEC_Y_TOP} x2={489} y2={PRIMARY_Y_BOT} stroke="#a0a8b8" strokeWidth={1.5} markerEnd="url(#arr-gray)" />
          {/* Clarity Through Expression → Communication */}
          <line x1={600} y1={SEC_Y_TOP} x2={489} y2={PRIMARY_Y_BOT} stroke="#a0a8b8" strokeWidth={1.5} markerEnd="url(#arr-gray)" />
          {/* Clarity Through Expression → Expression */}
          <line x1={680} y1={SEC_Y_TOP} x2={632} y2={PRIMARY_Y_BOT} stroke="#a0a8b8" strokeWidth={1.5} markerEnd="url(#arr-gray)" />
        </svg>

        {/* ── Hub node: Translator / Bridge Role ──────────────────────────── */}
        <div className="absolute flex gap-3 rounded-[12px] border border-[#e0d4f8] bg-[#f8f5ff] p-3 shadow-[0_4px_12px_rgba(108,55,198,0.12)]"
          style={{ left: nodes.hub.lx, top: nodes.hub.ly, width: nodes.hub.w }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ede8fb]">
            <Link2 className="h-4 w-4 text-[#6c37c6]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black leading-snug text-[#3b1d72]">Translator / Bridge Role</p>
            <p className="mt-0.5 text-[10px] font-semibold leading-4 text-[#6c37c6]">A core way you connect, understand, and help others.</p>
          </div>
        </div>

        {/* ── Primary domain nodes ─────────────────────────────────────────── */}
        {/* Family System */}
        <div className="absolute flex flex-col items-center gap-1 rounded-[10px] border border-[#e0d4f8] bg-white px-2 py-2.5 text-center shadow-[0_2px_8px_rgba(48,27,5,0.06)]"
          style={{ left: nodes.fam.lx, top: nodes.fam.ly, width: nodes.fam.w }}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f0ff]"><Users className="h-3.5 w-3.5 text-[#6c37c6]" /></div>
          <p className="text-[11px] font-black text-[#06183a]">Family System</p>
          <p className="text-[10px] font-semibold text-[#6b7280]">Seen in 12 reflections</p>
          <p className="text-[10px] font-semibold text-[#a0a8b8]">5 reports</p>
        </div>

        {/* Identity */}
        <div className="absolute flex flex-col items-center gap-1 rounded-[10px] border border-[#b6e8d9] bg-white px-2 py-2.5 text-center shadow-[0_2px_8px_rgba(48,27,5,0.06)]"
          style={{ left: nodes.iden.lx, top: nodes.iden.ly, width: nodes.iden.w }}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0faf6]"><User className="h-3.5 w-3.5 text-[#0f8a77]" /></div>
          <p className="text-[11px] font-black text-[#06183a]">Identity</p>
          <p className="text-[10px] font-semibold text-[#6b7280]">Seen in 18 reflections</p>
          <p className="text-[10px] font-semibold text-[#a0a8b8]">6 reports</p>
        </div>

        {/* Boundaries */}
        <div className="absolute flex flex-col items-center gap-1 rounded-[10px] border border-[#c5d8ff] bg-white px-2 py-2.5 text-center shadow-[0_2px_8px_rgba(48,27,5,0.06)]"
          style={{ left: nodes.bnd.lx, top: nodes.bnd.ly, width: nodes.bnd.w }}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff4ff]"><ShieldCheck className="h-3.5 w-3.5 text-[#176dff]" /></div>
          <p className="text-[11px] font-black text-[#06183a]">Boundaries</p>
          <p className="text-[10px] font-semibold text-[#6b7280]">Seen in 16 reflections</p>
          <p className="text-[10px] font-semibold text-[#a0a8b8]">5 reports</p>
        </div>

        {/* Communication */}
        <div className="absolute flex flex-col items-center gap-1 rounded-[10px] border border-[#f5dfa0] bg-white px-2 py-2.5 text-center shadow-[0_2px_8px_rgba(48,27,5,0.06)]"
          style={{ left: nodes.comm.lx, top: nodes.comm.ly, width: nodes.comm.w }}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff8ee]"><MessageCircle className="h-3.5 w-3.5 text-[#c97c1e]" /></div>
          <p className="text-[11px] font-black text-[#06183a]">Communication</p>
          <p className="text-[10px] font-semibold text-[#6b7280]">Seen in 14 reflections</p>
          <p className="text-[10px] font-semibold text-[#a0a8b8]">4 reports</p>
        </div>

        {/* Expression */}
        <div className="absolute flex flex-col items-center gap-1 rounded-[10px] border border-[#b6e8d9] bg-white px-2 py-2.5 text-center shadow-[0_2px_8px_rgba(48,27,5,0.06)]"
          style={{ left: nodes.expr.lx, top: nodes.expr.ly, width: nodes.expr.w }}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0faf6]"><Edit3 className="h-3.5 w-3.5 text-[#0f8a77]" /></div>
          <p className="text-[11px] font-black text-[#06183a]">Expression</p>
          <p className="text-[10px] font-semibold text-[#6b7280]">Seen in 11 reflections</p>
          <p className="text-[10px] font-semibold text-[#a0a8b8]">3 reports</p>
        </div>

        {/* ── Secondary pattern nodes ───────────────────────────────────────── */}
        {/* People Pleasing */}
        <div className="absolute rounded-[10px] border border-[#f5c5cf] bg-[#fff8f9] px-3 py-2 shadow-[0_2px_8px_rgba(192,64,96,0.06)]"
          style={{ left: nodes.pp.lx, top: nodes.pp.ly, width: nodes.pp.w }}>
          <div className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-[#c04060]" />
            <p className="text-[11px] font-black text-[#06183a]">People Pleasing</p>
          </div>
          <p className="mt-1 text-[10px] font-semibold leading-4 text-[#6b7280]">Drives boundary delay and over-accommodation.</p>
        </div>

        {/* Boundary Delay */}
        <div className="absolute rounded-[10px] border border-[#f0dca0] bg-[#fffbee] px-3 py-2 shadow-[0_2px_8px_rgba(201,124,30,0.06)]"
          style={{ left: nodes.bd.lx, top: nodes.bd.ly, width: nodes.bd.w }}>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#c97c1e]" />
            <p className="text-[11px] font-black text-[#06183a]">Boundary Delay</p>
          </div>
          <p className="mt-1 text-[10px] font-semibold leading-4 text-[#6b7280]">Leads to internal tension and decision inertia.</p>
        </div>

        {/* Clarity Through Expression */}
        <div className="absolute rounded-[10px] border border-[#b6e8d9] bg-[#f2faf6] px-3 py-2 shadow-[0_2px_8px_rgba(15,138,119,0.06)]"
          style={{ left: nodes.cte.lx, top: nodes.cte.ly, width: nodes.cte.w }}>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#0f8a77]" />
            <p className="text-[11px] font-black text-[#06183a]">Clarity Through Expression</p>
          </div>
          <p className="mt-1 text-[10px] font-semibold leading-4 text-[#6b7280]">Creates relief, alignment, and stronger self-trust.</p>
        </div>

        {/* ── Map controls ─────────────────────────────────────────────────── */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1 overflow-hidden rounded-[8px] border border-[#ead7b9] bg-white shadow-[0_2px_6px_rgba(48,27,5,0.06)]">
          {[Plus, Minus, Maximize2].map((Icon, i) => (
            <button key={i} className="flex h-8 w-8 items-center justify-center border-b border-[#ead7b9] text-[#6b7280] hover:bg-[#faf6f0] hover:text-[#344263] transition-colors last:border-0">
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-5 px-1 text-[11px] font-semibold text-[#6b7280]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-px w-8 bg-[#344263]" />
          Primary influence
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-px w-8" style={{ background: 'repeating-linear-gradient(to right, #6c37c6 0, #6c37c6 4px, transparent 4px, transparent 7px)' }} />
          Secondary connection
        </span>
      </div>
    </div>
  )
}

// ─── Pattern cluster card ──────────────────────────────────────────────────────

function PatternClusterCard({ title, signal, description, connectedTo, reflections, reports, voiceSessions, journals, direction, strength, strengthColor }: {
  title: string
  signal: 'Strong' | 'Moderate' | 'Emerging'
  description: string
  connectedTo: string[]
  reflections: number; reports: number; voiceSessions: number; journals: number
  direction: string
  strength: number
  strengthColor: string
}) {
  return (
    <div className="flex flex-col rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
      <div className="flex items-start justify-between border-b border-[#ead7b9] p-4 pb-3">
        <div>
          <p className="text-sm font-black text-[#06183a]">{title}</p>
          <div className="mt-1"><SignalBadge level={signal} /></div>
        </div>
        <button className="text-[#a0a8b8] hover:text-[#344263] transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 p-4">
        <p className="text-xs font-semibold leading-5 text-[#6b7280]">{description}</p>
        {/* Connected to chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {connectedTo.map((tag) => (
            <span key={tag} className="rounded-full border border-[#e0d4f8] bg-[#f5f0ff] px-2 py-0.5 text-[10px] font-black text-[#6c37c6]">{tag}</span>
          ))}
        </div>
        {/* Source support */}
        <div className="mt-3 grid grid-cols-4 gap-1 rounded-[8px] bg-[#faf6f0] p-2">
          {[
            { n: reflections,   label: 'Reflections' },
            { n: reports,       label: 'Reports' },
            { n: voiceSessions, label: 'Voice' },
            { n: journals,      label: 'Journals' },
          ].map(({ n, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-black text-[#06183a]">{n}</span>
              <span className="text-[10px] font-semibold text-[#6b7280]">{label}</span>
            </div>
          ))}
        </div>
        {/* Likely direction */}
        <p className="mt-3 text-[10px] font-black uppercase tracking-wide text-[#a0a8b8]">Likely direction</p>
        <p className="mt-0.5 text-xs font-semibold text-[#344263]">{direction}</p>
        {/* Strength bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-[#6b7280]">Strength</span>
            <span className="font-black text-[#06183a]">{strength}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#ead7b9]">
            <div className="h-full rounded-full" style={{ width: `${strength}%`, background: strengthColor }} />
          </div>
        </div>
      </div>
      <div className="border-t border-[#ead7b9] px-4 py-3">
        <button className="flex w-full items-center justify-center gap-1.5 rounded-[8px] border border-[#e0d4f8] bg-[#f5f0ff] py-2 text-xs font-black text-[#6c37c6] hover:bg-[#ede8fb] transition-colors">
          Explore Cluster <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

// ─── Cross-domain connection card ─────────────────────────────────────────────

function CrossDomainCard({ chain, strength, dots, color, description }: {
  chain: string[]; strength: string; dots: number; color: string; description: string
}) {
  return (
    <div className="rounded-[12px] border border-[#ead7b9] bg-white p-4 shadow-[0_2px_8px_rgba(48,27,5,0.04)]">
      <div className="flex flex-wrap items-center gap-1 text-sm font-black text-[#06183a]">
        {chain.map((part, i) => (
          <span key={i} className="flex items-center gap-1">
            {part}
            {i < chain.length - 1 && <ArrowRight className="h-3 w-3 text-[#d3b98f]" />}
          </span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full"
              style={{ background: i < dots ? color : '#ead7b9' }} />
          ))}
        </div>
        <span className="text-[11px] font-black" style={{ color }}>{strength}</span>
      </div>
      <p className="mt-2 text-xs font-semibold leading-5 text-[#6b7280]">{description}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConnectionsPatternsPage() {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [activeTab,  setActiveTab]  = useState<Tab>('clusters')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'clusters',    label: 'Pattern Clusters' },
    { key: 'connections', label: 'Cross-Domain Connections' },
    { key: 'themes',      label: 'Recurring Themes' },
    { key: 'behavioral',  label: 'Behavioral Patterns' },
    { key: 'domain',      label: 'Domain Interactions' },
  ]

  return (
    <div className="flex min-h-screen bg-[#fffaf2] pb-20">

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Page header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Connections &amp; Patterns</h1>
            <p className="mt-1 text-sm font-semibold text-[#344263]">
              Discover the recurring structures and relationships emerging across your reviewed material.
            </p>
            <div className="mt-2 flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f8a77]" />
              <p className="text-xs font-semibold text-[#6b7280]">
                Patterns are proposed from your reviewed sources, reflections, and reports.{' '}
                <span className="font-black text-[#06183a]">You decide what&apos;s accurate, useful, and worth saving to your Atlas.</span>
              </p>
            </div>
          </div>
          {/* Header actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
              <Plus className="h-4 w-4" /> New Custom Report
            </button>
            <button className="flex items-center gap-2 rounded-[10px] bg-[#6c37c6] px-4 py-2 text-sm font-black text-white shadow-[0_4px_12px_rgba(108,55,198,0.3)] hover:bg-[#5a2aae] transition-colors">
              <Sparkles className="h-4 w-4" />
              Review Pattern Updates
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-[#6c37c6]">9</span>
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
            <div className="relative">
              <button onClick={() => setAvatarOpen((v) => !v)}
                className="flex items-center gap-2 rounded-[12px] border border-[#ead7b9] bg-white px-3 py-2 hover:bg-[#fff8ee] transition-colors">
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

        {/* ── Stat cards ───────────────────────────────────────────────── */}
        <div className="mb-4 flex gap-3 overflow-x-auto pb-1">
          <StatCard icon={Sparkles}   iconColor="#6c37c6" iconBg="#f5f0ff"
            label="Strong Pattern Clusters" value="6"  caption="High-signal clusters across your map."
            linkLabel="View all" />
          <StatCard icon={Link2}      iconColor="#0f8a77" iconBg="#f0faf6"
            label="Cross-Domain Connections" value="23" caption="Connections between your domains."
            linkLabel="Explore" />
          <StatCard icon={TrendingUp} iconColor="#c97c1e" iconBg="#fff8ee"
            label="Patterns to Review" value="8"  caption="Proposed patterns awaiting your review."
            linkLabel="Review now" />
          <StatCard icon={ShieldCheck} iconColor="#176dff" iconBg="#eff4ff"
            label="Saved to Atlas" value="14" caption="Patterns you've approved and added to your map."
            linkLabel="See in Atlas" />
          <StatCard icon={BarChart3}  iconColor="#0f8a77" iconBg="#f0faf6"
            label="Pattern Signal" value="Strong" valueColor="#0f8a77"
            caption="Several repeated, source-supported structures." compact
            linkLabel="About signal" />
        </div>

        {/* ── Tabs + filters ────────────────────────────────────────────── */}
        <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-[#ead7b9]">
          <div className="flex flex-1 overflow-x-auto">
            {tabs.map(({ key, label }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-black transition-colors ${
                  activeTab === key
                    ? 'border-[#6c37c6] text-[#6c37c6]'
                    : 'border-transparent text-[#6b7280] hover:text-[#344263]'
                }`}>
                {label}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2 pb-1">
            {['All Domains', 'Most Significant'].map((opt) => (
              <div key={opt} className="relative">
                <select className="appearance-none rounded-full border border-[#ead7b9] bg-white py-1.5 pl-3 pr-7 text-xs font-black text-[#344263] focus:outline-none focus:border-[#6c37c6]">
                  <option>{opt}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-2 h-3.5 w-3.5 text-[#6b7280]" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 1: Map of Your Top Connections ────────────────────── */}
        <section className="mb-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Map of Your Top Connections</h2>
              <p className="text-xs font-semibold text-[#6b7280]">How your strongest patterns appear to connect across domains.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#6c37c6] hover:underline">
              View full map <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            {/* Proposed structure banner */}
            <div className="flex items-center gap-2 border-b border-[#f0dca0] bg-[#fffbee] px-5 py-2">
              <span className="h-2 w-2 rounded-full bg-[#c97c1e]" />
              <p className="text-xs font-semibold text-[#7a5800]">Proposed structure based on reviewed material.</p>
            </div>
            <div className="p-4 pb-5">
              <ConnectionMap />
            </div>
          </div>
        </section>

        {/* ── Section 2: Strongest Pattern Clusters ────────────────────── */}
        <section className="mb-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Strongest Pattern Clusters</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Clusters group related patterns that appear together across your reviewed material.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View all clusters <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <PatternClusterCard
              title="Translator / Bridge Role"
              signal="Strong"
              description="You naturally translate between worlds, people, or ideas to create connection and understanding."
              connectedTo={['Identity & Boundaries', 'Communication', 'People Pleasing', 'Family System']}
              reflections={8} reports={4} voiceSessions={6} journals={3}
              direction="Family System → Role Pattern → Communication Style"
              strength={85} strengthColor="#6c37c6"
            />
            <PatternClusterCard
              title="Identity & Boundaries"
              signal="Strong"
              description="Your identity is deeply connected to how you set, hold, and evolve your boundaries."
              connectedTo={['Translator / Bridge Role', 'Boundary Delay', 'Self-Worth', 'Decision Making']}
              reflections={10} reports={5} voiceSessions={4} journals={2}
              direction="Core Beliefs → Boundaries → Self-Trust"
              strength={82} strengthColor="#0f8a77"
            />
            <PatternClusterCard
              title="Clarity Through Expression"
              signal="Strong"
              description="Speaking, writing, and creating help you think clearly and move forward."
              connectedTo={['Communication', 'Identity', 'Decision Making', 'Purpose & Direction']}
              reflections={9} reports={4} voiceSessions={7} journals={4}
              direction="Internal Processing → Expression → Alignment"
              strength={78} strengthColor="#c97c1e"
            />
          </div>
        </section>

        {/* ── Section 3: Key Cross-Domain Connections ───────────────────── */}
        <section className="mb-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Key Cross-Domain Connections</h2>
              <p className="text-xs font-semibold text-[#6b7280]">High-impact relationships between your Self-Map domains.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View all connections <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <CrossDomainCard
              chain={['Family', 'Identity', 'Boundaries', 'Communication']}
              strength="Strong" dots={5} color="#6c37c6"
              description="Family role patterns appear to influence identity expression and boundary formation."
            />
            <CrossDomainCard
              chain={['Identity', 'Values', 'Purpose']}
              strength="Strong" dots={4} color="#0f8a77"
              description="Your values appear strongly tied to your direction and self-definition."
            />
            <CrossDomainCard
              chain={['Emotions', 'Behaviors', 'Results']}
              strength="Moderate" dots={3} color="#c97c1e"
              description="Emotional load appears to shape action patterns and outcomes."
            />
            <CrossDomainCard
              chain={['Communication', 'Relationships', 'Trust']}
              strength="Strong" dots={4} color="#176dff"
              description="How you communicate appears closely tied to trust and relational safety."
            />
          </div>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Explore the Architecture */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-[#6c37c6]" />
              <p className="text-sm font-black text-[#06183a]">Explore the Architecture</p>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Search, filter, and trace how patterns connect across your map.
            </p>
            <button className="mt-3 w-full rounded-[8px] bg-[#6c37c6] py-2 text-xs font-black text-white hover:bg-[#5a2aae] transition-colors">
              Open Explorer
            </button>
          </div>

          {/* Patterns to Review */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#c97c1e]" />
              <p className="text-sm font-black text-[#06183a]">Patterns to Review</p>
            </div>
            <div className="mt-3 space-y-2.5 divide-y divide-[#ead7b9]">
              {[
                { label: 'Overgiving Pattern',        signal: 'Moderate', color: '#c97c1e' },
                { label: 'Decision Delay Pattern',    signal: 'Moderate', color: '#c97c1e' },
                { label: 'Visibility & Voice Pattern', signal: 'Emerging', color: '#176dff' },
              ].map(({ label, signal, color }) => (
                <div key={label} className="flex items-center justify-between pt-2 first:pt-0">
                  <p className="text-xs font-semibold text-[#344263]">{label}</p>
                  <span className="flex items-center gap-1 text-[10px] font-black" style={{ color }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                    {signal} signal
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#6c37c6] hover:underline">
              Review all 8 patterns <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Pattern Activity */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-[#06183a]">Pattern Activity</p>
              <p className="text-[11px] font-semibold text-[#a0a8b8]">Last 30 days</p>
            </div>
            <div className="mt-3 space-y-2.5">
              <BarRow label="New Patterns Detected" value={12} max={14} />
              <BarRow label="Patterns to Review"    value={8}  max={14} color="#c97c1e" />
              <BarRow label="Patterns Saved"        value={14} max={14} color="#0f8a77" />
              <BarRow label="Patterns Dismissed"    value={3}  max={14} color="#a0a8b8" />
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View All Activity <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Top Domains in Patterns */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-[#06183a]">Top Domains in Patterns</p>
              <p className="text-[11px] font-semibold text-[#a0a8b8]">By pattern occurrences</p>
            </div>
            <div className="mt-3 space-y-2.5">
              <BarRow label="Identity"       value={18} max={18} />
              <BarRow label="Relationships"  value={16} max={18} />
              <BarRow label="Boundaries"     value={14} max={18} />
              <BarRow label="Communication"  value={12} max={18} />
              <BarRow label="Purpose"        value={10} max={18} />
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              View All Domains <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Understanding Pattern Signal */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <p className="text-sm font-black text-[#06183a]">Understanding Pattern Signal</p>
            <div className="mt-3 space-y-2">
              {[
                { dot: '#0f8a77', level: 'Strong',   desc: 'Clear and consistent evidence' },
                { dot: '#c97c1e', level: 'Moderate', desc: 'Some evidence, more needed' },
                { dot: '#176dff', level: 'Emerging', desc: 'Early signals forming' },
                { dot: '#a0a8b8', level: 'Weak',     desc: 'Insufficient evidence' },
              ].map(({ dot, level, desc }) => (
                <div key={level} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: dot }} />
                  <div>
                    <span className="text-[11px] font-black text-[#06183a]">{level}</span>
                    <span className="mx-1 text-[11px] text-[#a0a8b8]">—</span>
                    <span className="text-[11px] font-semibold text-[#6b7280]">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-[#6c37c6] hover:underline">
              Learn more about signal <ArrowRight className="h-3 w-3" />
            </button>
          </div>

        </div>
      </aside>

      {/* ── Bottom review banner ─────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 md:ml-64">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#b6e8d9] bg-[#f2faf6]/96 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#0f8a77]" />
            <div>
              <p className="text-sm font-black text-[#0a5c4e]">You are the final authority on your map.</p>
              <p className="text-xs font-semibold text-[#1a6b5a]">
                Review patterns, connections, and suggestions before anything enters your Atlas.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/reflections"
              className="flex items-center gap-2 rounded-[8px] border border-[#0f8a77] bg-white px-4 py-2 text-sm font-black text-[#0f8a77] hover:bg-[#f0faf6] transition-colors">
              Go to Reflections <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard/self-map"
              className="flex items-center gap-2 rounded-[8px] bg-[#06183a] px-4 py-2 text-sm font-black text-white hover:bg-[#0a2850] transition-colors">
              <Map className="h-4 w-4" /> Open Self-Map
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
