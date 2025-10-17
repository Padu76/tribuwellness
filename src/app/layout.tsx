import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://tribuwellness.vercel.app'),
  title: {
    default: 'Tribu Wellness - Fitness & Benessere per Ospiti Hotel',
    template: '%s | Tribu Wellness',
  },
  description: 'Connetti il mondo turistico con fitness e benessere locale. Allenamenti personalizzati e esperienze wellness per ospiti di hotel, B&B e resort a Verona.',
  keywords: [
    'fitness verona',
    'wellness hotel',
    'personal training turisti',
    'allenamento vacanza',
    'tribu studio',
    'gym verona',
    'hotel wellness verona',
    'esperienze benessere',
  ],
  authors: [{ name: 'Tribu Studio' }],
  creator: 'Tribu Studio',
  publisher: 'Tribu Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://tribuwellness.vercel.app',
    siteName: 'Tribu Wellness',
    title: 'Tribu Wellness - Fitness & Benessere per Ospiti Hotel',
    description: 'Allenamenti personalizzati e esperienze wellness per turisti a Verona',
    images: [
      {
        url: '/images/studio/interior.jpg',
        width: 1200,
        height: 630,
        alt: 'Tribu Studio Verona',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tribu Wellness - Fitness & Benessere per Ospiti Hotel',
    description: 'Allenamenti personalizzati e esperienze wellness per turisti a Verona',
    images: ['/images/studio/interior.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logos/logo.png',
    shortcut: '/images/logos/logo.png',
    apple: '/images/logos/logo.png',
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