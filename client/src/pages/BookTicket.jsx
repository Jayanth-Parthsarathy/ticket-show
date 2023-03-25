import React from 'react'
import { AuthContext } from '../stores/AuthContext'
import axios from "../axios"
import { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
function BookTicket() {
  const navigate = useNavigate()
  const {token, venue, show, changeVenue ,changeShow} = useContext(AuthContext)
  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState(show.ticketPrice)
  const [total, setTotal] = useState(show.ticketPrice*number)
  useEffect(() => {
    setTotal(number*price)
  }, [number])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    let i = number;
    if(price>=1){
      while(i>0){
        await axios.post(`/shows/${venue._id}/${show._id}/bookTicket`,{}, {headers})
        .then(response=>console.log(response))
        .catch(err=>console.log(err))
        i--;
      }
    }
    changeVenue({})
    changeShow({})
    navigate("/user/success")
  }

  
  return (
    <div>
      <div>Booking-{show.name}   Venue:{venue.name}</div>
      <div>Time: {show.startTime} {show.endTime}</div>
      <div>
        {token?(
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="number">
                Number:
              </label>
              <input type="number" min={1} value={number} onChange={(e)=>setNumber(e.target.value)} id='number' />
              <label htmlFor="price">
                Price:
              </label>
              <input id="price" type="text" readOnly value={price} />
              <label htmlFor="total">
                Total:
              </label>
              <input type="number" readOnly id='total' value={total} />
              <button type="submit">Book</button>
            </form>
          </div>
        ):
        (
          <div>Login or Register</div>
        )}
      </div>
    </div>
  )
}

export default BookTicket