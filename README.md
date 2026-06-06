# Meta-Aware

Meta-Aware is a Next.js app using Firebase for authentication, server sessions, Firestore data, and future Storage-backed assets.

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Add Firebase browser config from Firebase project settings. Prefer the `NEXT_PUBLIC_FIREBASE_*` names in `.env.example`; the app also has a runtime `/api/firebase-config` fallback for equivalent non-public server env names.
3. Add Firebase Admin service-account values for server session verification.
4. Run the app:

```bash
npm run dev
```

## Firebase Notes

- Firebase Auth email/password login creates a secure `__session` cookie through `/api/auth/session`.
- Server routes read the current user through `src/lib/firebase/session.ts`.
- Firestore collections currently used: `profiles`, `analyses`, and `usage`.
- Legacy Supabase-specific client/session/report pages have been replaced with Firebase migration placeholders until those workflows are rebuilt on the new model.

## Verification

```bash
npm run lint
npm run build
```
