import Main from "@/layouts/Main";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() { 
  const {isAuthenticated} = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  return (
    <Main>
      <div className="flex justify-center min-h-screen gap-5 items-center">
        {
           !isLoggedIn ? (
            <>
              <LoginLink className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg text-slate-100 font-semibold ">
                Login
              </LoginLink>
              <RegisterLink className="bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded-lg text-slate-100 font-semibold ">
                sign In
              </RegisterLink></>
          ) : (
            <h1>Welcome To App</h1>
          )
        }
      </div>
    </Main>
  );
}