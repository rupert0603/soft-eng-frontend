import {
  CHECKOUT,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  RESET_CHECKOUT_STATUS,
  FETCH_MY_ORDERS,
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDERS_FAIL,
  RESET_FETCH_MY_ORDERS_STATUS,
  FETCH_ALL_ORDERS,
  FETCH_ALL_ORDERS_SUCCESS,
  FETCH_ALL_ORDERS_FAIL,
  RESET_FETCH_ALL_ORDERS_STATUS,
} from "../../constants/orderConstants";

const initialState = {
  myOrders: null,
  myOrdersStatus: { isLoading: false, isSuccess: false, isError: false },
  allOrders: null,
  allOrdersStatus: { isLoading: false, isSuccess: false, isError: false },
  checkoutStatus: { isLoading: false, isSuccess: false, isError: false },
};

export const orders = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT:
      state.checkoutStatus.isLoading = true;
      return state;
    case CHECKOUT_SUCCESS:
      state.checkoutStatus.isLoading = false;
      state.checkoutStatus.isSuccess = true;
      return state;
    case CHECKOUT_FAIL:
      state.checkoutStatus.isLoading = false;
      state.checkoutStatus.isError = true;
      return state;
    case RESET_CHECKOUT_STATUS:
      state.checkoutStatus.isLoading = false;
      state.checkoutStatus.isSuccess = false;
      state.checkoutStatus.isError = false;
      return state;
    case FETCH_MY_ORDERS:
      state.myOrdersStatus.isLoading = true;
      return state;
    case FETCH_MY_ORDERS_SUCCESS:
      state.myOrdersStatus.isLoading = false;
      state.myOrdersStatus.isSuccess = true;
      state.myOrders = action.payload.orders;
      return state;
    case FETCH_MY_ORDERS_FAIL:
      state.myOrdersStatus.isLoading = false;
      state.myOrdersStatus.isError = true;
      return state;
    case RESET_FETCH_MY_ORDERS_STATUS:
      state.myOrdersStatus.isLoading = false;
      state.myOrdersStatus.isSuccess = false;
      state.myOrdersStatus.isError = false;
      return state;
    case FETCH_ALL_ORDERS:
      state.allOrdersStatus.isLoading = true;
      return state;
    case FETCH_ALL_ORDERS_SUCCESS:
      state.allOrdersStatus.isLoading = false;
      state.allOrdersStatus.isSuccess = true;
      state.allOrders = action.payload.orders;
      return state;
    case FETCH_ALL_ORDERS_FAIL:
      state.allOrdersStatus.isLoading = false;
      state.allOrdersStatus.isError = true;
      return state;
    case RESET_FETCH_ALL_ORDERS_STATUS:
      state.allOrdersStatus.isLoading = false;
      state.allOrdersStatus.isSuccess = false;
      state.allOrdersStatus.isError = false;
      return state;
    default:
      return state;
  }
};
