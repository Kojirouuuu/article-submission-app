'use client';
import { createPost } from "@/app/actions/prisma/actions";
import Link from 'next/link';
import { useState, useRef, ChangeEvent } from "react";

export default function NewPostPage() {
    const [contentHeight, setContentHeight] = useState<number>(500);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (textareaRef.current) {
            setContentHeight(textareaRef.current.scrollHeight)
        }

        if (!value.length) {
            setContentHeight(40);
        }
    }
    return (
        <main>
            <div>
                <h1>New Post</h1>

                <form action={createPost}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                        type="text"
                        id="title"
                        name="title" // FromDataで取得するための名前
                        required
                        placeholder="Enter post title"
                        />
                    </div>

                    <div>
                        <label htmlFor="content">
                            Content (Markdown supported)
                        </label>
                        <textarea
                        id="content"
                        name="content" // FromDataで取得するための名前
                        required
                        placeholder="Enter post content (Markdown supported)"
                        rows={1}
                        ref={textareaRef}
                        onChange={onChangeContent}
                        style={{
                            overflow: "hidden",
                            whiteSpace: "pre-wrap",
                            height: contentHeight
                        }}
                        />
                    </div>

                    <div>
                        <Link href="/">
                        Cansell
                        </Link>
                        <button type="submit">Publish!</button>
                    </div>
                </form>
            </div>
        </main>
    )
}