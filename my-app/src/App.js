import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Services from './Components/Service';
import { loadUser } from './action/userAction';
import { useEffect, useState } from 'react';
import store from "./store";
import Contact from './Components/Contact';
import { useSelector } from 'react-redux';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/UserAuth/Login'
import Register from './Components/UserAuth/Register';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    try {
      store.dispatch(loadUser());
    } catch (error) {
      
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
