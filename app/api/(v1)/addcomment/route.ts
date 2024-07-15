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
        const response = await db.comment.create({
            data:{
                userId: id,
                postId: body.postId,
                content: body.content
            }
        })

        const {content} = response
        return NextResponse.json({
            msg: 'Comment successfull',
            content
        },{
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            msg : 'Something went wrong...'
        },{
            status: 500
        })
    }
    
}