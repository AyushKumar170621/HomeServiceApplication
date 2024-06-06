import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadUser } from './action/userAction';
import store from "./store";
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/UserAuth/Login';
import Register from './Components/UserAuth/Register';
import Service from './Components/Services';
import Payment from './Components/Booking/Payment';
import LocationInfo from './Components/Booking/LocationInfo';
import Description from './Components/Description';
import PaymentSuccessfull from './Components/Booking/PaymentSuccessfull';
import AddService from './Admin/Addservice';
import RegisterProvider from './Components/UserAuth/RegisterProvider';
import AllServices from './Admin/AllServices';
import Updatebooking from './Admin/Updatebooking';
import Booking from "./Admin/Booking"
import ProviderBooking from './Provider/ProviderBooking';
import AcceptedBookings from './Provider/AcceptedBookings';
import UserBooking from './Components/UserAuth/Userbooking/UserBooking';
import AdminProtectedRoute from './Components/Routes/AdminProtectedRoute';
import ProtectedRoute from './Components/Routes/ProtectedRoute';
import AdminNavbar from './Admin/Navbar/Navbar'; // Import the AdminNavbar component
import AdminDashboard from './Admin/AdminDashboard';
import ProviderProtectedRoute from './Components/Routes/ProviderProtectedRoute';
import ForgotPassword from './Components/UserAuth/ForgotPassword'
import ResetPassword from './Components/UserAuth/ResetPassword';
import Profile from './Components/UserAuth/Profile'
import PasswordUpdate from './Components/UserAuth/PasswordUpdate';
import Chatbot from "./Components/ExtraComponent/Chatbot";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const { isAuthenticated, user } = useSelector(state => state.user);

  useEffect(() => {
    try {
      store.dispatch(loadUser());
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }, []);

  // Determine if the header and footer should be displayed
  const showHeaderFooter = !isAuthPage;
  const isAdmin = user && user.role === 'admin'; // Check if the user is an admin
  const isProvider = user && user.role === "provider";
  return (
    <div className="App">
      {/* Conditionally render AdminNavbar or Header */}
      {isAdmin ? <AdminNavbar /> : (showHeaderFooter && <Header isProvider = {isProvider}/>)}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/proregister" element={<RegisterProvider />} />
        <Route  path="/password/forgot" element={<ForgotPassword/>} />
        <Route path="/password/reset/:token" element={<ResetPassword/>} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Chatbot/>}/>
        <Route path="/services" element={<Service />} />
        {/* Protected routes for authenticated users */}
        <Route path="/paymentSuccessfull" element={<PaymentSuccessfull />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          
          <Route path="/bookings" element={<UserBooking />} />
          <Route path="/product/locationinfo" element={<LocationInfo />} />
          <Route path="/service/payment" element={<Payment />} />
          <Route path="/service/:id" element={<Description />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/update" element={<PasswordUpdate/>}/>
        </Route>

        <Route element={<ProviderProtectedRoute/>}>
          <Route path="/provider/booking" element={<ProviderBooking/>}/>
          <Route path="/provider/mybooking" element={<AcceptedBookings/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        {/* Admin protected routes */}
        <Route element={<AdminProtectedRoute user={user} />}>
          <Route path="/admin/addservice" element={<AddService />} />
          <Route path="/admin/allservice" element={<AllServices />} />
          <Route path="/admin/booking" element={<Booking />} />
          <Route path="/admin/booking/:id" element={<Updatebooking />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>

      {/* Conditionally render Footer */}
      {!isAdmin && showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
