import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meta-Aware | Speak Your Life Into a Whole-Person Map',
  description: 'A private voice-reflection app that maps how experience moves through you across 24 life domains, building a Whole-Person Atlas and more precise AI context over time.',
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
