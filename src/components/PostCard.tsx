import Link from 'next/link'
import type { Post } from '@/types/post'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline group">
      <SpotlightCard
        className={`border border-[#222] group-hover:border-[#e8ff47] transition-colors duration-150 ${featured ? 'p-8' : 'p-6'}`}
        spotlightColor="rgba(232, 255, 71, 0.07)"
      >
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs text-[#555] tabular-nums">{post.date}</span>
          <span className="text-[#333] text-xs">—</span>
          <span className="text-xs text-[#555]">{post.readingTime}</span>
          {post.project && (
            <span
              className="text-xs px-2 py-0.5 uppercase tracking-wider font-bold"
              style={{ background: '#e8ff47', color: '#0a0a0a' }}
            >
              {post.project}
            </span>
          )}
          {post.type === 'devlog' && !post.project && (
            <span className="text-xs px-2 py-0.5 uppercase tracking-wider border border-[#333] text-[#555]">
              devlog
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          className={`font-bold text-[#f0f0f0] group-hover:text-[#e8ff47] mb-3 leading-snug ${featured ? 'text-xl' : 'text-base'}`}
        >
          {post.title}
        </h2>

        {/* Summary */}
        {post.summary && (
          <p className="text-sm text-[#555] mb-4 leading-relaxed">{post.summary}</p>
        )}

        {/* Tags + read link */}
        <div className="flex items-center justify-between">
          {post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#444] border border-[#2a2a2a] px-2 py-0.5 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <span />
          )}
          <span className="text-xs text-[#444] group-hover:text-[#e8ff47] ml-4 shrink-0">
            READ →
          </span>
        </div>
      </SpotlightCard>
    </Link>
  )
}
