import React from 'react';
import { Rating } from '@mui/material';

const ServiceReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        Service Review
      </div>
      <div className="card-body text-left">
        <h5 className="card-title"><b>User :</b>{review.userName}</h5> {/* Assuming userName is used for the name of the reviewer */}
        <p className="card-text"><b>Comments :</b>{review.comment}</p>
        <Rating {...options} />
      </div>
    </div>
  );
};

export default ServiceReviewCard;
