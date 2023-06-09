import React from 'react'
import { useContext, useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from "../stores/AuthContext"
function EditVenueForm() {
    const navigate = useNavigate()
    const {isAdmin, token, venue, changeVenue} = useContext(AuthContext);
    const [name, setName] = useState(venue.name);
    const [place, setPlace] = useState(venue.place);
    const [location, setLocation] = useState(venue.location);
    const [capacity, setCapacity] = useState(venue.capacity);

        const handleSubmit = async (e)=>{
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        try{    
            if(name && place && location && capacity){
                await axios.post(`/venues/${venue._id}`, {
                    name,
                    place,
                    location,
                    capacity,
                },{
                    headers
                }).then(response=>{console.log(response.data)})
                .catch(err=>console.log(err))
                changeVenue({})
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
    <div className='venue-form'>
        {isAdmin?(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="name">
                    <label htmlFor="name">Venue Name</label>
                    <input id='name' type="text" value={name} placeholder='Enter venue name' onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="place">
                    <label htmlFor="place">Place</label>
                    <input id='place' type="text" value={place} placeholder='Enter Place' onChange={(e)=>setPlace(e.target.value)} />
                </div>
                <div className="location">
                    <label htmlFor="location">Location</label>
                    <input id='location' type="text" value={location} placeholder='Enter location' onChange={(e)=>setLocation(e.target.value)} />
                </div>
                <div className="capacity">
                    <label htmlFor="capacity">Capacity</label>
                    <input id='capacity' type="number" min={0} value={capacity} placeholder='Enter Capacity' onChange={(e)=>setCapacity(e.target.value)} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    ):(
        <div>You are not the admin</div>
    )}
    </div>
    
   )
}

export default EditVenueForm