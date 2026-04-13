import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MarkdownContent } from '@/lib/mdx'
import MobileNav from '@/components/MobileNav'
import { TwitterIcon, LinkedInIcon } from '@/components/ui/Icons'
import ViewCount from '@/components/ViewCount'
import type { Post } from '@/types/post'

function getRelatedPosts(post: Post, allPosts: Post[]): Post[] {
  const scored = allPosts
    .filter(p => p.slug !== post.slug)
    .map(p => {
      let score = 0
      if (p.project === post.project) score += 3
      score += p.tags.filter(t => post.tags.includes(t)).length
      return { post: p, score }
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.post)
  return scored
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — THEALXLABS`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://blog.thealxlabs.ca/blog/${slug}`,
      siteName: 'THEALXLABS',
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const allPosts = getAllPosts()
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post, allPosts)
  const postUrl = `https://blog.thealxlabs.ca/blog/${slug}`

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
          <nav className="space-y-1">
            <Link href="/" className="block px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]">
              Changelog
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]">
              All Posts
            </Link>
            <Link href="/about" className="block px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]">
              About
            </Link>
            <Link href="/archive" className="block px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]">
              Archive
            </Link>
          </nav>
        </aside>

        <main className="flex-1 max-w-3xl px-8 py-12">
          {/* Back link */}
          <div className="mb-10">
            <Link
              href="/"
              className="text-sm text-[#656d76] no-underline hover:text-[#0969da]"
            >
              ← Back to Changelog
            </Link>
          </div>

          {/* Post header */}
          <header className="mb-12 border-b border-[#d0d7de] pb-8">
            <h1 className="text-3xl font-bold text-[#24292f] mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-sm text-[#656d76]">{post.date}</span>
              <span className="text-sm text-[#656d76]">{post.readingTime}</span>
              <ViewCount slug={post.slug} />
              {post.project && (
                <span
                  className="text-xs px-2 py-0.5 uppercase tracking-wider font-bold"
                  style={{ background: '#e8ff47', color: '#24292f' }}
                >
                  {post.project}
                </span>
              )}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#656d76] border border-[#d0d7de] px-2 py-0.5 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Author byline */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#d0d7de]">
            <div className="w-12 h-12 bg-[#f6f8fa] border border-[#d0d7de] flex items-center justify-center">
              <span className="text-lg font-bold text-[#24292f]">AW</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#24292f]">Alexander Wondwossen</p>
              <p className="text-xs text-[#656d76]">Student developer in Toronto</p>
            </div>
          </div>

          {/* MDX content */}
          <div className="prose prose-lg max-w-none">
            <MarkdownContent source={post.content} />
          </div>

          {/* Social sharing */}
          <div className="mt-12 pt-8 border-t border-[#d0d7de]">
            <p className="text-sm text-[#656d76] mb-4">Share this post</p>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#656d76] border border-[#d0d7de] px-3 py-2 hover:border-[#24292f]"
              >
                <TwitterIcon />
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#656d76] border border-[#d0d7de] px-3 py-2 hover:border-[#24292f]"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#d0d7de]">
              <p className="text-sm text-[#656d76] mb-4">Related posts</p>
              <div className="space-y-4">
                {relatedPosts.map(related => (
                  <Link 
                    key={related.slug} 
                    href={`/blog/${related.slug}`}
                    className="block no-underline group"
                  >
                    <div className="p-4 border border-[#d0d7de] rounded-lg hover:border-[#0969da] transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-[#656d76]">{related.date}</span>
                        {related.project && (
                          <span 
                            className="text-xs px-2 py-0.5 font-medium rounded-full"
                            style={{ background: '#e8ff47', color: '#1f2328' }}
                          >
                            {related.project}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-[#0969da] group-hover:underline">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-[#d0d7de]">
            <Link
              href="/"
              className="text-sm text-[#656d76] no-underline hover:text-[#0969da]"
            >
              ← Back to Changelog
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}