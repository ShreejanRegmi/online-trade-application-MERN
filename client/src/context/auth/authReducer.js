import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    AUTH_ERROR,
    USER_LOADED,
    CLEAR_ERRORS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    LOGOUT,
    SET_EDIT_TRUE,
    SET_EDIT_FALSE,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAILED,
    USER_EDIT_PASSWORD_FAILED,
    USER_EDIT_PASSWORD_SUCCESS
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                isAdmin: action.payload.user.type === "admin" ? true : false
            };
        case LOGOUT:
        case LOGIN_FAILED:
        case AUTH_ERROR:
        case REGISTER_FAILED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
                isAdmin: null,
                isEdit: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case SET_LOADING_TRUE:
            return {
                ...state,
                loading: true
            }
        case SET_LOADING_FALSE:
            return {
                ...state,
                loading: false
            }
        case SET_EDIT_TRUE:
            return {
                ...state,
                isEdit: true
            }
        case SET_EDIT_FALSE:
            return {
                ...state,
                isEdit: false
            }
        case USER_EDIT_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: 'User edited successfully!'
            }
        case USER_EDIT_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case USER_EDIT_PASSWORD_FAILED:
        case USER_EDIT_PASSWORD_SUCCESS:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}