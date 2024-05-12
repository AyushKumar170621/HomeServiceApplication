import React, { useState } from 'react';
import './LocationForm.css'; // Import CSS file for styling
import {saveBookingInfo} from "../../action/paymentAction";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const LocationInfo = () => {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    pincode: '',
    phoneNo: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, such as sending data to a server
    console.log(formData);
    // Clear form fields after submission if needed
    dispatch(
        saveBookingInfo(formData)
    );
    setSubmitted(true);
  };

  return (
    <div className="location-form-container">
      <h2>Location Information</h2>
      <form onSubmit={handleSubmit} className="location-form">
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="number"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="number"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </div>
        {!submitted && <button type="submit">Submit</button>}
      </form>
      {submitted && (
        <Link to= {"/service/payment"}>
            <button onClick={() => console.log("Go to Payment")} className="payment-btn">
              Go to Payment
            </button>
        </Link>
      )}
    </div>
  );
};

export default LocationInfo;
