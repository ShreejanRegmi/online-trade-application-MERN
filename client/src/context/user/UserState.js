import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import axios from 'axios';

import {
    SET_USER_LOADING_TRUE,
    GET_SELECTED_USER_SUCCESS,
    GET_USER_ITEMS_SUCCESS,
    SET_USER_ITEMS_LOADING,
    GET_USER_ITEMS_FAILED
} from '../types';

const UserState = props => {
    const initialState = {
        selectedUser: {},
        userLoading: false,
        addedFurnitures: [],
        addedMobiles: [],
        addedVehicles: [],
        addedComputers: [],
        itemsLoading: false
    }

    const [state, dispatch] = useReducer(userReducer, initialState);

    const getSelectedUser = async id => {
        setUserLoadingTrue();
        try {
            const res = await axios.get(`/user/${id}`);
            dispatch({
                type: GET_SELECTED_USER_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            console.error(error);
        }
    }

    const setUserLoadingTrue = () => {
        dispatch({
            type: SET_USER_LOADING_TRUE
        })
    }

    const setItemsLoading = () => {
        dispatch({
            type: SET_USER_ITEMS_LOADING
        })
    }

    const getUserItems = async (id) => {
        setItemsLoading();
        try {
            const furnitures = await axios.get('/userFurnitures/'+id);
            const mobiles = await axios.get('/userMobiles/'+id);
            const vehicles = await axios.get('/userVehicles/'+id);
            const computers = await axios.get('/userComputers/'+id);
            dispatch({
                type: GET_USER_ITEMS_SUCCESS,
                payload: {
                    furnitureData: furnitures.data,
                    mobileData: mobiles.data,
                    vehicleData: vehicles.data,
                    computerData: computers.data 
                }
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_USER_ITEMS_FAILED
            })
        }
    }


    return (
        <UserContext.Provider
            value={{
                selectedUser: state.selectedUser,
                userLoading: state.userLoading,
                addedFurnitures: state.addedFurnitures,
                addedComputers: state.addedComputers,
                addedMobiles: state.addedMobiles,
                addedVehicles: state.addedVehicles,
                itemsLoading: state.itemsLoading,
                getSelectedUser,
                getUserItems
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;
