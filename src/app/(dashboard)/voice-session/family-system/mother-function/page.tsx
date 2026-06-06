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
  Map,
  Mic,
  Pause,
  Play,
  ShieldCheck,
  SkipForward,
  Sparkles,
  Square,
  Star,
  Users,
} from 'lucide-react'

// ─── Session data ─────────────────────────────────────────────────────────────

const steps = [
  { number: 1, label: 'Begin', sub: 'Settle in' },
  { number: 2, label: 'Maternal Presence', sub: 'Emotional tone' },
  { number: 3, label: 'Need & Comfort', sub: 'When I needed' },
  { number: 4, label: 'Guilt & Obligation', sub: 'What I felt I owed' },
  { number: 5, label: 'What Carries Forward', sub: 'Impact today' },
  { number: 6, label: 'Review', sub: 'Reflect & integrate' },
]

const upcomingPrompts = [
  { number: 2, text: 'Describe what your mother felt like emotionally when you needed comfort.' },
  { number: 3, text: 'What happened when you needed soothing and didn\'t receive it?' },
  { number: 4, text: 'What did you learn you had to do to get love, approval, or attention?' },
  { number: 5, text: 'What did you feel you owed her? What did you owe yourself?' },
  { number: 6, text: 'What from your mother do you want to carry forward? What will you release?' },
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
  { id: '1', title: 'Father Function — Guided Narrative', date: 'May 8', duration: '42 min' },
  { id: '2', title: 'Inner Child — Needs & Safety', date: 'May 5', duration: '38 min' },
  { id: '3', title: 'Relationship Pattern Exploration', date: 'May 1', duration: '31 min' },
]

const afterCards = [
  { icon: FileText, label: 'Review Transcript', sub: 'See everything you shared in this session.', href: '/map-sources/voice-sessions/current/review', color: '#176dff' },
  { icon: Star, label: 'Tag Important Moments', sub: 'Highlight key insights, turning points, and truths.', href: '/map-sources/voice-sessions/current/tag', color: '#f0a638' },
  { icon: Link2, label: 'Connect to Your Map', sub: 'Link insights to domains, reflections, and patterns.', href: '/map-sources/voice-sessions/current/connect', color: '#0f8a77' },
  { icon: BookOpen, label: 'Save to Atlas', sub: 'Add this session to your Atlas as a new source.', href: '/map-sources/voice-sessions/current/save', color: '#6c37c6' },
]

// ─── Waveform ─────────────────────────────────────────────────────────────────

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex h-8 items-center gap-[2.5px]" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full transition-all duration-150"
          style={{
            height: active
              ? `${6 + Math.abs(Math.sin(i * 0.65 + Date.now() / 300)) * 22}px`
              : `${3 + Math.abs(Math.sin(i * 0.72)) * 16}px`,
            backgroundColor: '#c97c1e',
            opacity: active ? (i % 3 === 0 ? 0.4 : 0.9) : 0.3,
          }}
        />
      ))}
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

type RecordingState = 'ready' | 'listening' | 'paused' | 'processing' | 'review'

export default function MotherFunctionSessionPage() {
  const [recordingState, setRecordingState] = useState<RecordingState>('ready')
  const [elapsed, setElapsed] = useState(0)
  const [whyOpen, setWhyOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (recordingState === 'listening') {
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [recordingState])

  function formatTime(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  function handleStart() {
    setElapsed(0)
    setRecordingState('listening')
  }
  function handlePause() { setRecordingState('paused') }
  function handleResume() { setRecordingState('listening') }
  function handleEnd() {
    setRecordingState('processing')
    setTimeout(() => setRecordingState('review'), 2200)
  }

  const isRecording = recordingState === 'listening'
  const isPaused = recordingState === 'paused'
  const isReady = recordingState === 'ready'
  const isProcessing = recordingState === 'processing'
  const isReview = recordingState === 'review'
  const isActive = isRecording || isPaused

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
            <span className="text-[#06183a]">Guided Narrative</span>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/voice-session"
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-bold text-[#06183a] hover:bg-[#fff2df] transition-colors"
            >
              ← Back to Map Sessions
            </Link>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Page title */}
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0f0] border border-[#fcd0d0]">
              <Heart className="h-5 w-5 text-[#e05c6e]" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#06183a] sm:text-4xl">Mother Function Voice Session</h1>
          </div>
          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
            This session helps clarify maternal safety, emotional availability, guilt, nourishment, need, and receiving.
          </p>
        </div>

        {/* Step tracker */}
        <Card className="mb-4 overflow-x-auto p-3 sm:p-4">
          <div className="flex min-w-max items-start gap-1">
            {steps.map((step, idx) => {
              const isCurrentStep = step.number === 1
              const isDone = false
              return (
                <div key={step.number} className="flex items-start">
                  <div className={`flex min-w-[100px] flex-col items-start gap-1 rounded-[10px] px-3 py-2 ${isCurrentStep ? 'bg-[#fff2df]' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${isCurrentStep ? 'bg-[#c97c1e] text-white' : 'bg-[#ead7b9] text-[#6b7280]'}`}>
                        {step.number}
                      </span>
                      <span className={`text-xs font-black ${isCurrentStep ? 'text-[#5b3609]' : 'text-[#6b7280]'}`}>{step.label}</span>
                    </div>
                    <span className="pl-8 text-[11px] font-semibold text-[#a0a8b8]">{step.sub}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="mt-3 flex items-center px-1">
                      <ChevronRight className="h-4 w-4 text-[#d3b98f]" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        {/* Main recording card */}
        <Card className="mb-4 overflow-hidden">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2df] animate-pulse">
                <Sparkles className="h-8 w-8 text-[#c97c1e]" />
              </div>
              <p className="font-serif text-2xl text-[#06183a]">Processing session…</p>
              <p className="max-w-sm text-sm font-semibold text-[#344263]">Meta-Aware is preparing your transcript, key moments, and map connections.</p>
            </div>
          ) : isReview ? (
            <div className="p-6">
              <div className="mb-5 flex items-center gap-3">
                <BadgeCheck className="h-7 w-7 text-[#0f8a77]" />
                <div>
                  <p className="font-serif text-2xl text-[#06183a]">Session complete.</p>
                  <p className="text-sm font-semibold text-[#344263]">Your recording has been saved. Choose what to do next.</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {afterCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <Link key={card.label} href={card.href} className="flex items-center gap-3 rounded-[10px] border border-[#ead7b9] bg-white/80 p-4 hover:border-[#d9a461] hover:bg-[#fff8ee] transition-all">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: `${card.color}18` }}>
                        <Icon className="h-5 w-5" style={{ color: card.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-[#06183a]">{card.label}</p>
                        <p className="text-xs font-semibold text-[#6b7280]">{card.sub}</p>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[#c97c1e]" />
                    </Link>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
              {/* Left — prompt */}
              <div className="border-b border-[#ead7b9] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <p className="text-[11px] font-black uppercase tracking-widest text-[#a45f0d]">Current Step</p>
                <p className="mt-1 text-base font-black text-[#c97c1e]">Step 1 of 6: Begin</p>

                <p className="mt-4 font-serif text-2xl leading-snug text-[#06183a] sm:text-[1.65rem]">
                  Start by describing what your mother was like when you needed comfort.
                </p>

                {/* Why this prompt */}
                <button
                  onClick={() => setWhyOpen((v) => !v)}
                  className="mt-4 flex items-center gap-1.5 text-xs font-black text-[#344263] hover:text-[#c97c1e] transition-colors"
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
              </div>

              {/* Right — recorder */}
              <div className="flex flex-col items-center p-5 text-center sm:p-6">
                {/* Mic orb */}
                <button
                  onClick={isReady ? handleStart : isRecording ? handlePause : handleResume}
                  aria-label={isReady ? 'Start recording' : isRecording ? 'Pause' : 'Resume'}
                  className={`relative flex h-24 w-24 items-center justify-center rounded-full border-2 transition-all sm:h-28 sm:w-28 ${
                    isRecording
                      ? 'border-[#c97c1e] bg-[#c97c1e] shadow-[0_0_40px_rgba(201,124,30,0.5)] hover:shadow-[0_0_52px_rgba(201,124,30,0.65)]'
                      : 'border-[#d9a461] bg-[#fff8ee] shadow-[0_0_28px_rgba(201,124,30,0.28)] hover:shadow-[0_0_40px_rgba(201,124,30,0.42)]'
                  }`}
                >
                  <Mic className={`h-10 w-10 sm:h-12 sm:w-12 ${isRecording ? 'text-white' : 'text-[#c97c1e]'}`} />
                </button>

                {/* Waveform */}
                <div className="mt-4 w-full max-w-[280px]">
                  <Waveform active={isRecording} />
                </div>

                {/* Timer */}
                <p className={`mt-3 font-mono text-4xl font-black tracking-tight ${isActive ? 'text-[#06183a]' : 'text-[#6b7280]'}`}>
                  {formatTime(elapsed)}
                </p>
                <p className={`mt-1 text-sm font-black ${
                  isRecording ? 'text-[#c97c1e]' : isPaused ? 'text-[#6c37c6]' : 'text-[#6b7280]'
                }`}>
                  {isRecording ? 'Listening…' : isPaused ? 'Paused' : 'Ready to record'}
                </p>
                {isRecording && (
                  <p className="mt-1 text-xs font-semibold text-[#6b7280]">Speak freely. There is no right or wrong way.</p>
                )}

                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  This session is private and encrypted.
                </div>

                {/* Controls */}
                <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-2">
                  {isReady && (
                    <button
                      onClick={handleStart}
                      className="inline-flex items-center gap-2 rounded-[10px] bg-[#c97c1e] px-6 py-3 text-sm font-black text-white shadow-[0_4px_14px_rgba(201,124,30,0.4)] hover:bg-[#b06a14] transition-colors"
                    >
                      <Mic className="h-4 w-4" /> Start Recording
                    </button>
                  )}
                  {isRecording && (
                    <button onClick={handlePause} className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-3 text-sm font-black text-[#06183a] hover:bg-[#fff2df] transition-colors">
                      <Pause className="h-4 w-4" /> Pause
                    </button>
                  )}
                  {isPaused && (
                    <button onClick={handleResume} className="inline-flex items-center gap-2 rounded-[10px] bg-[#c97c1e] px-5 py-3 text-sm font-black text-white hover:bg-[#b06a14] transition-colors">
                      <Play className="h-4 w-4" /> Resume
                    </button>
                  )}
                  {!isReady && (
                    <>
                      <button className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-3 text-sm font-black text-[#06183a] hover:bg-[#fff2df] transition-colors">
                        <SkipForward className="h-4 w-4" /> Skip Prompt
                      </button>
                      <button onClick={handleEnd} className="inline-flex items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-3 text-sm font-black text-[#06183a] hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors">
                        <Square className="h-4 w-4" /> End Session
                      </button>
                    </>
                  )}
                  {isReady && (
                    <>
                      <button disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-3 text-sm font-black text-[#c0c8d4] transition-colors">
                        <Pause className="h-4 w-4" /> Pause
                      </button>
                      <button disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-3 text-sm font-black text-[#c0c8d4] transition-colors">
                        <SkipForward className="h-4 w-4" /> Skip Prompt
                      </button>
                      <button disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-3 text-sm font-black text-[#c0c8d4] transition-colors">
                        <Square className="h-4 w-4" /> End Session
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Upcoming prompts */}
        {!isReview && (
          <Card className="mb-4 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#a45f0d]">Upcoming prompts in this session</p>
              <Link href="/map-sessions/family-system/mother-function/prompts" className="text-xs font-black text-[#c97c1e] hover:underline">
                View all prompts
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {upcomingPrompts.map((prompt) => (
                <div key={prompt.number} className="min-w-[180px] max-w-[200px] shrink-0 rounded-[10px] border border-[#ead7b9] bg-[#faf6f0] p-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ead7b9] text-xs font-black text-[#6b7280]">{prompt.number}</span>
                  <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">{prompt.text}</p>
                  <ChevronRight className="mt-2 h-4 w-4 text-[#c97c1e]" />
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* After this session */}
        {!isReview && (
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
        )}
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
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${d.percent}%`, backgroundColor: d.color }} />
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
                ['Session Type', 'Guided Narrative'],
                ['Estimated Length', '30–45 min'],
                ['Best Time', 'Quiet, uninterrupted'],
                ['Voice Source', 'Microphone'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-2 border-b border-[#ead7b9] pb-2 last:border-0 last:pb-0">
                  <dt className="text-xs font-semibold text-[#6b7280]">{label}</dt>
                  <dd className="text-right text-xs font-black text-[#06183a]">{value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/map-sessions/family-system/mother-function/guide" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              View Full Session Guide <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>

          {/* Recent voice sessions */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-[#06183a]">Recent Voice Sessions</h2>
              <button className="text-[11px] font-black text-[#c97c1e] hover:underline">View all</button>
            </div>
            <div className="mt-2 space-y-2">
              {recentSessions.map((s) => (
                <Link
                  key={s.id}
                  href={`/map-sources/voice-sessions/${s.id}`}
                  className="flex items-center justify-between gap-3 rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2 hover:border-[#d9a461] hover:bg-[#fff8ee] transition-all"
                >
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
                { icon: Mic, tip: 'Speak freely and honestly. There is no right or wrong.' },
                { icon: Clock, tip: 'Go slow. The truth often lives in the pauses.' },
                { icon: Star, tip: 'Follow what feels real, not what feels expected.' },
              ].map(({ icon: Icon, tip }) => (
                <li key={tip} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#344263]">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c97c1e]" />
                  {tip}
                </li>
              ))}
            </ul>
            <Link href="/how-it-works/voice-sessions" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              More tips for voice sessions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>
        </div>
      </aside>
    </div>
  )
}
