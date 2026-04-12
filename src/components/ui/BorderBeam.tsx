'use client'

import { useEffect, useRef } from 'react'

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  className?: string
}

/**
 * BorderBeam — animated glowing beam that orbits the border of its parent.
 * Parent must have `position: relative` and `overflow: hidden`.
 */
export function BorderBeam({
  size = 200,
  duration = 8,
  delay = 0,
  colorFrom = '#e8ff47',
  colorTo = 'transparent',
  className = '',
}: BorderBeamProps) {
  return (
    <span
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--delay': `-${delay}s`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--border-width': '1px',
        } as React.CSSProperties
      }
    >
      <span
        className="absolute inset-[var(--border-width)]"
        style={{
          background: 'transparent',
        }}
      />
      {/* The beam itself */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `conic-gradient(from calc(236.84deg + (360deg * var(--delay) / var(--duration))) at 50% 50%, var(--color-from), var(--color-to) 50%, transparent 60%)`,
          animation: `border-beam-spin var(--duration) linear infinite`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
    </span>
  )
}
