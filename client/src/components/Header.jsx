import React, { useContext } from "react";
import { AuthContext } from "../stores/AuthContext";
import { Link } from "react-router-dom";
function Header() {

const {token ,isAdmin} = useContext(AuthContext);
const {userLogout} = useContext(AuthContext)
  return (
  <div className="flex gap-5">
      {isAdmin && token ? ( 
          <div >
              <Link to="/admin">Admin Dashboard</Link>
          </div>
          ):
          (
          <div>
              <Link to="/user">User Dashboard</Link>
          </div>
          )}
        <div className="flex">
              
        {token?(
                <div>
                  <button onClick={userLogout}>Logout</button>
                </div>
                ):
                (<div className="flex gap-3">
                  <button><Link to="/login">Login</Link></button>
                  <button><Link to="/register">Register</Link></button>      
                </div>
                )
          }   
        </div>
  </div>
  )
}

export default Header
