import React, { useState, Fragment, useEffect } from "react";

import Faq from "./Faq";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout, clearErrors, updateProfile, loadUser } from "../../action/userAction";
import { Link, Navigate, redirect } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constant/userConstant";
import LeftPannel from "./LeftPannel";


import { useSelector, useDispatch } from 'react-redux';
import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [faqon, setFaq] = useState(false);
  const { isAuthenticated, user, error, loading: uload } = useSelector((state) => state.user);
  const { error: proerror, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  useEffect(() => {
    if (error) {
      toast.error(error, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearErrors());
    }
    if (proerror) {
      toast.error(proerror, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          dispatch(loadUser());
          dispatch({
            type: UPDATE_PROFILE_RESET,
          });
          <Navigate to="/profile" replace={true} />;
        }
      });
    }
    if (!isAuthenticated) {
      <Navigate to="/login" replace={true} />;
    }
  }, [dispatch, isAuthenticated, user, error, proerror, isUpdated]);

  const logoutHandler = () => {
    dispatch(logout());
    return redirect("/login");
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <Fragment>
      <ToastContainer />
      {
       
     (
        <Fragment>
          
          <div className="profile-page">
            <LeftPannel faqon={faqon} setFaq={setFaq} logoutHandler={logoutHandler} user={user} />
            <div className="profile-content">
              {!isEditMode ? (
                <div className="profile-info">
                  <h1>Profile Information</h1>
                  <button className="edit-btn" onClick={toggleEditMode}>Edit</button>
                  <div className="profile-details">
                    <img src={user.avatar.url} alt="Profile Pic" className="profile-pic" />
                    <div className="profile-item">
                      <label>Name</label>
                      <input type="text" value={user.name} readOnly />
                    </div>
                    <div className="profile-item">
                      <label>Email Address</label>
                      <input type="email" value={user.email} readOnly />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-edit">
                  <h1>Edit Profile</h1>
                  <button className="edit-btn" onClick={toggleEditMode}>Cancel</button>
                  <form onSubmit={updateProfileSubmit}>
                    <div className="profile-item">
                      <label>Name</label>
                      <input type="text" required name="name" onChange={(e) => setName(e.target.value)} placeholder="Your name.." />
                    </div>
                    <div className="profile-item">
                      <label>Email Address</label>
                      <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Your email.." required />
                    </div>
                    <div className="profile-item">
                      <label>Select Avatar</label>
                      <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />
                      <input type="file" accept="image/*" name="avatar" onChange={updateProfileDataChange} />
                    </div>
                    <input type="submit" value="Submit" className="submit-btn" />
                  </form>
                </div>
              )}
              {faqon && <Faq />}
            </div>
          </div>
         
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
