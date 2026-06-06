'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CircleHelp, Compass, GitBranch, Sparkles, Target } from 'lucide-react'

const assetBase = '/assets/meta-aware'

const tabs = ['Atlas View', 'Domain Grid', 'Connection Map', 'Vacancy Map']

const statusCards = [
  { title: 'Domains Explored', value: '18 / 24', detail: '75% of your map', icon: Compass, accent: '#0f8a77', progress: '75%' },
  { title: 'Active Focus', value: 'Family System', detail: '62% Complete', icon: Target, accent: '#d88920' },
  { title: 'Map Resolution', value: 'Developing', detail: 'Getting clearer with every insight', icon: Sparkles, accent: '#246bff' },
  { title: 'Patterns Connecting', value: '12', detail: 'synthesis threads', icon: GitBranch, accent: '#e08a18' },
]

const modules = [
  ['Family Structure', 'Complete', '100%', '#0f8a77'],
  ['Mother Function', 'In Progress', '65%', '#176dff'],
  ['Father Function', 'In Progress', '50%', '#176dff'],
  ['Sibling Roles', 'Complete', '100%', '#0f8a77'],
  ['Family Role', 'In Progress', '60%', '#176dff'],
  ['Emotional Climate', 'In Progress', '40%', '#176dff'],
  ['Boundaries', 'Needs Intake', '0%', '#d88920'],
  ['Repair & Integration', 'Locked', '0%', '#7b8498'],
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
    <section className={`rounded-[14px] border border-[#ead7b9] bg-white/74 shadow-[0_12px_30px_rgba(48,27,5,0.04)] ${className}`}>
      {children}
    </section>
  )
}

function ButtonLink({ href, children, variant = 'outline' }: { href: string; children: React.ReactNode; variant?: 'outline' | 'navy' }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-black transition hover:-translate-y-0.5 ${
        variant === 'navy' ? 'border-[#06183a] bg-[#06183a] text-white' : 'border-[#ccd3e6] bg-white/78 text-[#06183a] hover:bg-[#fff2df]'
      }`}
    >
      {children}
    </Link>
  )
}

function PlaceholderTab({ title }: { title: string }) {
  return (
    <Card className="p-10 text-center">
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
      <header className="mb-4 grid gap-4 xl:grid-cols-[1fr_auto_auto_auto] xl:items-center">
        <div>
          <h1 className="font-serif text-[2.65rem] leading-none">My Self-Map</h1>
          <p className="mt-2 text-sm font-semibold text-[#173563]">Explore the 24 domains that make up your Whole-Person Atlas.</p>
        </div>

        <div className="flex overflow-hidden rounded-lg border border-[#d8c7aa] bg-white/80">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`min-w-[136px] border-r border-[#ead7b9] px-5 py-3 text-sm font-black last:border-r-0 ${
                activeTab === tab ? 'bg-[#06183a] text-white' : 'text-[#06183a] hover:bg-[#fff2df]'
              }`}
            >
              {tab === 'Atlas View' && <Sparkles className="mr-2 inline h-4 w-4 text-[#f0a638]" />}
              {tab}
            </button>
          ))}
        </div>

        <ButtonLink href="/voice-session" variant="navy">Continue Mapping <ArrowRight className="h-4 w-4" /></ButtonLink>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d3b98f] bg-white/70 text-[#06183a]" aria-label="Self-map help">
          <CircleHelp className="h-5 w-5" />
        </button>
      </header>

      {activeTab !== 'Atlas View' ? (
        <PlaceholderTab title={activeTab} />
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statusCards.map((card, index) => {
              const Icon = card.icon
              return (
                <Card key={card.title} className="p-5">
                  <div className="flex items-center gap-5">
                    {index === 0 ? (
                      <div className="grid h-[82px] w-[82px] shrink-0 place-items-center rounded-full" style={{ background: 'conic-gradient(#0f8a77 75%, #ded8cf 0)' }}>
                        <div className="grid h-[64px] w-[64px] place-items-center rounded-full bg-white text-xl font-black">75%</div>
                      </div>
                    ) : (
                      <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-[#fff5e8]" style={{ color: card.accent }}>
                        <Icon className="h-9 w-9" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-black text-[#173563]">{card.title}</p>
                      <p className="font-serif text-[1.7rem] leading-tight">{card.value}</p>
                      <p className="text-xs font-semibold text-[#173563]">{card.detail}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="grid gap-4 xl:grid-cols-[0.94fr_1.06fr]">
            <div className="space-y-4">
            <Card className="self-start p-4 xl:p-5">
              <div className="grid items-center gap-2 lg:grid-cols-[142px_minmax(0,1fr)] xl:grid-cols-[158px_minmax(0,1fr)]">
                <div className="relative z-10">
                  <h2 className="font-serif text-2xl">Your 24-Domain Atlas <span className="align-middle text-sm">ⓘ</span></h2>
                  <p className="mt-4 text-[12px] font-semibold leading-6 text-[#173563] xl:text-[13px]">
                    Each domain is a vital part of your whole self. Select any domain to see what it contains, what it connects to, and what it still needs.
                  </p>
                  <ButtonLink href="/#how-it-works">How this works</ButtonLink>
                </div>
                <div className="min-w-0">
                  <div className="relative mx-auto -my-6 max-w-[760px] lg:-ml-4 lg:scale-[1.08] xl:-ml-6 xl:scale-[1.13] 2xl:-ml-8 2xl:scale-[1.18]">
                    <Image
                      src={`${assetBase}/map/radial-map-24-domain.svg`}
                      alt="24-domain radial self-map"
                      width={820}
                      height={820}
                      className="w-full drop-shadow-[0_18px_38px_rgba(48,27,5,0.08)]"
                      priority
                    />
                    <button
                      className="absolute left-[84%] top-[50%] grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-[5px] border-[#d88920] bg-[#f3aa32] font-serif text-2xl font-black text-white shadow-[0_0_0_8px_rgba(216,137,32,0.18)]"
                      aria-label="Family System active domain"
                      title="Family System"
                    >
                      8
                    </button>
                  </div>
                  <div className="mt-0 flex flex-wrap justify-center gap-4 text-[12px] font-bold text-[#173563] xl:gap-5">
                    <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[#0f8a77]" />Explored (18)</span>
                    <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[#176dff]" />In Progress (6)</span>
                    <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[#bcbcbc]" />Not Started (0)</span>
                    <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full border-2 border-[#d88920]" />Active Domain</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl">How This Domain Connects <span className="align-middle text-sm">ⓘ</span></h2>
                <ButtonLink href="/self-map?view=connection-map">View Connection Map <ArrowRight className="h-4 w-4" /></ButtonLink>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 lg:grid-cols-6">
                {connections.map(([label, icon], index) => (
                  <div key={label} className="relative text-center">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f3eefb]">
                      <Image src={`${assetBase}/domains/${icon}`} alt="" width={34} height={34} className="h-8 w-8" />
                    </div>
                    <p className="mt-2 text-[11px] font-black">{label}</p>
                    {index < connections.length - 1 && <ArrowRight className="absolute -right-3 top-5 hidden h-4 w-4 text-[#173563] lg:block" />}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold text-[#173563]">This thread suggests that safety, approval, and explanation are currently linked across multiple domains.</p>
            </Card>

            <Card className="p-4">
              <h2 className="font-serif text-2xl">Map Insights at a Glance</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {insights.map(([icon, title, note]) => (
                  <div key={title} className="flex gap-3 border-r border-[#ead7b9] pr-3 last:border-r-0">
                    <Image src={`${assetBase}/icons/${icon}`} alt="" width={38} height={38} className="h-10 w-10" />
                    <p className="text-xs font-black leading-5">{title} {note && <span className="text-[#0f8a77]">{note}</span>}</p>
                  </div>
                ))}
              </div>
              <Link href="/insights" className="mt-3 inline-flex items-center gap-1 text-sm font-black text-[#176dff]">View all insights <ArrowRight className="h-4 w-4" /></Link>
            </Card>
            </div>

            <div className="space-y-4">

            <Card className="overflow-hidden">
              <div className="relative bg-[#06183a] p-5 pb-20 text-white">
                <div className="grid gap-5 lg:grid-cols-[1fr_250px]">
                  <div>
                    <div className="flex items-start gap-4">
                      <Image src={`${assetBase}/domains/domain-family-system.svg`} alt="" width={76} height={76} className="h-[76px] w-[76px] rounded-full bg-[#6a3bbd] p-4" />
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-white/75">Selected Domain</p>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="font-serif text-4xl">Family System</h2>
                          <span className="rounded-md border border-[#d88920] px-3 py-1 text-xs font-black text-[#ffc760]">Current Focus</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-white/88">
                      Exploring the people, roles, emotional climate, and inherited patterns that shaped you.
                    </p>
                  </div>
                  <div className="pt-3">
                    <div className="mb-3 flex justify-between text-sm font-black">
                      <span>62% Complete</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/20">
                      <div className="h-full w-[62%] rounded-full bg-[#875cff]" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_240px]">
                  <div className="space-y-3">
                    <div className="rounded-xl bg-white p-4 text-[#06183a]">
                      <div className="flex items-start gap-3">
                        <Image src={`${assetBase}/icons/current-read-spark.svg`} alt="" width={34} height={34} className="h-8 w-8" />
                        <div>
                          <p className="text-sm font-black">Current read:</p>
                          <p className="mt-1 text-sm font-semibold leading-6 text-[#173563]">Your Family System work is revealing how safety, usefulness, and emotional vigilance became linked.</p>
                        </div>
                        <Link href="/synthesis/family-system" className="ml-auto hidden whitespace-nowrap text-xs font-black text-[#176dff] lg:inline-flex">View full synthesis <ArrowRight className="h-4 w-4" /></Link>
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#f7f0ff] p-4 text-[#06183a]">
                      <div className="flex items-start gap-3">
                        <Image src={`${assetBase}/icons/domain-teaching-icon.svg`} alt="" width={34} height={34} className="h-8 w-8" />
                        <div>
                          <p className="text-sm font-black text-[#4c2a96]">What this domain is teaching you:</p>
                          <p className="mt-1 text-sm font-semibold italic leading-6 text-[#4c2a96]">You learned to seek safety by becoming useful, explanatory, and emotionally alert.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-4 text-[#06183a]">
                    <h3 className="mb-3 font-serif text-lg">From your map</h3>
                    {[
                      ['Reflections', '12'],
                      ['Key Insights', '7'],
                      ['Artifacts', '4'],
                      ['AI Discussions', '5'],
                      ['Last Activity', 'May 22, 2025'],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between border-b border-[#e8dfd0] py-2 text-sm last:border-b-0">
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="-mt-14 px-4 pb-4">
                <div className="rounded-xl border border-[#ead7b9] bg-white p-3 shadow-[0_16px_34px_rgba(6,24,58,0.12)]">
                  <h3 className="mb-2 text-xs font-black uppercase tracking-[0.1em]">Modules / Areas</h3>
                  <div className="overflow-hidden rounded-lg border border-[#ead7b9]">
                    {modules.map(([name, status, percent, color]) => (
                      <div key={name} className="grid grid-cols-[1fr_105px_52px_20px] items-center border-b border-[#efe6d8] px-3 py-1.5 text-xs last:border-b-0">
                        <span className="font-black">{name}</span>
                        <span style={{ color }} className="font-black">{status}</span>
                        <span className="text-right font-black">{percent}</span>
                        <span className="ml-auto h-3 w-3 rounded-full border-2" style={{ borderColor: color, backgroundColor: status === 'Complete' ? color : 'transparent' }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid gap-2 md:grid-cols-4">
                    <ButtonLink href="/self-map/family-system" variant="navy">Continue Family System <ArrowRight className="h-4 w-4" /></ButtonLink>
                    <ButtonLink href="/map-sources/lens-scans?family-system">Apply Lens to Intake</ButtonLink>
                    <ButtonLink href="/talk-to-ai?domain=family-system">Ask AI about this domain</ButtonLink>
                    <ButtonLink href="/reports/family-system">Open Domain Report</ButtonLink>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl">Unlocked Map Artifacts</h2>
                <Link href="/artifacts" className="inline-flex items-center gap-1 text-sm font-black text-[#176dff]">View all artifacts <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 lg:grid-cols-6">
                {artifacts.map(([title, icon]) => (
                  <div key={title} className="rounded-lg border border-[#ead7b9] bg-white/72 p-3 text-center">
                    <Image src={`${assetBase}/artifacts/${icon}`} alt="" width={42} height={42} className="mx-auto h-11 w-11" />
                    <p className="mt-2 text-[11px] font-black leading-4">{title}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <Card className="p-4">
              <h2 className="font-serif text-2xl">Needs More Resolution</h2>
              <p className="mt-2 text-xs font-semibold text-[#173563]">These domains would benefit from more reflections, intake, or lens scans.</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {['Boundaries 0%', 'Sexuality & Intimacy 30%', 'Legacy & Life Themes 25%'].map((chip) => (
                  <span key={chip} className="rounded-lg bg-[#f4eefc] px-2 py-3 text-center text-[11px] font-black">{chip}</span>
                ))}
              </div>
              <Link href="/self-map?view=vacancy-map" className="mt-3 inline-flex items-center gap-1 text-sm font-black text-[#176dff]">View Vacancy Map <ArrowRight className="h-4 w-4" /></Link>
            </Card>

            <Card className="p-4">
              <h2 className="font-serif text-2xl">Suggested Next Actions</h2>
              <div className="mt-3 space-y-2">
                {actions.map(([title, detail, icon, href]) => (
                  <Link key={title} href={href} className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-[#fff2df]">
                    <Image src={`${assetBase}/actions/${icon}`} alt="" width={28} height={28} className="h-7 w-7" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-black">{title}</span>
                      <span className="block text-[11px] font-semibold text-[#344263]">{detail}</span>
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </Card>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
