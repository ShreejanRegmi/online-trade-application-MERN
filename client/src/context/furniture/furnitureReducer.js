import {
    FURNITURE_ADDED,
    CLEAR_FURNITURE_MESSAGE,
    GET_ALL_FURNITURES_SUCCESS,
    DELETE_FURNITURE_SUCCESS,
    DELETE_FURNITURE_FAILED,
    FURNITURE_EDIT_FAILED,
    FURNITURE_EDIT_SUCCESS,
    USER_FURNITURES_REMOVE,
    USER_FURNITURES_ARCHIVE_TOGGLE,
    FURNITURE_ARCHIVE_TOGGLE
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case FURNITURE_ADDED:
            return {
                ...state,
                furnitures: state.furnitures.concat([action.payload]),
                furnitureMessage: 'Ad for furniture listed successfully!'
            };
        case CLEAR_FURNITURE_MESSAGE:
            return {
                ...state,
                furnitureMessage: null
            }
        case GET_ALL_FURNITURES_SUCCESS:
            return {
                ...state,
                furnitures: action.payload
            }
        case DELETE_FURNITURE_SUCCESS:
            return {
                ...state,
                furnitures: state.furnitures.filter(
                    furniture => furniture._id !== action.payload
                ),
                furnitureMessage: 'Ad for furniture deleted successfully!'
            }
        case FURNITURE_EDIT_FAILED:
        case DELETE_FURNITURE_FAILED:
            return {
                ...state,
                furnitureMessage: action.payload
            }
        case FURNITURE_EDIT_SUCCESS:
            return {
                ...state,
                furnitures: state.furnitures.map(f =>
                    f._id === action.payload._id ? action.payload : f
                ),
                furnitureMessage: 'Ad for furniture updated successfully!'
            }
        case USER_FURNITURES_REMOVE:
            return {
                ...state,
                furnitures: state.furnitures.filter(
                    f => f.addedBy !== action.payload
                )
            }
        case USER_FURNITURES_ARCHIVE_TOGGLE:
            let newArray = state.furnitures.slice();
            newArray.forEach((p) => {
                if (p.addedBy === action.payload.userID) {
                    p.userArchived = action.payload.boolState
                }
            })
            return {
                ...state,
                furnitures: newArray
            }
        case FURNITURE_ARCHIVE_TOGGLE:
            return {
                ...state,
                furnitures: state.furnitures.map(f =>
                    f._id === action.payload._id ? action.payload : f
                )
            }
        default:
            return state;
    }
}