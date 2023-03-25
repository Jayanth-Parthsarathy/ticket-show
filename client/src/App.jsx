import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import Header from "./components/Header";
import LoginForm from "./pages/LoginForm";
import VenueForm from './pages/VenueForm'
import RegistrationForm from "./pages/RegistrationForm";
import AdminDashBoard from "./pages/AdminDashBoard"
import ShowForm from "./pages/ShowForm"
import ShowEditForm from "./pages/ShowEditForm"
import { AuthContextProvider } from "./stores/AuthContext";
import Welcome from "./pages/Welcome";
function App() {

  return (
    <>
      <Router>
        <AuthContextProvider>
          <div>
            <Header />
            <Routes>
              <Route path="/admin" element ={<AdminDashBoard />} />
              <Route path="/" element={<Welcome />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/admin/addVenue" element={<VenueForm />} />
              <Route path="/admin/addShow" element={<ShowForm />} />
              <Route path="/admin/editShow" element={<ShowEditForm />} />
            </Routes>
          </div>
        </AuthContextProvider>
      </Router>
    </>
  )
}

export default App;
