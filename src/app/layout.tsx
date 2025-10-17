import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tribu Wellness - Fitness & Benessere per Ospiti Hotel',
  description: 'Connetti il mondo turistico con fitness e benessere locale. Allenamenti personalizzati e esperienze wellness per ospiti di hotel, B&B e resort.',
  keywords: 'fitness verona, wellness hotel, personal training turisti, allenamento vacanza',
  openGraph: {
    title: 'Tribu Wellness',
    description: 'Fitness e benessere per ospiti hotel',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}