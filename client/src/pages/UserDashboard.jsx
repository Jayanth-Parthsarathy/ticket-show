import React from 'react'
import { useNavigate } from 'react-router-dom'
import Venue from "../components/Venue"
function UserDashboard() {  
  const navigate = useNavigate()
  return (
    <>
        <div className='venues'>
            <Venue />
            <button onClick={()=>navigate("/user/booking")}>My Bookings</button>
        </div>
    </>
  )
}

export default UserDashboard