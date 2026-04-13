'use client'

import { useState, useEffect } from 'react'
import PostCard from '@/components/PostCard'
import MobileNav from '@/components/MobileNav'
import type { Post } from '@/types/post'

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data: Post[]) => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()
  
  let displayed = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts
  
  // Filter by search
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    displayed = displayed.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.summary?.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MobileNav />
      
      <div className="flex flex-1">
        <aside className="sidebar w-64 hidden md:block">
          <div className="mb-8">
            <a href="/" className="flex items-center gap-2 text-lg font-semibold text-[#24292f]">
              <span className="w-5 h-5 bg-[#e8ff47] flex items-center justify-center text-[#24292f] font-bold text-sm">A</span>
              THEALXLABS
            </a>
          </div>
          <nav className="space-y-1">
            <a href="/" className="block px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]">
              Changelog
            </a>
            <a href="/blog" className="block px-3 py-2 text-sm font-medium bg-[#f6f8fa] text-[#24292f]">
              All Posts
            </a>
            <a href="/about" className="block px-3 py-2 text-sm text-[#656d76] hover:text-[#24292f]">
              About
            </a>
          </nav>
        </aside>

        <main className="flex-1 max-w-3xl px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-[#24292f] mb-2">ALL POSTS</h1>
            {!loading && (
              <p className="text-sm text-[#656d76]">
                {posts.length} ENTRIES
              </p>
            )}
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-[#d0d7de] focus:border-[#0969da] focus:outline-none"
            />
          </div>

          {/* Tag filter bar */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveTag(null)}
                className={`text-xs uppercase px-3 py-1 border transition-colors ${
                  activeTag === null
                    ? 'bg-[#24292f] text-white border-[#24292f]'
                    : 'text-[#656d76] border-[#d0d7de] hover:border-[#24292f] hover:text-[#24292f]'
                }`}
              >
                ALL
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  className={`text-xs uppercase px-3 py-1 border transition-colors ${
                    activeTag === tag
                      ? 'bg-[#24292f] text-white border-[#24292f]'
                      : 'text-[#656d76] border-[#d0d7de] hover:border-[#24292f] hover:text-[#24292f]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Posts */}
          {loading ? (
            <p className="text-sm text-[#656d76]">Loading...</p>
          ) : displayed.length === 0 ? (
            <p className="text-sm text-[#656d76]">No posts found.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {displayed.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}