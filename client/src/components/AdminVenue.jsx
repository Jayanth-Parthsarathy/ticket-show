import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import AdminShow from './AdminShow'
import { useContext } from 'react'
import { AuthContext } from '../stores/AuthContext'

function AdminVenue() {
    const {changeVenue} = useContext(AuthContext)
    const [deleteConfirm, setDeleteConfirm] = useState(null)
    const [venuetoDelete, setVenuetoDelete] = useState({})
    const [useForm, setUseForm] = useState(false)
    const {token}= useContext(AuthContext)
    const navigate = useNavigate()
  const [venues, setVenues] = useState([])

    const getVenues = async ()=>{
        const response = await axios.get("/venues")
        setVenues(response.data)
    }

    useEffect(() => {
        getVenues();
    }, [])

      const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    const deleteVenue = async (id)=>{
        const url = `venues/${id}`
        await axios.delete(url, {headers}).then(res=>console.log(res)).catch(err=>console.log(err))
        getVenues()
        setDeleteConfirm(null)
    }

  return (
    <div className="venues-container">
        {venues.map(venue=>(
            <div key={venue._id} className="venue-container">
                <h3 className="text-xl text-bl">{venue.name}</h3>
                {venue.shows?(
                    <AdminShow venue={venue} />
                ):(
                    <div></div>
                )}

                <div className="controls flex gap-4">
                    <button className="add-show" onClick={()=>{changeVenue(venue._id); navigate("/admin/addShow")}}>+</button>
                    <button className="edit" onClick={()=>{
                        changeVenue(venue);
                        navigate("/admin/editVenue")
                    }}>Edit</button>
                    <button className="delete" onClick={()=>{
                        setDeleteConfirm(`Do you really want to delete ${venue.name}`);
                        setVenuetoDelete(venue)
                    }}>Delete</button>
                </div>
            </div>
        ))}
        <button onClick={()=>deleteVenue(venuetoDelete._id)}>{deleteConfirm}</button>
        <button className="add-venue" onClick={()=>{navigate("/admin/addVenue")}}>+</button>
    </div>
  )
}

export default AdminVenue;