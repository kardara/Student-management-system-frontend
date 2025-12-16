import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children, requiredRoles }) {
    const { user, loading, hasRole } = useAuth();

    console.log(user);

    if (loading) {
        return <div>Loading ...</div>
    }

    if (!user) {
        console.log("No user");

        return <Navigate to="/auth/login" replace />
    }

    // if (requiredRoles && !hasRole(requiredRoles)) {
    //     return <Navigate to="/unauthorized" replace />;

    // }
    if (user.role.toLowerCase() != requiredRoles.toLowerCase()) {
        console.log(user.role.toLowerCase(), "and", requiredRoles.toLowerCase());

        return <Navigate to="/unauthorized" replace />;

    }

    return children;
}
