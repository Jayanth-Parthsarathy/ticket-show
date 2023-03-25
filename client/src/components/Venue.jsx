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
    <div>
        {venues.map((venue)=>(
            <div key={venue._id}>{venue.name}
                <Show venue = {venue} />
            </div>
        ))}
    </div>
  )
}

export default Venue