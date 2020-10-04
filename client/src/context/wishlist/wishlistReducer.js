import { GET_WISHES_SUCCESS, WISH_ADDED, SET_WISH_LOADING, CLEAR_WISHES, ONE_WISH_DELETED } from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_WISHES_SUCCESS:
            return {
                ...state,
                addedWishes: action.payload,
                productsIds: action.payload.map(w => w.productAdded._id),
                wishesLoading: false
            }
        case WISH_ADDED:
            return {
                ...state,
                addedWishes: state.addedWishes.concat([action.payload]),
                productsIds: state.productsIds.concat([action.payload.productAdded._id]),
                wishesLoading: false
            }
        case SET_WISH_LOADING:
            return {
                ...state,
                wishesLoading: true
            }
        case CLEAR_WISHES:
            return {
                addedWishes: [],
                productsIds: [],
                wishesLoading: false
            }
        case ONE_WISH_DELETED:
            return {
                ...state,
                addedWishes: state.addedWishes.filter(
                    w => w._id !== action.payload.wishId
                ),
                productsIds: state.productsIds.filter(
                    p => p !== action.payload.productId
                ),
                wishesLoading: false
            }
        default:
            return state;
    }
}