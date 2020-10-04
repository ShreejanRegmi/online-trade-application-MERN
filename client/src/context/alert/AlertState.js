import React, { useReducer } from 'react'
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import uuid from 'uuid';

import { SET_ALERT, REMOVE_ALERT, SET_ALERT_LOADING_TRUE, SET_ALERT_LOADING_FALSE } from '../types';

const AlertState = props => {
    const initialState = {
        alerts: [],
        alertLoading: false
    };

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const setAlert = (type, msg, removeIn = 5000) => {
        const id = uuid.v4();
        dispatch({
            type: SET_ALERT,
            payload: { id, type, msg }
        });
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        }, removeIn);
    }

    const removeAlertOnClick = (id) => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }

    const setAlertLoadingTrue = () => {
        dispatch({
            type: SET_ALERT_LOADING_TRUE,
        })
    }

    const setAlertLoadingFalse = () => {
        dispatch({
            type: SET_ALERT_LOADING_FALSE,
        })
    }

    return (
        <AlertContext.Provider
            value={{
                alerts: state.alerts,
                alertLoading: state.alertLoading,
                setAlert,
                removeAlertOnClick,
                setAlertLoadingTrue,
                setAlertLoadingFalse
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;
