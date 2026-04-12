import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { GlitchText } from '@/components/ui/GlitchText'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { TextAnimate } from '@/components/ui/TextAnimate'

export default function HomePage() {
  const allPosts = getAllPosts()
  const featured = allPosts[0] ?? null
  const recentPosts = allPosts.slice(1, 6)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mb-20">
        {/* Live indicator */}
        <div className="flex items-center gap-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full"
              style={{
                background: '#e8ff47',
                animation: 'pulse-ring 1.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
                opacity: 0.6,
              }}
            />
            <span
              className="relative inline-flex h-2 w-2"
              style={{ background: '#e8ff47' }}
            />
          </span>
          <span className="text-xs text-[#555] tracking-widest uppercase">
            building in public
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl font-bold tracking-tighter leading-none mb-6">
          <GlitchText
            text="THEALXLABS"
            className="text-[#e8ff47] block"
          />
        </h1>

        <TextAnimate
          text="dev logs. build notes. honest takes."
          className="text-sm text-[#555] tracking-widest"
        />

        {/* Stat strip */}
        <div className="flex items-center gap-8 mt-10 pt-10 border-t border-[#1a1a1a]">
          {[
            { label: 'posts', value: allPosts.length.toString().padStart(2, '0') },
            { label: 'projects', value: '06' },
            { label: 'shipped', value: '04' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-[#e8ff47] tabular-nums">{value}</div>
              <div className="text-xs text-[#555] uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured post ────────────────────────────────────────────────── */}
      {featured && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs text-[#555] uppercase tracking-widest">Featured</span>
            <div className="flex-1 h-px bg-[#1a1a1a]" />
          </div>

          {/* BorderBeam wrapper — needs relative + overflow-hidden on the outer div */}
          <div className="relative overflow-hidden">
            <PostCard post={featured} featured />
            <BorderBeam
              size={250}
              duration={10}
              colorFrom="#e8ff47"
              colorTo="transparent"
            />
          </div>
        </section>
      )}

      {/* ── Recent posts ─────────────────────────────────────────────────── */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs text-[#555] uppercase tracking-widest">Recent</span>
          <div className="flex-1 h-px bg-[#1a1a1a]" />
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-sm text-[#555]">More posts coming soon.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <ShimmerButton href="/blog">ALL POSTS →</ShimmerButton>
        <Link
          href="https://thealxlabs.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase text-[#444] hover:text-[#e8ff47] no-underline border border-[#222] px-5 py-2.5"
        >
          MAIN SITE
        </Link>
      </div>

      {/* ── Currently building ───────────────────────────────────────────── */}
      <section className="mt-20 pt-10 border-t border-[#1a1a1a]">
        <p className="text-xs text-[#555] uppercase tracking-widest mb-6">
          Currently building
        </p>
        <div className="grid grid-cols-1 gap-2">
          {[
            {
              name: 'Conductor',
              desc: 'One MCP server. 255+ tools for every AI agent.',
              status: 'v2.2.0 — live on npm',
              href: 'https://github.com/useconductor/conductor',
            },
            {
              name: 'phantom',
              desc: 'See exactly what they see. WebRTC co-browsing.',
              status: 'in development',
              href: '#',
            },
            {
              name: 'Dirac',
              desc: 'AI-native email client. Built with Peter.',
              status: 'launching Apr 19',
              href: '#',
            },
            {
              name: 'LocalCode',
              desc: 'Open-source terminal AI coding assistant.',
              status: 'published on npm',
              href: 'https://github.com/TheLocalCodeTeam',
            },
          ].map(({ name, desc, status, href }) => (
            <a
              key={name}
              href={href}
              target={href !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-4 py-3 border border-[#1a1a1a] hover:border-[#e8ff47] no-underline transition-colors duration-150"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-[#f0f0f0] group-hover:text-[#e8ff47]">
                  {name}
                </span>
                <span className="text-xs text-[#555] hidden sm:block">{desc}</span>
              </div>
              <span className="text-xs text-[#444] uppercase tracking-wider shrink-0 ml-4">
                {status}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
