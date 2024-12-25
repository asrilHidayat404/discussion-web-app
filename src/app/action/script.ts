"use server"

import prisma from "@/libs/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"

export async function PostQuestion(prevState: any, formData: FormData) {
    const question = formData.get("question")
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    console.log({question});
    
    try {
        await prisma.questions.create(
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