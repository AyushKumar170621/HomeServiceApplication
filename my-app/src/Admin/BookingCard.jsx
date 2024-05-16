import React, { useState } from "react";

const BookingCard = ({ booking }) => {
  const { service, date, status } = booking;
  const [bookingDate] = useState(new Date(date));
  const formattedDate = bookingDate.toDateString();

  return (
    <div className="card mb-4 w-100">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={booking.serviceItems.image}
            className="img-fluid rounded-start"
            alt="Service"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body text-center">
            <h2 className="card-title h1">{booking.serviceItems.name}</h2>
            <p className="card-text h3">{booking.serviceDate.match(/^\d{4}-\d{2}-\d{2}/)[0]}</p>
            <p className="card-text h3">
              <b>Price:</b> {booking.totalPrice}
            </p>
            <p className="card-text h3">
              <small className="text-body-secondary text-success">
                Status: {booking.bookingStatus}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
