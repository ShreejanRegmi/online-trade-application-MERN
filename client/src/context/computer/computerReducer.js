import {
    COMPUTER_ADDED,
    CLEAR_COMPUTER_MESSAGE,
    GET_ALL_COMPUTERS_SUCCESS,
    DELETE_COMPUTER_FAILED,
    DELETE_COMPUTER_SUCCESS,
    COMPUTER_EDIT_SUCCESS,
    COMPUTER_EDIT_FAILED,
    USER_COMPUTERS_REMOVE,
    USER_COMPUTERS_ARCHIVE_TOGGLE,
    COMPUTER_ARCHIVE_TOGGLE
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case COMPUTER_ADDED:
            return {
                ...state,
                computers: state.computers.concat([action.payload]),
                computerMessage: 'Ad for computer listed successfully!'
            };
        case CLEAR_COMPUTER_MESSAGE:
            return {
                ...state,
                computerMessage: null
            }
        case GET_ALL_COMPUTERS_SUCCESS:
            return {
                ...state,
                computers: action.payload
            }
        case DELETE_COMPUTER_SUCCESS:
            return {
                ...state,
                computers: state.computers.filter(
                    computer => computer._id !== action.payload
                ),
                computerMessage: 'Ad for computer deleted successfully!'
            }
        case COMPUTER_EDIT_FAILED:
        case DELETE_COMPUTER_FAILED:
            return {
                ...state,
                computerMessage: action.payload
            }
        case COMPUTER_EDIT_SUCCESS:
            return {
                ...state,
                computers: state.computers.map(c =>
                    c._id === action.payload._id ? action.payload : c
                ),
                computerMessage: 'Ad for computer updated successfully!'
            }
        case USER_COMPUTERS_REMOVE:
            return {
                ...state,
                computers: state.computers.filter(
                    p => p.addedBy !== action.payload
                )
            }
        case USER_COMPUTERS_ARCHIVE_TOGGLE:
            let newArray = state.computers.slice();
            newArray.forEach((p) => {
                if (p.addedBy === action.payload.userID) {
                    p.userArchived = action.payload.boolState
                }
            })
            return {
                ...state,
                computers: newArray
            }
        case COMPUTER_ARCHIVE_TOGGLE:
            return {
                ...state,
                computers: state.computers.map(c =>
                    c._id === action.payload._id ? action.payload : c
                )
            }
        default:
            return state;
    }
}