import React, {useState, useEffect} from 'react'
import axios from '../axios'

function AdminShow({venue}) {
    const [shows, setShows] = useState([])
    
    useEffect(() => {
        const getShows  = async ()=>{
        try{
            const response = await axios.get(`/venues/${venue._id}/shows`);
            setShows(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
      getShows();
    }, [])
    
  return (
    <div className=''>
        {shows.map(show=>(
            <div className="">
                <div className="show-name">{show.name}</div>
                <button className="actions">Actions</button>
            </div>
        ))}
    </div>
  )
}

export default AdminShow