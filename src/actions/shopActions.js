import {
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  RESET_GET_CART_STATUS,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  RESET_ADD_TO_CART_STATUS,
  UPDATE_CART,
  DELETE_ITEM_FROM_CART,
  DELETE_ITEM_FROM_CART_SUCCESS,
  DELETE_ITEM_FROM_CART_FAIL,
} from "../constants/shopConstants";
import { GET_USER_SUCCESS } from "../constants/userConstants";
import { API_MAIN } from "../config/env";
import axios from "axios";
import { readCookie } from "../globals/helpers";
import jwt_decode from "jwt-decode";

export const deleteItemFromCart = (payload) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ITEM_FROM_CART,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      // .delete(`${API_MAIN}/shop/cart`, { data: payload, config })
      .delete(`${API_MAIN}/shop/cart`, {
        ...config,
        // headers: { Authorization: `Bearer ${token}` },
        data: payload,
        // data: {
        //   test: 'test'
        // }
      })
      .then((res) => {
        dispatch({
          type: DELETE_ITEM_FROM_CART_SUCCESS,
          payload,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: DELETE_ITEM_FROM_CART_FAIL,
        });
      });
  };
};

export const getCart = () => {
  return (dispatch) => {
    dispatch({
      type: GET_CART,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const decodedToken = jwt_decode(token);

    axios
      .get(`${API_MAIN}/users/${decodedToken.id}?fields=bobaRewards`, config)
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.data.data,
        });
      });

    //http://localhost:8080/api/v1/users/615e12fb3c6d0c5938416b56?fields=bobaRewards
    axios
      .get(`${API_MAIN}/shop/cart`, config)
      .then((res) => {
        dispatch({
          type: GET_CART_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_CART_FAIL,
        });
      });
  };
};

export const resetGetCartStatus = () => {
  return {
    type: RESET_GET_CART_STATUS,
  };
};

export const addToCart = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(`${API_MAIN}/shop/cart`, payload, config)
      .then((res) => {
        dispatch({
          type: ADD_TO_CART_SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ADD_TO_CART_FAIL,
        });
      });
  };
};

export const resetAddToCartStatus = () => {
  return {
    type: RESET_ADD_TO_CART_STATUS,
  };
};
