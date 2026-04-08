'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LENSES } from '@/lib/lenses'
import type { LensId } from '@/lib/lenses'
import { FileText, Download } from 'lucide-react'

interface Client {
  id: string
  name: string
  initials: string
  color: string
}

interface Analysis {
  id: string
  lens_id: string
  result: string
  created_at: string
  sessions?: { session_number: number }
}

export default function ReportsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase.from('clients').select('id, name, initials, color')
        .eq('practitioner_id', user.id).order('name')
      setClients(data || [])
      setLoading(false)
    }
    load()
  }, [])

  async function generatePDF(client: Client) {
    setGenerating(client.id)

    const supabase = createClient()
    const { data: analyses } = await supabase
      .from('analyses')
      .select('*, sessions(session_number)')
      .eq('client_id', client.id)
      .order('created_at', { ascending: false })

    if (!analyses?.length) {
      alert('No analyses found for this client.')
      setGenerating(null)
      return
    }

    // Dynamically import jspdf to avoid SSR issues
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()

    let y = 20
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    const maxWidth = pageWidth - margin * 2

    // Header
    doc.setFontSize(20)
    doc.setTextColor(10, 107, 94) // #0a6b5e
    doc.text('meta aware', margin, y)

    y += 10
    doc.setFontSize(14)
    doc.setTextColor(40, 40, 40)
    doc.text(`Client Report: ${client.name}`, margin, y)

    y += 8
    doc.setFontSize(10)
    doc.setTextColor(120, 120, 120)
    doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, y)
    doc.text(`${analyses.length} analyses`, pageWidth - margin - 30, y)

    y += 10
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, y, pageWidth - margin, y)
    y += 10

    for (const analysis of analyses) {
      if (y > 250) {
        doc.addPage()
        y = 20
      }

      const lens = LENSES[analysis.lens_id as LensId]

      doc.setFontSize(11)
      doc.setTextColor(10, 107, 94)
      doc.text(`${lens?.name || analysis.lens_id} Analysis`, margin, y)

      if (analysis.sessions?.session_number) {
        doc.setFontSize(9)
        doc.setTextColor(150, 150, 150)
        doc.text(`Session #${analysis.sessions.session_number} · ${new Date(analysis.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, margin, y + 6)
        y += 14
      } else {
        y += 10
      }

      doc.setFontSize(9)
      doc.setTextColor(60, 60, 60)
      const lines = doc.splitTextToSize(analysis.result, maxWidth)

      for (const line of lines) {
        if (y > 270) {
          doc.addPage()
          y = 20
        }
        doc.text(line, margin, y)
        y += 5
      }

      y += 10
      doc.setDrawColor(230, 230, 230)
      doc.line(margin, y, pageWidth - margin, y)
      y += 10
    }

    doc.save(`${client.name.replace(/\s+/g, '_')}_report_${new Date().toISOString().split('T')[0]}.pdf`)
    setGenerating(null)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-400 text-sm mt-1">Generate PDF reports from client analyses</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : clients.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-gray-900 font-semibold mb-2">No clients yet</h3>
          <p className="text-gray-400 text-sm">Add clients and run analyses to generate reports</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {clients.map((client, i) => (
            <div
              key={client.id}
              className={`flex items-center justify-between px-6 py-4 ${i < clients.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: client.color }}
                >
                  {client.initials}
                </div>
                <div className="text-sm font-medium text-gray-900">{client.name}</div>
              </div>
              <button
                onClick={() => generatePDF(client)}
                disabled={generating === client.id}
                className="flex items-center gap-2 text-sm text-[#0a6b5e] border border-[#0a6b5e]/30 px-4 py-2 rounded-lg hover:bg-[#0a6b5e]/5 transition-colors disabled:opacity-50 font-medium"
              >
                {generating === client.id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0a6b5e]/30 border-t-[#0a6b5e] rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
