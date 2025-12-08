import { getPosts } from "./actions/prisma/queries";
import Link from 'next/link'

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Zenn Clone</h1>
          <p className="text-sm text-neutral-600">A simple blog built with Next.js + Prisma</p>
        </div>
        <Link href="/posts/new" className="btn btn-primary">New Post</Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center">
          <p className="mb-3 text-neutral-600">まだ記事がありません。</p>
          <Link href="/posts/new" className="btn btn-primary">Create your first post</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="card p-4 group">
              <article>
                <h2 className="mb-1 text-xl font-semibold group-hover:text-brand transition-colors">{post.title}</h2>
                <p className="mb-2 text-xs text-neutral-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                <p className="line-clamp-3 whitespace-pre-wrap text-neutral-700">{post.content}</p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
