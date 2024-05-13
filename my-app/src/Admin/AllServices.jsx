import React, { Fragment, useEffect } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAdminServices, clearErrors } from "../action/serviceAction"; // Import actions for services

import { useDispatch, useSelector } from 'react-redux';
import ServiceCard from './serviceCard';
const AllServices = () => {
    const dispatch = useDispatch();
    const { error, services } = useSelector((state) => state.services); // Change to services

    useEffect(() => {
        if (error) {
            toast.error(error, {
                autoClose: 2000,
                position: toast.POSITION.TOP_CENTER,
            });
            dispatch(clearErrors());
        }

        dispatch(getAdminServices()); // Dispatch action to get all services
    }, [dispatch, error]);

    return (
        <Fragment>
           
            <ToastContainer />
            <div className='row d-flex justify-content-center m-5'>
                {services && services.map((service) => (<ServiceCard service={service} />))}
            </div>
            
        </Fragment>
    );
};

export default AllServices;
