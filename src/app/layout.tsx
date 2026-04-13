import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const ibmSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-sans',
  display: 'swap',
})

const ibmMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'THEALXLABS — Changelog',
  description: 'Dev logs, build notes, and updates from what were building. Student developer in Toronto building AI tools and developer utilities.',
  metadataBase: new URL('https://blog.thealxlabs.ca'),
  authors: [{ name: 'Alexander Wondwossen', url: 'https://github.com/thegreatalxx' }],
  keywords: ['developer', 'blog', 'devlog', 'build notes', 'AI', 'TypeScript', 'Toronto'],
  openGraph: {
    title: 'THEALXLABS — Changelog',
    description: 'Dev logs, build notes, and updates from what were building.',
    url: 'https://blog.thealxlabs.ca',
    siteName: 'THEALXLABS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'THEALXLABS Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@thealxlabs',
    title: 'THEALXLABS — Changelog',
    description: 'Dev logs, build notes, and updates from what were building.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${ibmSans.variable} ${ibmMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="min-h-screen m-0 p-0">
        {children}
      </body>
    </html>
  )
}