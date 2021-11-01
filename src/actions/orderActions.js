import {
  CHECKOUT,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  RESET_CHECKOUT_STATUS,
  FETCH_MY_ORDERS,
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDERS_FAIL,
  RESET_FETCH_MY_ORDERS_STATUS,
  PATCH_ORDER,
  PATCH_ORDER_SUCCCESS,
  PATCH_ORDER_FAIL,
  FETCH_ALL_ORDERS,
  FETCH_ALL_ORDERS_SUCCESS,
  FETCH_ALL_ORDERS_FAIL,
  RESET_FETCH_ALL_ORDERS_STATUS,
} from "../constants/orderConstants";
import { API_MAIN } from "../config/env";
import axios from "axios";
import { readCookie } from "../globals/helpers";

export const checkOut = (payload) => {
  return (dispatch) => {
    dispatch({
      type: CHECKOUT,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(`${API_MAIN}/orders`, payload, config)
      .then((res) => {
        dispatch({
          type: CHECKOUT_SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: CHECKOUT_FAIL,
        });
      });
  };
};

export const resetCheckoutStatus = () => {
  return {
    type: RESET_CHECKOUT_STATUS,
  };
};

export const getMyOrders = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_MY_ORDERS,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`${API_MAIN}/orders/user`, config)
      .then((res) => {
        dispatch({
          type: FETCH_MY_ORDERS_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FETCH_MY_ORDERS_FAIL,
        });
      });
  };
};

export const patchOrder = (payload) => {
  return (dispatch) => {
    dispatch({
      type: PATCH_ORDER,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .patch(`${API_MAIN}/orders`, payload, config)
      .then((res) => {
        dispatch({
          type: PATCH_ORDER_SUCCCESS,
          // payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: PATCH_ORDER_FAIL,
        });
      });
  };
};

export const getAllOrders = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_ALL_ORDERS,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`${API_MAIN}/orders`, config)
      .then((res) => {
        dispatch({
          type: FETCH_ALL_ORDERS_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FETCH_ALL_ORDERS_FAIL,
        });
      });
  };
};
