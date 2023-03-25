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
 <div className="bg-white p-6 rounded-md shadow-md">
    {isAdmin ? (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                        Name:
                    </label>
                    <input id="name" type="text" value={name} onChange={handleNameChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="start-time" className="block font-medium text-gray-700 mb-1">
                        Start Time:
                    </label>
                    <input id="start-time" type="datetime-local" value={startTime} onChange={handleStartTimeChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="end-time" className="block font-medium text-gray-700 mb-1">
                        End Time:
                    </label>
                    <input id="end-time" type="datetime-local" value={endTime} onChange={handleEndTimeChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="price" className="block font-medium text-gray-700 mb-1">
                        Price:
                    </label>
                    <input id="price" type="number" value={price} onChange={handlePriceChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="tags" className="block font-medium text-gray-700 mb-1">
                        Tags (separated by commas):
                    </label>
                    <input id="tags" type="text" value={tags.join(',')} onChange={handleTagsChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out">
                    Update Show
                </button>
            </form>
            <button onClick={() => setDeleteMsg(`Do you want to delete ${show.name}`)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
                Delete
            </button>
            {deleteMsg && (
                <button onClick={() => deleteShow(show._id)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
                    {deleteMsg}
                </button>
            )}
        </>
    ) : (
        <div className="text-red-700 text-xl">You are not an admin</div>
    )}
</div>

  );
};

export default ShowEditForm