import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProviderProtectedRoute = () => {
    const { user,loading } = useSelector((state) => state.user);

    console.log("ProviderProtectedRoute - user:", user); // Debug log
    console.log("ProviderProtectedRoute - isLoading:", loading); 
    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }
    if (!user) {
      return <Navigate to="/login" />; // Redirect to login if user is not authenticated
    }
  
    if (user.role !== "provider") {
      return <Navigate to="/" />; // Redirect to home if user is not a provider
    }
  
    return <Outlet />;
}

export default ProviderProtectedRoute