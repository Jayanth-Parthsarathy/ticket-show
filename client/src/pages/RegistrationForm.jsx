import React, {useContext, useState} from 'react'
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
        const response = await fetch("http://localhost:8001/register", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        const {token, isAdmin} = await response.json();
        userLogin(token, isAdmin)
        if(isAdmin){
          navigate("/admin")
        }
        else{
          navigate("/user")
        }
        }
        
      catch(error){
        console.log(error);
        navigate("/register")
      }

}


    return (
    <form onSubmit={handleSubmit}>
      {errorMessage?(<p>{errorMessage}</p>):(<p>{errorMessage}</p>)}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
        <label htmlFor="email">Email</label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
        <input
        type="password"
        id="password2"
        value={password2}
        onChange={(event) => setPassword2(event.target.value)}
      />

      <button type="submit">Register</button>
    </form>
  );
};



export default RegistrationForm;