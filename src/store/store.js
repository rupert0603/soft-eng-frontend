import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immer";
import produce from "immer";
import thunk from "redux-thunk";

// Reducers
import { signin } from "./reducers/signin";
import { signup } from "./reducers/signup";
import { products } from "./reducers/products";
import { shop } from "./reducers/shop";
import { orders } from "./reducers/orders";
import { user } from "./reducers/user";

export const store = createStore(
  combineReducers(produce, {
    signin,
    signup,
    products,
    shop,
    orders,
    user,
  }),
  applyMiddleware(thunk)
);

export default store;
