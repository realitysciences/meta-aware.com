'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  CircleHelp,
  Clock,
  Grid2X2,
  Heart,
  Info,
  MessageSquare,
  Mic,
  Radio,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
} from 'lucide-react'

const categories = [
  { name: 'Foundations', count: 6, color: '#0f8a77', icon: ShieldCheck },
  { name: 'Relationships', count: 4, color: '#5b35f0', icon: Heart },
  { name: 'Identity', count: 4, color: '#176dff', icon: Users },
  { name: 'Body', count: 4, color: '#0e8a8a', icon: Mic },
  { name: 'Work', count: 4, color: '#ff6b18', icon: BookOpen },
  { name: 'Meaning', count: 2, color: '#f0a638', icon: Sparkles },
]

const relationshipDomains = [
  { name: 'Partner Dynamics', number: 7 },
  { name: 'Family System', number: 8 },
  { name: 'Friendship & Community', number: 9 },
  { name: 'Communication Patterns', number: 10 },
]

const familyModules = [
  ['Family Structure', 8],
  ['Mother Function', 9],
  ['Father Function', 7],
  ['Sibling Roles', 6],
  ['Family Role', 8],
  ['Emotional Climate', 7],
  ['Boundaries', 7],
  ['Repair & Integration', 6],
]

const sessionStyles = [
  { name: 'Guided Narrative', copy: 'AI asks structured prompts to guide a deep exploration.', icon: Mic, color: '#5b35f0' },
  { name: 'Guided Intake Chat', copy: 'Answer structured intake prompts in a chatbox. This still builds map data.', icon: MessageSquare, color: '#176dff' },
  { name: 'Open Share', copy: 'Speak freely. AI organizes and maps your insights afterward.', icon: BookOpen, color: '#06183a' },
  { name: 'Targeted Clarification', copy: 'Short session focused on one specific area.', icon: Target, color: '#ff6b18' },
  { name: 'Reflection Follow-Up', copy: 'Respond to a prior reflection or report insight.', icon: Sparkles, color: '#0f8a77' },
]

const needTiles = [
  ['A relationship', Heart],
  ['A family pattern', Users],
  ['Something I keep repeating', Sparkles],
  ['A decision I need to make', ArrowRight],
  ['My body / energy', Mic],
  ['Work or money', BookOpen],
  ['Meaning / purpose', Star],
  ["Something I can't name yet", CircleHelp],
]

const selectedSession = {
  category: 'Relationships',
  domain: 'Family System',
  module: 'Mother Function',
  style: 'Guided Narrative',
  progress: 62,
  estimatedLength: '25–35 minutes',
  goal:
    'Understand what your mother gave, what she could not give, and how that shaped receiving, comfort, guilt, need, and emotional permission.',
  enriches: [
    { name: 'Family System', note: 'Deepens understanding of family dynamics', icon: Users, color: '#176dff' },
    { name: 'Mother Imprint', note: 'Clarifies early maternal conditioning', icon: Heart, color: '#0f8a77' },
    { name: 'Self-Worth & Shame', note: 'Reveals impact on self-value and inner critic', icon: Star, color: '#6c37c6' },
    { name: 'Attachment Styles', note: 'Illuminates patterns of connection', icon: Sparkles, color: '#ff6b18' },
    { name: 'Communication Patterns', note: 'Enhances expression and needs', icon: BookOpen, color: '#5b35f0' },
    { name: 'Boundaries', note: 'Builds healthier limits and safety', icon: ShieldCheck, color: '#0e8a8a' },
  ],
  outcomes: [
    'May unlock a new reflection',
    'May strengthen your domain report',
    'Improves Reality Scientist AI context',
    'Adds source material to your Atlas',
    'May reveal connections to other domains',
  ],
  previewQuestions: [
    'What do you remember most about your mother?',
    'How did she comfort you? When did she not?',
    'What did you learn about love from her?',
    'How do those lessons show up today?',
  ],
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_12px_30px_rgba(48,27,5,0.04)] ${className}`}>{children}</section>
}

function StepLabel({ number, label, active = false }: { number: number; label: string; active?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black ${active ? 'bg-[#5b35f0] text-white' : 'bg-[#5b607f] text-white'}`}>{number}</span>
      <span className="truncate text-xs font-black text-[#06183a]">{label}</span>
    </div>
  )
}

function SessionPath({ compact = false }: { compact?: boolean }) {
  const items = [selectedSession.category, selectedSession.domain, selectedSession.module, selectedSession.style]
  return (
    <div className={`rounded-xl border border-[#ead7b9] bg-white/78 ${compact ? 'p-4' : 'p-5'}`}>
      <p className="mb-3 text-xs font-black">Session Path</p>
      <div className="space-y-2 text-center text-sm font-black text-[#06183a]">
        {items.map((item, index) => (
          <div key={item}>
            <div className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full bg-[#f7f3fb] px-4 py-2">
              {item}
            </div>
            {index < items.length - 1 && <ArrowDown className="mx-auto my-1 h-4 w-4 text-[#8e96aa]" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function SelectedSessionPanel() {
  const [showAllQuestions, setShowAllQuestions] = useState(false)
  const questions = showAllQuestions
    ? [...selectedSession.previewQuestions, 'Where did you feel responsible for her emotions?', 'What kind of care is still hard to receive?']
    : selectedSession.previewQuestions

  return (
    <Card className="p-5 xl:sticky xl:top-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black">Selected Session</h2>
        <button className="text-xs font-black text-[#176dff]">Clear</button>
      </div>

      <h3 className="mt-5 font-serif text-2xl">{selectedSession.module}</h3>
      <p className="mt-1 text-sm font-semibold text-[#173563]">{selectedSession.domain} Module</p>

      <div className="mt-5 border-b border-[#ead7b9] pb-5">
        <p className="text-sm font-black">Goal</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#173563]">{selectedSession.goal}</p>
      </div>

      <div className="mt-5 border-b border-[#ead7b9] pb-5">
        <p className="text-sm font-black">This Session Will Enrich</p>
        <div className="mt-3 space-y-3">
          {selectedSession.enriches.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.name} className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f3efff]" style={{ color: item.color }}>
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-xs font-semibold leading-5">
                  <strong className="block text-[#06183a]">{item.name}</strong>
                  {item.note}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-5 border-b border-[#ead7b9] pb-5">
        <p className="text-sm font-black">Possible Outcomes</p>
        <ul className="mt-3 space-y-2">
          {selectedSession.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2 text-xs font-semibold leading-5 text-[#173563]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-[#0f8a77] p-[2px] text-[#0f8a77]" />
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black">Preview of Questions</p>
          <button onClick={() => setShowAllQuestions((value) => !value)} className="text-xs font-black text-[#176dff]">
            {showAllQuestions ? 'Show less' : 'View all'}
          </button>
        </div>
        <ul className="mt-3 list-disc space-y-2 pl-4 text-xs font-semibold leading-5 text-[#173563] marker:text-[#5b35f0]">
          {questions.map((question) => <li key={question}>{question}</li>)}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border border-[#ead7b9] bg-[#f7f3ff] p-4 text-center text-sm font-black leading-6">
        You are about to speak into:
        <span className="mt-1 block text-[#4b23c7]">{selectedSession.category} → {selectedSession.domain} → {selectedSession.module} → {selectedSession.style}</span>
      </div>

      <Link href="/voice-session/family-system/mother-function?style=guided-narrative" className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#4b23d3] px-5 py-4 text-sm font-black text-white shadow-[0_14px_28px_rgba(75,35,211,0.22)]">
        <Mic className="h-5 w-5" />
        Start Mother Function Session
      </Link>
      <Link href="/voice-session/family-system/mother-function/text-chat" className="mt-2 inline-flex w-full items-center justify-center gap-3 rounded-lg border border-[#b9c9ff] bg-white px-5 py-3 text-sm font-black text-[#174fbe]">
        <MessageSquare className="h-5 w-5" />
        Start as Guided Intake Chat
      </Link>

      <p className="mt-4 flex justify-center gap-2 text-center text-xs font-semibold leading-5 text-[#173563]">
        <ShieldCheck className="h-4 w-4 shrink-0" />
        <span>Your session is private and encrypted.<br />You can pause or stop anytime.</span>
      </p>
    </Card>
  )
}

export default function VoiceSessionPage() {
  return (
    <div className="min-h-screen bg-[#fffaf2] px-4 py-4 text-[#06183a] lg:px-6">
      <header className="mb-4 grid gap-4 xl:grid-cols-[1fr_auto_auto] xl:items-center">
        <div className="flex items-start gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#5b35f0] text-white shadow-[0_12px_28px_rgba(91,53,240,0.22)]">
            <Mic className="h-8 w-8" />
          </div>
          <div>
            <h1 className="font-serif text-[2.6rem] leading-none">Map Sessions</h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#173563]">
              Build your self-map through structured voice-first sessions.
              <span className="block">Choose a domain, module, or need. What you share becomes map data, reflections, reports, and Atlas material.</span>
            </p>
          </div>
        </div>
        <Link href="/dashboard/self-map" className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d7c6ae] bg-white/82 px-4 py-3 text-sm font-black">
          <BookOpen className="h-4 w-4" />
          View My Self-Map
          <ArrowRight className="h-4 w-4" />
        </Link>
        <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d3b98f] bg-white/70 text-[#06183a]" aria-label="Voice session help">
          <CircleHelp className="h-5 w-5" />
        </button>
      </header>

      <div className="grid items-start gap-4 xl:grid-cols-[1fr_360px] 2xl:grid-cols-[1fr_390px]">
        <main className="space-y-4">
          <Card className="grid overflow-hidden md:grid-cols-4">
            {[
              ['Recommended', 'AI-guided next step', Star],
              ['Browse Domains', 'Explore the 24-domain map', Grid2X2],
              ['Start From Need', "Begin with what you're feeling", Heart],
              ['Recent Sessions', 'Continue or review', Clock],
            ].map(([title, copy, Icon]) => {
              const ActiveIcon = Icon as typeof Star
              const active = title === 'Browse Domains'
              return (
                <button key={title as string} className={`flex items-center gap-4 border-b border-[#ead7b9] p-5 text-left transition last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${active ? 'bg-white shadow-[inset_0_-3px_0_#5b35f0]' : 'hover:bg-white/80'}`}>
                  <ActiveIcon className={`h-8 w-8 shrink-0 ${active ? 'text-[#5b35f0]' : 'text-[#06183a]'}`} />
                  <span>
                    <span className="block text-sm font-black">{title as string}</span>
                    <span className="mt-1 block text-xs font-semibold text-[#344263]">{copy as string}</span>
                  </span>
                </button>
              )
            })}
          </Card>

          <Card className="grid items-center gap-4 p-5 lg:grid-cols-[1fr_1.2fr_110px_190px]">
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#f4ecff] text-[#5b35f0]">
                <Sparkles className="h-9 w-9" />
              </span>
              <div>
                <p className="text-xs font-black text-[#5b35f0]">Recommended for you</p>
                <h2 className="mt-1 font-serif text-xl leading-tight">Continue where you left off<br />Family System → Mother Function</h2>
              </div>
            </div>
            <p className="text-sm font-semibold leading-6 text-[#173563]">
              This session will help clarify how maternal safety, emotional availability, guilt, nourishment, and receiving shaped your map.
            </p>
            <div className="grid h-24 w-24 place-items-center rounded-full justify-self-center" style={{ background: 'conic-gradient(#5b35f0 62%, #ded8cf 0)' }}>
              <div className="grid h-19 w-19 place-items-center rounded-full bg-white text-center text-xs font-black">
                <span><strong className="block text-lg">62%</strong>Complete</span>
              </div>
            </div>
            <div className="space-y-2">
              <Link href="/voice-session/family-system/mother-function?style=guided-narrative" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#3420b6] px-4 py-3 text-sm font-black text-white">
                <Mic className="h-4 w-4" />
                Continue This Session
              </Link>
              <button className="inline-flex w-full items-center justify-center rounded-lg border border-[#d7c6ae] bg-white px-4 py-3 text-sm font-black">Choose Another Session</button>
              <p className="text-center text-[11px] font-semibold text-[#6b7280]">Last session: Apr 28</p>
            </div>

            <Card className="mt-4 flex flex-wrap items-center justify-between gap-4 border-[#cbd8ff] bg-[#f7f9ff] px-4 py-3 shadow-none">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 shrink-0 text-[#176dff]" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#176dff]">Prefer typing?</p>
                  <p className="text-sm font-semibold text-[#344263]">Use Guided Intake Chat — the AI asks structured questions and turns your answers into map material.</p>
                </div>
              </div>
              <Link href="/voice-session/family-system/mother-function/text-chat" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#176dff] px-4 py-2.5 text-xs font-black text-white">
                Start Guided Intake Chat <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          </Card>

          <Card className="p-5">
            <h2 className="font-serif text-3xl">Build Your Mapping Session</h2>
            <p className="mt-2 text-sm font-semibold text-[#173563]">Follow the steps below to choose exactly what part of your map you want to build.</p>

            <div className="mt-6 grid gap-3 md:grid-cols-[1fr_32px_1fr_32px_1fr_32px_1fr] md:items-center">
              <StepLabel number={1} label="Choose Domain" active />
              <ArrowRight className="hidden h-4 w-4 text-[#b5b8c4] md:block" />
              <StepLabel number={2} label="Choose Module" active />
              <ArrowRight className="hidden h-4 w-4 text-[#b5b8c4] md:block" />
              <StepLabel number={3} label="Choose Session Style" active />
              <ArrowRight className="hidden h-4 w-4 text-[#b5b8c4] md:block" />
              <StepLabel number={4} label="Review & Start" />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1fr_1.05fr_0.9fr]">
              <Card className="p-3 shadow-none">
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const active = category.name === 'Relationships'
                    return (
                      <button key={category.name} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-black ${active ? 'bg-[#f1e8ff] text-[#4b23c7]' : 'hover:bg-[#fff7ee]'}`}>
                        <Icon className="h-5 w-5" style={{ color: category.color }} />
                        <span className="flex-1">{category.name}</span>
                        <span className="rounded-full bg-white/80 px-2 py-1 text-xs text-[#6b7280]">{category.count}</span>
                      </button>
                    )
                  })}
                </div>
                <Link href="/dashboard/self-map?view=domain-grid" className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-[#d7c6ae] bg-white px-4 py-3 text-sm font-black">
                  View All 24 Domains
                </Link>
              </Card>

              <Card className="p-3 shadow-none">
                <div className="mb-3 flex items-center justify-between px-2">
                  <p className="text-sm font-black">Family System</p>
                  <span className="text-[#06183a]">⌃</span>
                </div>
                <div className="space-y-1">
                  {familyModules.map(([module, score]) => {
                    const selected = module === selectedSession.module
                    return (
                      <button key={module as string} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-black ${selected ? 'bg-[#efe6ff] text-[#4b23c7]' : 'hover:bg-[#fff7ee]'}`}>
                        <span className={`h-4 w-4 rounded-full border ${selected ? 'border-[#5b35f0] bg-[#5b35f0] shadow-[inset_0_0_0_3px_white]' : 'border-[#aeb5c8]'}`} />
                        <span className="flex-1">{module as string}</span>
                        <span className="text-[#6b7280]">{score as number}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="mt-3 space-y-1 border-t border-[#ead7b9] pt-3">
                  {relationshipDomains.filter((domain) => domain.name !== selectedSession.domain).map((domain) => (
                    <button key={domain.name} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-black hover:bg-[#fff7ee]">
                      <span>{domain.name}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-3 shadow-none">
                <div className="space-y-3">
                  {sessionStyles.map((style) => {
                    const Icon = style.icon
                    const selected = style.name === selectedSession.style
                    return (
                      <button key={style.name} className={`flex w-full gap-3 rounded-xl border p-4 text-left transition ${selected ? 'border-[#b9a6ff] bg-[#f3efff]' : 'border-[#ead7b9] bg-white/72 hover:bg-[#fff7ee]'}`}>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white" style={{ color: style.color }}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-black">{style.name}</span>
                          <span className="mt-1 block text-xs font-semibold leading-5 text-[#344263]">{style.copy}</span>
                        </span>
                        <span className={`mt-1 h-5 w-5 rounded-full border ${selected ? 'border-[#5b35f0] bg-[#5b35f0] shadow-[inset_0_0_0_4px_white]' : 'border-[#aeb5c8]'}`} />
                      </button>
                    )
                  })}
                </div>
                <button className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[#176dff]">
                  <Info className="h-4 w-4" />
                  Which style should I choose?
                </button>
              </Card>

              <div className="space-y-4">
                <SessionPath compact />
                <Card className="space-y-4 bg-[#fff8ef] p-4 shadow-none">
                  <p className="flex gap-3 text-sm font-semibold text-[#173563]">
                    <Clock className="h-5 w-5 shrink-0 text-[#344263]" />
                    <span><strong className="block text-[#06183a]">Session length</strong>{selectedSession.estimatedLength}</span>
                  </p>
                  <p className="flex gap-3 border-t border-[#ead7b9] pt-4 text-sm font-semibold text-[#173563]">
                    <Radio className="h-5 w-5 shrink-0 text-[#344263]" />
                    You can pause or stop anytime
                  </p>
                </Card>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-serif text-xl">Not sure where to start? Start from what you’re feeling.</h2>
            <p className="mt-2 text-sm font-semibold text-[#173563]">Choose a lived experience and Meta-Aware will suggest the right domain, module, and session style.</p>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
              {needTiles.map(([label, Icon]) => {
                const TileIcon = Icon as typeof Heart
                return (
                  <button key={label as string} className="grid min-h-[106px] place-items-center rounded-xl border border-[#ead7b9] bg-white/72 p-3 text-center text-xs font-black hover:bg-[#fff7ee]">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f4ecff] text-[#5b35f0]">
                      <TileIcon className="h-6 w-6" />
                    </span>
                    {label as string}
                  </button>
                )
              })}
            </div>
            <Link href="/voice-session/start-from-need" className="mx-auto mt-5 flex w-fit items-center gap-2 text-sm font-black text-[#4b23c7]">
              Show me suggestions based on how I’m feeling <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </main>

        <aside className="order-first xl:order-none">
          <SelectedSessionPanel />
        </aside>
      </div>
    </div>
  )
}
