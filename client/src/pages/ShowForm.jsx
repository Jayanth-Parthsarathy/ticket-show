import React, { useState } from 'react'
import { AuthContext } from '../stores/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import axios from "../axios"
function ShowForm() {
  const {venue, changeVenue, isAdmin, token} = useContext(AuthContext)
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate()
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
      await axios.post(`venues/${venue}/addShow`, {
        name,
        endTime,
        startTime,
        tags,
        ticketPrice:price,
      },{headers}).then(response=>console.log(response.data))
      .catch(err=>console.log(err))
    }
    changeVenue('')
    navigate("/admin/")

  }
  catch(err){
    console.log(err)
  }
}

 return (
  <div>
    {isAdmin?(<form onSubmit={handleSubmit}>
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
      <button type="submit">Create Show</button>
    </form>):(<div className='text-red-700 text-xl'>You are not an admin</div>)}
  </div>
  );
};

export default ShowForm