'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BarChart2,
  Check,
  CircleHelp,
  FileText,
  Layers3,
  Map,
  MessageSquare,
  Mic,
  Pause,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Square,
  Star,
  Users,
} from 'lucide-react'

// ─── Static demo data ────────────────────────────────────────────────────────

const aiContext = {
  level: 'Medium',
  domains: 18,
  reflections: 47,
  sources: 23,
  threads: 12,
  currentFocus: 'Family System',
  mostActiveDomains: [
    { name: 'Family System', percent: 82 },
    { name: 'Self-Worth & Shame', percent: 71 },
    { name: 'Attachment Styles', percent: 64 },
    { name: 'Communication Patterns', percent: 59 },
    { name: 'Work & Career Path', percent: 46 },
  ],
  currentSynthesis:
    'Your map is currently showing a connection between early conditioning, safety-seeking, over-explaining, and the need to be understood before feeling worthy.',
  recentConversations: [
    { id: '1', title: 'Understanding over-explaining pattern', date: 'Today', duration: '12 min' },
    { id: '2', title: 'Decision about new opportunity', date: 'Yesterday', duration: '18 min' },
    { id: '3', title: 'Feeling unseen in relationships', date: 'May 1', duration: '22 min' },
  ],
}

const promptGroups = [
  {
    label: 'Decisions',
    icon: ArrowRight,
    color: '#f0a638',
    prompts: ['I need help with a decision', 'What should I focus on next?'],
  },
  {
    label: 'Patterns',
    icon: Sparkles,
    color: '#6c37c6',
    prompts: ['Why am I reacting this way?', 'What pattern is active right now?'],
  },
  {
    label: 'Map Insight',
    icon: Map,
    color: '#176dff',
    prompts: ['What does my map show right now?', 'Explain my latest reflection'],
  },
  {
    label: 'Relationships',
    icon: Users,
    color: '#0f8a77',
    prompts: ['Help me understand this relationship', 'What is my role in this dynamic?'],
  },
]

const contextOptions = [
  { id: 'whole-map', label: 'Whole Map', sub: 'All available context' },
  { id: 'current-focus', label: 'Current Focus', sub: aiContext.currentFocus },
  { id: 'specific-domain', label: 'Specific Domain', sub: 'Choose a domain' },
  { id: 'recent-reflection', label: 'Recent Reflection', sub: 'Choose a reflection' },
  { id: 'source', label: 'Source', sub: 'Choose a source' },
]

const purposeOptions = [
  {
    id: 'reflect',
    icon: Star,
    label: 'Reflect with me',
    sub: 'For clarity, support, and decisions.',
  },
  {
    id: 'add-insights',
    icon: Sparkles,
    label: 'Add useful insights to my map',
    sub: 'Save important insights as we go.',
  },
  {
    id: 'private',
    icon: ShieldCheck,
    label: 'Do not save this conversation',
    sub: 'Private session. Nothing will be saved.',
  },
]

// ─── Waveform decoration ─────────────────────────────────────────────────────

function Waveform({ active = false }: { active?: boolean }) {
  return (
    <div className="flex h-6 items-center gap-[2px]" aria-hidden="true">
      {Array.from({ length: 32 }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full transition-all duration-300"
          style={{
            height: `${active ? 4 + Math.abs(Math.sin(i * 0.9 + Date.now() / 400)) * 18 : 3 + Math.abs(Math.sin(i * 0.72)) * 14}px`,
            backgroundColor: active ? '#c97c1e' : '#d3b98f',
            opacity: i % 4 === 0 ? 0.4 : 0.85,
          }}
        />
      ))}
    </div>
  )
}

// ─── Shared Card shell ────────────────────────────────────────────────────────

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_12px_30px_rgba(48,27,5,0.04)] ${className}`}>
      {children}
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RealityScientistAIPage() {
  const [mode, setMode] = useState<'voice' | 'text'>('voice')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const m = params.get('mode')
    if (m === 'chat' || m === 'text') setMode('text')
    else if (m === 'voice') setMode('voice')
  }, [])

  type ChatMessage = { role: 'user' | 'ai'; text: string }
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: "I'm here. Ask about a decision, relationship, pattern, or anything your map is showing you." },
  ])
  const [textInput, setTextInput] = useState('')
  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  function sendChat() {
    const text = textInput.trim()
    if (!text) return
    setChatMessages((prev) => [...prev, { role: 'user', text }])
    setTextInput('')
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: 'ai', text: "That's a meaningful thread. What's underneath that for you — is it more about fear, loyalty, or something you haven't quite named yet?" },
      ])
    }, 1100)
  }

  function handleChatKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat() }
  }

  const [context, setContext] = useState('whole-map')
  const [purpose, setPurpose] = useState('reflect')
  const [voiceActive, setVoiceActive] = useState(false)

  const selectedContext = contextOptions.find((c) => c.id === context)

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">
      {/* ── Main column ─────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 xl:pr-4">

        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#6c37c6]" />
              <h1 className="text-lg font-black text-[#06183a]">Reality Scientist AI</h1>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0a638] text-[10px] font-black text-white">✓</span>
            </div>
            <p className="mt-1 font-serif text-3xl font-bold leading-tight text-[#06183a] sm:text-4xl">Talk with your map.</p>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Speak or type with an AI companion that reflects from your domains, reflections, sources, and synthesis threads.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/dashboard/self-map"
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-bold text-[#06183a] hover:bg-[#fff2df] transition-colors"
            >
              <Map className="h-4 w-4" />
              View My Self-Map <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mode selector */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          {/* Voice */}
          <button
            onClick={() => setMode('voice')}
            className={`relative rounded-[14px] border p-4 text-left transition-all ${
              mode === 'voice'
                ? 'border-[#d9a461] bg-[#fffaf2] shadow-[0_0_0_3px_rgba(201,124,30,0.12)]'
                : 'border-[#ead7b9] bg-white/76 hover:border-[#d9a461]/60'
            }`}
          >
            {mode === 'voice' && (
              <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#f0a638]">
                <Check className="h-3.5 w-3.5 text-white" />
              </span>
            )}
            <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full border ${mode === 'voice' ? 'border-[#d9a461] bg-[#fff8ee] shadow-[0_0_24px_rgba(201,124,30,0.28)]' : 'border-[#ead7b9] bg-[#faf6f0]'}`}>
              <Mic className={`h-7 w-7 ${mode === 'voice' ? 'text-[#c97c1e]' : 'text-[#6b7280]'}`} />
            </div>
            <h2 className="font-serif text-xl text-[#06183a]">Voice Conversation</h2>
            <p className="mt-1 text-sm font-semibold leading-5 text-[#344263]">Talk naturally. Pause, interrupt, wander, or ask directly.</p>
            {mode === 'voice' && (
              <span className="mt-3 inline-block rounded-full bg-[#fff2df] px-3 py-1 text-xs font-black text-[#a45f0d]">Recommended</span>
            )}
          </button>

          {/* Text */}
          <button
            onClick={() => setMode('text')}
            className={`relative rounded-[14px] border p-4 text-left transition-all ${
              mode === 'text'
                ? 'border-[#d9a461] bg-[#fffaf2] shadow-[0_0_0_3px_rgba(201,124,30,0.12)]'
                : 'border-[#ead7b9] bg-white/76 hover:border-[#d9a461]/60'
            }`}
          >
            {mode === 'text' && (
              <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#f0a638]">
                <Check className="h-3.5 w-3.5 text-white" />
              </span>
            )}
            <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full border ${mode === 'text' ? 'border-[#d9a461] bg-[#fff8ee] shadow-[0_0_24px_rgba(201,124,30,0.28)]' : 'border-[#ead7b9] bg-[#faf6f0]'}`}>
              <MessageSquare className={`h-7 w-7 ${mode === 'text' ? 'text-[#c97c1e]' : 'text-[#6b7280]'}`} />
            </div>
            <h2 className="font-serif text-xl text-[#06183a]">Text Chat</h2>
            <p className="mt-1 text-sm font-semibold leading-5 text-[#344263]">Type privately when you want precision, quiet, or a written trail.</p>
          </button>
        </div>

        {/* Context selector */}
        <Card className="mb-4 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-black text-[#06183a]">Respond using:</span>
            {contextOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setContext(opt.id)}
                className={`rounded-[8px] border px-3 py-2 text-left transition-all ${
                  context === opt.id
                    ? 'border-[#d9a461] bg-[#fff2df] shadow-[0_0_0_2px_rgba(201,124,30,0.12)]'
                    : 'border-[#ead7b9] bg-white/60 hover:border-[#d9a461]/60'
                }`}
              >
                <p className="text-xs font-black text-[#06183a]">{opt.label}</p>
                <p className="text-[11px] font-semibold text-[#6b7280]">{opt.sub}</p>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#344263]">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#6c37c6]" />
              Using {selectedContext?.label}
              {context === 'current-focus' || context === 'whole-map' ? ` + Current Focus (${aiContext.currentFocus})` : ''}.
              {' '}Reality Scientist AI will draw from all available context.
            </div>
            <button className="shrink-0 text-xs font-black text-[#c97c1e] hover:underline">Change context</button>
          </div>
        </Card>

        {/* Prompt starters */}
        <Card className="mb-4 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl text-[#06183a]">What would you like to explore?</h2>
              <p className="text-sm font-semibold text-[#6b7280]">Choose a starting point or ask anything on your mind.</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-xs font-black text-[#c97c1e] hover:underline">
              See more ideas <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {promptGroups.map((group) => {
              const Icon = group.icon
              return (
                <div key={group.label}>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color: group.color }} />
                    <span className="text-xs font-black text-[#06183a]">{group.label}</span>
                  </div>
                  <div className="space-y-1.5">
                    {group.prompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => mode === 'text' ? setTextInput(prompt) : undefined}
                        className="flex w-full items-center justify-between gap-2 rounded-[8px] border border-[#ead7b9] bg-white/80 px-3 py-2 text-left text-xs font-semibold text-[#344263] hover:border-[#d9a461] hover:bg-[#fff8ee] transition-all"
                      >
                        {prompt}
                        <ArrowRight className="h-3 w-3 shrink-0 text-[#c97c1e]" />
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Voice ready / Text chat panel */}
        {mode === 'voice' ? (
          <Card className="mb-4 p-5">
            {voiceActive ? (
              /* Active voice state */
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff2df]">
                      <Mic className="h-5 w-5 text-[#c97c1e]" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[#c97c1e]">Listening...</p>
                      <p className="font-mono text-sm font-bold text-[#06183a]">00:12</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-black text-[#06183a] hover:bg-[#fff2df] transition-colors">
                      <Pause className="h-3.5 w-3.5" /> Pause
                    </button>
                    <button onClick={() => setVoiceActive(false)} className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#06183a] px-3 py-2 text-xs font-black text-white hover:bg-[#0d2a5e] transition-colors">
                      <Square className="h-3.5 w-3.5" /> Stop
                    </button>
                  </div>
                </div>
                <Waveform active />
                <div className="mt-4 space-y-3 rounded-[10px] border border-[#ead7b9] bg-[#faf6f0] p-3">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wider text-[#6b7280]">You</p>
                    <p className="mt-1 text-sm font-semibold text-[#06183a]">I keep over-explaining myself in relationships and then feel resentful later.</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wider text-[#6c37c6]">Reality Scientist AI</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-[#06183a]">I hear you. That pattern connects to safety, being seen, and the fear of not being enough. Let&apos;s explore what the over-explaining is protecting.</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Let's go deeper", 'Show me what you see', "What's the pattern?", 'Separate reality from old pattern'].map((s) => (
                    <button key={s} className="rounded-full border border-[#d8c4ff] bg-[#f5f0ff] px-3 py-1.5 text-xs font-bold text-[#4b23c7] hover:bg-[#ede5ff] transition-colors">{s}</button>
                  ))}
                </div>
              </div>
            ) : (
              /* Voice ready state */
              <div className="flex flex-col items-center py-4 text-center sm:flex-row sm:gap-8 sm:py-3 sm:text-left">
                <button
                  onClick={() => setVoiceActive(true)}
                  className="mb-5 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#d9a461] bg-[#fff8ee] shadow-[0_0_32px_rgba(201,124,30,0.3)] transition-all hover:shadow-[0_0_44px_rgba(201,124,30,0.45)] sm:mb-0 sm:h-24 sm:w-24"
                  aria-label="Start voice conversation"
                >
                  <Mic className="h-9 w-9 text-[#c97c1e] sm:h-10 sm:w-10" />
                </button>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-[#06183a]">I&apos;m ready when you are.</h2>
                  <p className="mt-1 text-sm font-semibold text-[#344263]">Click the mic to start speaking. You can pause, interrupt, or change topics anytime.</p>
                  <div className="mt-3">
                    <Waveform />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      This conversation is private and encrypted.
                    </div>
                    <button className="text-xs font-black text-[#c97c1e] hover:underline">Voice tips</button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ) : (
          /* Text chat panel */
          <Card className="mb-4 flex min-h-[520px] flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[420px]">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'ai' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d9c4ff] bg-[#f5f0ff]">
                      <MessageSquare className="h-4 w-4 text-[#6c37c6]" />
                    </div>
                  )}
                  <div className={`max-w-[78%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.role === 'ai' && <p className="text-[11px] font-black text-[#6c37c6]">Reality Scientist AI</p>}
                    <div className={`rounded-[12px] px-4 py-2.5 text-sm font-semibold leading-6 ${
                      msg.role === 'ai'
                        ? 'border border-[#ead7b9] bg-white text-[#06183a]'
                        : 'bg-[#06183a] text-white'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#ead7b9] p-4">
              <div className="flex items-end gap-2">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={handleChatKey}
                  rows={2}
                  placeholder="Ask about a decision, relationship, pattern, emotion, or next step..."
                  className="flex-1 resize-none rounded-[10px] border border-[#ead7b9] bg-white px-3 py-2.5 text-sm font-semibold text-[#06183a] outline-none placeholder:text-[#a0a8b8] focus:border-[#d9a461]"
                />
                <button
                  onClick={sendChat}
                  disabled={!textInput.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#06183a] text-white hover:bg-[#0d2a5e] disabled:opacity-40 transition-colors"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-[11px] font-semibold text-[#a0a8b8]">Press Enter to send</p>
            </div>
          </Card>
        )}

        {/* Conversation purpose */}
        <Card className="mb-4 p-4">
          <div className="mb-3">
            <p className="text-sm font-black text-[#06183a]">Conversation purpose</p>
            <p className="text-xs font-semibold text-[#6b7280]">You control what becomes part of your map.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {purposeOptions.map((opt) => {
              const Icon = opt.icon
              const active = purpose === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => setPurpose(opt.id)}
                  className={`flex items-start gap-3 rounded-[10px] border p-3 text-left transition-all ${
                    active
                      ? 'border-[#d9a461] bg-[#fff8ee] shadow-[0_0_0_2px_rgba(201,124,30,0.12)]'
                      : 'border-[#ead7b9] bg-white/60 hover:border-[#d9a461]/60'
                  }`}
                >
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${active ? 'border-[#d9a461] bg-[#fff2df]' : 'border-[#ead7b9] bg-[#faf6f0]'}`}>
                    <Icon className={`h-4 w-4 ${active ? 'text-[#c97c1e]' : 'text-[#6b7280]'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-black ${active ? 'text-[#5b3609]' : 'text-[#06183a]'}`}>{opt.label}</p>
                    <p className="mt-0.5 text-[11px] font-semibold leading-4 text-[#6b7280]">{opt.sub}</p>
                  </div>
                  {active && <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c97c1e]" />}
                </button>
              )
            })}
          </div>
        </Card>

        {/* Bottom tip */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-[#ead7b9] bg-white/60 px-4 py-3 text-xs font-semibold text-[#6b7280]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#c97c1e]" />
            <span>Tip: The more you explore in Map Sessions, the more precise and helpful your conversations become.</span>
          </div>
          <Link href="/voice-session" className="flex shrink-0 items-center gap-1.5 font-black text-[#c97c1e] hover:underline">
            Go to Map Sessions <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-80">
        <div className="sticky top-0 h-screen overflow-y-auto px-4 py-6 space-y-3">

          {/* AI Context */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#06183a]">AI Context</h3>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${
                aiContext.level === 'Medium' ? 'bg-[#fff2df] text-[#a45f0d]' : 'bg-[#f0faf6] text-[#0f8a77]'
              }`}>{aiContext.level}</span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                { icon: Layers3, value: aiContext.domains, label: 'Domains', color: '#176dff' },
                { icon: Sparkles, value: aiContext.reflections, label: 'Reflections', color: '#0f8a77' },
                { icon: FileText, value: aiContext.sources, label: 'Sources', color: '#6c37c6' },
                { icon: BarChart2, value: aiContext.threads, label: 'Threads', color: '#f0a638' },
              ].map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="flex flex-col items-center gap-1 rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-2 py-2">
                  <Icon className="h-4 w-4" style={{ color }} />
                  <span className="text-base font-black text-[#06183a]">{value}</span>
                  <span className="text-[10px] font-semibold text-[#6b7280]">{label}</span>
                </div>
              ))}
            </div>

            {/* Most Active Domains */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-[#06183a]">Most Active Domains</p>
                <button className="text-[11px] font-black text-[#c97c1e] hover:underline">View all</button>
              </div>
              <div className="mt-2 space-y-2">
                {aiContext.mostActiveDomains.map((d) => (
                  <div key={d.name}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#344263]">{d.name}</span>
                      <span className="text-[11px] font-black text-[#6b7280]">{d.percent}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#ead7b9]">
                      <div className="h-1.5 rounded-full bg-[#c97c1e]" style={{ width: `${d.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Current Synthesis */}
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#6c37c6]" />
              <h3 className="text-sm font-black text-[#06183a]">Current Synthesis</h3>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">{aiContext.currentSynthesis}</p>
            <Link href="/synthesis/current" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View Full Synthesis <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>

          {/* Recent Conversations */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#06183a]">Recent Conversations</h3>
              <button className="text-[11px] font-black text-[#c97c1e] hover:underline">View all</button>
            </div>
            <div className="mt-2 space-y-2">
              {aiContext.recentConversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/reality-scientist-ai/conversations/${conv.id}`}
                  className="flex items-center justify-between gap-3 rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2 hover:border-[#d9a461] hover:bg-[#fff8ee] transition-all"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[#06183a]">{conv.title}</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">{conv.date} · {conv.duration}</p>
                  </div>
                  <Play className="h-4 w-4 shrink-0 text-[#c97c1e]" />
                </Link>
              ))}
            </div>
          </Card>

          {/* About */}
          <Card className="p-4">
            <h3 className="text-sm font-black text-[#06183a]">About Reality Scientist AI</h3>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Map Sessions build your Atlas. Reality Scientist AI helps you use it.
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              It reflects from your self-map to bring clarity, challenge, and guidance with radical honesty and compassion.
            </p>
            <Link href="/how-it-works/reality-scientist-ai" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              How it works <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>
        </div>
      </aside>
    </div>
  )
}
