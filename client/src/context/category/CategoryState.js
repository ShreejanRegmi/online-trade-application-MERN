import React, { useReducer } from 'react';
import CategoryContext from './categoryContext';
import CategoryReducer from './categoryReducer';
import axios from 'axios';

import {
    GET_ALL_CATEGORIES_SUCCESS
} from '../types';

const CategoryState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(CategoryReducer, initialState);

    const getAllCategories = async () => {
        try {
            const res = await axios.get('/categories');
            dispatch({
                type: GET_ALL_CATEGORIES_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <CategoryContext.Provider
            value={{
                categories: state,
                getAllCategories
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryState;
