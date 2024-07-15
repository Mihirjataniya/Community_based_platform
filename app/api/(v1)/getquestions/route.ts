import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(){
    try {
        const response = await db.post.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                createdAt:true,
                user:{
                    select: {
                        username: true,
                  },
                },
                _count:{
                    select:{
                        comments: true
                    }
                }
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        const Postdata = response.map(post=>({
            postId: post.id,
            title: post.title,
            content: post.content,
            date: post.createdAt,
            username: post.user.username,
            commentsCount: post._count.comments
        }))

        return NextResponse.json(Postdata,
            {
                status:200
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