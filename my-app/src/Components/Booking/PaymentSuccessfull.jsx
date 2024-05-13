import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createBooking } from "../../action/bookingAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccessfull = () => {
  const style = {
    width: '200px',
    margin: 'auto',
    backgroundColor: '#CCC',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.newBooking);
  const [searchParams] = useSearchParams();
  const [bookItems] = useState(JSON.parse(localStorage.getItem("bookingInfo")));
  const [serviceItems] = useState(JSON.parse(localStorage.getItem("serviceItems")));
  const [bookingCreated, setBookingCreated] = useState(false);

  console.log("PaymentSuccessfull rendered");

  useEffect(() => {
    console.log("useEffect for booking creation called");

    if (!bookingCreated && !error && !loading) {
      console.log("Booking creation logic executed");

      const booking = {
        locationInfo: bookItems,
        serviceItems: serviceItems,
        paymentInfo: {
          id: searchParams.get("reffrence"),
          status: "successful",
        },
        servicePrice: serviceItems.price,
        taxPrice: serviceItems.price * 0.18,
        totalPrice: serviceItems.price + serviceItems.price * 0.18,
      };

      dispatch(createBooking(booking));
      setBookingCreated(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    console.log("useEffect for handling success or error called");

    if (error) {
      window.alert(error);
      navigate("/");
    } else if (bookingCreated) {
      toast.success("Booked Successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          navigate("/");
        }
      });
    }
  }, [error, bookingCreated, navigate]);

  return (
    <div style={style}>
      <ToastContainer/>
      Payment Successful
    </div>
  );
};

export default PaymentSuccessfull;
