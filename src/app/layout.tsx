import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meta-Aware | Speak Your Life Into a Map of Yourself',
  description: 'A private voice-reflection app that turns guided sessions into personal reflections, a Whole-Person Atlas, and useful AI context over time.',
  icons: {
    icon: '/assets/meta-aware-icon.png',
    apple: '/assets/meta-aware-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
