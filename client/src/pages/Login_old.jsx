import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  const {email, password} = formData
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
    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }
  return (
    <>
      <section>
        <h1>Login</h1>
      </section>
      <section>
        <form onSubmit={onSubmit}>
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
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  )
}

export default Login