import FirebaseComingSoon from '@/components/FirebaseComingSoon'

export default function ClientsPage() {
  return (
    <FirebaseComingSoon
      title="Map Sources are moving to Firebase"
      description="The old practitioner client list was built around Supabase tables. We have migrated the app shell to Firebase, and this area should become the new Map Sources hub for voice sessions, artifacts, lens scans, journals, and transcripts."
    />
  )
}
