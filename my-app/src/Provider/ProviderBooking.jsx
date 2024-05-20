import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllProvidersBookings, clearBookingErrors, updateBookingProvider } from "../action/bookingAction"; // Update action import
import BookingCard from "../Admin/BookingCard";
import { UPDATE_BOOKING_RESET } from "../constant/bookingConstants"; // Import booking-related constants

const ProviderBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, bookings } = useSelector((state) => state.proBookings); // Update selector to providerBookings
  const { error: updateError, isUpdated } = useSelector((state) => state.booking);

  const acceptBookingHandler = (id) => {
    dispatch(updateBookingProvider(id, { status: "Accepted" })); // Update booking status to 'Accepted'
  };

  useEffect(() => {
    if (error) {
      dispatch(clearBookingErrors());
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    if (updateError) {
      dispatch(clearBookingErrors());
      toast.error(updateError, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_BOOKING_RESET });
      toast.success("Booking Status Updated Successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          navigate("/provider/booking"); // Update navigation path as needed
        },
      });
    }
    dispatch(getAllProvidersBookings()); // Fetch provider bookings
  }, [dispatch, error, updateError, isUpdated, navigate]);

  return (
    <Fragment>
      <ToastContainer />
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="section-title text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <h1 className="display-6">Provider Bookings</h1>
          </div>
          {bookings &&
            bookings.map((booking, index) => (
              <div
                key={index}
                className="panel panel-primary border border-dark m-5 p-5"
              >
                <div className="panel-heading text-center text-primary m-5 p-5 fs-1">
                  BOOKING {index + 1}
                </div>
                <div className="panel-body">
                  <BookingCard booking={booking} />
                  <center>
                  {booking.bookingStatus === "Processing" && (
                      <button
                        className="btn btn-primary btn-lg m-2"
                        onClick={() => {
                          acceptBookingHandler(booking._id);
                        }}
                      >
                        Accept
                      </button>
                    )}
                  </center>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProviderBooking;
