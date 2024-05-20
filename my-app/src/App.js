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
import Updatebooking from './Admin/UpdateBooking';
<<<<<<< HEAD
import UserBooking from './Components/UserAuth/UserBooking';
import Booking from "./Admin/Booking"
import ProviderBooking from './Provider/ProviderBooking';
import AcceptedBookings from './Provider/AcceptedBookings';
=======
import UserBooking from './Components/UserAuth/Userbooking/UserBooking';
import Booking from "./Admin/Booking";
import AdminProtectedRoute from './Components/Routes/AdminProtectedRoute';
import ProtectedRoute from './Components/Routes/ProtectedRoute';
import AdminNavbar from './Admin/Navbar/Navbar'; // Import the AdminNavbar component
import AdminDashboard from './Admin/AdminDashboard';
>>>>>>> f15eea00fa7185de55003ca1abc1343935ea966a
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

  return (
    <div className="App">
      {/* Conditionally render AdminNavbar or Header */}
      {isAdmin ? <AdminNavbar /> : (showHeaderFooter && <Header />)}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/proregister" element={<RegisterProvider />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
<<<<<<< HEAD
        <Route path="/admin/booking" element={<Booking/>}/>
        <Route path="/provider/booking" element={<ProviderBooking/>}/>
        <Route path="/provider/mybooking" element={<AcceptedBookings/>}/>
        <Route path="/paymentSuccessfull" element={<PaymentSuccessfull />} />
        <Route path="/admin/booking/:id" element={<Updatebooking/>}/>
=======

        {/* Protected routes for authenticated users */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/paymentSuccessfull" element={<PaymentSuccessfull />} />
          <Route path="/services" element={<Service />} />
          <Route path="/bookings" element={<UserBooking />} />
          <Route path="/product/locationinfo" element={<LocationInfo />} />
          <Route path="/service/payment" element={<Payment />} />
          <Route path="/service/:id" element={<Description />} />
        </Route>

        {/* Admin protected routes */}
        <Route element={<AdminProtectedRoute user={user} />}>
          <Route path="/admin/addservice" element={<AddService />} />
          <Route path="/admin/allservice" element={<AllServices />} />
          <Route path="/admin/booking" element={<Booking />} />
          <Route path="/admin/booking/:id" element={<Updatebooking />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
>>>>>>> f15eea00fa7185de55003ca1abc1343935ea966a
      </Routes>

      {/* Conditionally render Footer */}
      {!isAdmin && showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
