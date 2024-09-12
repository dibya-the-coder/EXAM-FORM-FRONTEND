import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"
import Footer from "../component/Footer"

const ExamPage = () =>
{
  return (
    <div >
      <Navbar/>
        <div className="container mx-auto min-h-[70vh]">
        { sessionStorage.getItem('access_token') ? <Outlet/>: <Navigate to={'/'}/> }
        </div>
        <Footer/>
    
    </div>
  )
}

export default ExamPage
