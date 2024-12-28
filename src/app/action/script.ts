"use server"

import prisma from "@/libs/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const QuestionSchema = z.string().trim().min(1, {
    message: "at leact 1 character long",
  }).max(5, {
    message: "todo must be 5"
  })


export async function PostQuestion(prevState: any, formData: FormData) {

    const {isAuthenticated} = getKindeServerSession()
    const isLoggedIn = await isAuthenticated()

    if (!isLoggedIn) {
        console.log("please log in");
        return {
            type: "auth",
            error: "Please Log In"
        }
    }

    const questionData = formData.get("question") as string
    const question = QuestionSchema.safeParse(questionData)

    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (!question.success) {
        let errorMessage = ""
        question.error.issues.forEach((issue) => {
            errorMessage = errorMessage +  issue.path[0] + ": " + issue.message + ". "
        })
        
        return {
            type: "content",
            error: errorMessage,
        };
    }

    
    
    try {
        await prisma.question.create(
            {
                data: {
                    question: question.data,
                    userId: user.id
                }
            }
        )
      } catch (error) {
        throw error
      }
    revalidatePath("/dashboard/admin")
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