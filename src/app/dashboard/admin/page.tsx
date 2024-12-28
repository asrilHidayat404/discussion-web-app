import QuestionList from '@/app/components/QuestionList'
import Main from '@/layouts/Main'
import prisma from '@/libs/db'
import { Question } from '@/types/types'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const { isAuthenticated, getPermission } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  if(!isLoggedIn) {
    redirect("/api/auth/login")
  }

  const requiredPermission = await getPermission("delete:question")

  if(!requiredPermission?.isGranted) {
    redirect("/dashboard")
  }

  const question = await prisma.question.findMany({
    include: {
      user: true
    },
    orderBy: [
      {
        createdAt: 'desc',
      }
    ],
  })
  return (
    <Main>
        <header className='mb-5'>
          <h1 className='font-bold text-2xl text-center'>User Questions</h1>
        </header>
        <div className='bg-white w-full'>
          <QuestionList questions={question}/>
        </div>
    </Main>
  )
}

export default page
