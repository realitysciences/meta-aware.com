'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  CircleHelp,
  Compass,
  GitBranch,
  Lock,
  Sparkles,
  Target,
} from 'lucide-react'

const assetBase = '/assets/meta-aware'

const tabs = ['Atlas View', 'Domain Grid', 'Connection Map', 'Vacancy Map']

const statusCards = [
  { title: 'Domains Explored', value: '18 / 24', detail: '75% of your map', icon: Compass, accent: '#d88920' },
  { title: 'Active Focus', value: 'Family System', detail: '62% Complete', icon: Target, accent: '#0f8a77' },
  { title: 'Map Resolution', value: 'Developing', detail: 'Getting clearer with every insight', icon: Sparkles, accent: '#5a31b5' },
  { title: 'Patterns Connecting', value: '12', detail: 'synthesis threads', icon: GitBranch, accent: '#174fbe' },
]

const modules = [
  ['Family Structure', 'Complete', '100%', '#0f8a77'],
  ['Mother Function', 'In Progress', '65%', '#5a31b5'],
  ['Father Function', 'In Progress', '50%', '#5a31b5'],
  ['Sibling Roles', 'Complete', '100%', '#0f8a77'],
  ['Family Role', 'In Progress', '60%', '#d88920'],
  ['Emotional Climate', 'In Progress', '40%', '#d88920'],
  ['Boundaries', 'Needs Intake', '0%', '#8c8b86'],
  ['Repair & Integration', 'Locked', '0%', '#8c8b86'],
]

const connections = [
  ['Family System', 'connection-family-system.svg'],
  ['Self-Worth & Shame', 'connection-self-worth.svg'],
  ['Attachment Styles', 'connection-attachment.svg'],
  ['Communication Patterns', 'connection-communication.svg'],
  ['Boundaries', 'connection-boundaries.svg'],
  ['Emotional Climate', 'connection-emotional-climate.svg'],
]

const artifacts = [
  ['Family Role Snapshot', 'artifact-family-role-snapshot.svg'],
  ['Family System Domain Report', 'artifact-family-system-domain-report.svg'],
  ['Mother Wound Reflection', 'artifact-mother-wound-reflection.svg'],
  ['Self-Worth Blueprint', 'artifact-self-worth-blueprint.svg'],
  ['Attachment Pattern Brief', 'artifact-attachment-pattern-brief.svg'],
  ['Approval & Safety Synthesis Thread', 'artifact-approval-safety-thread.svg'],
]

const insights = [
  ['insight-growth.svg', 'Your growth is accelerating in Identity and Body.', 'Keep going.'],
  ['insight-unlock.svg', 'Family System work may unlock deeper progress in Boundaries and Attachment.', ''],
  ['insight-more-intake.svg', 'Three domains are currently under-evidenced and need more intake.', ''],
]

const actions = [
  ['Apply Lens to Family Intake', 'Attachment Pattern lens suggested', 'action-apply-lens.svg', '/map-sources/lens-scans?family-system'],
  ['Ask Reality Scientist AI about this domain', 'Get insight and next-step guidance', 'action-ask-ai.svg', '/talk-to-ai?domain=family-system'],
  ['Start a Voice Session', 'Speak and deepen your understanding', 'action-voice-session.svg', '/voice-session'],
  ['Add a Reflection', 'Capture what you’re seeing and feeling', 'action-add-reflection.svg', '/reflections/new'],
]

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-[#ead7b9] bg-white/72 shadow-[0_16px_38px_rgba(48,27,5,0.045)] ${className}`}>
      {children}
    </section>
  )
}

function PillButton({ href, children, variant = 'outline' }: { href: string; children: React.ReactNode; variant?: 'outline' | 'gold' | 'navy' }) {
  const styles = {
    outline: 'border-[#d3b98f] bg-white/70 text-[#06183a] hover:bg-[#fff2df]',
    gold: 'border-[#c98622] bg-gradient-to-b from-[#f8c468] to-[#c97c1e] text-white shadow-[0_12px_24px_rgba(201,124,30,0.16)]',
    navy: 'border-[#06183a] bg-[#06183a] text-white',
  }

  return (
    <Link href={href} className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 ${styles[variant]}`}>
      {children}
    </Link>
  )
}

function PlaceholderTab({ title }: { title: string }) {
  return (
    <Card className="p-10 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2df] text-[#c97c1e]">
        <Sparkles className="h-7 w-7" />
      </div>
      <h2 className="font-serif text-3xl">{title} coming soon</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#344263]">
        Atlas View is available now. This view will open deeper ways to read your map as your Whole-Person Atlas grows.
      </p>
    </Card>
  )
}

export default function SelfMapPage() {
  const [activeTab, setActiveTab] = useState('Atlas View')

  return (
    <div className="min-h-screen bg-[#fffaf2] px-4 py-4 text-[#06183a] lg:px-6">
      <header className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#a45f0d]">Whole-Person Atlas</p>
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">My Self-Map</h1>
          <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-[#344263]">
            Explore the 24 domains that make up your Whole-Person Atlas.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <PillButton href="/voice-session" variant="gold">Continue Mapping <ArrowRight className="h-4 w-4" /></PillButton>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d3b98f] bg-white/70 text-[#06183a]" aria-label="Self-map help">
            <CircleHelp className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="mb-4 flex gap-2 overflow-x-auto rounded-2xl border border-[#ead7b9] bg-white/58 p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-black transition ${
              activeTab === tab ? 'bg-[#06183a] text-white shadow-[0_12px_24px_rgba(6,24,58,0.14)]' : 'text-[#344263] hover:bg-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab !== 'Atlas View' ? (
        <PlaceholderTab title={activeTab} />
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {statusCards.map((card, index) => {
              const Icon = card.icon
              return (
                <Card key={card.title} className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff5e5]"
                      style={index === 0 ? { background: 'conic-gradient(#d88920 75%, #eee5d6 0)' } : { color: card.accent }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
                        <Icon className="h-6 w-6" style={{ color: card.accent }} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.08em] text-[#314164]">{card.title}</p>
                      <p className="font-serif text-2xl leading-tight">{card.value}</p>
                      <p className="text-xs font-semibold text-[#344263]">{card.detail}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.92fr)]">
            <Card className="overflow-hidden p-5 md:p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="font-serif text-3xl">Your 24-Domain Atlas</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#344263]">
                    Each domain is a vital part of your whole self. Select any domain to see what it contains, what it connects to, and what it still needs.
                  </p>
                </div>
                <PillButton href="/#how-it-works">How this works</PillButton>
              </div>

              <div className="relative mx-auto mt-6 grid max-w-[620px] place-items-center">
                <Image
                  src={`${assetBase}/map/radial-map-24-domain.svg`}
                  alt="24-domain radial self-map"
                  width={620}
                  height={620}
                  className="w-full max-w-[620px] drop-shadow-[0_22px_46px_rgba(48,27,5,0.08)]"
                  priority
                />
                <button
                  className="absolute left-[57%] top-[28%] h-12 w-12 rounded-full border-4 border-[#d88920] bg-[#fffaf2]/60 shadow-[0_0_0_10px_rgba(216,137,32,0.14)] transition hover:scale-110"
                  aria-label="Family System active domain"
                  title="Family System"
                />
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-bold text-[#344263]">
                <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[#0f8a77]" />Explored (18)</span>
                <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[#5a31b5]" />In Progress (6)</span>
                <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[#c8c2b6]" />Not Started (0)</span>
                <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[#d88920]" />Active Domain</span>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-[#06183a] p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e7b45b]">Selected Domain</p>
                    <h2 className="mt-2 font-serif text-4xl">Family System</h2>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-white/82">
                      Exploring the people, roles, emotional climate, and inherited patterns that shaped you.
                    </p>
                  </div>
                  <span className="rounded-full border border-[#e7b45b]/50 bg-[#e7b45b]/14 px-3 py-1 text-xs font-black text-[#ffd47d]">Current Focus</span>
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold text-white/78">
                    <span>62% Complete</span>
                    <span>Family System Progress</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/15">
                    <div className="h-full w-[62%] rounded-full bg-[#e7b45b]" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="rounded-xl border border-[#ead7b9] bg-[#fffaf2] p-4">
                  <div className="flex gap-3">
                    <Image src={`${assetBase}/icons/current-read-spark.svg`} alt="" width={28} height={28} className="h-7 w-7" />
                    <div>
                      <p className="text-sm font-black text-[#06183a]">Current read:</p>
                      <p className="mt-1 text-sm leading-6 text-[#344263]">Your Family System work is revealing how safety, usefulness, and emotional vigilance became linked.</p>
                      <Link href="/synthesis/family-system" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#174fbe]">View full synthesis <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#ddd2ef] bg-[#f6f1ff] p-4">
                  <div className="flex gap-3">
                    <Image src={`${assetBase}/icons/domain-teaching-icon.svg`} alt="" width={30} height={30} className="h-8 w-8" />
                    <div>
                      <p className="text-sm font-black text-[#4c2a96]">What this domain is teaching you:</p>
                      <p className="mt-1 text-sm leading-6 text-[#344263]">You learned to seek safety by becoming useful, explanatory, and emotionally alert.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-serif text-xl">Modules / Areas</h3>
                  <div className="space-y-2">
                    {modules.map(([name, status, percent, color]) => (
                      <div key={name} className="grid grid-cols-[1fr_auto_58px] items-center gap-3 rounded-lg border border-[#ead7b9] bg-white/70 p-3">
                        <p className="text-sm font-bold">{name}</p>
                        <span className="rounded-full bg-[#fff2df] px-2 py-1 text-[11px] font-black text-[#5b3609]">{status}</span>
                        <div className="text-right text-xs font-black" style={{ color }}>{percent}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#ead7b9] bg-white/70 p-4">
                    <h3 className="font-serif text-xl">From your map</h3>
                    <div className="mt-3 space-y-1 text-sm text-[#344263]">
                      <p><strong>Reflections:</strong> 12</p>
                      <p><strong>Key Insights:</strong> 7</p>
                      <p><strong>Artifacts:</strong> 4</p>
                      <p><strong>AI Discussions:</strong> 5</p>
                      <p><strong>Last Activity:</strong> May 22, 2025</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#ead7b9] bg-[#fffaf2] p-4">
                    <h3 className="font-serif text-xl">What’s next?</h3>
                    <p className="mt-3 text-sm leading-6 text-[#344263]">Completing 2 more modules will unlock your Family System Domain Report.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <PillButton href="/self-map/family-system" variant="gold">Continue Family System <ArrowRight className="h-4 w-4" /></PillButton>
                  <PillButton href="/map-sources/lens-scans?family-system">Apply Lens to Intake</PillButton>
                  <PillButton href="/talk-to-ai?domain=family-system">Ask AI about this domain</PillButton>
                  <PillButton href="/reports/family-system" variant="navy">Open Domain Report</PillButton>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-3xl">How This Domain Connects</h2>
                <p className="mt-2 text-sm leading-6 text-[#344263]">This thread suggests that safety, approval, and explanation are currently linked across multiple domains.</p>
              </div>
              <PillButton href="/self-map?view=connection-map">View Connection Map <ArrowRight className="h-4 w-4" /></PillButton>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-6">
              {connections.map(([label, icon], index) => (
                <div key={label} className="relative rounded-xl border border-[#ead7b9] bg-white/70 p-4 text-center">
                  <Image src={`${assetBase}/domains/${icon}`} alt="" width={42} height={42} className="mx-auto h-11 w-11" />
                  <p className="mt-3 text-xs font-black text-[#06183a]">{label}</p>
                  {index < connections.length - 1 && <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#a45f0d] md:block" />}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="font-serif text-3xl">Unlocked Map Artifacts</h2>
              <PillButton href="/artifacts">View all artifacts <ArrowRight className="h-4 w-4" /></PillButton>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {artifacts.map(([title, icon]) => (
                <div key={title} className="flex items-center gap-3 rounded-xl border border-[#ead7b9] bg-white/70 p-4">
                  <Image src={`${assetBase}/artifacts/${icon}`} alt="" width={38} height={38} className="h-10 w-10" />
                  <p className="text-sm font-black">{title}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 xl:grid-cols-[1fr_0.72fr]">
            <Card className="p-5 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h2 className="font-serif text-3xl">Map Insights at a Glance</h2>
                <PillButton href="/insights">View all insights <ArrowRight className="h-4 w-4" /></PillButton>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {insights.map(([icon, title, note]) => (
                  <div key={title} className="rounded-xl border border-[#ead7b9] bg-white/70 p-4">
                    <Image src={`${assetBase}/icons/${icon}`} alt="" width={34} height={34} className="h-9 w-9" />
                    <p className="mt-3 text-sm font-bold leading-6">{title}</p>
                    {note && <p className="mt-1 text-sm font-black text-[#0f8a77]">{note}</p>}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 md:p-6">
              <div className="flex items-start gap-3">
                <Image src={`${assetBase}/icons/needs-resolution-icon.svg`} alt="" width={38} height={38} className="h-10 w-10" />
                <div>
                  <h2 className="font-serif text-3xl">Needs More Resolution</h2>
                  <p className="mt-2 text-sm leading-6 text-[#344263]">These domains would benefit from more reflections, intake, or lens scans.</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Boundaries — 0%', 'Sexuality & Intimacy — 30%', 'Legacy & Life Themes — 25%'].map((chip) => (
                  <span key={chip} className="rounded-full border border-[#d3b98f] bg-[#fff2df] px-3 py-2 text-xs font-black text-[#5b3609]">{chip}</span>
                ))}
              </div>
              <PillButton href="/self-map?view=vacancy-map">View Vacancy Map <ArrowRight className="h-4 w-4" /></PillButton>
            </Card>
          </div>

          <Card className="p-5 md:p-6">
            <h2 className="font-serif text-3xl">Suggested Next Actions</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {actions.map(([title, detail, icon, href]) => (
                <Link key={title} href={href} className="rounded-xl border border-[#ead7b9] bg-white/70 p-4 transition hover:-translate-y-1 hover:bg-[#fff2df]">
                  <Image src={`${assetBase}/actions/${icon}`} alt="" width={38} height={38} className="h-10 w-10" />
                  <p className="mt-3 text-sm font-black">{title}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#344263]">{detail}</p>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-[#a45f0d]" />
              <p className="text-sm font-semibold text-[#344263]">Your self-map is private, encrypted, and yours alone.</p>
            </div>
            <Link href="/dashboard/self-map?view=domain-grid" className="inline-flex items-center gap-2 text-sm font-black text-[#174fbe]">View Domain Grid <ArrowRight className="h-4 w-4" /></Link>
          </Card>
        </div>
      )}
    </div>
  )
}
