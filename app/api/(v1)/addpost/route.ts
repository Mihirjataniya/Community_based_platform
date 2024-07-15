import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const id = body.userId
        if(!id){
            return NextResponse.json({
                msg: 'Unauthenticated'
            },{
                status: 400
            })
        }
        const response = await db.post.create({
            data:{
                userId: id,
                title: body.title,
                content: body.content,
            }
        })
        const {title,content} = response
        return NextResponse.json({
            msg: "Post created successfully",
            title,
            content
        },{
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg : 'Something went wrong...'
        },{
            status: 500
        })
    }
    
}

