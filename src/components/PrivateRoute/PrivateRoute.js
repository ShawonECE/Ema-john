import React, { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = () => {
    const location = useLocation();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        loggedInUser.email ? <Outlet/> : <Navigate to="/login" replace state={{from: location}} />
    );
};

export default PrivateRoute;