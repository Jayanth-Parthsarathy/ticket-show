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
    <div className="flex bg-gray-500 items-center justify-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h1 class="text-lg font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password: </label>
          <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
          </div>
      </form>
    </div>
  );
};

export default LoginForm;