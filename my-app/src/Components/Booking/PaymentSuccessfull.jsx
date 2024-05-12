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
  const { error,loading } = useSelector((state) => state.newBooking);
  const [searchParams] = useSearchParams();
  const [bookItems] = useState(JSON.parse(localStorage.getItem("bookingInfo")));
  const [serviceItems] = useState(JSON.parse(localStorage.getItem("serviceItems")));
  const [bookingCreated, setBookingCreated] = useState(false);
  const [counter,setCounter] = useState(0);

  useEffect(() => {
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

    // Check if the booking has already been created
    if (!error && !bookingCreated && !loading) {
      dispatch(createBooking(booking));
      console.log("trigged");
      setBookingCreated(true); // Set a flag to indicate that the booking has been created
    }
  }, [error,loading,bookingCreated,bookItems,serviceItems]);

  useEffect(() => {
    // Handle success or error
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
