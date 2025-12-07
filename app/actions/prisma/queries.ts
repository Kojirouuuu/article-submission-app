'use cache'
import { prisma } from "../../lib/prisma";

export async function getPosts() {
    if (process.env.DATABASE_URL?.includes('dummy')) {
        console.log('Using dummy database, returning empty posts array.');
        return [];
    }
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

export async function getPost(id: string) {
    if (process.env.DATABASE_URL?.includes('dummy')) {
        console.log('Using dummy database, returning null post.');
        return null;
    }
    console.log(`Fetching post with ID: ${id} from DB...`);
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        }
    })

    return post;
}