import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { date } from "zod";


export async function GET() {
    try {
        const response = await db.event.findMany({
            select:{
                id: true,
                title: true,
                description: true,
                date: true,
                location: true,
                organizer: true,
                imageUrl: true
            }
        })
        const Eventdata = response.map(event=>({
            eventId : event.id,
            title : event.title,
            descripttion : event.description,
            date: event.date,
            location: event.location,
            organizer: event.organizer,
            imageUrl : event.imageUrl,
        }))
        return NextResponse.json(Eventdata,{
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