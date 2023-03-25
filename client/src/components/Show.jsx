import React, { useState, useEffect } from 'react'
import axios from '../axios'

function Show({venue}) {
    const [shows, setShows] = useState([]);
    const getShows = async () => {
        try{
            const response = await axios.get(`/venues/${venue._id}/shows`);
            setShows(response.data)
        }
        catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        getShows();
    }, [])
  return (
    <div className='shows--list'>
        {shows.map(show=>(
            <div className='show--contaner'>
                {show.name} <span>{show.startTime}</span>
            </div>
        ))}
    </div>
  )
}

export default Show