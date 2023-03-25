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
    <div>Success... Redirecting...</div>

  )
}

export default Success