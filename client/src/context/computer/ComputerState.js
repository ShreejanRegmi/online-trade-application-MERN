import React, { useReducer } from 'react'
import ComputerContext from './computerContext';
import computerReducer from './computerReducer';
import axios from 'axios';

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

const ComputerState = props => {
    const initialState = {
        computers: [],
        computerMessage: null
    };

    const [state, dispatch] = useReducer(computerReducer, initialState);

    const addComputer = async data => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { title, description, price, soldFrom, condition, brand, images } = data;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('soldFrom', soldFrom);
        formData.append('condition', condition);
        formData.append('brand', brand);

        for (let index = 0; index < images.length; index++) {
            formData.append('images', images[index]);
        }

        try {
            const res = await axios.post('/computer', formData, config);
            dispatch({
                type: COMPUTER_ADDED,
                payload: res.data
            })
        } catch (error) {
            console.error(error);
        }
    }

    const clearComputerMessage = () => {
        dispatch({
            type: CLEAR_COMPUTER_MESSAGE
        })
    }

    const getAllComputers = async () => {
        try {
            const res = await axios.get('/computer');
            dispatch({
                type: GET_ALL_COMPUTERS_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComputer = async (itemId) => {
        try {
            await axios.delete('/computer/' + itemId);
            dispatch({
                type: DELETE_COMPUTER_SUCCESS,
                payload: itemId
            })
        } catch (error) {
            dispatch({
                type: DELETE_COMPUTER_FAILED,
                payload: error.response.msg
            })
        }
    }

    const editComputer = async (id, data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.patch(`/computer/${id}`, data, config);
            dispatch({
                type: COMPUTER_EDIT_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: COMPUTER_EDIT_FAILED,
                payload: error.response.data.msg
            })
        }
    }

    const removeUserComputers = (userID) => {
        dispatch({
            type: USER_COMPUTERS_REMOVE,
            payload: userID
        })
    }

    const toggleUserComputersArchived = (userID, boolState) => {
        dispatch({
            type: USER_COMPUTERS_ARCHIVE_TOGGLE,
            payload: {
                userID,
                boolState
            }
        })
    }

    const toggleComputerArchived = async (id) => {
        try {
            const res = await axios.patch(`/toggleArchiveComputer/${id}`);
            dispatch({
                type: COMPUTER_ARCHIVE_TOGGLE,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComputerAdmin = async (id) => {
        try {
            await axios.delete(`/adminComputer/${id}`);
            dispatch({
                type: DELETE_COMPUTER_SUCCESS,
                payload: id
            })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <ComputerContext.Provider
            value={{
                computers: state.computers,
                computerMessage: state.computerMessage,
                addComputer,
                clearComputerMessage,
                getAllComputers,
                deleteComputer,
                editComputer,
                removeUserComputers,
                toggleUserComputersArchived,
                toggleComputerArchived,
                deleteComputerAdmin
            }}
        >
            {props.children}
        </ComputerContext.Provider>
    )
}

export default ComputerState;