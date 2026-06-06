import FirebaseComingSoon from '@/components/FirebaseComingSoon'

export default function SessionDetailPage() {
  return (
    <FirebaseComingSoon
      title="Voice session details are moving to Firebase"
      description="This old session detail view depended on Supabase sessions. The new version should read voice sessions and reflections from Firestore."
    />
  )
}
