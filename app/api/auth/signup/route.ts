import { db } from "@/lib/db"
import { signIn } from "next-auth/react"
import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'

const userSchema = z.object({
    name : z.string(),
    email: z.string(),
    password: z.string().min(6),
})

export async function  POST(req: NextRequest) {
    try {
        const body = await req.json()
        const parseBody = await userSchema.safeParse(body)
        if(!parseBody.success){
            return NextResponse.json({
                msg: "Wrong inputs"
            },{
                status:400
            })
        }
        const extisting = await db.user.findUnique({
            where:{
                email: parseBody.data.email
            }
        })
        if(extisting){
            return NextResponse.json({
                msg: "User already exist"
            },{
                status:409
            })
        }
        const user = await db.user.create({
            data:{
                username: parseBody.data.name,
                email: parseBody.data.email,
                password: parseBody.data.password
            }
        })

        const {username,email,id}= user

        return NextResponse.json({
            msg: "Signup successull",
            username,
            email,
            id
        },{
            status:200
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg: "Something went wrong"
        },{
            status:500
        })
    }
}