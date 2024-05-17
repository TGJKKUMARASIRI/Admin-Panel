import React from 'react';
import { Navigate } from 'react-router-dom';
import useFlexaroUser from '../flexaro_user'; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useFlexaroUser();

    if (isLoading) {
        // Show a loading indicator while checking authentication
        return <div>Loading...</div>;
    }

    if (!user) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If the user is authenticated, render the children components
    return children;
};

export default ProtectedRoute;