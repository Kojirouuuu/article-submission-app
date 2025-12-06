import { getPost } from "@/app/actions/prisma/queries";
import { deletePost } from "@/app/actions/prisma/actions";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PageProps){
    const { id } = await params;

    const post = await getPost(id);

    const deleteAction = deletePost.bind(null, id);

    if (!post) {
        notFound();
    }

    return (
        <main>
            <div>
                <div>
                    <div>
                        <Link
                        href="/"
                        >
                            ← Back to home
                        </Link>
                        <form action={deleteAction}>
                            <button
                            type="submit"
                            >
                                Delete Post
                            </button>
                        </form>
                    </div>

                    <h1>
                        {post.title}
                    </h1>

                    <div>
                        <span>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        {!post.published && (
                            <span>
                                下書き
                            </span>
                        )}
                    </div>
                </div>
                <div className="whitespace-pre-wrap">
                    {post.content}
                </div>
            </div>
        </main>
    )
}