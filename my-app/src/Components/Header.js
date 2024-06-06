import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { logout,clearErrors } from '../action/userAction';
function Header({isProvider}) {
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
                  Home Service Application
                </span>
              </Link>

              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className=""> </span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/"><i class="bi bi-house"></i> Home <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about"><i class="bi bi-info-square-fill"></i> About</Link>
                  </li>
                  {isProvider && 
                  <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/provider/booking"><i class="bi bi-journals"></i> Bookings</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/provider/mybooking"><i class="bi bi-person-lines-fill"></i> My Bookings</Link>
                  </li>
                  </>
                  }
                  {!isProvider &&
                  <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/services"><i class="bi bi-wrench-adjustable-circle-fill"></i> Services</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact"><i class="bi bi-person-video2"></i> Contact Us</Link>
                  </li>
                  </>
                  }
                  {!isAuthenticated?<li className="nav-item">
                    <Link className="nav-link" to="/login"><i class="bi bi-arrow-return-right"></i> Login</Link>
                  </li>:
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {user.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/profile"><i class="bi bi-person-badge"></i> Profile</Link>
                      <Link className="dropdown-item" onClick={logoutHandler}><i class="bi bi-box-arrow-left"></i> Logout</Link>
                      <Link className="dropdown-item" to="/service/recommend"><i class="bi bi-lightbulb-fill"></i> Recomendation</Link>
                      {!isProvider && <Link className="dropdown-item" to="/bookings"><i class="bi bi-person-lines-fill"></i> My booking</Link>}
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
