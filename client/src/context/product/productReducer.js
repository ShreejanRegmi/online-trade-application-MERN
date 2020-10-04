import {
    SET_PRODUCT_LOADING,
    GET_SELECTED_PRODUCT_SUCCESS,
    GET_SELECTED_PRODUCT_FAILED
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_PRODUCT_LOADING:
            return {
                ...state,
                productLoading: true
            }
        case GET_SELECTED_PRODUCT_FAILED:
            return {
                ...state,
                product: {},
                productLoading: false,
            }
        case GET_SELECTED_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                productLoading: false
            }
        default:
            return state;
    }
}