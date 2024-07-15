import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const id = body.authorId
        if(!id){
            return NextResponse.json({
                msg : "Unauthenticated"
            },{
                status : 400
            })
        }
        await db.blog.create({
            data:{
                title: body.title,
                description : body.description,
                content: body.content,
                authorId: id,
                imageUrl: body.imageUrl
            }
        })
        return NextResponse.json({
            msg: 'Blog created successfully'
        },{
            status : 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg: "Something went wrong"
        },{
            status : 500
        })
    }
}


