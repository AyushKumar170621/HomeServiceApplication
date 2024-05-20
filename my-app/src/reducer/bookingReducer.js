import {
    CREATE_BOOKING_FAIL,
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    MY_BOOKINGS_REQUEST,
    MY_BOOKINGS_SUCCESS,
    MY_BOOKINGS_FAIL,
    ALL_BOOKINGS_FAIL,
    ALL_BOOKINGS_REQUEST,
    ALL_BOOKINGS_SUCCESS,
    CLEAR_BOOKING_ERRORS,
    BOOKING_DETAILS_FAIL,
    BOOKING_DETAILS_REQUEST,
    BOOKING_DETAILS_SUCCESS,
    UPDATE_BOOKING_FAIL,
    UPDATE_BOOKING_REQUEST,
    UPDATE_BOOKING_RESET,
    UPDATE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAIL,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_RESET,
    DELETE_BOOKING_SUCCESS,
    PROVIDER_BOOKINGS_REQUEST,
    PROVIDER_BOOKINGS_SUCCESS,
    PROVIDER_BOOKINGS_FAIL,
    SET_OTP_FAILED,
    SET_OTP_REQUEST,
    SET_OTP_SUCCESS,
    ACCEPTED_BOOKINGS_FAIL,
    ACCEPTED_BOOKINGS_REQUEST,
    ACCEPTED_BOOKINGS_SUCCESS,
    SEND_OTP_RESET,
} from "../constant/bookingConstants";

export const newBookingReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_BOOKING_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_BOOKING_SUCCESS:
        return {
          loading: false,
          booking: action.payload,
        };
  
      case CREATE_BOOKING_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_BOOKING_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const myBookingsReducer = (state = { loading: false,
    bookings: [],
    error: null }, action) => {
    switch (action.type) {
      case ACCEPTED_BOOKINGS_REQUEST:
      case MY_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCEPTED_BOOKINGS_SUCCESS:
    case MY_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
      };
    case ACCEPTED_BOOKINGS_FAIL:
    case MY_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_BOOKING_ERRORS:
      return {
        ...state,
        error: null,
      };
  
      default:
        return state;
    }
  };


  export const allProvidersBooking = (state = {proBookings : []}, action) => {
    switch(action.type){
      case PROVIDER_BOOKINGS_REQUEST:
        return {
          loading:true,
        };
      
      case PROVIDER_BOOKINGS_SUCCESS:
        return {
          loading:false,
          bookings:action.payload,
        }
      
        case PROVIDER_BOOKINGS_FAIL:
          return {
            loading:false,
            error:action.payload,
          }
        case CLEAR_BOOKING_ERRORS:
          return {
            ...state,
            error: null,
          };
    
        default:
          return state;
    }
  }

  
  export const allBookingsReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {
      case ALL_BOOKINGS_REQUEST:
        return {
          loading: true,
        };
  
      case ALL_BOOKINGS_SUCCESS:
        return {
          loading: false,
          bookings: action.payload,
        };
  
      case ALL_BOOKINGS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_BOOKING_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const bookingReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_BOOKING_REQUEST:
      case DELETE_BOOKING_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case UPDATE_BOOKING_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case DELETE_BOOKING_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_BOOKING_FAIL:
      case DELETE_BOOKING_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_BOOKING_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case DELETE_BOOKING_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_BOOKING_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const setOtp = (state = { booking: {} },action) => {
    switch(action.type){
      case SET_OTP_REQUEST:
        return {
          loading:true,
        };
      case SET_OTP_SUCCESS:
        return {
          loading:false,
          otpSend:true,
        }
      case SET_OTP_FAILED:
        return {
          loading:false,
          error:action.payload,
        }
      case SEND_OTP_RESET:
        return {
          ...state,
          otpSend:false,
        };
        case CLEAR_BOOKING_ERRORS:
          return {
            ...state,
            error: null,
          };
    
        default:
          return state;
    }
  }
  
  export const bookingDetailsReducer = (state = { booking: {} }, action) => {
    switch (action.type) {
      case BOOKING_DETAILS_REQUEST:
        return {
          loading: true,
        };
  
      case BOOKING_DETAILS_SUCCESS:
        return {
          loading: false,
          booking: action.payload,
        };
  
      case BOOKING_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_BOOKING_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
