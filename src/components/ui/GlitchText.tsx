'use client'

import { useEffect, useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%'

/**
 * GlitchText — on hover, characters scramble before resolving to the real text.
 * Inspired by the "hacker reveal" pattern.
 */
export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [displayed, setDisplayed] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const scramble = () => {
    if (isGlitching) return
    setIsGlitching(true)

    let iteration = 0
    const maxIterations = text.length * 3

    const interval = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            // Reveal from left as iteration progresses
            if (index < Math.floor(iteration / 3)) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      iteration++
      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayed(text)
        setIsGlitching(false)
      }
    }, 30)
  }

  return (
    <span
      className={`cursor-default select-none font-mono ${className}`}
      onMouseEnter={scramble}
      aria-label={text}
    >
      {displayed}
    </span>
  )
}
