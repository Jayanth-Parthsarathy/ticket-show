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
    <div className="bg-white p-4 rounded-lg shadow-md">
  <div className="font-bold mb-2">Booking-{show.name} Venue:{venue.name}</div>
  <div className="mb-2">Time: {show.startTime} {show.endTime}</div>
  <div className="flex flex-col">
    {token ? (
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col mb-2">
            <label htmlFor="number" className="mb-1">
              Number:
            </label>
            <input
              type="number"
              min={1}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              id="number"
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="price" className="mb-1">
              Price:
            </label>
            <input
              id="price"
              type="text"
              readOnly
              value={price}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="total" className="mb-1">
              Total:
            </label>
            <input
              type="number"
              readOnly
              id="total"
              value={total}
              className="border rounded px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Book
          </button>
        </form>
      </div>
    ) : (
      <div className="text-gray-500">Login or Register</div>
    )}
  </div>
</div>
  )
}

export default BookTicket