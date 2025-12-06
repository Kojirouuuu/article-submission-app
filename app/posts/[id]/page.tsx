import { getPost } from "@/app/actions/prisma/queries";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PageProps){
    const { id } = await params;

    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <main>
            <div>
                <div>
                    <Link
                    href="/"
                    >
                        ← Back to home
                    </Link>

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