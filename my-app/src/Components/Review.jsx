import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./review.css";
import { NEW_REVIEW_RESET } from "../constant/serviceConstants"; // Assuming you have service-related constants
import { newReview, clearErrors } from "../action/serviceAction"; // Assuming you have service-related actions
import { Rating } from '@mui/material';
import ServiceReviewCard from "./ReviewCard"; // Assuming you have a component for service reviews

const ServiceReview = ({ serviceId, open, setVar, reviews }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const dispatch = useDispatch();

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      serviceId,
      comment: reviewText,
      rating,
    };

    dispatch(newReview(reviewData));
    setVar(!open);
    setRating(0);
    setReviewText('');
  };

  const { success, error } = useSelector((state) => state.newReview);

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
    if (success) {
      window.alert("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, success, error]);

  return (
    <Fragment>
      {open && (
        <div className="row">
          <div className="col-sm-6 review">
            <h3 style={{ color: "green" }} className="form-group">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <Rating value={rating} onClick={(e) => setRating(e.target.value)} precision={0.5} />
              </div>
              <div className="form-group">
                <label>Review:</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <button className="btn btn-sm btn-primary" type="submit">Submit Review</button>
              </div>
            </form>
          </div>
          <div className="col-sm-5 m-5">
            {reviews && reviews.map((review) => (
              <ServiceReviewCard key={review._id} review={review} /> // Assuming each review has a unique ID
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ServiceReview;
