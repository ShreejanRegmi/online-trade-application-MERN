import { SET_ALERT, REMOVE_ALERT, SET_ALERT_LOADING_TRUE, SET_ALERT_LOADING_FALSE } from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                alerts: [...state.alerts, action.payload]
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.payload)
            }
        case SET_ALERT_LOADING_TRUE:
            return {
                ...state,
                alertLoading: true
            }
        case SET_ALERT_LOADING_FALSE:
            return {
                ...state,
                alertLoading: false
            }
        default:
            return state;
    }
}