import React, { useReducer } from 'react'
import FurnitureContext from './furnitureContext';
import furnitureReducer from './furnitureReducer';
import axios from 'axios';

import {
    FURNITURE_ADDED,
    CLEAR_FURNITURE_MESSAGE,
    GET_ALL_FURNITURES_SUCCESS,
    DELETE_FURNITURE_FAILED,
    DELETE_FURNITURE_SUCCESS,
    FURNITURE_EDIT_FAILED,
    FURNITURE_EDIT_SUCCESS,
    USER_FURNITURES_REMOVE,
    USER_FURNITURES_ARCHIVE_TOGGLE,
    FURNITURE_ARCHIVE_TOGGLE
} from '../types';

const FurnitureState = props => {
    const initialState = {
        furnitures: [],
        furnitureMessage: null
    };

    const [state, dispatch] = useReducer(furnitureReducer, initialState);

    const addFurniture = async (data) => {
        const { title, description, price, soldFrom, condition, images } = data;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('soldFrom', soldFrom);
        formData.append('condition', condition);
        for (let index = 0; index < images.length; index++) {
            formData.append('images', images[index]);
        }

        try {
            // const result = await axios.post('/furniture', data, config);
            const result = await axios.post('/furniture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            dispatch({
                type: FURNITURE_ADDED,
                payload: result.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const clearFurnitureMessage = () => {
        dispatch({
            type: CLEAR_FURNITURE_MESSAGE
        })
    }

    const getAllFurnitures = async () => {
        try {
            const res = await axios.get('/furniture');
            dispatch({
                type: GET_ALL_FURNITURES_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteFurniture = async (itemId) => {
        try {
            await axios.delete('/furniture/' + itemId);
            dispatch({
                type: DELETE_FURNITURE_SUCCESS,
                payload: itemId
            })
        } catch (error) {
            dispatch({
                type: DELETE_FURNITURE_FAILED,
                payload: error.response.msg
            })
        }
    }

    const editFurniture = async (id, data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.patch(`/furniture/${id}`, data, config);
            dispatch({
                type: FURNITURE_EDIT_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: FURNITURE_EDIT_FAILED,
                payload: error.response.data.msg
            })
        }
    }

    const removeUserFurnitures = (userID) => {
        dispatch({
            type: USER_FURNITURES_REMOVE,
            payload: userID
        })
    }

    const toggleUserFurnituresArchived = (userID, boolState) => {
        dispatch({
            type: USER_FURNITURES_ARCHIVE_TOGGLE,
            payload: {
                userID,
                boolState
            }
        })
    }

    const toggleFurnitureArchived = async (id) => {
        try {
            const res = await axios.patch(`/toggleArchiveFurniture/${id}`);
            dispatch({
                type: FURNITURE_ARCHIVE_TOGGLE,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteFurnitureAdmin = async (id) => {
        try {
            await axios.delete(`/adminFurniture/${id}`);
            dispatch({
                type: DELETE_FURNITURE_SUCCESS,
                payload: id
            })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <FurnitureContext.Provider
            value={{
                furnitures: state.furnitures,
                furnitureMessage: state.furnitureMessage,
                addFurniture,
                clearFurnitureMessage,
                getAllFurnitures,
                deleteFurniture,
                editFurniture,
                removeUserFurnitures,
                toggleUserFurnituresArchived,
                toggleFurnitureArchived,
                deleteFurnitureAdmin
            }}
        >
            {props.children}
        </FurnitureContext.Provider>
    )
}

export default FurnitureState;