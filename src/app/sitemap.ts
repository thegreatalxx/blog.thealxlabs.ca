import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blog.thealxlabs.ca'
  const posts = getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1, changeFrequency: 'weekly' },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.6, changeFrequency: 'monthly' },
  ]

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: new Date(post.date),
  }))

  return [...staticPages, ...postPages]
}