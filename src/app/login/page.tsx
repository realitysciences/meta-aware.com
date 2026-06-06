'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase/client'

export default function LoginPage() {
  const router = useRouter()
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

  async function handleGoogleSignIn() {
    setLoading(true)
    setError('')

    try {
      const provider = new GoogleAuthProvider()
      const credential = await signInWithPopup(await getFirebaseAuth(), provider)
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
        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <p className="text-center text-sm leading-6 text-gray-500">
            Meta-Aware currently uses Google sign-in for private access.
          </p>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="text-lg font-bold text-[#4285f4]">G</span>
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>
        </div>
      </div>
    </div>
  )
}
