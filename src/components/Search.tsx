'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import type { Post } from '@/types/post'

interface SearchProps {
  placeholder?: string
}

export default function Search({ placeholder = 'Search posts...' }: SearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then((data: Post[]) => setPosts(data))
      .catch(console.error)
  }, [])

  const fuse = useCallback(() => new Fuse(posts, {
    keys: ['title', 'summary', 'tags', 'project'],
    threshold: 0.3,
    includeScore: true,
  }), [posts])

  useEffect(() => {
    if (query.length > 0 && posts.length > 0) {
      const searchResults = fuse().search(query).map(r => r.item)
      setResults(searchResults.slice(0, 5))
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, posts, fuse])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <div className="relative">
        <svg 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#656d76]" 
          viewBox="0 0 16 16" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <circle cx="7" cy="7" r="5" />
          <path d="M11 11l3 3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-9 pr-3 py-2 text-sm border border-[#d0d7de] focus:border-[#0969da] focus:outline-none"
        />
      </div>
      
      {isOpen && results.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 border border-[#d0d7de] bg-white shadow-lg z-50"
        >
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block px-4 py-3 hover:bg-[#f6f8fa] border-b border-[#d0d7de] last:border-b-0"
              onClick={() => { setQuery(''); setIsOpen(false); }}
            >
              <div className="text-sm font-medium text-[#24292f]">{post.title}</div>
              {post.summary && (
                <div className="text-xs text-[#656d76] truncate">{post.summary}</div>
              )}
            </Link>
          ))}
        </div>
      )}
      
      {isOpen && query.length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 border border-[#d0d7de] bg-white shadow-lg p-4 z-50">
          <p className="text-sm text-[#656d76]">No posts found for "{query}"</p>
        </div>
      )}
    </div>
  )
}