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
} from "../../constants/productConstants";

const initialState = {
  products: null,
  status: { isLoading: false, isSuccess: false, isError: false },
  createProductStatus: { isLoading: false, isSuccess: false, isError: false },
  updateProductStatus: { isLoading: false, isSuccess: false, isError: false },
  deleteProductStatus: { isLoading: false, isSuccess: false, isError: false },
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      state.status.isLoading = true;
      return state;
    case GET_PRODUCTS_SUCCESS:
      state.status.isLoading = false;
      state.status.isSuccess = true;
      state.products = action.payload.products;
      return state;
    case GET_PRODUCTS_FAIL:
      state.status.isLoading = false;
      state.status.isError = true;
      return state;
    case RESET_GET_PRODUCTS_STATUS:
      state.status.isLoading = false;
      state.status.isSuccess = false;
      state.status.isError = false;
      return state;
    case CREATE_PRODUCT:
      state.createProductStatus.isLoading = true;
      return state;
    case CREATE_PRODUCT_SUCCESS:
      state.createProductStatus.isLoading = false;
      state.createProductStatus.isSuccess = true;

      // state.products.push()

      return state;
    case CREATE_PRODUCT_FAIL:
      state.createProductStatus.isLoading = false;
      state.createProductStatus.isError = true;
      return state;
    case RESET_CREATE_PRODUCT_STATUS:
      state.createProductStatus.isLoading = false;
      state.createProductStatus.isSuccess = false;
      state.createProductStatus.isError = false;
      return state;
    case UPDATE_PRODUCT:
      state.updateProductStatus.isLoading = true;
      return state;
    case UPDATE_PRODUCT_SUCCESS:
      state.updateProductStatus.isLoading = false;
      state.updateProductStatus.isSuccess = true;

      for (let i = 0; i < state.products.length; ++i) {
        if (state.products[i]._id === action.payload.updatedProduct._id) {
          state.products[i] = action.payload.updatedProduct;
          break;
        }
      }

      return state;
    case UPDATE_PRODUCT_FAIL:
      state.updateProductStatus.isLoading = false;
      state.updateProductStatus.isError = true;
      return state;
    case RESET_UPDATE_PRODUCT_STATUS:
      state.updateProductStatus.isLoading = false;
      state.updateProductStatus.isSuccess = false;
      state.updateProductStatus.isError = false;
      return state;

    case DELETE_PRODUCT:
      state.deleteProductStatus.isLoading = true;
      return state;
    case DELETE_PRODUCT_SUCCESS:
      state.deleteProductStatus.isLoading = false;
      state.deleteProductStatus.isSuccess = true;

      state.products = state.products.filter((product) => {
        return product._id !== action.payload._id;
      });

      return state;
    case DELETE_PRODUCT_FAIL:
      state.deleteProductStatus.isLoading = false;
      state.deleteProductStatus.isError = true;
      return state;
    case RESET_DELETE_PRODUCT_STATUS:
      state.deleteProductStatus.isLoading = false;
      state.deleteProductStatus.isSuccess = false;
      state.deleteProductStatus.isError = false;
      return state;

    default:
      return state;
  }
};
