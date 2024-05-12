import {
    CREATE_BOOKING_FAIL,
    CLEAR_BOOKING_ERRORS,
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    MY_BOOKINGS_FAIL,
    MY_BOOKINGS_REQUEST,
    ALL_BOOKINGS_FAIL,
    ALL_BOOKINGS_REQUEST,
    ALL_BOOKINGS_SUCCESS,
    MY_BOOKINGS_SUCCESS,
    UPDATE_BOOKING_FAIL,
    UPDATE_BOOKING_REQUEST,
    UPDATE_BOOKING_RESET,
    UPDATE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAIL,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_RESET,
    DELETE_BOOKING_SUCCESS,
    BOOKING_DETAILS_FAIL,
    BOOKING_DETAILS_REQUEST,
    BOOKING_DETAILS_SUCCESS,
  } from "../constant/bookingConstants";
  import axios from "axios";
  import { baseURL } from "./base";
  
  // Create Booking
  export const createBooking = (booking) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_BOOKING_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        `${baseURL}api/v1/booking/new`,
        booking,
        config
      );
  
      dispatch({ type: CREATE_BOOKING_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_BOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // My Bookings
  export const myBookings = () => async (dispatch) => {
    try {
      dispatch({ type: MY_BOOKINGS_REQUEST });
  
      const { data } = await axios.get(`${baseURL}api/v1/bookings/me`);
  
      dispatch({ type: MY_BOOKINGS_SUCCESS, payload: data.bookings });
    } catch (error) {
      dispatch({
        type: MY_BOOKINGS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get All Bookings (admin)
  export const getAllBookings = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_BOOKINGS_REQUEST });
  
      const { data } = await axios.get(`${baseURL}api/v1/admin/bookings`);
  
      dispatch({ type: ALL_BOOKINGS_SUCCESS, payload: data.booking });
    } catch (error) {
      dispatch({
        type: ALL_BOOKINGS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Booking
  export const updateBooking = (id, booking) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_BOOKING_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.put(
        `${baseURL}api/v1/admin/booking/${id}`,
        booking,
        config
      );
  
      dispatch({ type: UPDATE_BOOKING_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_BOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Booking
  export const deleteBooking = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_BOOKING_REQUEST });
  
      const { data } = await axios.delete(`${baseURL}api/v1/admin/booking/${id}`);
  
      dispatch({ type: DELETE_BOOKING_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_BOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get Booking Details
  export const getBookingDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: BOOKING_DETAILS_REQUEST });
  
      const { data } = await axios.get(`${baseURL}api/v1/booking/${id}`);
  
      dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: data.booking });
    } catch (error) {
      dispatch({
        type: BOOKING_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Booking Errors
  export const clearBookingErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_BOOKING_ERRORS });
  };
  