import { getAllPosts } from '@/lib/posts'
import HomeClient from '@/components/HomeClient'

export default function HomePage() {
  const allPosts = getAllPosts()
  return <HomeClient posts={allPosts} />
}