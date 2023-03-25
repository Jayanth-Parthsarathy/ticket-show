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
    <div>
    {token?(<div>Bookings:
        <div>{tickets.map((ticket)=>(
            <div key={ticket._id}>
                <div>{ticket.venue.name}-{ticket.show.name}</div>
                <div>Time: {Date(ticket.show.startTime)} - {Date(ticket.show.endTime)}</div>
            </div>
        ))}</div>
    </div>):(<div>Login or register to book show</div>)}
    </div>
  )
}

export default Bookings