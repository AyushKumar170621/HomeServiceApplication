import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { getServiceDetails } from '../action/serviceAction';
import { Rating } from '@mui/material';
import { addServiceItems } from '../action/paymentAction';

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

    const handleBook = () => {
        dispatch(addServiceItems(service._id));
    };

    const positiveReviews = service.posCount; 
    const totalReviews = service.numOfReviews; 
    console.log("the reerer",positiveReviews,totalReviews)
    if(totalReviews>0)
var  percentage=(positiveReviews/totalReviews)*100;
    const showThumbsUp = totalReviews > 0 && (positiveReviews / totalReviews) > 0.5;

    return (
        <>
            <style>
                {`
                    .icon-container {
                        display: flex;
                        justify-content: center;
                        gap: 10px;
                        margin-top: 10px;
                    }
                    
                    .icon {
                        cursor: pointer;
                        font-size: 24px;
                    }
                    
                    .thumbs-up {
                        color: green;
                    }
                    
                    .thumbs-down {
                        color: red;
                    }
                `}
            </style>
            <div className="col-lg-4 col-md-6 mx-auto">
                <div className="box">
                    <div className="img-box">
                        <img className="img-fluid" src={service.images[0].url} alt="" />
                    </div>
                    <div className="detail-box">
                        <h4>{service.name}</h4>
                        <Rating {...options} />
                        <h4 className="text-primary">{'₹' + service.price}</h4>
                        <p>{truncatedDescription}</p>
                    </div>
                    <div className="store-overlay">
                        <Link to={`/service/${service._id}`}>
                            <button onClick={handleClick} className="btn btn-primary rounded-pill py-2 px-4 m-2">
                                More Detail <i className="fa fa-arrow-right ms-2"></i>
                            </button>
                        </Link>
                        <Link to={'/product/locationinfo'}>
                            <button onClick={handleBook} className='btn btn-primary rounded-pill py-2 px-4 m-2'>
                                Book Now
                            </button>
                        </Link>
                        {showThumbsUp > 0.5 && 
                            <div className="icon-container">
                                <FontAwesomeIcon icon={faThumbsUp} className="icon thumbs-up" />
                                  <p>{percentage}</p>
                            </div>
                        }
                        {

                        }
                        
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceCard;
