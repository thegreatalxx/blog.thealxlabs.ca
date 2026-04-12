'use client'

import { motion, Variants } from 'framer-motion'

interface TextAnimateProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

/**
 * TextAnimate — characters blur-fade-slide in one by one.
 * Keeps spaces as non-breaking so the layout holds during animation.
 */
export function TextAnimate({
  text,
  className = '',
  delay = 0,
  once = true,
}: TextAnimateProps) {
  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i + delay / 0.04}
          variants={charVariants}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
