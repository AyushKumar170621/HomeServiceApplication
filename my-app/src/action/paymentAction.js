import { SAVE_BOOKING_INFO,STORE_SERVICE,REMOVE_SERVICE,GET_PRICE_FAIL,GET_PRICE_REQUEST,GET_PRICE_SUCCESS } from "../constant/paymentConstants";

import axios from "axios";
import { baseURL } from "./base";
// Add to Cart
export const addServiceItems = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${baseURL}api/v1/service/${id}`);
  
    dispatch({
      type: STORE_SERVICE,
      payload: {
        service: data.service._id,
        name: data.service.name,
        price: data.service.price,
        image: data.service.images[0].url,
        description:data.service.description,
        category:data.service.category,
        subservice:"sample",
      },
    });
  
    localStorage.setItem("serviceItems", JSON.stringify({
      service: data.service._id,
      name: data.service.name,
      price: data.service.price,
      image: data.service.images[0].url,
      description:data.service.description,
      category:data.service.category,
      subservice:"sample",
    }));
  };

// REMOVE FROM CART
export const removeServiceItems = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_SERVICE,
    payload: id,
  });

  localStorage.setItem("serviceItems", JSON.stringify(getState().serviceBook.serviceItems));
};

// SAVE SHIPPING INFO
export const saveBookingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_BOOKING_INFO,
    payload: data,
  });
  console.log(data);

  localStorage.setItem("bookingInfo", JSON.stringify(data));
  console.log(data);
};