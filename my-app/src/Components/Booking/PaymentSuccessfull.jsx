import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createBooking } from "../../action/bookingAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccessfull = () => {
  const style = {
    width: "200px",
    margin: "auto",
    backgroundColor: "#CCC",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.newBooking);
  const [searchParams] = useSearchParams();
  const [bookItems] = useState(JSON.parse(localStorage.getItem("bookingInfo")));
  const [serviceItems] = useState(
    JSON.parse(localStorage.getItem("serviceItems"))
  );
  const [bookingCreated, setBookingCreated] = useState(false);
  const [counter, setCounter] = useState(0);
  const bookingCreatedRef = useRef(false);

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
    if (!error && !bookingCreatedRef.current && !loading) {
      dispatch(createBooking(booking))
        .then((result) => {
          console.log(result);
          if(result.success === true)
            {
              toast.success("Booked Successfully", {
                autoClose: 2000,
                position: toast.POSITION.TOP_CENTER,
                onClose: () => {
                  navigate("/");
                },
              });
            }
        })
        .catch((err) => {
          toast.error("Booking failed! Retry later.",{
            autoClose: 2000,
                position: toast.POSITION.TOP_CENTER,
                onClose: () => {
                  navigate("/");
                },
              });
        });
      console.log("trigged");
      bookingCreatedRef.current = true;
      // setBookingCreated(true); // Set a flag to indicate that the booking has been created
    }
  }, [error, loading, bookItems, serviceItems]);


  return (
    <div style={style}>
      <ToastContainer />
      Payment Successful
    </div>
  );
};

export default PaymentSuccessfull;