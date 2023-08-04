"use client"
import Dashboard from "./components/Dashboard"
import Sidebar from "./components/Sidebar"
import { useSession } from "next-auth/react"
import Link from 'next/link';


const Page = () => {
  const { data: session, status } = useSession()



  if (status === "unauthenticated") {
    return <div className="flex flex-col items-center justify-center h-screen">

      <p>
        Looks like you are not signed in!
      </p>
      <br/>
      <Link href="/" className="underline">Login</Link>
    </div>
  }
  if (status === "authenticated") {

    return (
      <div className="flex">
        <Sidebar />

        <div className="h-screen flex-1 pt-0 pl-0" style={{
          backgroundColor: "#fafbfd"
        }}>

          <Dashboard />

        </div>
      </div>
    )

  }


}

export default Page