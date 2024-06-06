import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserService } from '../action/serviceAction';
import { myBookings, clearBookingErrors } from '../action/bookingAction';
import ServiceCard from './serviceCard';
import serviceRecommendations from './data/serviceRecommendations.json'

const Recommendation = () => {
    const dispatch = useDispatch();

    const { services, loading, error } = useSelector(state => state.services);
    const { bookErr=error, bookings } = useSelector(state => state.myBooking);

    useEffect(() => {
        dispatch(getAllUserService());
        dispatch(myBookings());
    }, [dispatch]);

    const getRecommendations = (bookings) => {
        const recommendedServices = new Set();
        bookings.forEach(booking => {
            const relatedServices = Object.entries(serviceRecommendations).find(
                ([key]) => key.toLowerCase() === booking.serviceName.toLowerCase()
            );
            if (relatedServices) {
                relatedServices[1].slice(0, 2).forEach(service => recommendedServices.add(service.toLowerCase()));
            }
        });
        return Array.from(recommendedServices);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const recommendedServices = getRecommendations(bookings);

    return (
        <div className="container">
            <div className="row">
                {recommendedServices.map(service => {
                    const serviceData = services.find(s => s.name.toLowerCase() === service);
                    return serviceData ? <ServiceCard key={serviceData._id} service={serviceData} /> : null;
                })}
            </div>
        </div>
    );
};

export default Recommendation;
