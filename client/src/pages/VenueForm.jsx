import React from 'react'
import { useContext, useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from "../stores/AuthContext"
function VenueForm() {
    const navigate = useNavigate()
    const {isAdmin, token} = useContext(AuthContext);
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState(0);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        try{    
            if(name && place && location && capacity){
                await axios.post("/venues", {
                    name,
                    place,
                    location,
                    capacity,
                },{
                    headers
                }).then(response=>{console.log(response.data)})
                .catch(err=>console.log(err))
                navigate("/admin")
            }
            else{
                throw Error("Enter all the fields");
            }
        }
        catch(error){
            console.log(error)
        }
    }

   return (
    <div className='venue-form bg-white rounded-md shadow-md p-6'>
  {isAdmin ? (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">Venue Name</label>
          <input id='name' type="text" value={name} placeholder='Enter venue name' onChange={(e) => setName(e.target.value)} className="form-input mt-1 w-full rounded-md shadow-sm" />
        </div>
        <div>
          <label htmlFor="place" className="block font-medium">Place</label>
          <input id='place' type="text" value={place} placeholder='Enter Place' onChange={(e) => setPlace(e.target.value)} className="form-input mt-1 w-full rounded-md shadow-sm" />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium">Location</label>
          <input id='location' type="text" value={location} placeholder='Enter location' onChange={(e) => setLocation(e.target.value)} className="form-input mt-1 w-full rounded-md shadow-sm" />
        </div>
        <div>
          <label htmlFor="capacity" className="block font-medium">Capacity</label>
          <input id='capacity' type="number" min={0} value={capacity} placeholder='Enter Capacity' onChange={(e) => setCapacity(e.target.value)} className="form-input mt-1 w-full rounded-md shadow-sm" />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">Save</button>
      </form>
    </div>
  ) : (
    <div>You are not the admin</div>
  )}
</div>

    
   )
}

export default VenueForm