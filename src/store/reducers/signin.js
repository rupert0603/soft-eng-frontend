import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  RESET_LOG_IN_STATUS,
} from "../../constants/userConstants";

const initialState = {
  userProfile: null,
  status: { isLoading: false, isSuccess: false, isError: false },
};

export const signin = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      state.status.isLoading = true;
      return state;
    case LOG_IN_SUCCESS:
      state.status.isLoading = false;
      state.status.isSuccess = true;
      state.userProfile = action.payload;
      return state;
    case LOG_IN_FAIL:
      state.status.isLoading = false;
      state.status.isError = true;
      return state;
    case RESET_LOG_IN_STATUS:
      state.status.isLoading = false;
      state.status.isSuccess = false;
      state.status.isError = false;
      return state;
    default:
      return state;
  }
};
