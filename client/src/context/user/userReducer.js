import { SET_USER_LOADING_TRUE, GET_SELECTED_USER_SUCCESS, GET_USER_ITEMS_SUCCESS, SET_USER_ITEMS_LOADING,
GET_USER_ITEMS_FAILED } from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_USER_LOADING_TRUE:
            return {
                ...state,
                userLoading: true
            }
        case GET_SELECTED_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                selectedUser: action.payload
            }
        case SET_USER_ITEMS_LOADING:
            return {
                ...state,
                itemsLoading: true
            }
        case GET_USER_ITEMS_SUCCESS:
            return {
                ...state,
                addedFurnitures: action.payload.furnitureData,
                addedVehicles: action.payload.vehicleData,
                addedMobiles: action.payload.mobileData,
                addedComputers: action.payload.computerData,
                itemsLoading: false
            }
        case GET_USER_ITEMS_FAILED:
            return {
                ...state,
                addedFurnitures: [],
                addedVehicles: [],
                addedMobiles: [],
                addedComputers: [],
                itemsLoading: false
            }
        default:
            return state;
    }
}