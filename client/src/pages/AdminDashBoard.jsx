import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../stores/AuthContext'
import AdminVenue from "../components/AdminVenue"
function AdminDashBoard() {
  const navigate = useNavigate()
  const {isAdmin} = useContext(AuthContext)
  if(!isAdmin){
    navigate("/user")
  }
  return (
    <div className="max-w-4xl mx-auto px-4">
  {isAdmin ? (
    <>
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">Welcome Admin</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AdminVenue />
      </div>
    </>
  ) : (
    <div className="text-xl text-red-600 text-center mt-8">
      You are not an admin.
    </div>
  )}
</div>

  )
}

export default AdminDashBoard