import {
    MOBILE_ADDED,
    CLEAR_MOBILE_MESSAGE,
    GET_ALL_MOBILES_SUCCESS,
    DELETE_MOBILE_FAILED,
    DELETE_MOBILE_SUCCESS,
    MOBILE_EDIT_SUCCESS,
    MOBILE_EDIT_FAILED,
    USER_MOBILES_REMOVE,
    USER_MOBILES_ARCHIVE_TOGGLE,
    MOBILE_ARCHIVE_TOGGLE
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case MOBILE_ADDED:
            return {
                ...state,
                mobiles: state.mobiles.concat([action.payload]),
                mobileMessage: 'Ad for mobile listed successfully!'
            };
        case CLEAR_MOBILE_MESSAGE:
            return {
                ...state,
                mobileMessage: null
            }
        case GET_ALL_MOBILES_SUCCESS:
            return {
                ...state,
                mobiles: action.payload
            }
        case DELETE_MOBILE_SUCCESS:
            return {
                ...state,
                mobiles: state.mobiles.filter(
                    mobile => mobile._id !== action.payload
                ),
                mobileMessage: 'Ad for mobile deleted successfully!'
            }
        case MOBILE_EDIT_FAILED:
        case DELETE_MOBILE_FAILED:
            return {
                ...state,
                mobileMessage: action.payload
            }
        case MOBILE_EDIT_SUCCESS:
            return {
                ...state,
                mobiles: state.mobiles.map(p =>
                    p._id === action.payload._id ? action.payload : p
                ),
                mobileMessage: 'Ad for mobile updated successfully!'
            }
        case USER_MOBILES_REMOVE:
            return {
                ...state,
                mobiles: state.mobiles.filter(
                    p => p.addedBy !== action.payload
                )
            }
        case USER_MOBILES_ARCHIVE_TOGGLE:
            let newArray = state.mobiles.slice();
            newArray.forEach((p) => {
                if (p.addedBy === action.payload.userID) {
                    p.userArchived = action.payload.boolState
                }
            })
            return {
                ...state,
                mobiles: newArray
            }
        case MOBILE_ARCHIVE_TOGGLE:
            return {
                ...state,
                mobiles: state.mobiles.map(p =>
                    p._id === action.payload._id ? action.payload : p
                )
            }
        default:
            return state;
    }
}