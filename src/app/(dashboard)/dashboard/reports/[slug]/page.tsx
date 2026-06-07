import Link from 'next/link'
import { ArrowLeft, Clock, FileText, Sparkles } from 'lucide-react'

const reportMeta: Record<string, { title: string; type: string; date: string }> = {
  'identity-domain-insight':           { title: 'Identity Domain Insight',           type: 'Domain Insight Report',         date: 'Generated May 14, 2025' },
  'people-pleasing-pattern-report':    { title: 'People Pleasing Pattern Report',    type: 'Pattern Report',                date: 'Generated May 8, 2025' },
  'whole-person-atlas-progress':       { title: 'Whole-Person Atlas Progress',       type: 'Atlas Progress Report',         date: 'Generated May 6, 2025' },
  'quarterly-growth-report':           { title: 'Quarterly Growth Report',           type: 'Quarterly Growth Report',       date: 'Q1 2025 · Jan – Mar' },
}

export default function ReportPlaceholderPage({ params }: { params: { slug: string } }) {
  const meta = reportMeta[params.slug] ?? {
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    type: 'Report',
    date: 'Generated recently',
  }

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6">

        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#6b7280]">
          <Link href="/dashboard/reports" className="hover:text-[#c97c1e] transition-colors">Reports &amp; Insights</Link>
          <span className="text-[#d3b98f]">›</span>
          <span className="text-[#06183a]">{meta.title}</span>
        </div>

        <div className="mb-5 flex items-center gap-4">
          <Link href="/dashboard/reports"
            className="flex items-center gap-1.5 rounded-[10px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
            ← Back to Reports
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] px-8 py-20 text-center shadow-[0_4px_16px_rgba(108,55,198,0.08)]">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ede8fb]">
            <FileText className="h-7 w-7 text-[#6c37c6]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#06183a]">{meta.title}</h1>
          <p className="mt-2 text-sm font-semibold text-[#6b7280]">{meta.type} · {meta.date}</p>

          <div className="mt-8 max-w-md rounded-[12px] border border-[#e0d4f8] bg-white px-6 py-5">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-[#6c37c6]" />
              <p className="text-sm font-black text-[#06183a]">Full report view coming soon</p>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#6b7280]">
              This report exists in your system. The detailed view for this report type is being built.
              Your reviewed material is safe and nothing has changed in your Atlas.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-semibold text-[#a0a8b8]">
              <Clock className="h-3.5 w-3.5" />
              Your data is preserved. No action needed.
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/dashboard/reports"
              className="rounded-[8px] border border-[#e0d4f8] bg-white px-5 py-2.5 text-sm font-black text-[#6c37c6] hover:bg-[#f5f0ff] transition-colors">
              Back to Reports
            </Link>
            <Link href="/reflections"
              className="rounded-[8px] bg-[#6c37c6] px-5 py-2.5 text-sm font-black text-white hover:bg-[#5a2aae] transition-colors">
              Go to Reflections
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
