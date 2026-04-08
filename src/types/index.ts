export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  stripe_customer_id: string | null
  plan: 'free' | 'pro'
  certification_status: string | null
  created_at: string
}

export interface Client {
  id: string
  practitioner_id: string
  name: string
  initials: string
  color: string
  notes: string | null
  created_at: string
  session_count?: number
  last_session_date?: string | null
}

export interface Session {
  id: string
  practitioner_id: string
  client_id: string
  recording_url: string | null
  transcript: TranscriptSegment[] | null
  duration_seconds: number | null
  session_number: number
  created_at: string
  clients?: { name: string; initials: string; color: string }
}

export interface TranscriptSegment {
  speaker: string
  text: string
}

export interface Analysis {
  id: string
  session_id: string
  practitioner_id: string
  client_id: string
  lens_id: string
  result: string
  created_at: string
  clients?: { name: string; initials: string; color: string }
  sessions?: { session_number: number }
}

export interface Usage {
  id: string
  practitioner_id: string
  week_start: string
  count: number
}
