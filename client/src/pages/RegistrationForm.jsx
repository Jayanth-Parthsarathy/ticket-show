import React, {useContext, useState} from 'react'
import axios from "../axios"
import {AuthContext} from "../stores/AuthContext"
import { useNavigate } from 'react-router-dom'
const RegistrationForm = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [password2, setPassword2] = useState('')
    const {userLogin} = useContext(AuthContext)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
          if(password!==password2){
            setErrorMessage("Passwords dont match")
            throw new Error("Passwords donot match")
        }
        await axios.post("/register",{
          username,
          email,
          password
        })
        .then((response)=>{
          setErrorMessage(null)
          const {token, isAdmin} =  response.data;
          userLogin(token,isAdmin);
          isAdmin?navigate("/admin"):navigate("/user")
        })
        .catch(err=>setErrorMessage("User already Exists"))
     }
        
      catch(error){
        console.log(error);
        navigate("/register")
      }

}


    return (
    <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">Username</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password2">
          Confirm Password
        </label>

        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        id="password2"
        value={password2}
        onChange={(event) => setPassword2(event.target.value)}
          />
      </div>
      
    <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
        <p className='text-red-400'>{errorMessage}</p>
    </div>
    </form>
  );
};



export default RegistrationForm;