import { STORE_SERVICE,REMOVE_SERVICE,GET_PRICE_FAIL,GET_PRICE_REQUEST,GET_PRICE_SUCCESS,SAVE_BOOKING_INFO } from "../constant/paymentConstants";

export const paymentReducer = (
    state = { serviceItems: [], bookingInfo: {} },
    action
  ) => {
    switch (action.type) {
      case STORE_SERVICE:
        const item = action.payload;
  
        const isItemExist = state.serviceItems.find(
          (i) => i.service === item.service
        );
  
        if (isItemExist) {
          return {
            ...state,
            serviceItems: state.serviceItems.map((i) =>
              i.service === isItemExist.service ? item : i
            ),
          };
        } else {
          return {
            ...state,
            serviceItems: [...state.serviceItems, item],
          };
        }
  
      case REMOVE_SERVICE:
        return {
          ...state,
          serviceItems: state.serviceItems.filter((i) => i.service !== action.payload),
        };
  
      case SAVE_BOOKING_INFO:
        return {
          ...state,
          bookingInfo: action.payload,
        };
  
      default:
        return state;
    }
  };