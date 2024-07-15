import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const id = body.userId
        if(!id){
            return NextResponse.json({
                msg : "Unauthenticated"
            },{
                status : 400
            })
        }
         await db.event.create({
            data: {
                title: body.title,
                description: body.description,
                date: body.date,
                location: body.location,
                organizer: body.organizer,
                userId: id,
                imageUrl: body.imageUrl
            }
        })
        return NextResponse.json({
            msg: 'Event created successfully'
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