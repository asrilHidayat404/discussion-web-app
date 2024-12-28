import Main from "@/layouts/Main";
import prisma from "@/libs/db";
import QuestionList from "./components/QuestionList";
import Form from "./components/Form";

export default async function Home() {
  const questions = await prisma.question.findMany({
    include: {
      user: true,
    }, 
    orderBy: [
      {
        createdAt: 'desc',
      }
    ],
  });
  return (
    <Main>
      <div className="min-h-screen gap-5">
        <main>
          <header>
            <h1 className="font-bold text-2xl text-center">
              Welcome To Discussion
            </h1>
          </header>
          <div className="mb-32">
            <QuestionList questions={questions} />
          </div>
          <footer>
            <Form />
          </footer>
        </main>
      </div>
    </Main>
  );
}
