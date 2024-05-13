import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import { loadUser } from './action/userAction';
import store from "./store";
import Contact from './Components/Contact';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/UserAuth/Login'
import Register from './Components/UserAuth/Register';
import Service from './Components/Services';
import Payment from './Components/Booking/Payment';
import LocationInfo from './Components/Booking/LocationInfo';
import Description from './Components/Description'
import PaymentSuccessfull from './Components/Booking/PaymentSuccessfull';
import AddService from './Admin/Addservice';
import RegisterProvider from './Components/UserAuth/RegisterProvider';
import AllServices from './Admin/AllServices';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    try {
      store.dispatch(loadUser());
    } catch (error) {
      
    }
  }, []);

  // Determine if the header and footer should be displayed
  const showHeaderFooter = !isAuthPage;

  return (
    <div className="App">
      {/* Conditionally render Header */}
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/proregister" element={<RegisterProvider />} />
        <Route path="/admin/addservice" element={<AddService/>}/>
        <Route path="/admin/allservice" element={<AllServices/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/product/locationinfo" element={<LocationInfo/>} />
        <Route path="/service/payment" element={<Payment/>} />
        <Route path="/service/:id" element={<Description/>}/>
        <Route path="/contact" element={<Contact />} />
      
        <Route path="/paymentSuccessfull" element={<PaymentSuccessfull />} />
        
      </Routes>
      {/* Conditionally render Footer */}
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
