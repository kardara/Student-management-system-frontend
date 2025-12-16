import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicOnlyRoutes({children}) {

    
    const {user, loading} = useAuth();
    if (loading) {
        return <div>Loading ...</div>
    }
    if(user){
        return <Navigate to={`/${user.role}`} replace  />;
    }

  return children;
}
