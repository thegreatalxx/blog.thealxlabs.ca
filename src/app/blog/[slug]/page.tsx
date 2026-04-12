import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

// Pre-generate all post pages at build time
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

// Generate per-page metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — THEALXLABS BLOG`,
    description: post.summary,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Back link */}
      <div className="mb-10">
        <Link
          href="/blog"
          className="text-xs tracking-widest text-[#555] no-underline hover:text-[#e8ff47]"
        >
          &larr; BACK
        </Link>
      </div>

      {/* Post header */}
      <header className="mb-12 border-b border-[#222] pb-8">
        <h1 className="text-3xl font-bold tracking-tighter text-[#f0f0f0] mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="text-xs text-[#555]">{post.date}</span>
          <span className="text-xs text-[#555]">{post.readingTime}</span>
          {post.project && (
            <span
              className="text-xs px-2 py-0.5 uppercase tracking-wider font-bold"
              style={{ background: '#e8ff47', color: '#0a0a0a' }}
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
                className="text-xs text-[#555] border border-[#333] px-2 py-0.5 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* MDX content — typography plugin handles base styling, globals.css overrides the theme */}
      <div className="prose prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>

      {/* Footer nav */}
      <div className="mt-16 pt-8 border-t border-[#222]">
        <Link
          href="/blog"
          className="text-xs tracking-widest text-[#555] no-underline hover:text-[#e8ff47]"
        >
          &larr; ALL POSTS
        </Link>
      </div>
    </div>
  )
}
