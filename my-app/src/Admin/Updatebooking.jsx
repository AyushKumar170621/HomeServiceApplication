import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceCard from './Ordercard';
import { updateService, clearErrors, getServiceDetails } from '../action/serviceAction';
import { UPDATE_SERVICE_RESET } from '../constant/serviceConstants';
import { useParams, useNavigate } from 'react-router-dom';

const Updatebooking = () => {
    const { id } = useParams();
    const { service, error, loading } = useSelector((state) => state.serviceDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.service);
    const [updatedService, setUpdatedService] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateServiceSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateService(id, updatedService));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedService({ ...updatedService, [name]: value });
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            dispatch(clearErrors());
        }
        if (updateError) {
            toast.error(updateError, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success('Service Updated Successfully', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            dispatch({ type: UPDATE_SERVICE_RESET });
            navigate('/admin/allservice');
        }
        dispatch(getServiceDetails(id));
    }, [dispatch, error, id, isUpdated, updateError, navigate]);

    return (
        <Fragment>
            <ToastContainer />
            {service && (
                <div className="panel .panel-primary border border-dark m-5 p-5">
                    <div className="panel-heading text-center text-primary m-5 p-5 fs-1">SERVICE</div>
                    <div className="panel-body text-center">
                        <ServiceCard service={service} />
                        <form onSubmit={updateServiceSubmitHandler}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={updatedService.name || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={updatedService.description || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={updatedService.price || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="availability">Availability</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="availability"
                                    name="availability"
                                    value={updatedService.availability || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary m-2">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Updatebooking;
