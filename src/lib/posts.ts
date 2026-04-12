import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Post } from '@/types/post'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

// Maps a directory name to the post type discriminant
const DIR_TYPE_MAP: Record<string, Post['type']> = {
  devlog: 'devlog',
  posts: 'post',
}

function parsePostFile(filePath: string, type: Post['type']): Post | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    // Derive slug from filename — strip leading underscore (sample files) and extension
    const filename = path.basename(filePath, '.md')
    const slug = filename.startsWith('_') ? filename.slice(1) : filename

    const stats = readingTime(content)

    return {
      slug,
      title: typeof data.title === 'string' ? data.title : slug,
      date: typeof data.date === 'string' ? data.date : new Date().toISOString().slice(0, 10),
      project: typeof data.project === 'string' ? data.project : undefined,
      tags: Array.isArray(data.tags)
        ? data.tags.map((t: unknown) => String(t))
        : [],
      summary: typeof data.summary === 'string' ? data.summary : '',
      content,
      readingTime: stats.text,
      type,
    }
  } catch {
    // Never propagate — a bad file shouldn't break the whole site
    return null
  }
}

function readDirectory(dir: string, type: Post['type']): Post[] {
  const dirPath = path.join(CONTENT_ROOT, dir)

  if (!fs.existsSync(dirPath)) {
    return []
  }

  let files: string[]
  try {
    files = fs.readdirSync(dirPath)
  } catch {
    return []
  }

  return files
    .filter((f) => f.endsWith('.md'))
    .map((f) => parsePostFile(path.join(dirPath, f), type))
    .filter((p): p is Post => p !== null)
}

export function getAllPosts(): Post[] {
  const devlogs = readDirectory('devlog', 'devlog')
  const posts = readDirectory('posts', 'post')

  return [...devlogs, ...posts].sort((a, b) =>
    b.date.localeCompare(a.date)
  )
}

export function getPostBySlug(slug: string): Post | null {
  // Search all directories — slug is unique across the site
  for (const [dir, type] of Object.entries(DIR_TYPE_MAP)) {
    const dirPath = path.join(CONTENT_ROOT, dir)
    if (!fs.existsSync(dirPath)) continue

    let files: string[]
    try {
      files = fs.readdirSync(dirPath)
    } catch {
      continue
    }

    for (const file of files) {
      if (!file.endsWith('.md')) continue
      const filename = path.basename(file, '.md')
      const fileSlug = filename.startsWith('_') ? filename.slice(1) : filename

      if (fileSlug === slug) {
        return parsePostFile(path.join(dirPath, file), type as Post['type'])
      }
    }
  }

  return null
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}

export function getPostsByProject(project: string): Post[] {
  return getAllPosts().filter((p) => p.project === project)
}
