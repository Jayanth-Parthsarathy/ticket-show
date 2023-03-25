import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import Header from "./components/Header";
import LoginForm from "./pages/LoginForm";
import VenueForm from './pages/VenueForm'
import RegistrationForm from "./pages/RegistrationForm";
import AdminDashBoard from "./pages/AdminDashBoard"
import ShowForm from "./pages/ShowForm"
import Bookings from "./pages/Bookings"
import ShowEditForm from "./pages/ShowEditForm"
import { AuthContextProvider } from "./stores/AuthContext";
import EditVenueForm from "./pages/EditVenueForm";
import Success from "./pages/Success";
import Welcome from "./pages/Welcome";
import BookTicket from "./pages/BookTicket";
function App() {

  return (
    <>
      <Router>
        <AuthContextProvider>
          <div className="app">
            <Header />
            <Routes>
              <Route exact path="/" element={<Welcome />} />
              <Route path="/admin" element ={<AdminDashBoard />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/admin/addVenue" element={<VenueForm />} />
              <Route path="/admin/addShow" element={<ShowForm />} />
              <Route path="/admin/editShow" element={<ShowEditForm />} />
              <Route path="/user/book" element={<BookTicket />} />
              <Route  path="/admin/editVenue" element={<EditVenueForm />} />
              <Route path="/user/success" element={<Success />} />
              <Route path="/user/booking" element = {<Bookings />} />
            </Routes>
          </div>
        </AuthContextProvider>
      </Router>
    </>
  )
}

export default App;
