'use cache'
import { prisma } from "../../lib/prisma";

export async function getPosts() {
    console.log('Fetching posts from DB...');

    const posts = await prisma.post.findMany({
        where: {
            published: true,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    return posts;
}