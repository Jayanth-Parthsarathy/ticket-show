import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../stores/AuthContext";

const LogoutButton = () => {
  const navigate = useNavigate()
  const { userLogout } = useContext(AuthContext);

  const handleLogout = () => {
    userLogout();
    navigate("/")
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;