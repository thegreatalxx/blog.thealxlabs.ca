import Link from 'next/link'
import type { Post } from '@/types/post'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline group">
      <article
        className="border border-[#222] p-6 group-hover:border-[#e8ff47] transition-colors duration-0"
        aria-label={post.title}
      >
        {/* Meta row — date and reading time */}
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs text-[#555]">{post.date}</span>
          <span className="text-xs text-[#555]">{post.readingTime}</span>
          {/* Project tag — acid yellow badge */}
          {post.project && (
            <span
              className="text-xs px-2 py-0.5 uppercase tracking-wider font-bold"
              style={{ background: '#e8ff47', color: '#0a0a0a' }}
            >
              {post.project}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-[#f0f0f0] group-hover:text-[#e8ff47] mb-2 leading-snug">
          {post.title}
        </h2>

        {/* Summary */}
        {post.summary && (
          <p className="text-sm text-[#555] mb-4 leading-relaxed">{post.summary}</p>
        )}

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
      </article>
    </Link>
  )
}
