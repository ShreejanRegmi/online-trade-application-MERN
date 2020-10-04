import React, { useReducer } from 'react'
import WishlistContext from './wishlistContext';
import wishlistReducer from './wishlistReducer'
import axios from 'axios';

import { GET_WISHES_SUCCESS, WISH_ADDED, SET_WISH_LOADING, CLEAR_WISHES, ONE_WISH_DELETED } from '../types';
const WishlistState = props => {
    const initialState = {
        addedWishes: [],
        productsIds: [],
        wishesLoading: false
    };

    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    const loadWishes = async () => {
        wishLoading();
        try {
            const wishes = await axios.get('/wishlist');
            dispatch({
                type: GET_WISHES_SUCCESS,
                payload: wishes.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const addWish = async (productId, onModel) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/wishlist', { productAdded: productId, onModel }, config);
            dispatch({
                type: WISH_ADDED,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const wishLoading = () => {
        dispatch({
            type: SET_WISH_LOADING
        })
    }

    const deleteOneWish = async (id) => {
        try {
            const res = await axios.delete('/wishlist/' + id);
            dispatch({
                type: ONE_WISH_DELETED,
                payload: {
                    wishId: res.data._id,
                    productId: res.data.productAdded
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAllWishes = async () => {
        try {
            await axios.delete('/allWishlist');
            dispatch({
                type: CLEAR_WISHES
            })
        } catch (error) {
            console.log(error);
        }
    }

    const clearWishes = () => {
        wishLoading();
        dispatch({
            type: CLEAR_WISHES
        })
    }

    return (
        <WishlistContext.Provider
            value={{
                addedWishes: state.addedWishes,
                loadWishes,
                productsIds: state.productsIds,
                addWish,
                clearWishes,
                wishesLoading: state.wishesLoading,
                deleteOneWish,
                deleteAllWishes
            }}
        >
            {props.children}
        </WishlistContext.Provider>
    )
}

export default WishlistState;
