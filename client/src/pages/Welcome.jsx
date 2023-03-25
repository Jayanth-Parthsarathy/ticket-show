import React from 'react'
import { useNavigate } from 'react-router-dom';
function Welcome() {
  const navigate = useNavigate()
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to the Ticket Booking App</h1>
      <p className="text-lg text-gray-600 mb-8">Discover and book the best shows in town!</p>
      <button onClick={()=>{navigate("/user")}} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Get started
      </button>
    </div>
  );
}


export default Welcome