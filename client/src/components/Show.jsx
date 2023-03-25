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
    <div className='shows--list'>
        {shows.map(show=>(
            <div key={show._id} className='show--contaner'>
                {show.name} <span>{show.startTime}</span>
                <button onClick={()=>bookTicket(props.venue, show)}>Book</button>
            </div>
        ))}
    </div>
  )
}

export default Show