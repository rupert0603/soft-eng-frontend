import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  RESET_GET_USER_STATUS,
} from "../../constants/userConstants";

const initialState = {
  userData: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      if (!state.userData) {
        state.userData = action.payload.user;
      } else {
        state.userData = {
          ...state.userData,
          ...action.payload.user,
        };
      }
      // state.userData = userData
      return state;
    default:
      return state;
  }
};
