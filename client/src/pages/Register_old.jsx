import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {register, reset} from '../features/auth/authSlice'
function Register() {
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
    password2:'',
  })
  const {username, email, password, password2} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()




  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message);
    }
    if(isSuccess || user){
      navigate('/');
    } 

    dispatch(reset())
  
  }, [user, isError, isLoading, message, navigate, isSuccess, dispatch])
  


  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }) )
  }

  const onSubmit = (e)=>{
    e.preventDefault()
    if(password!==password2){
      toast.error("Password donot match")
    }else{
      const userData = {
        username,
        email,
        password
      }
      dispatch(register(userData))
    }
  }
  return (
    <>
      <section>
        <h1>Register</h1>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <input  
          type="text"
          placeholder='Enter your name'
          value={username}
          id="username"
          name='username'
          onChange={onChange}
          />
          <input
          type="text"
          placeholder='Enter your email'
          value={email}
          id="email"
          name='email'
          onChange={onChange}
          />
          <input
          type="password"
          placeholder='Enter your password'
          value={password}
          id="password"
          name='password'
          onChange={onChange}
          />
          <input
          type="password"
          placeholder='Confirm password'
          value={password2}
          id="password2"
          name='password2'
          onChange={onChange}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  )
}

export default Register