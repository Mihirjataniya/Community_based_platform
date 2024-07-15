'use server'
import { db } from "@/lib/db";

export async function FetchQuestion(postId:string) {
    try {
        const response = await db.post.findFirst({
            where:{
                id:postId
            },
            select:{
                title:true,
                content: true,
                createdAt: true,
                imageUrl: true,
                user:{
                    select:{
                        username:true
                    }
                },
                comments:{
                    select:{
                        id: true,
                        content:true,
                        createdAt:true,
                        likeCount:true,
                        user:{
                            select:{
                                username:true
                            }
                        }
                    },
                    orderBy:{
                        createdAt: 'desc'
                    }
                },
                
            }
        })
        
        if(response){
            return {
                title : response.title,
                content: response.content,
                createdAt : response.createdAt,
                username: response.user.username,
                comments : response.comments,
                imageUrl : response.imageUrl
            }
        }else {
            return undefined
        }
    } catch (error) {
        console.log(error);
        return undefined
    }
    
}