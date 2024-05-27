import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PASSWORD_RESET } from "../../constant/userConstant";
import { updatePassword, clearErrors } from "../../action/userAction";
import "./PasswordUpdate.css";

const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password Updated Successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          navigate("/profile");
        }
      });

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <div className="password-update-container">
      <ToastContainer />
      <div className="form-wrapper">
        <h2 className="form-title">Update Password</h2>
        <form onSubmit={updatePasswordSubmit} className="password-form">
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              name="oldPassword"
              id="oldPassword"
              onChange={(e) => { setOldPassword(e.target.value); }}
              placeholder="Old Password"
              required
            />
            <label htmlFor="oldPassword" className="form-label">Old Password</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              onChange={(e) => { setNewPassword(e.target.value); }}
              name="newPassword"
              id="newPassword"
              placeholder="New Password"
              required
            />
            <label htmlFor="newPassword" className="form-label">New Password</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              name="confirmPassword"
              onChange={(e) => { setConfirmPassword(e.target.value); }}
              id="confirmPassword"
              placeholder="Confirm Password"
              required
            />
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          </div>
          <div className="form-group">
            <button type="submit" className="form-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;
