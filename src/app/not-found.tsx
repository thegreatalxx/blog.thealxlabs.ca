import Link from 'next/link'
import MobileNav from '@/components/MobileNav'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <MobileNav />
      
      <div className="flex flex-1">
        <aside className="sidebar w-64 hidden md:block">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-[#24292f]">
              <span className="w-5 h-5 bg-[#e8ff47] flex items-center justify-center text-[#24292f] font-bold text-sm">A</span>
              THEALXLABS
            </Link>
          </div>
        </aside>

        <main className="flex-1 max-w-3xl px-8 py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-[#24292f] mb-4">404</h1>
            <p className="text-[#656d76] mb-8">This page doesn't exist.</p>
            <Link 
              href="/" 
              className="inline-block text-sm font-medium text-[#ffffff] bg-[#0969da] px-4 py-2 hover:bg-[#0860ca]"
            >
              Back to Changelog
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}