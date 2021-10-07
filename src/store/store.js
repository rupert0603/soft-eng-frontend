import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immer';
import produce from 'immer';

// Reducers
// import { user } from './reducers/user';
// import { catalog } from './reducers/catalog';

export const store = createStore(
  combineReducers(produce, {
    //  user,
    //  catalog,
     // ...
  }),
  // applyMiddleware...
);

export default store;