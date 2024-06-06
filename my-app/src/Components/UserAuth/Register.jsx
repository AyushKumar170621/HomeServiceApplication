import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from './Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register, clearErrors } from '../../action/userAction';
import './register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("/profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    phone: 0,
  });

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("avatar", avatar);
    myForm.set("phone", user.phone);
    myForm.set("city", user.city);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/services");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <Fragment>
      <ToastContainer />
      {loading ? <Spinner /> :
        <div className="container-logsign">
          <form className="register-form" onSubmit={registerSubmit}>
            <h2><i class="bi bi-people-fill"></i> Register</h2>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" onChange={registerDataChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" onChange={registerDataChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" onChange={registerDataChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="avatar">Avatar</label>
              <input type="file" id="avatar" name="avatar" accept="image/*" onChange={registerDataChange} />
            </div>
            <div className="input-group">
              <img src={avatarPreview} alt="Avatar Preview" height={50} width={50} />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input type="number" id="phone" name="phone" pattern="[0-9]{10}" onChange={registerDataChange} required />
              <small>Format: 123-456-7890</small>
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" onChange={registerDataChange} required />
            </div>
            <button type="submit" className="register-button"><i class="bi bi-person-add"></i> Register</button>
          </form>
        </div>}
    </Fragment>
  );
};

export default Register;
