import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getCurrentUser } from '@/lib/firebase/session'
import { getFirebaseAdminDb } from '@/lib/firebase/admin'

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
  })
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = getFirebaseAdminDb()
    const profileRef = db.collection('profiles').doc(user.id)
    const profileSnapshot = await profileRef.get()
    const profile = profileSnapshot.exists ? profileSnapshot.data() : {}

    let customerId = typeof profile?.stripeCustomerId === 'string' ? profile.stripeCustomerId : null

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { firebase_user_id: user.id },
      })
      customerId = customer.id

      await profileRef.set({ stripeCustomerId: customerId, updatedAt: new Date().toISOString() }, { merge: true })
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?upgraded=true`,
      cancel_url: `${origin}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
