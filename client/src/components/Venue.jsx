import React, {useState, useEffect} from 'react'
import axios from '../axios'
import Show from './Show'
function Venue() {
    const [venues, setVenues] = useState([])
    const getVenues = async ()=>{
            try{
                const response = await axios.get("/venues")
                setVenues(response.data)
            }
            catch(error){
                console.error(error);
            }
    }
    useEffect(() => {
        getVenues();
    }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {venues.map((venue)=>(
            <div className="bg-white shadow-md rounded-md p-4" key={venue._id}>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{venue.name}</h2>
                <Show venue = {venue} />
            </div>
        ))}
    </div>
  )
}

export default Venue