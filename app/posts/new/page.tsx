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
        <div className="mx-auto max-w-2xl">
            <h1 className="mb-6">New Post</h1>

            <form action={createPost} className="space-y-5">
                <div>
                    <label htmlFor="title" className="label">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title" // FromDataで取得するための名前
                        required
                        placeholder="Enter post title"
                        className="input"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="label">
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
                        className="input min-h-40"
                        style={{
                            overflow: "hidden",
                            whiteSpace: "pre-wrap",
                            height: contentHeight
                        }}
                    />
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Link href="/" className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Publish</button>
                </div>
            </form>
        </div>
    )
}
