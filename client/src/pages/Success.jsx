import React from 'react'
import { useNavigate } from 'react-router-dom';

function Success() {
    const navigate = useNavigate()
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const sleep = async ()=>{
        await timeout(3000);
        navigate("/user/booking");
    }
    sleep();

 return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Success!</h1>
      <p className="text-lg mb-6">
        Your ticket has been booked successfully.
      </p>
      <div className="flex items-center justify-center">
        <svg
          className="animate-spin h-6 w-6 mr-3 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10-5.291c0 2.21-.896 4.209-2.343 5.657A7.962 7.962 0 0120 12h-4zm-2-5.291l-3 2.647A7.962 7.962 0 0116 12h4c0-3.042-1.135-5.824-3-7.938z"
          ></path>
        </svg>
        <p className="text-green-600">Redirecting...</p>
      </div>
    </div>
  );
}


export default Success