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
  <div className="p-4 bg-gray-100">
  {isAdmin ? (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-2">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          required
          className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="startTime" className="block font-medium mb-2">
          Start Time:
        </label>
        <input
          id="startTime"
          type="datetime-local"
          value={startTime}
          onChange={handleStartTimeChange}
          required
          className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endTime" className="block font-medium mb-2">
          End Time:
        </label>
        <input
          id="endTime"
          type="datetime-local"
          value={endTime}
          onChange={handleEndTimeChange}
          required
          className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block font-medium mb-2">
          Price:
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          required
          className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block font-medium mb-2">
          Tags (separated by commas):
        </label>
        <input
          id="tags"
          type="text"
          value={tags.join(',')}
          onChange={handleTagsChange}
          className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        Create Show
      </button>
    </form>
  ) : (
    <div className="text-red-700 text-xl">You are not an admin</div>
  )}
</div>
  );
};

export default ShowForm