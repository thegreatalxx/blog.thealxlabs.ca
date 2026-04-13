import Link from 'next/link'
import type { Post } from '@/types/post'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline group">
      <div className={`border border-[#e5e5e5] p-6 hover:border-[#1a1a1a] transition-colors duration-150 ${featured ? 'p-8' : ''}`}>
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs text-[#888]">{post.date}</span>
          <span className="text-[#ccc] text-xs">—</span>
          <span className="text-xs text-[#888]">{post.readingTime}</span>
          {post.project && (
            <span
              className="text-xs px-2 py-0.5 uppercase tracking-wider font-bold"
              style={{ background: '#e8ff47', color: '#1a1a1a' }}
            >
              {post.project}
            </span>
          )}
          {post.type === 'devlog' && !post.project && (
            <span className="text-xs px-2 py-0.5 uppercase tracking-wider border border-[#ccc] text-[#888]">
              devlog
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          className={`font-bold text-[#1a1a1a] mb-3 leading-snug group-hover:text-[#888] ${featured ? 'text-xl' : 'text-base'}`}
        >
          {post.title}
        </h2>

        {/* Summary */}
        {post.summary && (
          <p className="text-sm text-[#666] mb-4 leading-relaxed">{post.summary}</p>
        )}

        {/* Tags + read link */}
        <div className="flex items-center justify-between">
          {post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#888] border border-[#e5e5e5] px-2 py-0.5 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <span />
          )}
          <span className="text-xs text-[#888] group-hover:text-[#1a1a1a] ml-4 shrink-0">
            READ →
          </span>
        </div>
      </div>
    </Link>
  )
}