import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ServiceReview from "./Review"; // Assuming you have a component for service reviews
import { clearErrors, getServiceDetails } from "../action/serviceAction"; // Assuming you have service-related actions
import { Link, useParams } from "react-router-dom";

import { Rating } from '@mui/material';
// import { addToCartService } from "../action/"; // Assuming you have actions for adding service to cart

const ServiceDescription = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }
  const dispatch = useDispatch();
  const { loading, service, error } = useSelector(
    (state) => state.serviceDetails
  );

  const addToCartHandler = () => {
    // dispatch(addToCartService(service._id)); // Adjusted for service ID
    window.alert("Service successfully added to cart");
  }

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getServiceDetails(id));
  }, [dispatch, id, error]);

  return (
    <Fragment>
      {loading ? "Loading...." : (
        <Fragment>
          
          <div className="container-xxl py-5">
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                  <img
                    className="img-fluid artimg"
                    src={service.images[0].url} // Assuming service images are available
                    alt=""
                  />
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                  <div className="section-title">
                    <h1 className="display-6">{service.name}</h1>
                    <h4 className="text-primary">
                      Price: &#x20a8; {service.price} / Hour {/* Adjusted for service price */}
                    </h4>
                    <Rating value={service.ratings} readOnly={true} precision={0.5} /> {/* Assuming service ratings are available */}
                  </div>
                  <p className="mb-4">{service.description}</p>
                  <Link
                    className="btn btn-primary rounded-pill py-2 px-4 m-2"
                    onClick={addToCartHandler}
                  >
                    Book Service <i className="fa fa-cart-plus ms-2"></i> {/* Adjusted for service booking */}
                  </Link>
                  <Link
                    onClick={handleToggle}
                    className="btn btn-primary rounded-pill py-2 px-4 m-2"
                  >
                    Submit a Review <i className="fa fa-thumbs-up ms-2"></i> {/* Adjusted for submitting service reviews */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <ServiceReview serviceId={service._id} open={isOpen} setVar={setIsOpen} reviews={service.reviews} /> {/* Assuming service reviews are available */}

        </Fragment>
      )}
    </Fragment>
  );
};

export default ServiceDescription;
