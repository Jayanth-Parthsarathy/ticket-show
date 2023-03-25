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
    <div>{isAdmin?(
      <>
        <div>
          <div className="heading">Welcome Admin</div>
          <div className="venues">
            <AdminVenue />
          </div>
        </div>
      </>
      ):
      (
      <>
        <div className='text-xl text-red-600'>
          You are not an admin
        </div>
      </>)}
    </div>
  )
}

export default AdminDashBoard