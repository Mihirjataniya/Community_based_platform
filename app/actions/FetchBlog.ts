"use server"
import { db } from "@/lib/db";


export async function FetchBlogs(blogId: string) {
    try {
        const response = await db.blog.findFirst({
            where: {
                id: blogId
            },
            select: {
                title: true,
                content: true,
                description: true,
                createdAt: true,
                author: {
                    select: {
                        username: true
                    }
                },
                imageUrl: true
            }
        })
        if (response) {
            return {
                title: response.title,
                content: response.content,
                description: response.description,
                createdAt: response.createdAt,
                authorname: response.author.username,
                imageUrl: response.imageUrl
            }
        }else{
            return undefined
        }
    } catch (error) {
        console.log(error);
        return undefined
    }
}