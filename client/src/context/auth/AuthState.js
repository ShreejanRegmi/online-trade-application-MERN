import React, { useReducer, useContext } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';

import setToken from '../../utils/setToken';
import deleteToken from '../../utils/deleteToken';

import AlertContext from '../alert/alertContext';
import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_ERRORS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    LOGOUT,
    SET_EDIT_TRUE,
    SET_EDIT_FALSE,
    USER_EDIT_FAILED,
    USER_EDIT_SUCCESS,
    USER_EDIT_PASSWORD_FAILED,
    USER_EDIT_PASSWORD_SUCCESS
} from '../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null,
        isAdmin: null,
        isEdit: false
    }
    const [state, dispatch] = useReducer(authReducer, initialState);

    const alertContext = useContext(AlertContext);
    const { setAlertLoadingTrue, setAlertLoadingFalse } = alertContext;

    //load user function
    const loadUser = async () => {
        setLoadingTrue();
        if (localStorage.token)
            setToken(localStorage.token);
        try {
            const res = await axios.get('/me');
            let isAdmin = (res.data.type === "admin") ? true : false;
            dispatch({
                type: USER_LOADED,
                payload: { user: res.data, isAdmin }
            })
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    //register user function
    const register = async data => {
        setLoadingTrue();
        setAlertLoadingTrue();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/users', data, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data  //token and user is sent to reducer
            })
            loadUser();
            setAlertLoadingFalse();
        } catch (error) {
            dispatch({
                type: REGISTER_FAILED,
                payload: error.response.data.msg
            })
            setAlertLoadingFalse();
        }
    }

    const editUser = async (data) => {
        setLoadingTrue();
        setAlertLoadingTrue();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.patch(`/users`, data, config);
            dispatch({
                type: USER_EDIT_SUCCESS,
                payload: res.data
            })
            setAlertLoadingFalse();
        } catch (error) {
            dispatch({
                type: USER_EDIT_FAILED,
                payload: error.response.data.msg
            })
            setAlertLoadingFalse();
        }
    }

    const editUserPassword = async (data) => {
        setLoadingTrue();
        setAlertLoadingTrue();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.patch('/users/password', data, config);
            dispatch({
                type: USER_EDIT_PASSWORD_SUCCESS,
                payload: res.data.msg
            })
            setAlertLoadingFalse();
        } catch (error) {
            dispatch({
                type: USER_EDIT_PASSWORD_FAILED,
                payload: error.response.data.msg
            })
            setAlertLoadingFalse();
        }
    }

    //login user function
    const login = async data => {
        setLoadingTrue();
        setAlertLoadingTrue();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/users/login', data, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            setAlertLoadingFalse();
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAILED,
                payload: error.response.data.msg
            })
            setAlertLoadingFalse();
        }
    }

    //logout user function
    const logout = async () => {
        try {
            await axios.get('/users/logout');
            deleteToken();
            dispatch({
                type: LOGOUT
            })
        } catch (error) {
            console.log(error);
        }

    }

    //SET_LOADING_TRUE
    const setLoadingTrue = () => {
        dispatch({ type: SET_LOADING_TRUE })
    }

    //SET_LOADING_FALSE
    const setLoadingFalse = () => {
        dispatch({ type: SET_LOADING_FALSE })
    }

    //clear errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS })
    }

    //SET_EDIT_MODE_TRUE
    const setEditTrue = () => {
        dispatch({ type: SET_EDIT_TRUE })
    }

    //SET_EDIT_MODE_FALSE
    const setEditFalse = () => {
        dispatch({ type: SET_EDIT_FALSE })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                user: state.user,
                isEdit: state.isEdit,
                isAdmin: state.isAdmin,
                register,
                clearErrors,
                loadUser,
                login,
                logout,
                setLoadingTrue,
                setLoadingFalse,
                setEditTrue,
                setEditFalse,
                editUser,
                editUserPassword
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;