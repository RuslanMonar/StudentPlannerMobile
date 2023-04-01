import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "../index";

const store = createStore(rootReducer, applyMiddleware(...[thunk]));

export default store;