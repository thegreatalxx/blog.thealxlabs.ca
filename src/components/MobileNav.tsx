'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile header */}
      <header className="md:hidden border-b border-[#d0d7de] px-4 py-3 flex items-center justify-between bg-white">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-[#24292f]">
          <span className="w-5 h-5 bg-[#e8ff47] flex items-center justify-center text-[#24292f] font-bold text-sm">A</span>
          THEALXLABS
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#656d76]">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile nav overlay */}
      {isOpen && (
        <nav className="md:hidden border-b border-[#d0d7de] bg-white px-4 py-4">
          <div className="flex flex-col gap-2">
            <Link 
              href="/" 
              className="px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]"
              onClick={() => setIsOpen(false)}
            >
              Changelog
            </Link>
            <Link 
              href="/blog" 
              className="px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]"
              onClick={() => setIsOpen(false)}
            >
              All Posts
            </Link>
            <Link 
              href="/about" 
              className="px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <a 
              href="/feed.xml" 
              className="px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]"
            >
              RSS Feed
            </a>
          </div>
        </nav>
      )}
    </>
  )
}