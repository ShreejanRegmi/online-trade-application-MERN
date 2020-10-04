import React, { useReducer } from 'react';
import ProductContext from './productContext';
import productReducer from './productReducer';
import axios from 'axios';

import {
    SET_PRODUCT_LOADING,
    GET_SELECTED_PRODUCT_SUCCESS,
    GET_SELECTED_PRODUCT_FAILED,
} from '../types';

const ProductState = props => {
    const initialState = {
        product: {},
        productLoading: false,
    }

    const [state, dispatch] = useReducer(productReducer, initialState);

    const setProductLoading = () => {
        dispatch({
            type: SET_PRODUCT_LOADING
        })
    }

    //complete this api endpoint
    const getSelectedProduct = async (id, category) => {
        setProductLoading();
        try {
            let selectedProduct = null;
            if (category === 'furniture') {
                selectedProduct = await axios.get(`/oneFurnitureWithOwner/${id}`);
            }
            else if (category === 'mobile') {
                selectedProduct = await axios.get(`/oneMobileWithOwner/${id}`);
            }
            else if (category === 'computer') {
                selectedProduct = await axios.get(`/oneComputerWithOwner/${id}`);
            }
            else if (category === 'vehicle') {
                selectedProduct = await axios.get(`/oneVehicleWithOwner/${id}`);
            }
            if (selectedProduct === null)
                throw new Error();

            dispatch({
                type: GET_SELECTED_PRODUCT_SUCCESS,
                payload: selectedProduct.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_SELECTED_PRODUCT_FAILED
            })
        }
    }

    return (
        <ProductContext.Provider
            value={{
                product: state.product,
                productLoading: state.productLoading,
                getSelectedProduct
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;
