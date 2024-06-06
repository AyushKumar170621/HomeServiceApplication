// Login.js
import React, { useState, useEffect, Fragment } from 'react';
import { login, clearErrors } from "../../action/userAction";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Loading';
import { useDispatch, useSelector } from "react-redux";
import './login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user.username, user.password));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      toast.success("Logged In successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          navigate("/services");
        }
      });
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handleForgotPassword = () => {
    navigate("/password/forgot");
  };

  return (
    <Fragment>
      <ToastContainer />
      {loading ? <Spinner /> :
        <Fragment>
          <div className="container-logsign">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2><i class="bi bi-person-fill"></i> Login</h2>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={handleChange} name="username" required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handleChange} name="password" required />
              </div>
              <button type="submit" className="login-button"><i class="bi bi-arrow-return-right"></i> Login</button>
              <div className="links d-block">
                <div>
                  <Link to="/register" className="link-offset-2 link-underline link-underline-opacity-25 link-block">Register</Link>
                </div>
                <div>
                  <Link to="/proregister" className="link-offset-2 link-underline link-underline-opacity-50 link-block">Register as Service Provider</Link>
                </div>
              </div>
              <button type="button" className="forgot-password-btn" onClick={handleForgotPassword}>
                Forgot Password?
              </button>
            </form>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default Login;
