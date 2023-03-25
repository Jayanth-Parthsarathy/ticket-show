import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../stores/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from "../axios"
function ShowEditForm() {

  const navigate = useNavigate()
  
  const {show, changeShow, token, isAdmin} = useContext(AuthContext)
  const [name, setName] = useState(show.name);
  const [startTime, setStartTime] = useState(show.startTime.toString().slice(0, -8));
  const [deleteMsg, setDeleteMsg] = useState(null)
  const [endTime, setEndTime] = useState(show.endTime.toString().slice(0, -8));
  const [price, setPrice] = useState(show.ticketPrice);
  const [tags, setTags] = useState(show.tags);
  console.log(startTime, endTime)


    const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value.split(','));
  };


  const handleSubmit = async(e)=>{
    e.preventDefault();
    const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    try{
    if(name && startTime && endTime && price){
      await axios.post(`shows/${show._id}`, {
        name,
        endTime,
        startTime,
        tags,
        ticketPrice:price,
      }, {headers})
      .then(response=>console.log(response))
      .catch(err=>console.log(err))
    }
    changeShow({})
    
    navigate('/admin')
  }
  catch(err){
    console.log(err)
  }
  }

  const deleteShow = async(id)=>{
    const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    await axios.delete(`shows/${id}`, {headers})
    .then(res=>console.log(res)).catch(err=>console.log(err))
    changeShow({})
    navigate("/admin")
  }




 return (
  <div>
    {isAdmin?(<><form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} required />
      </label>
      <label>
        Start Time:
        <input type="datetime-local" value={startTime} onChange={handleStartTimeChange} required />
      </label>
      <label>
        End Time:
        <input type="datetime-local" value={endTime} onChange={handleEndTimeChange} required />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={handlePriceChange} required />
      </label>
      <label>
        Tags (separated by commas):
        <input type="text" value={tags.join(',')} onChange={handleTagsChange} />
      </label>
      <button type="submit">Update Show</button>
    </form>
    <button onClick={()=>{setDeleteMsg(`Do you want to delete ${show.name}`)}}>Delete</button>
    {deleteMsg?(<button onClick={()=>deleteShow(show._id)}>{deleteMsg}</button>):(<div></div>)}
    </>):(<div className='text-red-700 text-xl'>You are not an admin</div>)}
  </div>
  );
};

export default ShowEditForm