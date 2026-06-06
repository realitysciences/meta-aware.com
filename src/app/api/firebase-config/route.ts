import { NextResponse } from 'next/server'

function readEnv(publicName: string, privateName: string) {
  return process.env[publicName] || process.env[privateName] || ''
}

export async function GET() {
  const config = {
    apiKey: readEnv('NEXT_PUBLIC_FIREBASE_API_KEY', 'FIREBASE_API_KEY'),
    authDomain: readEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'FIREBASE_AUTH_DOMAIN'),
    projectId: readEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'FIREBASE_PROJECT_ID'),
    storageBucket: readEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: readEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', 'FIREBASE_MESSAGING_SENDER_ID'),
    appId: readEnv('NEXT_PUBLIC_FIREBASE_APP_ID', 'FIREBASE_APP_ID'),
  }

  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
    return NextResponse.json({ error: 'Firebase public config is missing.' }, { status: 500 })
  }

  return NextResponse.json(config)
}
