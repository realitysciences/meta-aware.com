import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f7f3] via-white to-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <Image src="/logo.png" alt="meta aware" width={280} height={95} className="h-24 w-auto mx-auto mb-10 mix-blend-multiply" />

        <div className="flex items-center justify-center gap-2 mb-6">
          <a href="https://www.relohu.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#e8f7f3] text-[#0a6b5e] text-xs font-semibold px-3 py-1 rounded-full tracking-wide uppercase hover:bg-[#d0f0e8] transition-colors">
            ReLoHu™ Methodology ↗
          </a>
          <span className="inline-block bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full tracking-wide uppercase">
            TranscEngine™ Technology
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Something meaningful<br />
          <span className="text-[#0a6b5e]">is coming.</span>
        </h1>

        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          meta aware™ is a platform for psychological terrain mapping, powered by ReLoHu™ methodology and TranscEngine™ analysis technology.
        </p>

        <Link
          href="/login"
          className="inline-block bg-[#0a6b5e] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#0d7f6f] transition-colors"
        >
          Sign In
        </Link>
      </div>

      <p className="mt-16 text-xs text-gray-300">
        © {new Date().getFullYear()} meta aware™. All rights reserved.<br />
        An entity of Spheronaut™
      </p>
    </div>
  )
}
