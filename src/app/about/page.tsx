import Link from 'next/link'

export const metadata = {
  title: 'About — THEALXLABS',
  description: 'About Alexander Wondwossens and TheAlxLabs',
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"/>
      <path d="M8 3.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"/>
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"/>
      <path d="M1.5 8a6.5 6.5 0 0113 0M1 8a7 7 0 0114 0"/>
    </svg>
  )
}

export default function AboutPage() {
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

          <nav className="space-y-1 mb-8">
            <Link href="/" className="block px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]">
              Changelog
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]">
              All Posts
            </Link>
            <Link href="/about" className="block px-3 py-2 text-sm font-medium bg-[#f6f8fa] text-[#24292f]">
              About
            </Link>
          </nav>

          <div className="pt-8 border-t border-[#d0d7de]">
            <p className="text-xs text-[#656d76]">
              Built by <a href="https://thealxlabs.ca" className="text-[#0969da]">TheAlxLabs</a>
            </p>
          </div>
        </aside>

        <main className="flex-1 max-w-3xl px-8 py-12">
          <h1 className="text-3xl font-bold text-[#24292f] mb-8">About</h1>

          <section className="mb-12">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-24 h-24 bg-[#f6f8fa] border border-[#d0d7de] flex items-center justify-center">
                <span className="text-4xl font-bold text-[#24292f]">AW</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#24292f] mb-2">Alexander Wondwossen</h2>
                <p className="text-[#656d76] mb-4">Student developer in Toronto building things that don't exist yet.</p>
                <div className="flex gap-4">
                  <a href="https://github.com/thegreatalxx" className="flex items-center gap-2 text-sm text-[#0969da] hover:underline">
                    <GithubIcon />
                    @thegreatalxx
                  </a>
                  <a href="https://twitter.com/thealxlabs" className="flex items-center gap-2 text-sm text-[#0969da] hover:underline">
                    <TwitterIcon />
                    @thealxlabs
                  </a>
                  <a href="mailto:hello@thealxlabs.ca" className="flex items-center gap-2 text-sm text-[#0969da] hover:underline">
                    <MailIcon />
                    hello@thealxlabs.ca
                  </a>
                </div>
              </div>
            </div>

            <p className="text-[#24292f] leading-relaxed mb-6">
              I think I am a "developer." But still not sure yet.
            </p>

            <p className="text-[#656d76] leading-relaxed">
              Currently building at TheAlxLabs — a collection of projects that started as experiments and became things people actually use. 
              I work on AI integration tools, developer utilities, and occasionally things that don't fit into any category.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-lg font-semibold text-[#24292f] mb-4">Projects</h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Conductor',
                  desc: 'One MCP server that gives any AI agent access to 255+ tools through one connection. Published on npm as @useconductor/conductor.',
                  status: 'v2.2.0 — live',
                  href: 'https://github.com/useconductor/conductor',
                },
                {
                  name: 'Dirac',
                  desc: 'AI-native email client co-built with Peter. Target launch: April 19, 2026.',
                  status: 'Launching soon',
                  href: '#',
                },
                {
                  name: 'devlog',
                  desc: 'AI-powered dev session manager that writes structured journal entries to Obsidian automatically after every Claude Code session.',
                  status: 'Just launched',
                  href: 'https://devlogs.thealxlabs.ca',
                },
                {
                  name: 'LocalCode',
                  desc: 'Open-source terminal AI coding assistant — "Claude Code killer." Published on npm as @localcode/cli.',
                  status: 'Published',
                  href: 'https://github.com/TheLocalCodeTeam',
                },
                {
                  name: 'phantom',
                  desc: 'Chrome extension for real-time collaborative co-browsing. See exactly what they see — WebRTC, no accounts, no servers.',
                  status: 'In development',
                  href: '#',
                },
              ].map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  className="block p-4 border border-[#d0d7de] hover:border-[#0969da] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#24292f]">{project.name}</span>
                    <span className="text-xs text-[#656d76]">{project.status}</span>
                  </div>
                  <p className="text-sm text-[#656d76]">{project.desc}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-lg font-semibold text-[#24292f] mb-4">Stats</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border border-[#d0d7de] text-center">
                <div className="text-2xl font-bold text-[#24292f]">36</div>
                <div className="text-xs text-[#656d76] uppercase">Public Repos</div>
              </div>
              <div className="p-4 border border-[#d0d7de] text-center">
                <div className="text-2xl font-bold text-[#24292f]">5</div>
                <div className="text-xs text-[#656d76] uppercase">Products</div>
              </div>
              <div className="p-4 border border-[#d0d7de] text-center">
                <div className="text-2xl font-bold text-[#24292f]">7</div>
                <div className="text-xs text-[#656d76] uppercase">Followers</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#24292f] mb-4">Contact</h2>
            <p className="text-[#656d76] mb-4">
              Want to collaborate, chat, or tell me I'm wrong about something? Here's how to reach me:
            </p>
            <ul className="space-y-2 text-[#656d76]">
              <li>• Email: <a href="mailto:hello@thealxlabs.ca" className="text-[#0969da]">hello@thealxlabs.ca</a></li>
              <li>• GitHub: <a href="https://github.com/thegreatalxx" className="text-[#0969da]">@thegreatalxx</a></li>
              <li>• Twitter: <a href="https://twitter.com/thealxlabs" className="text-[#0969da]">@thealxlabs</a></li>
              <li>• Discord: <a href="https://discord.gg/9AMpVkk5yv" className="text-[#0969da]">Join TheAlxLabs Discord</a></li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}

import MobileNav from '@/components/MobileNav'