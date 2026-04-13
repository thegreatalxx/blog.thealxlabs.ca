'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/types/post'
import { RssIcon } from '@/components/ui/Icons'
import MobileNav from '@/components/MobileNav'
import Search from '@/components/Search'
import ThemeToggle from '@/components/ThemeToggle'

interface HomeClientProps {
  posts: Post[]
}

export default function HomeClient({ posts }: HomeClientProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setSubscribed(true)
    setLoading(false)
  }

  const featuredPosts = posts.filter(p => p.project && ['Conductor', 'phantom', 'LocalCode', 'Dirac'].includes(p.project)).slice(0, 4)
  
  const postsByMonth: Record<string, Post[]> = {}
  posts.forEach(post => {
    const month = post.date.substring(0, 7)
    if (!postsByMonth[month]) postsByMonth[month] = []
    postsByMonth[month].push(post)
  })
  
  const sortedMonths = Object.keys(postsByMonth).sort().reverse()

  return (
    <div className="flex min-h-screen flex-col">
      <MobileNav />
      
      <div className="flex flex-1">
        <aside className="sidebar w-56 hidden md:block">
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-3">
              <span className="w-8 h-8 bg-[#e8ff47] flex items-center justify-center text-[#1f2328] font-bold">A</span>
              <span className="text-lg font-semibold">THEALXLABS</span>
            </Link>
          </div>

          <nav className="space-y-2 mb-10">
            <Link href="/" className="block px-4 py-2.5 text-sm font-medium bg-[#f6f8fa] rounded-lg">
              Changelog
            </Link>
            <Link href="/blog" className="block px-4 py-2.5 text-sm text-[#656d76] hover:bg-[#f6f8fa] rounded-lg transition-colors">
              All Posts
            </Link>
            <Link href="/about" className="block px-4 py-2.5 text-sm text-[#656d76] hover:bg-[#f6f8fa] rounded-lg transition-colors">
              About
            </Link>
            <Link href="/archive" className="block px-4 py-2.5 text-sm text-[#656d76] hover-bg-[#f6f8fa] rounded-lg transition-colors">
              Archive
            </Link>
          </nav>

          <div className="mb-8">
            <Search placeholder="Search posts..." />
          </div>

          <div className="mb-6">
            <ThemeToggle />
          </div>

          <div className="mb-8">
            <a 
              href="/feed.xml" 
              className="flex items-center gap-2 text-sm text-[#0969da] hover:underline"
            >
              <RssIcon />
              RSS Feed
            </a>
          </div>

          <div className="pt-6 border-t border-[#e1e4e8]">
            <p className="text-xs text-[#656d76]">
              Built by <a href="https://thealxlabs.ca" className="text-[#0969da]">TheAlxLabs</a>
            </p>
          </div>
        </aside>

        <main className="flex-1 max-w-3xl mx-auto px-8 py-16">
          <header className="mb-16">
            <h1 className="text-4xl font-bold mb-4">Changelog</h1>
            <p className="text-lg text-[#656d76] max-w-lg">
              Dev logs, build notes, and updates from what we're building.
            </p>
          </header>

          <div className="flex gap-12 py-8 border-y border-[#e1e4e8] mb-16">
            <div>
              <span className="text-3xl font-bold">{posts.length}</span>
              <span className="text-sm text-[#656d76] ml-2">posts</span>
            </div>
            <div>
              <span className="text-3xl font-bold">5</span>
              <span className="text-sm text-[#656d76] ml-2">products</span>
            </div>
            <div>
              <span className="text-3xl font-bold">36</span>
              <span className="text-sm text-[#656d76] ml-2">repos</span>
            </div>
          </div>

          <div className="space-y-16">
            {sortedMonths.map((month) => {
              const [year, mon] = month.split('-')
              const monthName = new Date(parseInt(year), parseInt(mon) - 1).toLocaleString('en-US', { month: 'long' })
              
              return (
                <section key={month}>
                  <h2 className="text-xl font-semibold mb-8 pb-4 border-b border-[#e1e4e8]">
                    {monthName} {year}
                  </h2>
                  
                  <div className="space-y-8">
                    {postsByMonth[month].map((post) => (
                      <article key={post.slug} className="group">
                        <Link href={`/blog/${post.slug}`} className="block no-underline">
                          <div className="flex items-start gap-4">
                            <div className="pt-0.5">
                              <span className={`entry-type ${post.type === 'devlog' ? 'improvement' : 'release'}`}>
                                {post.type || 'update'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm text-[#656d76]">
                                  {post.date.split('-')[2]}
                                </span>
                                {post.project && (
                                  <span 
                                    className="text-xs px-2.5 py-0.5 font-medium rounded-full"
                                    style={{ background: '#e8ff47', color: '#1f2328' }}
                                  >
                                    {post.project}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-[#0969da] group-hover:underline mb-2">
                                {post.title}
                              </h3>
                              {post.summary && (
                                <p className="text-[#656d76] leading-relaxed mb-3">{post.summary}</p>
                              )}
                              {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {post.tags.map(tag => (
                                    <span key={tag} className="text-xs text-[#8b949e]">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {featuredPosts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[#e1e4e8]">
              <h2 className="text-xl font-semibold mb-8">Featured</h2>
              <div className="grid gap-6">
                {featuredPosts.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block no-underline group">
                    <div className="p-4 border border-[#e1e4e8] rounded-lg hover:border-[#0969da] transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-[#656d76]">{post.date}</span>
                        {post.project && (
                          <span 
                            className="text-xs px-2 py-0.5 font-medium rounded-full"
                            style={{ background: '#e8ff47', color: '#1f2328' }}
                          >
                            {post.project}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-[#0969da] group-hover:underline">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-20 pt-12 border-t border-[#e1e4e8]">
            <div className="newsletter-box p-8">
              <h3 className="text-xl font-semibold mb-3">
                Subscribe to our newsletter
              </h3>
              <p className="text-[#656d76] mb-6">
                Get the latest updates delivered to your inbox.
              </p>
              {subscribed ? (
                <p className="text-[#1a7f37]">Thanks for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 text-sm border border-[#e1e4e8] rounded-lg focus:border-[#0969da] focus:outline-none"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 text-sm font-medium text-white bg-[#0969da] rounded-lg hover:bg-[#0860ca] transition-colors disabled:opacity-50"
                  >
                    {loading ? '...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}