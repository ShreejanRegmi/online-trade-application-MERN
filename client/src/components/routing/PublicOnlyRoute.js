import React from 'react'
// import AuthContext from '../../context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const PublicOnlyRoute = ({ component: Component, ...rest }) => {
    // const authContext = useContext(AuthContext);
    // const { isAuthenticated, loading } = authContext;

    return (
        <Route {...rest} render={props => localStorage.token ? (
            <Redirect to='/' />
        )
            :
            (
                <Component {...props} />
            )} />
    )
}

export default PublicOnlyRoute
