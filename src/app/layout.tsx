import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Load Space Mono with the CSS variable so Tailwind can reference it
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'THEALXLABS BLOG',
  description: 'Dev logs and notes from Alexander',
  metadataBase: new URL('https://blog.thealxlabs.ca'),
  openGraph: {
    title: 'THEALXLABS BLOG',
    description: 'Dev logs and notes from Alexander',
    url: 'https://blog.thealxlabs.ca',
    siteName: 'THEALXLABS BLOG',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f0f0f0]">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
