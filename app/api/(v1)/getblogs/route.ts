import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = await db.blog.findMany({
            select:{
                id: true,
                title: true,
                description: true,
                author:{
                    select:{
                        username: true
                    }
                },
                imageUrl: true,
                createdAt: true
            }
        })
        const Blogdata = response.map(blog=>({
            blogId : blog.id,
            title : blog.title,
            description : blog.description,
            date: blog.createdAt,
            author : blog.author.username,
            imageUrl : blog.imageUrl
        }))
        return NextResponse.json(Blogdata,{
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg:'Something went wrong'
        },{
            status:500
        })
    }
}