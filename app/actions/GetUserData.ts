'use server'

import { db } from "@/lib/db"

export async function GetUserData(userId: string) {
    try {
   
        
        const response = await db.user.findFirst({
            where:{
                id:userId
            },
            select:{
                imageUrl:true,
                bio: true,
                createdAt: true
            }
        })
        if(response){
            return {
                bio: response.bio,
                joined: response.createdAt,
                imageUrl : response.imageUrl
            }
        }else{
            return undefined
        }
    } catch (error) {
        console.log(error);
        return undefined
    }
    
}