import { FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const bundledFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
}

let firebaseAppPromise: Promise<FirebaseApp> | null = null

async function loadFirebaseConfig() {
  if (bundledFirebaseConfig.apiKey && bundledFirebaseConfig.projectId) {
    return bundledFirebaseConfig
  }

  const response = await fetch('/api/firebase-config')
  if (!response.ok) {
    throw new Error('Firebase client env vars are missing.')
  }

  return response.json()
}

export async function getFirebaseApp() {
  if (getApps()[0]) return getApps()[0]

  firebaseAppPromise ||= loadFirebaseConfig().then((config) => initializeApp(config))
  return firebaseAppPromise
}

export async function getFirebaseAuth() {
  return getAuth(await getFirebaseApp())
}

export async function getFirebaseDb() {
  return getFirestore(await getFirebaseApp())
}

export async function getFirebaseStorage() {
  return getStorage(await getFirebaseApp())
}
