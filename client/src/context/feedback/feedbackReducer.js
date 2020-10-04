import {
    FEEDBACK_ADDED,
    CLEAR_MESSAGE,
    ALL_FEEDBACKS_LOADED,
    SET_REVIEWED_SUCCESS,
    DELETE_FEEDBACK_SUCCESS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case FEEDBACK_ADDED:
            return {
                ...state,
                feedbacks: state.feedbacks.concat([action.payload]),
                feedbackMessage: 'Feedback sent'
            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                feedbackMessage: null
            }
        case ALL_FEEDBACKS_LOADED:
            return {
                ...state,
                feedbacks: action.payload
            }
        case SET_REVIEWED_SUCCESS:
            return {
                ...state,
                feedbacks: state.feedbacks.map(f =>
                    f._id === action.payload._id ? action.payload : f
                )
            }
        case DELETE_FEEDBACK_SUCCESS:
            return {
                ...state,
                feedbacks: state.feedbacks.filter(f => 
                    f._id !== action.payload
                )
            }
        default:
            return state;
    }
}