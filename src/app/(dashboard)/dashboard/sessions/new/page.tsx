import FirebaseComingSoon from '@/components/FirebaseComingSoon'

export default function NewSessionPage() {
  return (
    <FirebaseComingSoon
      title="Voice sessions are being rebuilt"
      description="The previous recording workflow wrote to Supabase. Firebase Auth is now active, and this page is ready for a Firestore/Storage-based voice-session flow."
    />
  )
}
