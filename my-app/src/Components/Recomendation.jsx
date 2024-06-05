import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServices } from '../action/serviceAction';
import ServiceCard from './serviceCard';

const Recommendation = () => {
    const dispatch = useDispatch();

    const { services, loading, error } = useSelector(state => state.services);

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <div className="row">
                {services.map(service => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default Recommendation;
