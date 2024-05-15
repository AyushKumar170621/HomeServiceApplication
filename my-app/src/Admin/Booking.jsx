import React, { Fragment, useEffect } from "react";


import {
  getAllBookings,
  clearBookingErrors,
  deleteBooking,
} from "../action/bookingAction"; // Import booking-related actions

import { useNavigate } from "react-router-dom";
import BookingsCard from "./Ordercard"; // Assuming you have a component for rendering individual booking details
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_BOOKING_RESET } from "../constant/bookingConstants"; // Import booking-related constants

const Bookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, bookings } = useSelector((state) => state.allBookings);
  const { error: deleteError, isDeleted } = useSelector((state) => state.booking);

  const deleteBookingHandler = (id) => {
    dispatch(deleteBooking(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearBookingErrors());
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    if (deleteError) {
      dispatch(clearBookingErrors());
      toast.error(deleteError, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }

    if (isDeleted) {
      dispatch({ type: DELETE_BOOKING_RESET });
      toast.success("Booking Deleted Successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          navigate("/admin/bookings");
        },
      });
    }
    dispatch(getAllBookings());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  return (
    <Fragment>
     { (
        <Fragment>
          
          <ToastContainer />
          <div className="container-xxl py-5">
            <div className="container">
              <div
                className="section-title text-center mx-auto wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: "500px" }}
              >
                <h1 className="display-6">Bookings</h1>
              </div>
              {bookings &&
                bookings.map((booking, index) => (
                  <div
                    key={index}
                    className="panel .panel-primary border border-dark m-5 p-5"
                  >
                    <div class="panel-heading text-center text-primary m-5 p-5 fs-1">
                      BOOKING {index + 1}
                    </div>
                    <div class="panel-body">
                      <BookingsCard
                        booking={booking} // Pass booking details to BookingsCard component
                      />
                      <center>
                        <button
                          className="btn btn-primary btn-lg m-2"
                          onClick={() => {
                            deleteBookingHandler(booking._id); // Call deleteBookingHandler with booking id
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-dark btn-lg m-2"
                          onClick={() => {
                            navigate(`/admin/booking/${booking._id}`); // Navigate to booking details page
                          }}
                        >
                          Edit
                        </button>
                      </center>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        
        </Fragment>
      )}
    </Fragment>
  );
};

export default Bookings;
