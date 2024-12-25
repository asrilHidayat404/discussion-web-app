import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Main from "@/layouts/Main";
import prisma from "@/libs/db";
import Form from "../components/Form";

const page = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const userId = (await getUser()).id
  const isLoggedIn = await isAuthenticated();
  console.log(isAuthenticated);

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const questions = await prisma.questions.findMany({
    where: {
      userId
    }
  })
  
  return (
    <Main>
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <Form />
        <div className="bg-white p-4 border border-gray-300 rounded">
          {
            questions?.map(({id, question, createdAt}) => {
              console.log(createdAt);
              
              return (
                <p key={id}>{question} <sup>{new Date(createdAt).toLocaleString("en-US", {
                  timeZone: "Asia/Jakarta",
                })}</sup></p>
              )
            })
          }
        </div>
    </Main>
  );
};

export default page;
