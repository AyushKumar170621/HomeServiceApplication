import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getServiceDetails } from '../action/serviceAction';
import { Rating } from '@mui/material';

const ServiceCard = ({ service }) => {
    const dispatch = useDispatch();

    const options = {
        name: "service-rating",
        value: service.ratings,
        readOnly: true,
        precision: 0.5,
    };

  

    const maxDescriptionLength = 100;
    const truncatedDescription = service.description.length > maxDescriptionLength
        ? service.description.substring(0, maxDescriptionLength) + '...' : service.description;

    const handleClick = () => {
        dispatch(getServiceDetails(service._id));
    };

    return (
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="store-item position-relative text-center">
                <img className="img-fluid" src={service.images[0].url} alt="" />
                <div className="p-4">
                    <h4 className="mb-3">{service.name}</h4>
                    <Rating {...options} />
                    <h4 className="text-primary">'₹' {service.price}</h4>
                    <p>{truncatedDescription}</p>
                </div>
                <div className="store-overlay">
                    <Link to={`/service/${service._id}`}>
                        <button onClick={handleClick} className="btn btn-primary rounded-pill py-2 px-4 m-2">
                            More Detail <i className="fa fa-arrow-right ms-2"></i>
                        </button>
                    </Link>
                   
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
