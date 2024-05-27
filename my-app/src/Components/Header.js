import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { logout,clearErrors } from '../action/userAction';
function Header() {
  const dispatch = useDispatch();
  const {isAuthenticated, user ,error} = useSelector((state) => state.user);
  useEffect( () => {
    if(error)
    {
      toast.error(error,{
        autoClose:2000,
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearErrors());
    }
  },[dispatch,isAuthenticated,user,error]);
  const logoutHandler = () => {
    dispatch(logout());
    return redirect("/login");
  }
  return (
    <>
    <ToastContainer/>
    <header className="header_section">
      <div className="hero_area">
        <div className="header_top">
          <div className="container-fluid">
            <div className="contact_nav">
              <a href="#">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <span>
                  Call : +01 123455678990
                </span>
              </a>
              <a href="#">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <span>
                  Email : demo@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="header_bottom">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <Link className="navbar-brand" to="/">
                <span>
                  Inance
                </span>
              </Link>

              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className=""> </span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about"> About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/services">Services</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact Us</Link>
                  </li>
                  {!isAuthenticated?<li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>:
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {user.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/profile">Profile</Link>
                      <Link className="dropdown-item" onClick={logoutHandler}>Logout</Link>
                      <Link className="dropdown-item" to="/bookings">My booking</Link>
                    </div>
                  </li>
                  }
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}

export default Header;
