import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  RESET_SIGN_UP_STATUS,
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  RESET_LOG_IN_STATUS,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  RESET_GET_USER_STATUS,
} from "../constants/userConstants";
import { API_MAIN } from "../config/env";
import axios from "axios";
import { setToken, readCookie } from "../globals/helpers";
import jwt_decode from "jwt-decode";

export const login = (payload) => {
  return (dispatch) => {
    dispatch({
      type: LOG_IN,
    });

    axios
      .post(`${API_MAIN}/users/login`, payload)
      .then((res) => {
        setToken(res.data.token);

        dispatch({
          type: LOG_IN_SUCCESS,
          payload: res.data.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOG_IN_FAIL,
        });
      });
  };
};

export const resetLoginStatus = () => {
  return {
    type: RESET_LOG_IN_STATUS,
  };
};

export const signup = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SIGN_UP,
    });

    axios
      .post(`${API_MAIN}/users/signup`, payload)
      .then((res) => {
        dispatch({
          type: SIGN_UP_SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SIGN_UP_FAIL,
        });
      });
  };
};

export const resetSignupStatus = () => {
  return {
    type: RESET_SIGN_UP_STATUS,
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER,
    });

    const token = readCookie("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const decodedToken = jwt_decode(token);

    axios
      .get(`${API_MAIN}/users/${decodedToken.id}`, config)
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_USER_FAIL,
        });
      });
  };
};

// RESET_GET_USER_STATUS
