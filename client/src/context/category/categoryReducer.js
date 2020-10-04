import { GET_ALL_CATEGORIES_SUCCESS } from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_SUCCESS:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
}