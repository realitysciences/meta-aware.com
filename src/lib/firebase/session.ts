import 'server-only'
import { cookies } from 'next/headers'
import { getFirebaseAdminAuth, getFirebaseAdminDb, hasFirebaseAdminConfig } from './admin'

export interface AppUser {
  id: string
  email: string
  fullName: string | null
  plan: string
  certificationStatus: string | null
}

export const FIREBASE_SESSION_COOKIE = '__session'

export async function getCurrentUser(): Promise<AppUser | null> {
  if (!hasFirebaseAdminConfig()) return null

  const cookieStore = await cookies()
  const session = cookieStore.get(FIREBASE_SESSION_COOKIE)?.value
  if (!session) return null

  try {
    const decoded = await getFirebaseAdminAuth().verifySessionCookie(session, true)
    const user = await getFirebaseAdminAuth().getUser(decoded.uid)
    const profileSnapshot = await getFirebaseAdminDb().collection('profiles').doc(decoded.uid).get()
    const profile = profileSnapshot.exists ? profileSnapshot.data() : {}

    return {
      id: decoded.uid,
      email: user.email || '',
      fullName: typeof profile?.fullName === 'string' ? profile.fullName : user.displayName || null,
      plan: typeof profile?.plan === 'string' ? profile.plan : 'free',
      certificationStatus: typeof profile?.certificationStatus === 'string' ? profile.certificationStatus : null,
    }
  } catch {
    return null
  }
}
