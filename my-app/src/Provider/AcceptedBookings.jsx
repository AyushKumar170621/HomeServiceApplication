import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-modal';
import "./prostyle.css";
import { getAcceptedBookings, clearBookingErrors, updateBookingProvider, setOneTimePassword  } from "../action/bookingAction";
import BookingCard from "../Admin/BookingCard";
import { UPDATE_BOOKING_RESET, SEND_OTP_RESET, COMPLETE_SERVICE_RESET } from "../constant/bookingConstants";

const AcceptedBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, bookings } = useSelector((state) => state.myBooking);
  const {otpSend} = useSelector((state) => state.otp);
  const { error: updateError, isUpdated } = useSelector((state) => state.booking);
  const [otpSentFor, setOtpSentFor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [otp, setOtp] = useState("");

  const sendOtpHandler = (id) => {
    dispatch(setOneTimePassword(id));
    setOtpSentFor(id);
    setIsModalOpen(true);
    setCurrentBookingId(id);
  };

  const completeServiceHandler = (e) => {
    e.preventDefault();
    dispatch(updateBookingProvider(currentBookingId, {'otp': otp , status:"Service Completed" }));
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
      toast.success("Booking Status Updated Successfully.Service Completed Successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          navigate("/provider/mybooking");
        },
      });
    }
    if (otpSend) {
      dispatch({ type: SEND_OTP_RESET });
      toast.success("OTP Sent Successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }

    dispatch(getAcceptedBookings());
  }, [dispatch, error, updateError, isUpdated, otpSend, navigate]);

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
                    {booking.bookingStatus === "Accepted" && (
                      <button
                        className="btn btn-secondary btn-lg m-2"
                        onClick={() => {
                          sendOtpHandler(booking._id);
                        }}
                        disabled={otpSentFor === booking._id}
                      >
                        {otpSentFor === booking._id ? "OTP Sent" : "Send OTP"}
                      </button>
                    )}
                  </center>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Complete Service"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Complete Service</h2>
        <form onSubmit={completeServiceHandler}>
          <div className="form-group">
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-lg m-2">
            Complete Service
          </button>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AcceptedBookings;
