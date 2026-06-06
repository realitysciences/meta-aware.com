import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  CircleUserRound,
  FileText,
  Lock,
  MessageSquare,
  Mic,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import LandingAuthActions from '@/components/LandingAuthActions'

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'The 24-Domain Map', href: '#the-24-domain-map' },
  { label: 'Why Different', href: '#why-different' },
  { label: 'Reports', href: '#reports' },
  { label: 'For Professionals', href: '#for-professionals' },
  { label: 'About', href: '#about' },
]

const trustItems = [
  { icon: ShieldCheck, title: '100% Private', copy: 'Your data is encrypted and never shared.' },
  { icon: Brain, title: 'AI With Boundaries', copy: 'Designed for reflection and pattern clarity, not diagnosis.' },
  { icon: Sparkles, title: 'Built on ReLoHu', copy: 'A method for mapping how experience routes through a whole person.' },
  { icon: Lock, title: 'You are in Control', copy: 'You decide what to share, what to explore, and when to go deeper.' },
  { icon: CircleUserRound, title: 'Yours Alone', copy: 'Your story. Your pace. Your transformation.' },
]

const processSteps = [
  { icon: Mic, title: 'Speak', copy: 'Share your story through guided voice sessions.' },
  { icon: BookOpen, title: 'Reflect', copy: 'Every completed unit returns a personal reflection.' },
  { icon: Sparkles, title: 'Build', copy: 'Your map grows across 24 domains.' },
  { icon: MessageSquare, title: 'Talk', copy: 'Speak or chat with Reality Scientist AI anytime.' },
  { icon: BarChart3, title: 'Deepen', copy: 'Artifacts, future sessions, and life events increase resolution over time.' },
]

const atlasDomains = [
  'Life timeline and turning points',
  'Family systems and imprints',
  'Attachment and relationship patterns',
  'Self-worth and inner courtroom',
  'Work, money and calling',
  'Core nature, strengths and gifts',
  'Wounds, vacancies and protective strategies',
  'Current synthesis and next truths',
]

const inputItems = [
  { icon: Mic, title: 'Voice Sessions', copy: 'Capture your story in your own words.' },
  { icon: FileText, title: 'Artifacts', copy: 'Photos, documents, notes and messages add historical evidence.' },
  { icon: Sparkles, title: 'Reflections', copy: 'Every unit returns insight that builds self-awareness.' },
  { icon: BarChart3, title: 'Reports', copy: 'Domain reports reveal patterns and themes across your life.' },
  { icon: X, title: 'Synthesis Threads', copy: 'Meta-Aware tracks where the same pattern reappears under different names.' },
]

const differenceItems = [
  {
    icon: Brain,
    title: 'Not just an AI summary',
    copy: 'Most tools restate what you said. Meta-Aware looks for the routes underneath: where experience enters, what it activates, and how it moves across your life.',
  },
  {
    icon: Sparkles,
    title: 'Not a personality test',
    copy: 'You are not reduced to a type. Your Atlas shows living patterns across family, love, identity, body, work, meaning, and more.',
  },
  {
    icon: MessageSquare,
    title: 'Not advice without context',
    copy: 'Advice assumes insight can travel cleanly into action. Meta-Aware helps reveal where truth gets rerouted through fear, loyalty, shame, or protection.',
  },
]

const professionalCards = [
  { icon: Users, title: 'Bring your Atlas into the room.', copy: 'Meta-Aware does not replace therapy. It gives you structured self-reflection you can bring into deeper conversations.' },
  { icon: Users, title: 'For Professionals', copy: 'Some therapists, coaches and guides may choose to work with Meta-Aware reports as client-provided reflection material.' },
  { icon: Sparkles, title: 'Professional Circle', copy: 'A directory of professionals familiar with Meta-Aware reports and how to use them reflectively.' },
]

function Waveform({ color = '#3047ff' }: { color?: string }) {
  return (
    <div className="flex h-9 items-center justify-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: 23 }).map((_, index) => (
        <span
          key={index}
          className="w-[2px] rounded-full"
          style={{
            height: `${8 + Math.abs(Math.sin(index * 0.72)) * 25}px`,
            backgroundColor: color,
            opacity: index % 3 === 0 ? 0.45 : 0.9,
          }}
        />
      ))}
    </div>
  )
}

function CardShell({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`rounded-[18px] border border-[#eadfce] bg-white/62 shadow-[0_10px_34px_rgba(42,25,7,0.045)] ${className}`}>
      {children}
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] px-3 py-2 text-[#06183a] sm:px-7">
      <div className="mx-auto max-w-[1500px]">
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#eadfce]/80 bg-[#fffaf2]/95 px-3 py-2 shadow-[0_10px_30px_rgba(42,25,7,0.04)] backdrop-blur sm:px-7">
          <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between gap-3 sm:h-[60px] sm:gap-5">
          <Link href="/" aria-label="Meta-Aware home" className="shrink-0">
            <Image
              src="/assets/meta-aware-logo.png"
              alt="Meta-Aware"
              width={2508}
              height={627}
              priority
              className="h-9 w-auto object-contain sm:h-11"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-5 text-[13px] font-bold lg:flex xl:gap-8">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="whitespace-nowrap transition hover:text-[#a45f0d]">
                {item.label}
              </Link>
            ))}
          </nav>

          <LandingAuthActions />
          </div>
        </header>

        <section className="grid gap-4 pt-[74px] sm:gap-7 sm:pt-[82px] md:grid-cols-[0.35fr_0.65fr] md:items-stretch">
          <div className="flex flex-col justify-start pb-3 pt-0 sm:min-h-[470px] md:pl-4">
            <p className="mb-3 max-w-[430px] text-sm font-black uppercase tracking-[0.18em] text-[#a45f0d]">
              Private voice reflection. Whole-person mapping.
            </p>
            <h1 className="font-serif text-[clamp(2.65rem,10vw,3.55rem)] leading-[0.94] text-[#06183a] md:text-[clamp(3.45rem,3.25vw,4.15rem)] xl:text-[4.35rem]">
              Speak your life
              <br />
              into a map of how
              <br />
              <span className="italic text-[#a45f0d]">you work.</span>
              <span className="ml-5 align-middle text-[0.45em] not-italic text-[#b87518]">✦</span>
            </h1>
            <p className="mt-5 max-w-[440px] text-base font-semibold leading-7 sm:mt-6 sm:text-[18px]">
              Meta-Aware turns guided voice sessions into a living map of how experience moves through you: your patterns, relationships, reactions, choices, and next truths.
            </p>
            <div className="mt-4 space-y-2 text-sm font-semibold leading-6 sm:text-[16px]">
              <p className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 rounded-full border border-[#a45f0d] p-[2px] text-[#a45f0d]" />Speak privately and receive a structured reflection.</p>
              <p className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 rounded-full border border-[#a45f0d] p-[2px] text-[#a45f0d]" />See where the same pattern reappears across your life.</p>
              <p className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 rounded-full border border-[#a45f0d] p-[2px] text-[#a45f0d]" />Watch your Atlas and AI context get clearer over time.</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
              <Link href="/signup" className="inline-flex min-w-0 items-center gap-2 rounded-[9px] bg-[#06183a] px-3 py-3 text-xs font-bold text-white sm:min-w-[162px] sm:gap-3 sm:px-4 sm:py-4 sm:text-sm">
                <Mic className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                <span>
                  Start Voice Session
                  <span className="block text-[10px] font-semibold text-white/75">One session. One reflection.</span>
                </span>
              </Link>
              <a href="#sample-atlas" className="inline-flex min-w-0 items-center gap-2 rounded-[9px] border border-[#d7c6ae] bg-white/80 px-3 py-3 text-xs font-bold sm:min-w-[162px] sm:gap-3 sm:px-4 sm:py-4 sm:text-sm">
                <FileText className="h-5 w-5 shrink-0" />
                <span>
                  See Sample Atlas
                  <span className="block text-[10px] font-semibold text-[#44506b]">See what you receive</span>
                </span>
              </a>
            </div>
            <p className="mt-5 flex items-start gap-3 text-xs font-bold text-[#a45f0d] sm:mt-7 sm:text-sm">
              <Lock className="mt-0.5 h-4 w-4" />
              <span>
                Private. Secure. Yours alone.
                <span className="block text-xs font-semibold text-[#06183a]">End-to-end encrypted. Your data is never shared.</span>
              </span>
            </p>
          </div>

          <section className="overflow-hidden rounded-[18px] border border-[#0b2351] bg-[#06183a] p-5 text-white shadow-[0_10px_34px_rgba(42,25,7,0.045)] sm:p-6 md:p-7">
            <div className="mb-5 text-center font-serif text-2xl leading-tight sm:text-3xl md:mb-6">
              Every time you speak, <span className="text-[#eaa52e]">two things</span> get better.
            </div>
            <div className="grid items-start gap-4 md:grid-cols-[1fr_44px_1fr_44px_1fr]">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#526bff] bg-[#111c55] text-white shadow-[0_0_38px_rgba(82,107,255,0.6)] sm:h-[132px] sm:w-[132px] xl:h-[150px] xl:w-[150px]">
                  <Mic className="h-10 w-10 sm:h-14 sm:w-14" />
                </div>
                <h2 className="mt-4 text-base font-black text-[#f1bc39]">1. You Speak</h2>
                <p className="mx-auto mt-2 max-w-[210px] text-sm leading-6 text-white/92">Share your story through guided voice sessions.</p>
              </div>

              <div className="hidden h-[132px] items-center justify-center text-white/80 md:flex xl:h-[150px]">
                <span className="w-full border-t border-dashed border-white/80" />
                <ArrowRight className="-ml-1 h-5 w-5 shrink-0" />
              </div>

              <div className="text-center">
                <Image
                  src="/assets/whole-person-atlas-book-transparent.png"
                  alt="The Whole-Person Atlas book"
                  width={1122}
                  height={1402}
                  priority
                  className="mx-auto h-36 w-auto object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.38)] sm:h-[172px] xl:h-[188px]"
                />
                <h2 className="mt-2 text-base font-black text-[#f1bc39]">2. Your Atlas Gets Clearer</h2>
                <p className="mx-auto mt-2 max-w-[250px] text-sm leading-6 text-white/92">Your map shows how experience routes through 24 domains with every insight, reflection, and artifact.</p>
              </div>

              <div className="hidden h-[132px] items-center justify-center text-white/80 md:flex xl:h-[150px]">
                <span className="w-full border-t border-dashed border-white/80" />
                <ArrowRight className="-ml-1 h-5 w-5 shrink-0" />
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#a969ff] bg-[#1d1249] text-white shadow-[0_0_40px_rgba(169,105,255,0.58)] sm:h-[132px] sm:w-[132px] xl:h-[150px] xl:w-[150px]">
                  <MessageSquare className="h-10 w-10 sm:h-14 sm:w-14" />
                </div>
                <h2 className="mt-4 text-base font-black text-[#f1bc39]">3. Reality Scientist AI Understands You Better</h2>
                <p className="mx-auto mt-2 max-w-[230px] text-sm leading-6 text-white/92">It starts with what it knows. Every session helps it reflect from your actual patterns, not generic advice.</p>
              </div>
            </div>
            <div className="mt-5 rounded-[22px] border border-white/25 px-4 py-3 text-center text-base leading-7 sm:px-5 sm:text-lg">
              The more you share, the <span className="font-bold text-[#f1bc39]">clearer your Atlas becomes.</span>
              <br />
              The clearer your Atlas becomes, the <span className="font-bold text-[#f1bc39]">more precisely Reality Scientist AI can reflect with you.</span>
            </div>
          </section>
        </section>

        <CardShell className="mt-4 grid gap-0 overflow-hidden p-3 sm:mt-6 sm:p-4 md:grid-cols-5">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-3 border-b border-[#eadfce] p-3 last:border-b-0 sm:gap-4 sm:p-4 md:border-b-0 md:border-r md:last:border-r-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#eadfce] bg-[#fffaf2] sm:h-14 sm:w-14">
                <item.icon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <div>
                <h2 className="text-sm font-black">{item.title}</h2>
                <p className="mt-1 text-xs font-semibold leading-5 text-[#44506b]">{item.copy}</p>
              </div>
            </div>
          ))}
        </CardShell>

        <section id="why-different" className="mt-4 grid gap-4 md:grid-cols-[0.36fr_0.64fr]">
          <CardShell className="bg-[#06183a] p-5 text-white sm:p-7">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f0a638]">Why Meta-Aware is different</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">It does not just summarize your story. It maps how experience moves through you.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-white/82">
              Visible symptoms are not the whole map. Anxiety, overexplaining, avoidance, anger, people-pleasing, and stuckness are often the surface of a deeper routing pattern.
            </p>
            <p className="mt-4 rounded-[14px] border border-white/20 bg-white/8 p-4 text-lg font-black leading-7 text-[#f1bc39]">
              This is not who you are. This is how your system learned to route experience.
            </p>
          </CardShell>

          <div className="grid gap-4 lg:grid-cols-3">
            {differenceItems.map((item) => (
              <CardShell key={item.title} className="p-5 sm:p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2df] text-[#a45f0d]">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#44506b]">{item.copy}</p>
              </CardShell>
            ))}
          </div>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-[0.62fr_0.38fr]">
          <CardShell id="how-it-works" className="p-4 sm:p-6">
            <h2 className="text-center text-lg font-black uppercase">How It Works</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:mt-6 md:grid-cols-5">
              {processSteps.map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f2eaf4] text-[#2530a3] sm:h-16 sm:w-16">
                    <step.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <h3 className="mt-4 text-left text-sm font-black text-[#183180] sm:mt-5 sm:text-base">{index + 1}. {step.title}</h3>
                  <p className="mt-2 text-left text-xs font-semibold leading-5 text-[#06183a]">{step.copy}</p>
                </div>
              ))}
            </div>
          </CardShell>

          <CardShell id="the-24-domain-map" className="grid items-center gap-3 p-4 sm:grid-cols-[0.9fr_1.1fr] sm:p-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl">The 24-Domain Map</h2>
              <p className="mt-3 text-[15px] font-bold leading-6">A complete picture of you.</p>
              <p className="mt-4 text-[15px] font-semibold leading-7 text-[#44506b]">
                Family, attachment, identity, body, work, meaning, adaptation, and more. The map helps reveal where the same pattern keeps appearing under different names.
              </p>
              <a href="#the-24-domain-map" className="mt-5 inline-flex items-center gap-2 rounded-[8px] border border-[#d7c6ae] bg-white px-4 py-3 text-sm font-bold">
                Explore the 24-Domain Map <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <Image
              src="/assets/domain-radial-map.png"
              alt="24-domain radial map"
              width={1254}
              height={1254}
              className="mx-auto h-auto w-full max-w-[240px] object-contain sm:max-w-[300px]"
            />
          </CardShell>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-[0.48fr_0.52fr]">
          <CardShell className="p-4 sm:p-6">
            <h2 className="text-center font-serif text-2xl sm:text-3xl">Talk to Reality Scientist AI from day one.</h2>
            <p className="mt-2 text-center text-[15px] font-semibold">It is available now, and it gets sharper as your map reveals how experience routes through you.</p>
            <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-3 sm:gap-5">
              {[
                ['Low Resolution', 'After your first session, it can reflect from the first signals you share.', '#3447ff'],
                ['Medium Resolution', 'After more sessions, it begins seeing how patterns route across domains.', '#0e8a69'],
                ['High Resolution', 'After deeper mapping, it can reflect from your Atlas, artifacts, reports, and synthesis threads.', '#4b3dce'],
              ].map(([title, copy, color]) => (
                <div key={title} className="rounded-[12px] border border-[#eadfce] bg-white/70 p-4">
                  <h3 className="text-sm font-black">{title}</h3>
                  <p className="mt-2 min-h-[64px] text-xs font-semibold leading-5">{copy}</p>
                  <Waveform color={color} />
                  <div className="relative mx-auto mt-2 aspect-square max-w-[135px] overflow-hidden rounded-full opacity-70">
                    <Image src="/assets/domain-radial-map.png" alt="" fill sizes="135px" className="object-cover opacity-35" />
                    <CircleUserRound className="absolute bottom-2 left-1/2 h-12 w-12 -translate-x-1/2" style={{ color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4 rounded-[12px] bg-[#f2edf5] p-4 text-sm font-bold">
              <MessageSquare className="h-8 w-8 shrink-0 text-[#2430a3]" />
              Ask about decisions, relationships, patterns, emotions, or next steps.
              <span className="font-black">Your context grows. Your AI gets less generic.</span>
            </div>
          </CardShell>

          <CardShell id="reports" className="grid gap-4 p-4 sm:p-6 md:grid-cols-[0.48fr_0.52fr]">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/whole-person-atlas-book-transparent.png"
                alt="The Whole-Person Atlas book"
                width={1122}
                height={1402}
                className="h-auto max-h-[240px] w-auto object-contain drop-shadow-[0_18px_38px_rgba(42,25,7,0.22)] sm:max-h-[330px]"
              />
            </div>
            <div>
              <h2 className="text-center font-serif text-2xl text-[#7a3e08] sm:text-3xl">The Whole-Person Atlas</h2>
              <p className="mt-1 text-center text-sm font-black">The crown artifact of Meta-Aware.</p>
              <p className="mt-1 text-center text-sm font-semibold">The most complete map of yourself you may ever have.</p>
              <div className="mt-5 border-l border-[#c3781c] pl-4 sm:mt-6 sm:pl-7">
                <p className="text-sm font-semibold leading-6">
                  Built from your voice sessions, artifacts, reflections, domain reports, and synthesis threads, the Whole-Person Atlas shows more than what happened to you. It shows how your system learned to route love, fear, conflict, ambition, grief, safety, and belonging.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm font-bold">
                  {atlasDomains.map((domain) => (
                    <li key={domain} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-[#d88920] p-[2px] text-white" />
                      {domain}
                    </li>
                  ))}
                </ul>
                <a href="#sample-atlas" className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-[8px] bg-[#dda044] px-5 py-3 text-sm font-black text-[#06183a]">
                  Preview a Sample Atlas <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </CardShell>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-[0.41fr_0.36fr_0.23fr]">
          <CardShell className="p-4 sm:p-6">
            <h2 className="font-serif text-xl sm:text-2xl">Every input strengthens your map and your AI.</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#44506b]">Each input gives Meta-Aware more signal for detecting cross-domain patterns and routing loops.</p>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-3">
              {inputItems.map((item) => (
                <div key={item.title} className="text-xs font-semibold leading-5">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f2eaf4]">
                    <item.icon className="h-7 w-7 text-[#2530a3]" />
                  </div>
                  <h3 className="font-black">{item.title}</h3>
                  <p className="mt-1 text-[#44506b]">{item.copy}</p>
                </div>
              ))}
            </div>
          </CardShell>

          <CardShell className="p-4 sm:p-6">
            <h2 className="font-serif text-xl sm:text-2xl">Resolution increases over time.</h2>
            <p className="mt-2 text-sm font-semibold leading-6">The more you share, the clearer your Atlas becomes: hubs, loops, dead zones, overused pathways, and integration points start to emerge.</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-bold sm:mt-8 sm:grid-cols-4 sm:gap-3">
              {['Basic', 'Clear', 'Deep', 'High-Fidelity'].map((stage, index) => (
                <div key={stage}>
                  <div className="mb-3 h-2 rounded-full bg-[#e7d9c2]">
                    <div className="h-2 rounded-full bg-[#1b8672]" style={{ width: `${35 + index * 20}%` }} />
                  </div>
                  <h3>{stage}</h3>
                  <p className="mt-1 font-semibold text-[#44506b]">{['Getting started.', 'Patterns are emerging.', 'Domains are connecting.', 'Maximum clarity from voice, artifacts, reports, and synthesis.'][index]}</p>
                </div>
              ))}
            </div>
          </CardShell>

          <CardShell className="p-4 sm:p-6">
            <h2 className="font-serif text-xl sm:text-2xl">Your data, always yours.</h2>
            <ul className="mt-7 space-y-4 text-sm font-bold">
              {['End-to-end encryption', 'You own your data', 'Export or delete anytime', 'We never sell your data'].map((item) => (
                <li key={item} className="flex items-center gap-3"><Check className="h-4 w-4 rounded-full border border-[#2530a3] p-[2px] text-[#2530a3]" />{item}</li>
              ))}
            </ul>
            <ShieldCheck className="ml-auto mt-4 h-20 w-20 text-[#2530a3]" />
          </CardShell>
        </section>

        <CardShell id="for-professionals" className="mt-4 p-4 sm:p-5">
          <h2 className="text-center font-serif text-xl sm:text-2xl">Use it alone, or bring it into deeper conversations.</h2>
          <p className="text-center text-sm font-semibold">Your Atlas is yours. Share selected sections with a therapist, coach, mentor, or guide only if you choose.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {professionalCards.map((card) => (
              <div key={card.title} className="grid grid-cols-[44px_1fr] gap-3 rounded-[12px] bg-white/45 p-4 sm:grid-cols-[72px_1fr] sm:gap-4">
                <card.icon className="h-10 w-10" />
                <div>
                  <h3 className="text-sm font-black">{card.title}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-[#44506b]">{card.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </CardShell>

        <section id="pricing" className="mt-4 overflow-hidden rounded-[14px] bg-[#06183a] text-white">
          <div className="grid items-center gap-4 p-4 sm:gap-5 sm:p-5 md:grid-cols-[0.2fr_1fr_auto_auto]">
            <div className="relative hidden h-20 overflow-hidden rounded-[10px] md:block">
              <Image src="/assets/voice-waveform-hero.png" alt="" fill sizes="220px" className="object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl">Start with one voice session.</h2>
              <p className="mt-1 text-base text-[#f0a638] sm:text-lg">Leave with one reflection. Begin your Atlas.</p>
              <p className="text-sm font-semibold">Start talking to Reality Scientist AI today.</p>
            </div>
            <Link href="/signup" className="inline-flex items-center justify-center gap-3 rounded-[9px] bg-[#4b35e8] px-5 py-3 text-sm font-black sm:px-8 sm:py-4">
              <Mic className="h-6 w-6" />
              Start Voice Session
            </Link>
            <a href="#sample-atlas" className="inline-flex items-center justify-center gap-3 rounded-[9px] border border-white/40 px-5 py-3 text-sm font-black sm:px-8 sm:py-4">
              See Sample Atlas
            </a>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-3 py-4 text-center text-[11px] font-semibold text-[#44506b] md:flex-row md:py-3 md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <Image src="/assets/meta-aware-icon.png" alt="Meta-Aware icon" width={1254} height={1254} className="h-5 w-5 object-contain" />
            <span>META-AWARE</span>
            <span>Speak. Reflect. Understand. Transform.</span>
          </div>
          <div className="hidden gap-7 md:flex">
            {navItems.slice(0, 5).map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
          </div>
          <p>© {new Date().getFullYear()} Meta-Aware. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
