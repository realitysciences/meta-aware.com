import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Bell,
  Brain,
  CheckCircle2,
  ChevronDown,
  FileText,
  Layers3,
  MessageSquare,
  Mic,
  Network,
  PlusCircle,
  Sparkles,
} from 'lucide-react'

const metrics = [
  { label: 'Atlas Progress', value: '18 / 24', detail: 'Domains explored', note: '75% of your map', icon: Sparkles, color: '#d88920' },
  { label: 'Reflections', value: '47', detail: '+6 this week', note: 'New signals', icon: Sparkles, color: '#6536c9' },
  { label: 'Map Sources', value: '23', detail: 'Total inputs', note: 'Sources absorbed', icon: Layers3, color: '#0f8a77' },
  { label: 'AI Context', value: 'Medium', detail: 'Getting sharper', note: 'Map-aware', icon: Brain, color: '#6d4ad6' },
  { label: 'Synthesis Threads', value: '12', detail: 'Active threads', note: 'Patterns connecting', icon: Network, color: '#0f8a77' },
]

const atlasStats = [
  '62% Formed',
  '18 Domains Explored',
  '47 Reflections Integrated',
  '23 Sources Absorbed',
  '12 Synthesis Threads Active',
]

const activities = [
  { type: 'Reflection Added', title: 'Shame / Self-Worth', meta: 'Unlocked today', icon: Sparkles, color: '#5a31b5' },
  { type: 'Lens Scan Completed', title: 'Attachment Pattern', meta: 'From Family System intake', icon: FileText, color: '#0f8a77' },
  { type: 'Mapping Session', title: 'Family System · Unit 4', meta: 'Completed', icon: Mic, color: '#d64d75' },
  { type: 'Synthesis Thread', title: 'Approval & Safety', meta: 'Strengthening', icon: Sparkles, color: '#e39b32' },
]

const journey = [
  { title: 'Reflect', copy: 'See what matters', icon: Sparkles },
  { title: 'Build', copy: 'Strengthen domains', icon: Layers3 },
  { title: 'Talk', copy: 'Get AI insight', icon: MessageSquare },
  { title: 'Deepen', copy: 'Live more aligned', icon: Sparkles },
]

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-[#ead7b9] bg-white/72 shadow-[0_16px_38px_rgba(48,27,5,0.045)] ${className}`}>
      {children}
    </section>
  )
}

function ButtonLink({ href, children, variant = 'gold' }: { href: string; children: React.ReactNode; variant?: 'gold' | 'navy' | 'outline' | 'purple' | 'teal' }) {
  const styles = {
    gold: 'border-[#c98622] bg-gradient-to-b from-[#f8c468] to-[#c97c1e] text-white shadow-[0_12px_22px_rgba(201,124,30,0.18)]',
    navy: 'border-[#06183a] bg-[#06183a] text-white',
    outline: 'border-[#d3b98f] bg-white/65 text-[#06183a]',
    purple: 'border-[#5a31b5] bg-[#5a31b5] text-white',
    teal: 'border-[#0f8a77] bg-[#0f8a77] text-white',
  }

  return (
    <Link href={href} className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 ${styles[variant]}`}>
      {children}
    </Link>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#fffaf2] px-4 py-4 text-[#06183a] lg:px-6">
      <header className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold leading-tight text-[#081b43] md:text-4xl">Welcome back, David.</h1>
          <p className="mt-1 text-sm font-medium text-[#344263] md:text-base">Your self-map is evolving. Every insight brings you closer to clarity and freedom.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-full border border-[#ead7b9] bg-white/70 p-2.5 text-[#06183a]" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#e54848]" />
          </button>
          <ButtonLink href="/dashboard/sessions/new" variant="outline"><PlusCircle className="h-4 w-4" />Quick Add<ChevronDown className="h-4 w-4" /></ButtonLink>
          <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#d8bd91] bg-gradient-to-br from-[#f2c78c] to-[#8a4b25] font-serif text-lg font-bold text-white sm:flex">D</div>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label} className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff5e5]" style={{ color: metric.color }}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#314164]">{metric.label}</p>
                  <p className="font-serif text-2xl leading-tight text-[#06183a]">{metric.value}</p>
                  <p className="text-xs font-semibold text-[#344263]">{metric.detail}</p>
                  <p className="text-xs text-[#314164]/75">{metric.note}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-3 grid gap-4 xl:grid-cols-[minmax(0,1fr)_370px]">
        <div className="space-y-4">
          <Card className="overflow-hidden p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_280px] md:items-center">
              <div>
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#173563]"><Sparkles className="h-4 w-4 text-[#d88920]" />Current Synthesis</p>
                <h2 className="mt-3 max-w-3xl font-serif text-[1.55rem] leading-snug text-[#06183a]">
                  Your Family System and Self-Worth domains are both pointing toward one pattern: earning safety through usefulness, explanation, and emotional vigilance.
                </h2>
                <p className="mt-3 text-sm text-[#344263]">Generated from your latest reflections, intakes, and active domains.</p>
              </div>
              <div className="flex items-center justify-between gap-4 md:block">
                <Image src="/assets/dashboard/synthesis-tree.png" alt="Current Synthesis tree emblem" width={325} height={324} className="h-32 w-auto object-contain md:mx-auto md:h-40" />
                <ButtonLink href="/synthesis/current" variant="outline">View Full Synthesis</ButtonLink>
              </div>
            </div>
          </Card>

          <section className="relative overflow-hidden rounded-2xl border border-[#0b2859] bg-[#06183a] p-5 text-white shadow-[0_18px_44px_rgba(6,24,58,0.2)] md:p-7">
            <Image src="/assets/dashboard/next-step-pathway-clean.png" alt="Golden pathway toward a synthesis tree" fill className="object-cover opacity-50" />
            <div className="relative grid gap-6 md:grid-cols-[180px_1fr] md:items-center">
              <div className="flex justify-center md:block">
                <div className="grid h-36 w-36 place-items-center rounded-full p-3" style={{ background: 'conic-gradient(#ffc96a 62%, rgba(255,255,255,0.16) 0)' }}>
                  <div className="grid h-full w-full place-items-center rounded-full bg-[#06183a]/92 text-center">
                    <span className="font-serif text-4xl">62%</span>
                    <span className="-mt-6 text-xs font-semibold">Family System<br />Progress</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-full text-sm font-black uppercase tracking-[0.08em] text-[#ffc64d]"><Sparkles className="h-5 w-5" />Recommended for you</p>
                <h2 className="font-serif text-4xl leading-tight">Your Next Best Step<br />Continue Family System</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/86">You&apos;ve completed 62% of this area. Completing 2 more modules will unlock your Family System Domain Report.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/voice-session"><Mic className="h-5 w-5" />Continue Mapping Session</ButtonLink>
                  <ButtonLink href="/talk-to-ai" variant="outline"><MessageSquare className="h-5 w-5" />Talk with Reality Scientist AI</ButtonLink>
                </div>
                <Link href="/dashboard/self-map" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ffd17a] underline decoration-[#ffd17a]/40 underline-offset-4">View Progress <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </section>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-5">
              <div className="grid gap-4 sm:grid-cols-[86px_1fr]">
                <Image src="/assets/dashboard/reality-scientist-ai-clean.png" alt="Reality Scientist AI symbol" width={226} height={167} className="h-20 w-20 rounded-full object-cover" />
                <div>
                  <h2 className="font-serif text-2xl">Talk with Reality Scientist AI</h2>
                  <p className="mt-2 text-sm leading-6 text-[#344263]">Use your current map to think through a decision, relationship, pattern, emotion, or next step.</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink href="/talk-to-ai?mode=voice" variant="purple"><Mic className="h-4 w-4" />Talk by Voice</ButtonLink>
                <ButtonLink href="/talk-to-ai?mode=chat" variant="outline"><MessageSquare className="h-4 w-4" />Chat Instead</ButtonLink>
              </div>
              <p className="mt-3 text-sm text-[#4c3a87]">Reality Scientist AI may remember useful context, but Mapping Sessions are the primary way to build structured map data.</p>
              <p className="mt-1 text-xs font-semibold text-[#344263]">AI Context: Medium</p>
            </Card>

            <Card className="p-5">
              <div className="grid gap-4 sm:grid-cols-[86px_1fr]">
                <Image src="/assets/dashboard/lens-scan-icon-clean.png" alt="Suggested Lens Scan target" width={226} height={167} className="h-20 w-20 object-contain" />
                <div>
                  <h2 className="font-serif text-2xl text-[#0f665a]">Suggested Lens Scan</h2>
                  <p className="mt-2 text-sm leading-6 text-[#344263]">Apply the Attachment Pattern lens to your Family System intake. Recommended because Family System and Self-Worth are both active this week.</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-[#bcd8d2] bg-[#f4fbf8] p-3 text-xs text-[#173563]">
                <p><strong>Source:</strong> Family System Intake</p>
                <p><strong>Lens:</strong> Attachment Pattern</p>
                <p><strong>May clarify:</strong> Mother Imprint · Self-Worth · Boundaries</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink href="/lens-scans/suggested" variant="teal">Run Suggested Lens</ButtonLink>
                <ButtonLink href="/map-sources/lens-scans" variant="outline">Choose Intake</ButtonLink>
              </div>
            </Card>
          </div>

          <Card className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-xl">Recent Activity</h2>
              <Link href="/dashboard/activity" className="inline-flex items-center gap-1 text-sm font-bold text-[#174fbe]">View All Activity <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-3 md:grid-cols-4">
              {activities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.title} className="flex gap-3 rounded-xl border border-[#ead7b9] bg-white/60 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: activity.color }}><Icon className="h-5 w-5" /></div>
                    <div>
                      <p className="text-[11px] font-black text-[#314164]">{activity.type}</p>
                      <p className="text-sm font-bold">{activity.title}</p>
                      <p className="text-xs text-[#344263]">{activity.meta}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <h2 className="font-serif text-xl">Your Meta-Aware Journey</h2>
              <div className="grid flex-1 gap-3 sm:grid-cols-4">
                {journey.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={step.title} className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f1edf9] text-[#5a31b5]"><Icon className="h-6 w-6" /></div>
                      <div>
                        <p className="font-bold">{step.title}</p>
                        <p className="text-xs text-[#344263]">{step.copy}</p>
                      </div>
                      {index < journey.length - 1 && <ArrowRight className="hidden h-4 w-4 text-[#344263] xl:block" />}
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-serif text-2xl">Your 24-Domain Map</h2>
              <Link href="/dashboard/self-map" className="inline-flex items-center gap-1 text-sm font-bold text-[#174fbe]">View Full Map <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <Image src="/assets/dashboard/domain-radial-map.png" alt="24-domain radial map showing 18 domains explored" width={336} height={335} className="mx-auto w-full max-w-[310px] object-contain" />
            <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs font-semibold text-[#344263]">
              <span className="flex items-center gap-1"><i className="h-3 w-3 rounded-full bg-[#0f8a77]" />Explored (18)</span>
              <span className="flex items-center gap-1"><i className="h-3 w-3 rounded-full bg-[#1976c9]" />In Progress (6)</span>
              <span className="flex items-center gap-1"><i className="h-3 w-3 rounded-full bg-[#c9c3ba]" />Not Started (0)</span>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-serif text-2xl">Your Whole-Person Atlas</h2>
            <div className="mt-4 grid grid-cols-[110px_1fr] gap-4">
              <Image src="/assets/whole-person-atlas-book-transparent.png" alt="The Whole-Person Atlas book" width={1122} height={1402} className="h-40 w-auto object-contain drop-shadow-xl" />
              <div className="space-y-2">
                {atlasStats.map((stat) => (
                  <p key={stat} className="flex items-center gap-2 border-b border-[#ead7b9] pb-2 text-sm font-semibold text-[#344263]"><CheckCircle2 className="h-4 w-4 text-[#234bb5]" />{stat}</p>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#344263]">Your comprehensive map is forming as patterns connect.</p>
            <ButtonLink href="/atlas" variant="gold">Open My Atlas <ArrowRight className="h-4 w-4" /></ButtonLink>
          </Card>

          <Card className="p-5">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5a31b5] text-white"><Sparkles className="h-7 w-7" /></div>
              <div>
                <p className="text-xs font-black uppercase text-[#314164]">Latest Reflection</p>
                <h2 className="font-serif text-2xl">Shame / Self-Worth</h2>
                <p className="mt-1 text-sm text-[#174fbe]">Unlocked today</p>
                <p className="mt-2 text-sm leading-6 text-[#344263]">You&apos;re learning to separate past beliefs from your present truth.</p>
                <Link href="/reflections/shame-self-worth" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#174fbe]">Read Reflection <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}
