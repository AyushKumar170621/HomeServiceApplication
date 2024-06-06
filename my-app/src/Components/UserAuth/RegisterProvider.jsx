import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "./Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerprovider, clearErrors } from "../../action/userAction";
import "./register.css";

const RegisterProvider = () => {
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
    category: "",
  });

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("avatar", avatar);
    myForm.set("phone", user.phone);
    myForm.set("category", user.category);
    dispatch(registerprovider(myForm));
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
      {loading ? <Spinner /> : (
        <div className="container-logsign">
          <form className="register-form" onSubmit={registerSubmit}>
            <h2><i class="bi bi-tools"></i> Register as Service Provider</h2>
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
            <div className="input-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" onChange={registerDataChange} required>
                <option value="">Select category</option>
                <option value="Massage">Massage</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Pest control">Pest control</option>
                <option value="Chimney Repair">Chimney Repair</option>
                <option value="Microwave Repair">Microwave Repair</option>
                <option value="Kitchen cleaning">Kitchen cleaning</option>
                <option value="Shave/beard grooming">Shave/beard grooming</option>
                <option value="Face care">Face care</option>
                <option value="Hair colour">Hair colour</option>
                <option value="Home painting">Home painting</option>
                <option value="Bathroom cleaning">Bathroom cleaning</option>
                <option value="AC Repair Service">AC Repair Service</option>
                <option value="Water Purifier Repair">Water Purifier Repair</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Washing Machine Repair">Washing Machine Repair</option>
                <option value="Laptop Repair">Laptop Repair</option>
                <option value="Full home cleaning">Full home cleaning</option>
                <option value="Refrigerator Repair">Refrigerator Repair</option>
                <option value="Men/kids haircut">Men/kids haircut</option>
              </select>
            </div>
            <button type="submit"><i class="bi bi-patch-plus-fill"></i> Register</button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default RegisterProvider;
