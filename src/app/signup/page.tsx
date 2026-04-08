import Link from 'next/link'
import Image from 'next/image'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        <Link href="/">
          <Image src="/logo.png" alt="meta-aware" width={120} height={120} className="h-20 w-auto mx-auto mb-8" />
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="w-12 h-12 bg-[#0a6b5e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#0a6b5e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Coming soon</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            meta-aware is currently in private access. New accounts are not available yet.
          </p>
          <Link
            href="/login"
            className="block w-full bg-[#0a6b5e] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0d7f6f] transition-colors"
          >
            Sign in
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} meta-aware. All rights reserved.
        </p>
      </div>
    </div>
  )
}
