import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <Image src="/logo.png" alt="meta-aware" width={280} height={95} className="h-20 w-auto" />
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign In</Link>
            <Link href="/signup" className="text-sm bg-[#0a6b5e] text-white px-4 py-2 rounded-lg hover:bg-[#0d7f6f] transition-colors">Request Access</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-20 px-6 bg-gradient-to-br from-[#e8f7f3] via-white to-white">
        <div className="max-w-4xl mx-auto text-center pt-16">
          <div className="inline-block bg-[#e8f7f3] text-[#0a6b5e] text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            ReLoHu Methodology
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            See what&apos;s really<br />
            <span className="text-[#0a6b5e]">happening in the room.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            meta-aware helps coaches, somatic practitioners, and facilitators record sessions, map psychological terrain in real time, and generate deep multi-lens analyses — so the insight doesn&apos;t stay in the session.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto bg-[#0a6b5e] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#0d7f6f] transition-colors text-center">
              Request Access
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto border border-gray-300 text-gray-700 px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center">
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500">From session to insight in minutes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Record Your Session', desc: 'Capture audio directly in the browser with a built-in consent flow. Pause, resume, or upload an existing recording.' },
              { step: '02', title: 'Auto-Transcription', desc: 'AssemblyAI transcribes your session with speaker labels, separating Practitioner and Client turns automatically.' },
              { step: '03', title: 'Terrain Analysis', desc: 'Run the transcript through a curated set of psychological lenses, each surfacing a different dimension of the terrain. Powered by Claude AI.' },
            ].map(item => (
              <div key={item.step} className="relative p-6 border border-gray-100 rounded-xl hover:border-[#0a6b5e]/30 hover:shadow-sm transition-all">
                <div className="text-4xl font-bold text-[#e8f7f3] mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Who It&apos;s For</h2>
            <p className="text-gray-500">Built for practitioners who work below the surface</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Coaches', desc: 'Move beyond surface-level conversation. Map the underlying patterns, beliefs, and terrain driving your clients forward or holding them back.' },
              { icon: '🌿', title: 'Somatic Practitioners', desc: 'Integrate body-based observations with psychological frameworks for a complete picture of where your client is in the terrain.' },
              { icon: '🔄', title: 'Facilitators & Consultants', desc: 'Bring structural clarity to complex group dynamics, organizational patterns, and individual development work.' },
            ].map(item => (
              <div key={item.title} className="bg-white p-6 rounded-xl border border-gray-100">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            meta-aware is a practitioner productivity tool, not a clinical or diagnostic platform. It is not intended for use in licensed psychotherapy or medical practice.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What&apos;s Included</h2>
            <p className="text-gray-500">Everything you need in one platform</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Session Recording', desc: 'Browser-based audio capture with consent flow, pause/resume, crash-safe backup, and support for uploaded Zoom or voice recordings.' },
              { title: 'AI Transcription', desc: 'Automatic transcription with speaker diarization via AssemblyAI — know exactly who said what, with no manual effort.' },
              { title: 'ReLoHu Terrain Mapping', desc: 'A curated set of psychological lenses, each designed to surface a different layer of what\'s happening in the session. Every analysis is tailored to its framework.' },
              { title: 'Client Reports', desc: 'Generate PDF reports from analyses to track patterns over time, prepare for supervision, or deepen your own reflection.' },
            ].map(item => (
              <div key={item.title} className="p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Simple Pricing</h2>
            <p className="text-gray-500">Start free, upgrade when you need more</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="text-sm font-semibold text-gray-500 mb-2">FREE</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">$0</div>
              <div className="text-sm text-gray-400 mb-6">forever</div>
              <ul className="space-y-3 mb-8">
                {['10 analyses per week', 'All 8 lenses', 'Session recording', 'AI transcription', 'Client roster'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-[#1d9e75]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center border border-[#0a6b5e] text-[#0a6b5e] py-2.5 rounded-lg font-semibold hover:bg-[#e8f7f3] transition-colors">
                Request Access
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-[#0a6b5e] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a6b5e] text-white text-xs font-semibold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="text-sm font-semibold text-[#0a6b5e] mb-2">PRO</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">$39</div>
              <div className="text-sm text-gray-400 mb-6">per month</div>
              <ul className="space-y-3 mb-8">
                {['Unlimited analyses', 'All 8 lenses', 'Session recording', 'AI transcription', 'Client roster', 'PDF reports', 'Priority support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-[#1d9e75]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center bg-[#0a6b5e] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0d7f6f] transition-colors">
                Request Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <Image src="/logo.png" alt="meta-aware" width={240} height={81} className="h-20 w-auto mx-auto mb-3" />
          <p className="text-sm text-gray-400 mb-2">© {new Date().getFullYear()} meta-aware. All rights reserved.</p>
          <p className="text-xs text-gray-300 max-w-lg mx-auto">
            meta-aware is a practitioner productivity tool. It is not a licensed clinical service and does not provide medical, psychological, or therapeutic advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
