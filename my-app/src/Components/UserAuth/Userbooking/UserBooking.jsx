import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myBookings, clearBookingErrors } from "../../../action/bookingAction";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../action/userAction";
import { toast, ToastContainer } from 'react-toastify';
import BookingCard from "./BookingCard";
import 'react-toastify/dist/ReactToastify.css';


const UserBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, bookings } = useSelector((state) => state.myBooking);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("in user");
    if (error) {
      toast.error(error, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearBookingErrors());
    }
    dispatch(myBookings());
    console.log("vaibhav");
  }, [dispatch, error]);

  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-sm-8 bg-secondary  mx-auto">
              <div
                className="section-title text-center mx-auto wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: "500px" }}
              >
                <p className="fs-5 fw-medium fst-italic">Your Booking</p>
                <h1 className="display-6">Check Your Booking</h1>
              </div>
              {bookings && bookings.map((booking, index) => (
                <div key={index}>
                  <BookingCard item={booking} status={booking.bookingStatus} />
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserBooking;
