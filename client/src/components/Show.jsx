import React, { useState, useEffect } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../stores/AuthContext"
import { useContext } from 'react';

function Show(props) {
    const navigate = useNavigate()
    const {token, changeShow, venue, changeVenue, show} = useContext(AuthContext);
    const [shows, setShows] = useState([]);
    const getShows = async () => {
        try{
            const response = await axios.get(`/venues/${props.venue._id}/shows`);
            setShows(response.data)
        }
        catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        getShows();
    }, [])

    const bookTicket = (venueid, showid)=>{
        changeShow(showid);
        changeVenue(venueid);
        navigate("/user/book")
    }


  return (
     <ul className="divide-y divide-gray-200">
        {shows.map(show=>(
            <li key={show.id} className="py-2">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="font-bold">{show.name}</span>
                        <span className="text-gray-600 text-sm">Start: {new Date(show.startTime).toLocaleString()}</span>
                        <span className="text-gray-600 text-sm">End: {new Date(show.endTime).toLocaleString()}</span>
                        
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={()=>bookTicket(props.venue, show)}>Book</button>
                </div>
            </li>
        ))}
    </ul>
  )
}

export default Show