import 'server-only'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

function getPrivateKey() {
  return process.env.FIREBASE_PRIVATE_KEY
    ?.replace(/^"|"$/g, '')
    .replace(/\\n/g, '\n')
}

export function hasFirebaseAdminConfig() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      getPrivateKey()
  )
}

export function getMissingFirebaseAdminConfig() {
  const missing: string[] = []

  if (!process.env.FIREBASE_PROJECT_ID) missing.push('FIREBASE_PROJECT_ID')
  if (!process.env.FIREBASE_CLIENT_EMAIL) missing.push('FIREBASE_CLIENT_EMAIL')
  if (!getPrivateKey()) missing.push('FIREBASE_PRIVATE_KEY')

  return missing
}

export function getFirebaseAdminApp() {
  if (!hasFirebaseAdminConfig()) {
    throw new Error('Firebase admin env vars are missing.')
  }

  return getApps()[0] || initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: getPrivateKey(),
    }),
  })
}

export function getFirebaseAdminAuth() {
  return getAuth(getFirebaseAdminApp())
}

export function getFirebaseAdminDb() {
  return getFirestore(getFirebaseAdminApp())
}
