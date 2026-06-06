import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getFirebaseAdminDb } from '@/lib/firebase/admin'

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
  })
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = getFirebaseAdminDb()

  try {
    if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const profiles = await db.collection('profiles')
        .where('stripeCustomerId', '==', customerId)
        .limit(1)
        .get()

      if (!profiles.empty) {
        const plan = subscription.status === 'active' ? 'pro' : 'free'
        await profiles.docs[0].ref.set({ plan, updatedAt: new Date().toISOString() }, { merge: true })
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const profiles = await db.collection('profiles')
        .where('stripeCustomerId', '==', customerId)
        .limit(1)
        .get()

      if (!profiles.empty) {
        await profiles.docs[0].ref.set({ plan: 'free', updatedAt: new Date().toISOString() }, { merge: true })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
