import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Main from "@/layouts/Main";
import prisma from "@/libs/db";
import Form from "../components/Form";
import QuestionList from "../components/QuestionList";
import { Question } from "@/types/types";


const page = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const id = (await getUser()).id
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const questions = await prisma.question.findMany({
    where: {
      userId: id
    },
    include: {
      user: true
    },
    orderBy: [
      {
        createdAt: 'desc',
      }
    ],
  });
  
  return (
    <Main>
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <Form />
        <div className="bg-white p-4 border border-gray-300 rounded">
          <QuestionList questions={questions}/>
        </div>
    </Main>
  );
};

export default page;
