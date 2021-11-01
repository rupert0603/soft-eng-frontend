import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  RESET_SIGN_UP_STATUS,
} from "../../constants/userConstants";

const initialState = {
  status: { isLoading: false, isSuccess: false, isError: false },
};

export const signup = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      state.status.isLoading = true;
      return state;
    case SIGN_UP_SUCCESS:
      state.status.isLoading = false;
      state.status.isSuccess = true;
      return state;
    case SIGN_UP_FAIL:
      state.status.isLoading = false;
      state.status.isError = true;
      return state;
    case RESET_SIGN_UP_STATUS:
      state.status.isLoading = false;
      state.status.isSuccess = false;
      state.status.isError = false;
      return state;
    default:
      return state;
  }
};
