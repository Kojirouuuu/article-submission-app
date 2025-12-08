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

    // HTML formでは送信ボタンが押されると入力欄(input)に入っている文字だけを関数に送信する
    // bindを使ってあらかじめ引数をセットしておくことで、deletePost関数にidを渡せるようにする
    const deleteAction = deletePost.bind(null, id);

    if (!post) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-between">
                <Link href="/" className="text-sm text-neutral-600 hover:text-brand">← Back to home</Link>
                <form action={deleteAction}>
                    <button type="submit" className="btn btn-danger">Delete Post</button>
                </form>
            </div>

            <h1 className="mb-2">{post.title}</h1>

            <div className="mb-6 flex items-center gap-3 text-xs text-neutral-500">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                {!post.published && (
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-700">下書き</span>
                )}
            </div>

            <article className="prose whitespace-pre-wrap">
                {post.content}
            </article>
        </div>
    )
}
