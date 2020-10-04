import React, { useReducer } from 'react'
import VehicleContext from './vehicleContext';
import vehicleReducer from './vehicleReducer';
import axios from 'axios';

import {
    VEHICLE_ADDED,
    CLEAR_VEHICLE_MESSAGE,
    GET_ALL_VEHICLES_SUCCESS,
    DELETE_VEHICLE_FAILED,
    DELETE_VEHICLE_SUCCESS,
    VEHICLE_EDIT_SUCCESS,
    VEHICLE_EDIT_FAILED,
    USER_VEHICLES_REMOVE,
    USER_VEHICLES_ARCHIVE_TOGGLE,
    VEHICLE_ARCHIVE_TOGGLE
} from '../types';

const VehicleState = props => {
    const initialState = {
        vehicles: [],
        vehicleMessage: null
    };

    const [state, dispatch] = useReducer(vehicleReducer, initialState);

    const addVehicle = async data => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { title, description, price, soldFrom, condition, brand, images, kmDriven, mfgdYear } = data;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('soldFrom', soldFrom);
        formData.append('condition', condition);
        formData.append('brand', brand);
        formData.append('kmDriven', kmDriven);
        formData.append('mfgdYear', mfgdYear);

        for (let index = 0; index < images.length; index++) {
            formData.append('images', images[index]);
        }


        try {
            const res = await axios.post('/vehicle', formData, config);
            dispatch({
                type: VEHICLE_ADDED,
                payload: res.data
            })
        } catch (error) {
            console.error(error);
        }
    }

    const clearVehicleMessage = () => {
        dispatch({
            type: CLEAR_VEHICLE_MESSAGE
        })
    }

    const getAllVehicles = async () => {
        try {
            const res = await axios.get('/vehicle');
            dispatch({
                type: GET_ALL_VEHICLES_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteVehicle = async (itemId) => {
        try {
            await axios.delete('/vehicle/' + itemId);
            dispatch({
                type: DELETE_VEHICLE_SUCCESS,
                payload: itemId
            })
        } catch (error) {
            dispatch({
                type: DELETE_VEHICLE_FAILED,
                payload: error.response.msg
            })
        }
    }

    const editVehicle = async (id, data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.patch(`/vehicle/${id}`, data, config);
            dispatch({
                type: VEHICLE_EDIT_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: VEHICLE_EDIT_FAILED,
                payload: error.response.data.msg
            })
        }
    }

    const removeUserVehicles = (userID) => {
        dispatch({
            type: USER_VEHICLES_REMOVE,
            payload: userID
        })
    }

    const toggleUserVehiclesArchived = (userID, boolState) => {
        dispatch({
            type: USER_VEHICLES_ARCHIVE_TOGGLE,
            payload: {
                userID,
                boolState
            }
        })
    }

    const toggleVehicleArchived = async (id) => {
        try {
            const res = await axios.patch(`/toggleArchiveVehicle/${id}`);
            dispatch({
                type: VEHICLE_ARCHIVE_TOGGLE,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteVehicleAdmin = async (id) => {
        try {
            await axios.delete(`/adminVehicle/${id}`);
            dispatch({
                type: DELETE_VEHICLE_SUCCESS,
                payload: id
            })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <VehicleContext.Provider
            value={{
                vehicles: state.vehicles,
                vehicleMessage: state.vehicleMessage,
                addVehicle,
                clearVehicleMessage,
                getAllVehicles,
                deleteVehicle,
                editVehicle,
                removeUserVehicles,
                toggleUserVehiclesArchived,
                toggleVehicleArchived,
                deleteVehicleAdmin
            }}
        >
            {props.children}
        </VehicleContext.Provider>
    )
}

export default VehicleState;