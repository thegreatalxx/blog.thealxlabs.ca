import Link from 'next/link'

export default function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-[#161616]"
      aria-label="Site navigation"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {/* Brand */}
      <Link
        href="/"
        className="flex items-center gap-3 no-underline group"
      >
        {/* Accent bar */}
        <span
          className="inline-block w-1 h-5 group-hover:h-4 transition-all duration-150"
          style={{ background: '#e8ff47' }}
        />
        <span className="text-sm font-bold tracking-widest text-[#f0f0f0] group-hover:text-[#e8ff47] transition-colors duration-150">
          THEALXLABS
        </span>
        <span className="text-xs text-[#333] tracking-wider hidden sm:inline">/ BLOG</span>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-6">
        {[
          { label: 'BLOG', href: '/blog' },
          { label: 'GITHUB', href: 'https://github.com/thegreatalxx' },
          { label: 'SITE', href: 'https://thealxlabs.ca' },
        ].map(({ label, href }) => {
          const isExternal = href.startsWith('http')
          return (
            <Link
              key={label}
              href={href}
              className="text-xs tracking-widest text-[#444] no-underline hover:text-[#e8ff47] transition-colors duration-150"
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
