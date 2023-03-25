import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../axios"
import { AuthContext } from '../stores/AuthContext'
function Bookings() {
    const [tickets, setTickets] = useState([])
    const {token}= useContext(AuthContext)
    const getTickets = async()=>{
        const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        await axios.get("/tickets/getTickets", {headers})
        .then(res=>{
            console.log(res);
            setTickets(res.data)
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
      getTickets()
    }, [])
    

  return (
    <div className="border p-4 rounded-md bg-white shadow-md">
  {token ? (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
      {tickets.map((ticket) => (
        <div key={ticket._id} className="mb-4">
          <div className="font-medium text-lg">{ticket.venue.name} - {ticket.show.name}</div>
          <div className="text-sm text-gray-500">Time: {new Date(ticket.show.startTime).toLocaleString()} - {new Date(ticket.show.endTime).toLocaleString()}</div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center text-lg text-gray-500">Login or register to book a show.</div>
  )}
</div>


  )
}

export default Bookings