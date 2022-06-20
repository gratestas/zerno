import React from 'react'
import { Navigate,useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

const ProtectedAdminRoute = ({children}) => {
    const {token, user} = useAuth();
    const location = useLocation();
    console.log(user)
    if(!token) return <Navigate to="/auth" replace state={{from: location}}/>;
    return children;
}

export default ProtectedAdminRoute