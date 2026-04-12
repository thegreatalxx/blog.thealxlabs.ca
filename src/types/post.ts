export interface Post {
  slug: string
  title: string
  date: string
  project?: string
  tags: string[]
  summary: string
  content: string
  readingTime: string
  type: 'devlog' | 'post'
}
