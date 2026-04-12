import Link from 'next/link'

export default function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-[#222]"
      aria-label="Site navigation"
    >
      {/* Brand — acid yellow, links to main site */}
      <Link
        href="https://thealxlabs.ca"
        className="text-sm font-bold tracking-widest text-[#e8ff47] no-underline hover:text-[#e8ff47] opacity-100 hover:opacity-80 transition-opacity duration-0"
        target="_blank"
        rel="noopener noreferrer"
      >
        THEALXLABS
      </Link>

      {/* Navigation links — all caps, hover turns accent yellow */}
      <div className="flex items-center gap-8">
        {[
          { label: 'BLOG', href: '/blog' },
          { label: 'PROJECTS', href: 'https://thealxlabs.ca/projects' },
          { label: 'GITHUB', href: 'https://github.com/thealxlabs' },
        ].map(({ label, href }) => {
          const isExternal = href.startsWith('http')
          return (
            <Link
              key={label}
              href={href}
              className="text-xs tracking-widest text-[#f0f0f0] no-underline hover:text-[#e8ff47]"
              {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
