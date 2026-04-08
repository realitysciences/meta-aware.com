'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface Props {
  data: { month: string; count: number }[]
}

export default function SessionActivityChart({ data }: Props) {
  if (!data.length) {
    return <div className="h-32 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
  }

  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{ border: 'none', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: 12 }}
          cursor={{ fill: '#f3f4f6' }}
        />
        <Bar dataKey="count" fill="#1d9e75" radius={[4, 4, 0, 0]} name="Sessions" />
      </BarChart>
    </ResponsiveContainer>
  )
}
