'use client'

import { useState, useEffect } from 'react'
import PostCard from '@/components/PostCard'
import type { Post } from '@/types/post'

// We fetch posts client-side via a route handler so this stays a client component.
// The route handler at /api/posts provides the serialized post list.
// This avoids the fs module being bundled into the client.
export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data: Post[]) => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Collect all unique tags across every post
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()

  const displayed = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tighter text-[#f0f0f0] mb-2">ALL POSTS</h1>
        {!loading && (
          <p className="text-xs tracking-widest text-[#555]">
            {posts.length} ENTRIES
          </p>
        )}
      </div>

      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs tracking-widest uppercase px-3 py-1 border transition-colors duration-0 ${
              activeTag === null
                ? 'bg-[#e8ff47] text-[#0a0a0a] border-[#e8ff47]'
                : 'text-[#555] border-[#333] hover:border-[#e8ff47] hover:text-[#e8ff47]'
            }`}
          >
            ALL
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`text-xs tracking-widest uppercase px-3 py-1 border transition-colors duration-0 ${
                activeTag === tag
                  ? 'bg-[#e8ff47] text-[#0a0a0a] border-[#e8ff47]'
                  : 'text-[#555] border-[#333] hover:border-[#e8ff47] hover:text-[#e8ff47]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Posts */}
      {loading ? (
        <p className="text-sm text-[#555]">Loading...</p>
      ) : displayed.length === 0 ? (
        <p className="text-sm text-[#555]">No posts found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {displayed.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
