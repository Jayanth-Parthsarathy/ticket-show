import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import AdminShow from './AdminShow'
import { useContext } from 'react'
import { AuthContext } from '../stores/AuthContext'

function AdminVenue() {
    const {changeVenue} = useContext(AuthContext)
    const [useForm, setUseForm] = useState(false)
    const navigate = useNavigate()
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
    <div className="venues-container">
        {venues.map(venue=>(
            <div className="venue-container">
                <h3 className="text-xl text-bl">{venue.name}</h3>
                {venue.shows?(
                    <AdminShow venue={venue} />
                ):(
                    <div></div>
                )}
                <div className="controls flex gap-4">
                    <button className="add-show" onClick={()=>{changeVenue(venue._id); navigate("/admin/addShow")}}>+</button>
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                </div>
            </div>
        ))}
        <button className="add-venue" onClick={()=>{navigate("/admin/addVenue")}}>+</button>
    </div>
  )
}

export default AdminVenue