import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';

import './LocationForm.css'; // Import CSS file for styling
import axios from 'axios';

const Payment = () => {
  // Assuming you have the necessary selectors to get service items and booking info from Redux state
  const {serviceItems,bookingInfo} = useSelector((state )=> state.serviceBook);
  const {isAuthenticated, user ,error } = useSelector((state) => state.user);
  useEffect(() => {
    if(error)
    {
      window.alert(error);
    }
    
  }, [user,isAuthenticated,error,bookingInfo,serviceItems]);
  const checkoutHandler = async () => {
    
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/v1/razorapikey");
    console.log(key)
    console.log(serviceItems[0].price)
    const {
      data: { order },
    } = await axios.post("http://localhost:4000/api/v1/checkout", {
      amount: serviceItems[0].price +  0.18*serviceItems[0].price, // Use the stored total amount here
    });
    const options = {
      key:key,
      amount: order.amount,
      currency: "INR",
      name: "Live Green",
      description: "Checking out",
      image: "https://res.cloudinary.com/dsjseacz5/image/upload/v1692620588/nfwdmflfe3zp3wn8qssb.png",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/v1/payment/process",
      prefill: {
        name: "Ayush Kumar",
        email: "",
        contact: "5055052",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <div className="service-items">
        <h3>Service Items</h3>
        {serviceItems.map((item, index) => (
          <div key={index} className="service-item">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Price:</strong> {item.price}</p>
            <p><strong>Category:</strong> {item.category}</p>
          </div>
        ))}
      </div>
      <div className="booking-info">
        <h3>Booking Information</h3>
        <p><strong>Address:</strong> {bookingInfo.address}</p>
        <p><strong>Pincode:</strong> {bookingInfo.pincode}</p>
        <p><strong>Phone:</strong> {bookingInfo.phoneNo}</p>
        <p><strong>City:</strong> {bookingInfo.city}</p>
      </div>
      <button className="pay-button" onClick={checkoutHandler}>Pay</button>
    </div>
  );
};

export default Payment;
