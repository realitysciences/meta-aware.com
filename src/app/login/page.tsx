'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function finishFirebaseLogin(idToken: string) {
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })

    if (!response.ok) {
      throw new Error('Could not create your session.')
    }

    router.push('/dashboard')
    router.refresh()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
      await finishFirebaseLogin(await credential.user.getIdToken())
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign in failed.')
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true)
    setError('')

    try {
      const provider = new GoogleAuthProvider()
      const credential = await signInWithPopup(getFirebaseAuth(), provider)
      await finishFirebaseLogin(await credential.user.getIdToken())
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Google sign-in failed.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/"><Image src="/assets/meta-aware-logo.png" alt="Meta-Aware" width={2508} height={627} className="h-16 w-auto mx-auto" /></Link>
          <p className="text-gray-500 mt-2 text-sm">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a6b5e] focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a6b5e] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0a6b5e] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#0d7f6f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="flex items-center gap-3 py-2">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">or</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="text-lg font-bold text-[#4285f4]">G</span>
            Continue with Google
          </button>
          <p className="text-center text-sm text-gray-500 pt-2">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#0a6b5e] font-medium hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
