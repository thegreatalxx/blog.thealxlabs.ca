'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

interface ShimmerButtonProps {
  href: string
  children: ReactNode
  external?: boolean
}

/**
 * ShimmerButton — spinning conic gradient backdrop with a shimmer sweep.
 * Keeps the acid yellow identity while adding motion.
 */
export function ShimmerButton({ href, children, external = false }: ShimmerButtonProps) {
  const inner = (
    <span
      className="relative z-10 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#0a0a0a] font-bold px-5 py-2.5"
    >
      {children}
    </span>
  )

  const cls = `
    shimmer-btn
    relative inline-flex overflow-hidden
    bg-[#e8ff47]
    hover:bg-[#f0ff70]
    transition-colors duration-150
    text-[#0a0a0a]
    cursor-pointer
  `.trim()

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
        <ShimmerLayer />
      </a>
    )
  }

  return (
    <Link href={href} className={cls}>
      {inner}
      <ShimmerLayer />
    </Link>
  )
}

function ShimmerLayer() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer-sweep 2s linear infinite',
      }}
    />
  )
}
