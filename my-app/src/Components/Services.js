import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getServices } from '../action/serviceAction';

import { Link } from 'react-router-dom';
import ServiceCard from "../Components/serviceCard"; // Assuming you have a ServiceCard component
;


const Service = () => {
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const {
        services,
        loading,
        error,
        servicesCount,
        resultPerPage,
        filteredServicesCount,
    } = useSelector((state) => state.services);

    const setCurrentPageNo = (e) => {
        if (e > 0 && filteredServicesCount - e * resultPerPage >= 0) {
            setCurrentPage(e);
        }
        else if (filteredServicesCount % resultPerPage !== 0 && (e - 1) * resultPerPage < filteredServicesCount) {
            setCurrentPage(e);
        }
    }

    const handleSearchInputChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleFilterSelect = (e) => {
        setCategory(e.target.value);
    }

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
        dispatch(getServices(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, error]);

    return (
        <Fragment>
            {
                <Fragment>
                   
                    <div className='container'>
                        <div className="input-group m-5">
                            <span className="input-group-text" style={{ backgroundColor: 'transparent' }}>
                                <i className="fa fa-search" style={{ color: 'green', borderColor: 'green' }}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search services..."
                                value={keyword}
                                autoFocus={true}
                                onChange={handleSearchInputChange}
                                style={{ borderColor: 'green', maxWidth: '80%' }}
                            />
                            {/* No need for a category filter for services */}
                        </div>
                    </div>
                    <div className="container-xxl py-5">
                        <div className="container">
                            <div className="section-title text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ "maxWidth": "500px" }}>
                                <p className="fs-5 fw-medium fst-italic text-primary">Service Directory</p>
                                <h1 className="display-6">Explore our services</h1>
                            </div>
                            <div className="row g-4">
                                {services && services.map((service) => <ServiceCard key={service._id} service={service} />)}
                                <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                                    <Link className="btn btn-primary rounded-pill py-3 px-5" onClick={() => { setCurrentPageNo(currentPage - 1) }}>Prev</Link>
                                    <Link className="btn btn-primary rounded-pill py-3 px-5" onClick={() => { setCurrentPageNo(currentPage + 1) }}>Next</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </Fragment>}
        </Fragment>
    );
};

export default Service;
