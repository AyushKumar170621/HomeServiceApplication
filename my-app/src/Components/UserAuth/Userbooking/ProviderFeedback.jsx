import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../review.css";
import { NEW_REVIEW_RESET } from "../../../constant/userConstant";
import { newProviderReview, clearErrors } from "../../../action/userAction";
import { Rating } from '@mui/material';

const ProviderFeedback = ({ providerId, open, setVar}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const dispatch = useDispatch();

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      providerId,
      comment: reviewText,
      rating,
    };

    dispatch(newProviderReview(reviewData));
    setVar(!open);
    setRating(0);
    setReviewText('');
  };

  const { success, error } = useSelector((state) => state.proReview);

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
          <div className="col review">
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
        </div>
      )}
    </Fragment>
  );
};

export default ProviderFeedback;
