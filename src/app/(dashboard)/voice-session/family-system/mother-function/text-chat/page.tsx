'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
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
  Paperclip,
  Play,
  Send,
  ShieldCheck,
  SkipForward,
  Sparkles,
  Star,
} from 'lucide-react'

// ─── Session data ─────────────────────────────────────────────────────────────

const steps = [
  { number: 1, label: 'Begin', sub: 'Set intention' },
  { number: 2, label: 'Maternal Presence', sub: 'Emotional tone' },
  { number: 3, label: 'Need & Comfort', sub: 'When I needed' },
  { number: 4, label: 'Guilt & Obligation', sub: 'What I felt I owed' },
  { number: 5, label: 'What Carries Forward', sub: 'Impact today' },
  { number: 6, label: 'Review', sub: 'Reflect & integrate' },
]

const enrichDomains = [
  { name: 'Family System', percent: 82, color: '#176dff' },
  { name: 'Mother Imprint', percent: 74, color: '#0f8a77' },
  { name: 'Self-Worth & Shame', percent: 68, color: '#6c37c6' },
  { name: 'Attachment Styles', percent: 61, color: '#ff6b18' },
  { name: 'Communication Patterns', percent: 57, color: '#5b35f0' },
  { name: 'Boundaries', percent: 49, color: '#0e8a8a' },
]

const recentSessions = [
  { id: '1', title: 'Mother Function — Text Chat', date: 'May 6', duration: '38 min' },
  { id: '2', title: 'Father Function — Text Chat', date: 'May 1', duration: '41 min' },
  { id: '3', title: 'Inner Child — Needs & Safety', date: 'Apr 27', duration: '35 min' },
]

const afterCards = [
  { icon: FileText, label: 'Review Conversation', sub: 'See everything you shared in this session.', href: '/map-sources/text-chat-sessions/current/review', color: '#176dff' },
  { icon: Star, label: 'Tag Important Moments', sub: 'Highlight key insights, turning points, and truths.', href: '/map-sources/text-chat-sessions/current/tag', color: '#f0a638' },
  { icon: Link2, label: 'Connect to Your Map', sub: 'Link insights to domains, reflections, and patterns.', href: '/map-sources/text-chat-sessions/current/connect', color: '#0f8a77' },
  { icon: BookOpen, label: 'Save to Atlas', sub: 'Add this session to your Atlas as a new source.', href: '/map-sources/text-chat-sessions/current/save', color: '#6c37c6' },
]

type Message = { role: 'guide' | 'user'; text: string; time: string }

const initialMessages: Message[] = [
  { role: 'guide', text: "Let's begin gently.\nWhen you think of your mother and comfort, what is the first word, image, or feeling that comes up?", time: '9:41 AM' },
  { role: 'user', text: 'Probably "safe." She could be warm and loving, but also emotionally far away a lot of the time.', time: '9:43 AM' },
  { role: 'guide', text: "Thank you for sharing that.\nCan you tell me about a time when she felt safe for you?\nWhat made it feel that way?", time: '9:44 AM' },
]

type SupportState = 'none' | 'unsure' | 'example' | 'pause' | 'skip-confirm'

// ─── Guide avatar ─────────────────────────────────────────────────────────────

function GuideAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d9c4ff] bg-[#f5f0ff]">
      <Sparkles className="h-4 w-4 text-[#6c37c6]" />
    </div>
  )
}

// ─── Card shell ───────────────────────────────────────────────────────────────

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_12px_30px_rgba(48,27,5,0.04)] ${className}`}>
      {children}
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MotherFunctionTextChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [whyOpen, setWhyOpen] = useState(false)
  const [supportState, setSupportState] = useState<SupportState>('none')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, supportState])

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages((prev) => [...prev, { role: 'user', text, time: now }])
    setInput('')
    setSupportState('none')
    // Simulate guide response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'guide', text: "That's meaningful. What feeling arises when you sit with that memory now?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ])
    }, 1200)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">
      {/* ── Main column ───────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Breadcrumb + top buttons */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
            <Link href="/voice-session" className="hover:text-[#c97c1e]">Map Sessions</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Family System</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Mother Function</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#06183a]">Text Chat Exploration</span>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/voice-session" className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-bold text-[#06183a] hover:bg-[#fff2df] transition-colors">
              ← Back to Map Sessions
            </Link>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#fcd0d0] bg-[#fff0f0]">
              <Heart className="h-5 w-5 text-[#e05c6e]" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#06183a] sm:text-4xl">Mother Function Text Session</h1>
          </div>
          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
            A guided text session to explore your maternal imprint with clarity and compassion.
          </p>
        </div>

        {/* Map Session banner */}
        <div className="mb-4 flex items-center gap-3 rounded-[10px] border border-[#d9c49a] bg-[#fdf6e8] px-4 py-2.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#c97c1e]" />
          <p className="text-sm font-semibold text-[#5b3609]">
            This is a <span className="font-black">Map Session.</span> Your answers become structured source material for your{' '}
            <Link href="/dashboard/self-map" className="font-black text-[#c97c1e] hover:underline">Atlas.</Link>
          </p>
        </div>

        {/* Step tracker */}
        <Card className="mb-4 overflow-x-auto p-3 sm:p-4">
          <div className="flex min-w-max items-start gap-1">
            {steps.map((step, idx) => {
              const isCurrentStep = step.number === 1
              return (
                <div key={step.number} className="flex items-start">
                  <div className={`flex min-w-[100px] flex-col gap-1 rounded-[10px] px-3 py-2 ${isCurrentStep ? 'bg-[#fff2df]' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${isCurrentStep ? 'bg-[#c97c1e] text-white' : 'bg-[#ead7b9] text-[#6b7280]'}`}>
                        {step.number}
                      </span>
                      <span className={`text-xs font-black ${isCurrentStep ? 'text-[#5b3609]' : 'text-[#6b7280]'}`}>{step.label}</span>
                    </div>
                    <span className="pl-8 text-[11px] font-semibold text-[#a0a8b8]">{step.sub}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="mt-3 px-1"><ChevronRight className="h-4 w-4 text-[#d3b98f]" /></div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        {/* Main session card */}
        <Card className="mb-4 overflow-hidden">
          <div className="grid min-h-[520px] lg:grid-cols-[320px_1fr]">

            {/* Left prompt panel */}
            <div className="border-b border-[#ead7b9] p-5 lg:border-b-0 lg:border-r">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#a45f0d]">Current Step</p>
              <p className="mt-1 text-base font-black text-[#c97c1e]">Step 1 of 6: Begin</p>
              <p className="mt-4 text-[11px] font-black uppercase tracking-wider text-[#6b7280]">Your prompt for this step</p>

              {/* Prompt card */}
              <div className="mt-2 rounded-[10px] border-l-4 border-[#c97c1e] bg-[#fdf6e8] px-4 py-3">
                <span className="mb-1 block text-2xl leading-none text-[#c97c1e]">&ldquo;</span>
                <p className="font-serif text-xl leading-snug text-[#06183a]">
                  Start by describing what your mother was like when you needed comfort.
                </p>
              </div>

              {/* Why this prompt */}
              <button
                onClick={() => setWhyOpen((v) => !v)}
                className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#344263] hover:text-[#c97c1e] transition-colors"
              >
                <CircleHelp className="h-4 w-4" />
                Why this prompt?
                <ChevronDown className={`h-4 w-4 transition-transform ${whyOpen ? 'rotate-180' : ''}`} />
              </button>
              {whyOpen && (
                <p className="mt-2 rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2 text-sm font-semibold leading-6 text-[#344263]">
                  This opening prompt starts with memory and emotional tone before asking for interpretation.
                </p>
              )}

              {/* Why this matters */}
              <div className="mt-5 rounded-[10px] border border-[#fcd0a8] bg-[#fffaf2] p-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-[#e05c6e]" />
                  <p className="text-xs font-black uppercase tracking-wider text-[#a45f0d]">Why this matters</p>
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#344263]">
                  This helps Meta-Aware understand the emotional template you learned around need, comfort, and receiving.
                </p>
              </div>

              <Link href="/map-sessions/family-system/mother-function/text-guide" className="mt-4 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
                Learn more about this step <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Right chat area */}
            <div className="flex flex-col">
              {/* Guide intro */}
              <div className="border-b border-[#ead7b9] bg-[#faf6f0] p-4">
                <div className="flex items-start gap-3">
                  <GuideAvatar />
                  <div>
                    <p className="text-xs font-black text-[#6c37c6]">Meta-Aware Guide</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-[#344263]">
                      I&apos;ll ask thoughtful questions to help you explore and understand your experience.<br />
                      There are no right or wrong answers. Take your time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: '320px' }}>
                <div className="text-center text-[11px] font-semibold text-[#a0a8b8]">Today</div>

                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.role === 'guide' && <GuideAvatar />}
                    <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      {msg.role === 'guide' && (
                        <p className="text-[11px] font-black text-[#6c37c6]">Meta-Aware Guide</p>
                      )}
                      <div className={`rounded-[12px] px-3 py-2.5 text-sm font-semibold leading-6 ${
                        msg.role === 'guide'
                          ? 'bg-white border border-[#ead7b9] text-[#06183a]'
                          : 'bg-[#06183a] text-white'
                      }`}>
                        {msg.text.split('\n').map((line, j) => (
                          <span key={j}>{line}{j < msg.text.split('\n').length - 1 && <br />}</span>
                        ))}
                      </div>
                      <p className={`text-[11px] font-semibold text-[#a0a8b8] ${msg.role === 'user' ? 'flex items-center gap-1' : ''}`}>
                        {msg.time}
                        {msg.role === 'user' && <BadgeCheck className="h-3 w-3 text-[#a0a8b8]" />}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Support state overlays */}
                {supportState === 'pause' && (
                  <div className="rounded-[12px] border border-[#ead7b9] bg-[#fdf6e8] p-4 text-center">
                    <p className="font-serif text-lg text-[#06183a]">Take your time.</p>
                    <p className="mt-1 text-sm font-semibold text-[#344263]">You can continue when you&apos;re ready.</p>
                    <button onClick={() => setSupportState('none')} className="mt-3 rounded-[8px] bg-[#c97c1e] px-5 py-2 text-sm font-black text-white hover:bg-[#b06a14] transition-colors">
                      Continue
                    </button>
                  </div>
                )}
                {supportState === 'example' && (
                  <div className="rounded-[12px] border border-[#d9c4ff] bg-[#f5f0ff] p-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-[#6c37c6]">Example</p>
                    <p className="mt-1 text-sm font-semibold italic leading-6 text-[#344263]">
                      &ldquo;She felt calm when she was present, but I learned not to need too much from her.&rdquo;
                    </p>
                    <button onClick={() => setSupportState('none')} className="mt-2 text-xs font-black text-[#6c37c6] hover:underline">Dismiss</button>
                  </div>
                )}
                {supportState === 'unsure' && (
                  <div className="rounded-[12px] border border-[#ead7b9] bg-[#faf6f0] p-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-[#a45f0d]">That&apos;s okay</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-[#344263]">
                      Start with one word, image, body feeling, or memory. It does not need to be complete.
                    </p>
                    <button onClick={() => setSupportState('none')} className="mt-2 text-xs font-black text-[#c97c1e] hover:underline">Dismiss</button>
                  </div>
                )}
                {supportState === 'skip-confirm' && (
                  <div className="rounded-[12px] border border-[#ead7b9] bg-[#faf6f0] p-4">
                    <p className="text-sm font-black text-[#06183a]">Skip this step and continue to Maternal Presence?</p>
                    <div className="mt-3 flex gap-2">
                      <button className="rounded-[8px] bg-[#06183a] px-4 py-2 text-xs font-black text-white hover:bg-[#0d2a5e] transition-colors">
                        Yes, skip
                      </button>
                      <button onClick={() => setSupportState('none')} className="rounded-[8px] border border-[#ead7b9] bg-white px-4 py-2 text-xs font-black text-[#06183a] hover:bg-[#fff2df] transition-colors">
                        Stay on this step
                      </button>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Support buttons */}
              <div className="flex flex-wrap gap-2 border-t border-[#ead7b9] px-4 py-2">
                {[
                  { label: "I'm not sure", state: 'unsure' as SupportState, icon: CircleHelp },
                  { label: 'Give me an example', state: 'example' as SupportState, icon: Sparkles },
                  { label: 'I need a pause', state: 'pause' as SupportState, icon: Clock },
                  { label: 'Skip this step', state: 'skip-confirm' as SupportState, icon: SkipForward },
                ].map(({ label, state, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => setSupportState((prev) => prev === state ? 'none' : state)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                      supportState === state
                        ? 'border-[#d9a461] bg-[#fff2df] text-[#5b3609]'
                        : 'border-[#ead7b9] bg-white text-[#344263] hover:border-[#d9a461] hover:bg-[#fff8ee]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />{label}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-[#ead7b9] p-3">
                <div className="flex items-end gap-2">
                  <div className="flex flex-1 items-end gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-3 py-2 focus-within:border-[#d9a461]">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      rows={2}
                      placeholder="Write what comes up for this prompt..."
                      className="flex-1 resize-none bg-transparent text-sm font-semibold text-[#06183a] outline-none placeholder:text-[#a0a8b8]"
                    />
                    <div className="flex shrink-0 items-center gap-2 pb-0.5">
                      <button className="text-[#a0a8b8] hover:text-[#c97c1e] transition-colors" aria-label="Attach">
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <button className="text-[#a0a8b8] hover:text-[#c97c1e] transition-colors" aria-label="Bookmark">
                        <Star className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-[#06183a] px-4 py-3 text-sm font-black text-white transition-colors hover:bg-[#0d2a5e] disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" /> Send
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#a0a8b8]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    This conversation is private and encrypted.
                  </p>
                  <p className="text-[11px] font-semibold text-[#a0a8b8]">Press Enter to send</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* After this session */}
        <Card className="p-4 sm:p-5">
          <p className="mb-4 text-[11px] font-black uppercase tracking-widest text-[#a45f0d]">After this session you can</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {afterCards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.label} className="flex flex-col gap-3 rounded-[10px] border border-[#ead7b9] bg-[#faf6f0] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `${card.color}18` }}>
                    <Icon className="h-5 w-5" style={{ color: card.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black text-[#06183a]">{card.label}</p>
                    <p className="mt-1 text-[11px] font-semibold leading-4 text-[#6b7280]">{card.sub}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#c97c1e]" />
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-80">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* This session will enrich */}
          <Card className="p-4">
            <h2 className="text-sm font-black text-[#06183a]">This Session Will Enrich</h2>
            <p className="mt-1 text-xs font-semibold leading-5 text-[#344263]">Insights from this session will strengthen these areas of your map.</p>
            <div className="mt-3 space-y-2.5">
              {enrichDomains.map((d) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#344263]">{d.name}</span>
                    <span className="text-[11px] font-black text-[#6b7280]">{d.percent}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#ead7b9]">
                    <div className="h-1.5 rounded-full" style={{ width: `${d.percent}%`, backgroundColor: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Session details */}
          <Card className="p-4">
            <h2 className="text-sm font-black text-[#06183a]">Session Details</h2>
            <dl className="mt-3 space-y-2">
              {[
                ['Session Type', 'Text Chat Exploration'],
                ['Estimated Length', '30–45 min'],
                ['Best Time', 'Quiet, uninterrupted'],
                ['AI Guide', 'Meta-Aware Guide'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-2 border-b border-[#ead7b9] pb-2 last:border-0 last:pb-0">
                  <dt className="text-xs font-semibold text-[#6b7280]">{label}</dt>
                  <dd className="text-right text-xs font-black text-[#06183a]">{value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/map-sessions/family-system/mother-function/text-guide" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View Full Session Guide <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>

          {/* Recent text chat sessions */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-[#06183a]">Recent Text Chat Sessions</h2>
              <button className="text-[11px] font-black text-[#c97c1e] hover:underline">View all</button>
            </div>
            <div className="mt-2 space-y-2">
              {recentSessions.map((s) => (
                <Link key={s.id} href={`/map-sources/text-chat-sessions/${s.id}`} className="flex items-center justify-between gap-3 rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2 hover:border-[#d9a461] hover:bg-[#fff8ee] transition-all">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[#06183a]">{s.title}</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">{s.date} · {s.duration}</p>
                  </div>
                  <Play className="h-4 w-4 shrink-0 text-[#c97c1e]" />
                </Link>
              ))}
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-4">
            <h2 className="text-sm font-black text-[#06183a]">Tips for a Powerful Session</h2>
            <ul className="mt-3 space-y-2.5">
              {[
                { icon: Mic, tip: 'Share as openly and honestly as you can.' },
                { icon: Star, tip: 'There are no right or wrong answers.' },
                { icon: Clock, tip: 'You can pause, skip, or come back anytime.' },
              ].map(({ icon: Icon, tip }) => (
                <li key={tip} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#344263]">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c97c1e]" />
                  {tip}
                </li>
              ))}
            </ul>
            <Link href="/how-it-works/text-sessions" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              More tips for text chat sessions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>
        </div>
      </aside>
    </div>
  )
}
