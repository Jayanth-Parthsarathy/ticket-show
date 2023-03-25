import { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [show, setShow] = useState('')
  const [isAdmin, setIsAdmin] = useState(false);
  const [venue, setVenue] = useState({})
   const userLogin = (token, isAdmin) => {
    localStorage.setItem("token", token);
    setIsAdmin(isAdmin);
    setToken(token);
  };

  const userLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAdmin(false);
  };

  const changeVenue = (venue)=>{
    setVenue(venue);
  }

  const changeShow = (show)=>{
    setShow(show)
  }

  return (
    <AuthContext.Provider value={{ isAdmin, token, userLogin, userLogout, show, changeShow, venue, changeVenue}}>
      {children}
    </AuthContext.Provider>
  );
};
