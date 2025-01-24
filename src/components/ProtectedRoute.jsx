import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-hot-toast';

const ProtectedRoute = ({ children, requiredRoles }) => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log("dtoken", decodedToken);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                toast.error('Your session is expired, please login again');
                return <Navigate to="/login" />;
            }

            if (requiredRoles && !requiredRoles.includes(decodedToken.role)) {
                toast.error('Access denied. You do not have permission to view this page.');
                return <Navigate to="/unauthorized" />; 
            }

            return children;
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            return <Navigate to="/login" />;
        }
    } else {
        toast.error('Please login to access this page.');
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
