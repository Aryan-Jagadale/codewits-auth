import Dashboard from "./components/Dashboard"
import Sidebar from "./components/Sidebar"



const page = () => {
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

export default page