import React, { useContext } from "react";
import { AuthContext } from "../stores/AuthContext";
import { Link } from "react-router-dom";
function Header() {

const {token ,isAdmin} = useContext(AuthContext);
const {userLogout} = useContext(AuthContext)
  return (
  <div className="bg-gray-900">
  <div className="container mx-auto py-6 flex justify-between items-center">
    <div className="text-white font-bold text-lg mx-5">
      My Website
    </div>
    <nav className="space-x-4">
      {token && isAdmin && (
        <div className="admin--link">
          <Link to="/admin" className="text-gray-300 hover:text-white">
            Admin Dashboard
          </Link>
        </div>
      )}
      {token && !isAdmin && (
        <div className="user--link">
          <Link to="/user" className="text-gray-300 hover:text-white">
            User Dashboard
          </Link>
        </div>
      )}
      <div className="user--functions">
        {token ? (
          <div className="logout">
            <button onClick={userLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Logout
            </button>
          </div>
        ) : (
          <div className="login--register flex-1 space-x-5 mx-6">
            <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
              <Link to="/login">Login</Link>
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
              <Link to="/register">Register</Link>
            </button>
          </div>
        )}
      </div>
    </nav>
  </div>
</div>
  )
}

export default Header
