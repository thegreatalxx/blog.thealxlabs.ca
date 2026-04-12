import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 5)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-5xl font-bold tracking-tighter mb-4" style={{ color: '#e8ff47' }}>
          THEALXLABS
        </h1>
        <p className="text-sm tracking-widest" style={{ color: '#555' }}>
          dev logs. notes. builds.
        </p>
      </section>

      {/* Divider */}
      <hr className="border-[#222] mb-12" />

      {/* Recent posts */}
      <section>
        <p className="text-xs tracking-widest uppercase text-[#555] mb-6">Recent Posts</p>

        {recentPosts.length === 0 ? (
          <p className="text-sm text-[#555]">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* Link to all posts */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="text-xs tracking-widest uppercase text-[#555] border border-[#222] px-4 py-2 inline-block hover:border-[#e8ff47] hover:text-[#e8ff47] no-underline"
          >
            ALL POSTS &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}
