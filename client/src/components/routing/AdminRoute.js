import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { loading, isAdmin } = authContext;
    return (
        <Route {...rest} render={props => !isAdmin && !loading ? (
            <Redirect to='/' />
        )
            :
            (
                <Component {...props} />
            )} />
    )
}

export default AdminRoute;