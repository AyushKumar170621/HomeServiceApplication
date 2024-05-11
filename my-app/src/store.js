import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducer/userReducer";

import {
  servicesReducer,
  serviceDetailsReducer,
  newReviewReducer,
  newServiceReducer,
serviceReducer
} from "./reducer/serviceReducer";

const reducer = combineReducers({
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  services: servicesReducer,
  serviceDetails: serviceDetailsReducer,
  newService: newServiceReducer,
  service:serviceReducer,
  newReview:newReviewReducer
});


let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = configureStore(
  { reducer },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
