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
    <div className='grid grid-cols-1 gap-4'>
  {shows.map(show => (
    <div key={show._id} className='flex justify-between items-center py-2 px-4 rounded-lg shadow-lg bg-white mb-4'>
      <div className='text-lg font-medium'>{show.name}</div>
                    <button
                className="actions px-4 py-2 rounded-lg shadow-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-200"
                onClick={async () => {
                  await changeShow(show);
                  navigate('/admin/editShow');
                }}
              >
                Actions
              </button>
    </div>
  ))}
</div>
  )
}

export default AdminShow