import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export function GET() {
  // Strip content from the list response — the client only needs metadata
  const posts = getAllPosts().map(({ content: _content, ...meta }) => meta)
  return NextResponse.json(posts)
}
