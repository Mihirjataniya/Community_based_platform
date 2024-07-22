import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    
    try {
         const body = await req.json()
         const userId = body.userId
         if(!userId){
            return NextResponse.json({
                msg: "User not authenticated"
            },{
                status: 400
            })
         }
         const response = await db.user.update({
            where:{
                id:userId
            },
            data:{
                imageUrl: body.imageUrl,
                bio: body.bio
            }
         })
         if(response){
            return NextResponse.json({
                msg: "Updated successfully"
            },{
                status:200
            })
         }
    } catch (error) {
        console.log(error);
        NextResponse.json({
            msg : "Something went wrong"
        },{
            status: 500
        })
    }
}