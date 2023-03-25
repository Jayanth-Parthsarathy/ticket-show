import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import { useContext } from 'react'
import { AuthContext } from '../stores/AuthContext'
function AdminShow({venue}) {
    const navigate = useNavigate()
    const {changeShow} = useContext(AuthContext);
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
            <div key={show._id} className="">
                <div className="show-name">{show.name}</div>
                <button className="actions" onClick={async()=>{await changeShow(show); navigate("/admin/editShow") }}>Actions</button>
            </div>
        ))}
    </div>
  )
}

export default AdminShow