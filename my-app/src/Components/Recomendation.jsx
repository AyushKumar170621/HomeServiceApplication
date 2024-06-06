import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserService } from '../action/serviceAction';
import { myBookings, clearBookingErrors } from '../action/bookingAction';
import ServiceCard from './serviceCard';
import serviceRecommendations from './data/serviceRecommendations.json'

const Recommendation = () => {
    const dispatch = useDispatch();

    const { services, loading, error } = useSelector(state => state.services);
    const { bookErr, bookings } = useSelector(state => state.myBooking);

    useEffect(() => {
        dispatch(getAllUserService());
        dispatch(myBookings());
    }, [dispatch]);

    const getRecommendations = (bookings) => {
        const recommendedServices = new Set();
        bookings.forEach(booking => {
            console.log(booking);
            if (booking.serviceItems.name) {
                const relatedServices = Object.entries(serviceRecommendations).find(
                    ([key]) => key.toLowerCase() === booking.serviceItems.name.toLowerCase()
                );
                if (relatedServices) {
                    relatedServices[1].slice(0, 3).forEach(service => recommendedServices.add(service.toLowerCase()));
                }
            }
        });
        console.log(recommendedServices);
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
        <div className="container m-3">
            <div className="row">
                {recommendedServices.map(service => {
                    const serviceData = services.find(s => s.name && s.name.toLowerCase() === service);
                    return serviceData ? <ServiceCard key={serviceData._id} service={serviceData} /> : null;
                })}
            </div>
        </div>
    );
};

export default Recommendation;
