import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from './common';

// handle the private routes
function PrivateRoute() {
    return (
        getToken() ? <Outlet/> : <Navigate to='/' />
        )
}

export default PrivateRoute;