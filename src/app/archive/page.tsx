import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import MobileNav from '@/components/MobileNav'
import Search from '@/components/Search'
import ThemeToggle from '@/components/ThemeToggle'

export default function ArchivePage() {
  const allPosts = getAllPosts()

  const postsByYear: Record<string, typeof allPosts> = {}
  allPosts.forEach(post => {
    const year = post.date.split('-')[0]
    if (!postsByYear[year]) postsByYear[year] = []
    postsByYear[year].push(post)
  })

  const sortedYears = Object.keys(postsByYear).sort().reverse()

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
            <Link href="/" className="block px-4 py-2.5 text-sm text-[#656d76] hover:bg-[#f6f8fa] rounded-lg transition-colors">
              Changelog
            </Link>
            <Link href="/blog" className="block px-4 py-2.5 text-sm text-[#656d76] hover:bg-[#f6f8fa] rounded-lg transition-colors">
              All Posts
            </Link>
            <Link href="/about" className="block px-4 py-2.5 text-sm text-[#656d76] hover:bg-[#f6f8fa] rounded-lg transition-colors">
              About
            </Link>
            <Link href="/archive" className="block px-4 py-2.5 text-sm font-medium bg-[#f6f8fa] rounded-lg">
              Archive
            </Link>
          </nav>

          <div className="mb-8">
            <Search placeholder="Search posts..." />
          </div>

          <div className="mb-6">
            <ThemeToggle />
          </div>

          <div className="pt-6 border-t border-[#e1e4e8]">
            <p className="text-xs text-[#656d76]">
              Built by <a href="https://thealxlabs.ca" className="text-[#0969da]">TheAlxLabs</a>
            </p>
          </div>
        </aside>

        <main className="flex-1 max-w-3xl mx-auto px-8 py-16">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Archive</h1>
            <p className="text-lg text-[#656d76]">
              All {allPosts.length} posts, organized by year.
            </p>
          </header>

          <div className="space-y-16">
            {sortedYears.map(year => (
              <section key={year}>
                <h2 className="text-xl font-semibold mb-8 pb-4 border-b border-[#e1e4e8]">
                  {year} <span className="text-sm font-normal text-[#656d76]">({postsByYear[year].length} posts)</span>
                </h2>
                
                <div className="space-y-6">
                  {postsByYear[year].map(post => (
                    <article key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="block no-underline group">
                        <div className="flex items-start gap-4">
                          <span className="text-sm text-[#656d76] w-20 shrink-0">
                            {post.date.split('-')[1]}/{post.date.split('-')[2]}
                          </span>
                          <div>
                            <h3 className="text-lg font-medium text-[#0969da] group-hover:underline mb-1">
                              {post.title}
                            </h3>
                            {post.summary && (
                              <p className="text-sm text-[#656d76]">{post.summary}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}