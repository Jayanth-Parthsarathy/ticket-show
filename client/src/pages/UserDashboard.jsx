import React from 'react'
import { useNavigate } from 'react-router-dom'
import Venue from "../components/Venue"
function UserDashboard() {  
  const navigate = useNavigate()
  return (
    <div className='p-4'>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">User Dashboard</h1>
        <div>
            <Venue />
            <button className="my-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate("/user/booking")}>My Bookings</button>
        </div>
    </div>
  )
}

export default UserDashboard