import {
    VEHICLE_ADDED,
    CLEAR_VEHICLE_MESSAGE,
    GET_ALL_VEHICLES_SUCCESS,
    DELETE_VEHICLE_FAILED,
    DELETE_VEHICLE_SUCCESS,
    VEHICLE_EDIT_SUCCESS,
    VEHICLE_EDIT_FAILED,
    USER_VEHICLES_REMOVE,
    USER_VEHICLES_ARCHIVE_TOGGLE,
    VEHICLE_ARCHIVE_TOGGLE
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case VEHICLE_ADDED:
            return {
                ...state,
                vehicles: state.vehicles.concat([action.payload]),
                vehicleMessage: 'Ad for vehicle listed successfully!'
            };
        case CLEAR_VEHICLE_MESSAGE:
            return {
                ...state,
                vehicleMessage: null
            }
        case GET_ALL_VEHICLES_SUCCESS:
            return {
                ...state,
                vehicles: action.payload
            }
        case DELETE_VEHICLE_SUCCESS:
            return {
                ...state,
                vehicles: state.vehicles.filter(
                    vehicle => vehicle._id !== action.payload
                ),
                vehicleMessage: 'Ad for vehicle deleted successfully!'
            }
        case VEHICLE_EDIT_FAILED:
        case DELETE_VEHICLE_FAILED:
            return {
                ...state,
                vehicleMessage: action.payload
            }
        case VEHICLE_EDIT_SUCCESS:
            return {
                ...state,
                vehicles: state.vehicles.map(v =>
                    v._id === action.payload._id ? action.payload : v
                ),
                vehicleMessage: 'Ad for vehicle updated successfully!'
            }
        case USER_VEHICLES_REMOVE:
            return {
                ...state,
                vehicles: state.vehicles.filter(
                    p => p.addedBy !== action.payload
                )
            }
        case USER_VEHICLES_ARCHIVE_TOGGLE:
            let newArray = state.vehicles.slice();
            newArray.forEach((p) => {
                if (p.addedBy === action.payload.userID) {
                    p.userArchived = action.payload.boolState
                }
            })
            return {
                ...state,
                vehicles: newArray
            }
        case VEHICLE_ARCHIVE_TOGGLE:
            return {
                ...state,
                vehicles: state.vehicles.map(v =>
                    v._id === action.payload._id ? action.payload : v
                )
            }
        default:
            return state;
    }
}