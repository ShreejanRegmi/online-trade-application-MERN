import React, { useReducer } from 'react'
import FeedbackContext from './feedbackContext';
import feedbackReducer from './feedbackReducer'
import axios from 'axios';

import {
    FEEDBACK_ADDED,
    CLEAR_MESSAGE,
    ALL_FEEDBACKS_LOADED,
    SET_REVIEWED_SUCCESS,
    DELETE_FEEDBACK_SUCCESS
} from '../types';

const FeedbackState = props => {
    const initialState = {
        feedbacks: [],
        feedbackMessage: null
    };
    const [state, dispatch] = useReducer(feedbackReducer, initialState);

    const addFeedback = async data => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const result = await axios.post('/feedbacks', data, config);
            dispatch({
                type: FEEDBACK_ADDED,
                payload: result.data
            })
        } catch (error) {
            console.error(error);
        }
    }

    const clearMessage = () => {
        dispatch({
            type: CLEAR_MESSAGE
        })
    }

    const getAllFeedbacks = async () => {
        try {
            const result = await axios.get('/allFeedbacks');
            dispatch({
                type: ALL_FEEDBACKS_LOADED,
                payload: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const setReviewed = async (id) => {
        try {
            const result = await axios.patch(`/setReviewed/${id}`);
            dispatch({
                type: SET_REVIEWED_SUCCESS,
                payload: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteFeedback = async (id) => {
        try {
            await axios.delete(`/feedback/${id}`);
            dispatch({
                type: DELETE_FEEDBACK_SUCCESS,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const sendEmail = async (data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/email', data, config);
            return res.data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    }

    return (
        <FeedbackContext.Provider
            value={{
                feedbacks: state.feedbacks,
                feedbackMessage: state.feedbackMessage,
                addFeedback,
                clearMessage,
                getAllFeedbacks,
                setReviewed,
                deleteFeedback,
                sendEmail
            }}
        >
            {props.children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackState;
