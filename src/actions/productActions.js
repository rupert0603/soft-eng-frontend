import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  RESET_GET_PRODUCTS_STATUS,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  RESET_GET_PRODUCT_STATUS,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  RESET_CREATE_PRODUCT_STATUS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  RESET_UPDATE_PRODUCT_STATUS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  RESET_DELETE_PRODUCT_STATUS,
} from "../constants/productConstants";
import { API_MAIN } from "../config/env";
import axios from "axios";
import { readCookie } from "../globals/helpers";

export const getProducts = (payload) => {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCTS,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`${API_MAIN}/products`, config)
      .then((res) => {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_PRODUCTS_FAIL,
        });
      });
  };
};

export const createProduct = (payload) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_PRODUCT,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(`${API_MAIN}/products/${payload.productType}`, payload, config)
      .then((res) => {
        dispatch({
          type: CREATE_PRODUCT_SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: CREATE_PRODUCT_FAIL,
        });
      });
  };
};

export const resetCreateProductStatus = () => {
  return {
    type: RESET_CREATE_PRODUCT_STATUS,
  };
};

export const updateProduct = (payload) => {
  console.log(payload);
  return (dispatch) => {
    dispatch({
      type: UPDATE_PRODUCT,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .put(`${API_MAIN}/products/${payload._id}`, payload, config)
      .then((res) => {
        dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: UPDATE_PRODUCT_FAIL,
        });
      });
  };
};

export const resetUpdateProductStatus = () => {
  return {
    type: RESET_UPDATE_PRODUCT_STATUS,
  };
};

export const deleteProduct = (payload) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .delete(`${API_MAIN}/products/${payload._id}`, {
        ...config,
        // data: payload,
      })
      .then((res) => {
        dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          // payload: res.data.data,
          payload: { ...payload },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: DELETE_PRODUCT_FAIL,
        });
      });
  };
};

export const resetDeleteProductStatus = () => {
  return {
    type: RESET_DELETE_PRODUCT_STATUS,
  };
};
