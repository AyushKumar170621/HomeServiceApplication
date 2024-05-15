import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import {login,clearErrors} from "../../action/userAction";
import { Link ,useNavigate} from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Loading';
import { useDispatch, useSelector } from "react-redux";
import './styles.css';

const Login = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({username:'',password:''});
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
      );
    const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user.username,user.password));
  };
  const handleChange = (e) => {
    e.preventDefault();
    setUser({...user,[e.target.name]:e.target.value});
  }
  useEffect(() => {
    if (error) {
        toast.error(error,{
            position: toast.POSITION.TOP_CENTER,
            autoClose:2000,
        });
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
        toast.success("Logged In sucessfully",{
        autoClose:2000,
        position: toast.POSITION.TOP_CENTER,
        onClose: ()=>{
            navigate("/services");
        }
        });
    }
  }, [dispatch, error, isAuthenticated,navigate]);

  return (
    <Fragment>
    <ToastContainer/>
    {loading?<Spinner/>:<Fragment>
    <div className="container-logsign">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={handleChange} name="username"  required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} name="password"  required />
        </div>
        <button type="submit">Login</button>
        <Link to="/register">Register</Link>
        <Link to="/proregister">Register as service provider</Link>
      </form>
    </div>
    </Fragment>}
    </Fragment>
  );
};

export default Login;
