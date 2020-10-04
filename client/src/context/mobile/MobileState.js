import React, { useReducer } from 'react'
import MobileContext from './mobileContext';
import mobileReducer from './mobileReducer';
import axios from 'axios';

import {
    MOBILE_ADDED,
    CLEAR_MOBILE_MESSAGE,
    GET_ALL_MOBILES_SUCCESS,
    DELETE_MOBILE_SUCCESS,
    DELETE_MOBILE_FAILED,
    MOBILE_EDIT_SUCCESS,
    MOBILE_EDIT_FAILED,
    USER_MOBILES_REMOVE,
    USER_MOBILES_ARCHIVE_TOGGLE,
    MOBILE_ARCHIVE_TOGGLE
} from '../types';

const MobileState = props => {
    const initialState = {
        mobiles: [],
        mobileMessage: null
    };

    const [state, dispatch] = useReducer(mobileReducer, initialState);

    const addMobile = async data => {
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
            const res = await axios.post('/mobile', formData, config);
            dispatch({
                type: MOBILE_ADDED,
                payload: res.data
            })
        } catch (error) {
            console.error(error);
        }
    }

    const clearMobileMessage = () => {
        dispatch({
            type: CLEAR_MOBILE_MESSAGE
        })
    }

    const getAllMobiles = async () => {
        try {
            const res = await axios.get('/mobile');
            dispatch({
                type: GET_ALL_MOBILES_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMobile = async (itemId) => {
        try {
            await axios.delete('/mobile/' + itemId);
            dispatch({
                type: DELETE_MOBILE_SUCCESS,
                payload: itemId
            })
        } catch (error) {
            dispatch({
                type: DELETE_MOBILE_FAILED,
                payload: error.response.msg
            })
        }
    }

    const editMobile = async (id, data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.patch(`/mobile/${id}`, data, config);
            dispatch({
                type: MOBILE_EDIT_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: MOBILE_EDIT_FAILED,
                payload: error.response.data.msg
            })
        }
    }

    const removeUserMobiles = (userID) => {
        dispatch({
            type: USER_MOBILES_REMOVE,
            payload: userID
        })
    }

    const toggleUserMobilesArchived = (userID, boolState) => {
        dispatch({
            type: USER_MOBILES_ARCHIVE_TOGGLE,
            payload: {
                userID,
                boolState
            }
        })
    }

    const toggleMobileArchived = async (id) => {
        try {
            const res = await axios.patch(`/toggleArchiveMobile/${id}`);
            dispatch({
                type: MOBILE_ARCHIVE_TOGGLE,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMobileAdmin = async (id) => {
        try {
            await axios.delete(`/adminMobile/${id}`);
            dispatch({
                type: DELETE_MOBILE_SUCCESS,
                payload: id
            })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <MobileContext.Provider
            value={{
                mobiles: state.mobiles,
                mobileMessage: state.mobileMessage,
                addMobile,
                clearMobileMessage,
                getAllMobiles,
                deleteMobile,
                editMobile,
                removeUserMobiles,
                toggleUserMobilesArchived,
                toggleMobileArchived,
                deleteMobileAdmin
            }}
        >
            {props.children}
        </MobileContext.Provider>
    )
}

export default MobileState;