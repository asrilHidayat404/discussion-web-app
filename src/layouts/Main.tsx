import Sidebar from '@/app/components/Sidebar'
import React from 'react'

const Main = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="bg-gray-200 w-full p-8">
        {children}
      </main>
    </div>
  )
}

export default Main
