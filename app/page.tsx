import { getPosts } from "./actions/prisma/queries";
import Link from 'next/link'

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <div>
        <h1>
          Zenn Clone
        </h1>

        <div>
          {posts.map((post) => (
            <Link
            key={post.id}
            href={`/posts/${post.id}`}
            >
              <article>
                <h2>
                  {post.title}
                </h2>
                <p>
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p>
                  {post.content}
                </p>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p>
            まだ記事がありません。
          </p>
        )}
      </div>
    </main>
  )
}