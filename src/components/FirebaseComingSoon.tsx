import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function FirebaseComingSoon({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="min-h-screen bg-[#fffaf2] p-6 text-[#06183a] md:p-8">
      <Link href="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#a45f0d]">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
      <section className="mx-auto mt-16 max-w-2xl rounded-2xl border border-[#ead7b9] bg-white/72 p-8 text-center shadow-[0_16px_38px_rgba(48,27,5,0.045)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2df] text-[#c97c1e]">
          <Sparkles className="h-7 w-7" />
        </div>
        <h1 className="font-serif text-3xl text-[#06183a] md:text-4xl">{title}</h1>
        <p className="mt-4 text-base leading-7 text-[#344263]">{description}</p>
        <p className="mt-5 text-sm font-semibold text-[#4c3a87]">
          Firebase migration is active. This workflow is ready to be rebuilt on the new Firestore model.
        </p>
      </section>
    </div>
  )
}
