import { NextResponse } from 'next/server'

function readEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]
    if (value) return value
  }

  return ''
}

export async function GET() {
  const config = {
    apiKey: readEnv('NEXT_PUBLIC_FIREBASE_API_KEY', 'FIREBASE_API_KEY', 'FIREBASE_WEB_API_KEY'),
    authDomain: readEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_WEB_AUTH_DOMAIN'),
    projectId: readEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'FIREBASE_PROJECT_ID', 'FIREBASE_WEB_PROJECT_ID'),
    storageBucket: readEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'FIREBASE_STORAGE_BUCKET', 'FIREBASE_WEB_STORAGE_BUCKET'),
    messagingSenderId: readEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', 'FIREBASE_MESSAGING_SENDER_ID', 'FIREBASE_WEB_MESSAGING_SENDER_ID'),
    appId: readEnv('NEXT_PUBLIC_FIREBASE_APP_ID', 'FIREBASE_APP_ID', 'FIREBASE_WEB_APP_ID'),
  }

  const missing = Object.entries(config)
    .filter(([key, value]) => key !== 'storageBucket' && key !== 'messagingSenderId' && !value)
    .map(([key]) => key)

  if (missing.length) {
    return NextResponse.json({
      error: 'Firebase public config is missing.',
      missing,
      expectedEnv: {
        apiKey: ['NEXT_PUBLIC_FIREBASE_API_KEY', 'FIREBASE_API_KEY', 'FIREBASE_WEB_API_KEY'],
        authDomain: ['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_WEB_AUTH_DOMAIN'],
        projectId: ['NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'FIREBASE_PROJECT_ID', 'FIREBASE_WEB_PROJECT_ID'],
        appId: ['NEXT_PUBLIC_FIREBASE_APP_ID', 'FIREBASE_APP_ID', 'FIREBASE_WEB_APP_ID'],
      },
    }, { status: 500 })
  }

  return NextResponse.json(config)
}
