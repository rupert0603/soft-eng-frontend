import {
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  RESET_ADD_TO_CART_STATUS,
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  RESET_GET_CART_STATUS,
  DELETE_ITEM_FROM_CART_SUCCESS,
} from "../../constants/shopConstants";

const initialState = {
  addToCartStatus: { isLoading: false, isSuccess: false, isError: false },
  getCartStatus: { isLoading: false, isSuccess: false, isError: false },
  cartData: null,
};

export const shop = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      state.addToCartStatus.isLoading = true;
      return state;
    case ADD_TO_CART_SUCCESS:
      state.addToCartStatus.isLoading = false;
      state.addToCartStatus.isSuccess = true;
      return state;
    case ADD_TO_CART_FAIL:
      state.addToCartStatus.isLoading = false;
      state.addToCartStatus.isError = true;
      return state;
    case RESET_ADD_TO_CART_STATUS:
      state.addToCartStatus.isLoading = false;
      state.addToCartStatus.isSuccess = false;
      state.addToCartStatus.isError = false;
      return state;
    case GET_CART:
      state.getCartStatus.isLoading = true;
      return state;
    case GET_CART_SUCCESS:
      state.getCartStatus.isLoading = false;
      state.getCartStatus.isSuccess = true;
      state.cartData = action.payload.cart;
      return state;
    case GET_CART_FAIL:
      state.getCartStatus.isLoading = false;
      state.getCartStatus.isError = true;
      return state;
    case RESET_GET_CART_STATUS:
      state.getCartStatus.isLoading = false;
      state.getCartStatus.isSuccess = false;
      state.getCartStatus.isError = false;
      return state;
    case DELETE_ITEM_FROM_CART_SUCCESS:
      state.cartData = state.cartData.filter((cartItem) => {
        return cartItem._id !== action.payload.cartItemId;
      });
    default:
      return state;
  }
};
