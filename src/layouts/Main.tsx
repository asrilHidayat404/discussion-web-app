import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Main = async ({children}: {children: React.ReactNode}) => {
  const { isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="bg-gray-200 w-full p-4">
        <Navbar isLoggedIn={isLoggedIn}/>
        {children}
      </main>
    </div>
  )
}

export default Main
