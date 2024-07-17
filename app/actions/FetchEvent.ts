"use server"

import { db } from "@/lib/db"

export async function Fetchevent(eventId:string) {
    try {
        const response = await db.event.findFirst({
            where:{
                id:eventId
            },
            select:{
                title: true,
                description: true,
                imageUrl:true,
                date: true,
                organizer: true,
                location: true,
            }
        })
        if(response){
            return {
                title : response.title,
                description: response.description,
                imageUrl:response.imageUrl,
                date: response.date,
                organizer: response.organizer,
                location: response.location,
            }
        }else{
            return undefined
        }
    } catch (error) {
        console.log(error);
        return  undefined
        
    }
}