import { NextRequest, NextResponse } from 'next/server'
import { getFirebaseAdminAuth, getFirebaseAdminDb, getMissingFirebaseAdminConfig } from '@/lib/firebase/admin'
import { FIREBASE_SESSION_COOKIE } from '@/lib/firebase/session'

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 5

export async function GET() {
  const missing = getMissingFirebaseAdminConfig()

  return NextResponse.json({
    firebaseAdminConfigured: missing.length === 0,
    missing,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()
    if (!idToken) {
      return NextResponse.json({ error: 'Missing ID token' }, { status: 400 })
    }

    const auth = getFirebaseAdminAuth()
    const decoded = await auth.verifyIdToken(idToken)
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_MAX_AGE_SECONDS * 1000,
    })

    const user = await auth.getUser(decoded.uid)
    await getFirebaseAdminDb().collection('profiles').doc(decoded.uid).set({
      email: user.email || '',
      fullName: user.displayName || null,
      plan: 'free',
      updatedAt: new Date().toISOString(),
    }, { merge: true })

    const response = NextResponse.json({ ok: true })
    response.cookies.set(FIREBASE_SESSION_COOKIE, sessionCookie, {
      maxAge: SESSION_MAX_AGE_SECONDS,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Firebase session error:', error)
    const message = error instanceof Error ? error.message : 'Unknown Firebase session error'
    const missing = getMissingFirebaseAdminConfig()
    return NextResponse.json({
      error: 'Could not create session',
      code: missing.length ? 'firebase-admin-config-missing' : 'firebase-admin-session-failed',
      missing,
      message: missing.length ? 'Firebase Admin environment variables are missing.' : message,
    }, { status: 401 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(FIREBASE_SESSION_COOKIE, '', {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  return response
}
