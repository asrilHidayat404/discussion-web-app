"use server"

import prisma from "@/libs/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"

export async function PostQuestion(prevState: any, formData: FormData) {

    const {isAuthenticated} = getKindeServerSession()
    const isLoggedIn = await isAuthenticated()

    if (!isLoggedIn) {
        console.log("please log in");
        return "Please log in"
    }

    const question = formData.get("question") as string
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    console.log({question});
    
    try {
        await prisma.question.create(
            {
                data: {
                    question: question,
                    userId: user.id
                }
            }
        )
      } catch (error) {
        throw error
      }
    revalidatePath("/dashboard")
}

export async function DeleteComment(i: any, id: string|undefined) {
    console.log("ok", {id});
    try {
        await prisma.question.delete({
            where: {
                id
            }
        })
    } catch (error) {
        return error
    }   
    revalidatePath("/dashboard/admin")
}