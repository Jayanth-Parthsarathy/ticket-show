import React, { useContext, useState } from "react";
import { AuthContext } from "../stores/AuthContext";
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:8001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const {token, isAdmin} = await response.json();
    if (token===undefined){
      throw new Error("Invalid Credentials")
    }
    await userLogin(token, isAdmin);
    if(isAdmin){
      navigate("/admin");
    }
    else{
      navigate("/user")
    }
    }
    catch (error) {
      console.error(error);
    }
  };
    



  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
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

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;