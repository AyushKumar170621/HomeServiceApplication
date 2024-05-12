import axios from "axios";
import { 
  ALL_SERVICE_FAIL,
  ALL_SERVICE_REQUEST,
  ALL_SERVICE_SUCCESS,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_FAIL,
  SERVICE_DETAILS_SUCCESS,
  ADMIN_SERVICE_FAIL,
  ADMIN_SERVICE_REQUEST,
  ADMIN_SERVICE_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  NEW_SERVICE_FAIL,
  NEW_SERVICE_REQUEST,
  NEW_SERVICE_RESET,
  NEW_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_RESET,
  UPDATE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_RESET,
  DELETE_SERVICE_SUCCESS,
  CLEAR_ERRORS,
} from "../constant/serviceConstants";
import { baseURL } from "./base";

// Get All Services
export const getServices = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_SERVICE_REQUEST });

    let link = `${baseURL}api/v1/services?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `${baseURL}api/v1/services?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_SERVICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SERVICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Service Details
export const getServiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_DETAILS_REQUEST });
    const { data } = await axios.get(`${baseURL}api/v1/service/${id}`);
    dispatch({
      type: SERVICE_DETAILS_SUCCESS,
      payload: data.service,
    });
  } catch (error) {
    dispatch({
      type: SERVICE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Services For Admin
export const getAdminServices = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_SERVICE_REQUEST });
    const { data } = await axios.get(`${baseURL}api/v1/admin/services`);
    dispatch({
      type: ADMIN_SERVICE_SUCCESS,
      payload: data.services,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_SERVICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Service
export const createService = (serviceData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SERVICE_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(`${baseURL}api/v1/admin/service/new`, serviceData, config);
    dispatch({
      type: NEW_SERVICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SERVICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// New Review
export const newServiceReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`${baseURL}api/v1/review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Service
export const updateService = (id, serviceData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SERVICE_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`${baseURL}api/v1/admin/services/${id}`, serviceData, config);
    dispatch({
      type: UPDATE_SERVICE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SERVICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Service
export const deleteService = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SERVICE_REQUEST });
    const { data } = await axios.delete(`${baseURL}api/v1/admin/services/${id}`);
    dispatch({
      type: DELETE_SERVICE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SERVICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
