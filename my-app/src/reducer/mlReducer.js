import { SEND_MESSAGE, RECEIVE_MESSAGE, API_ERROR } from "../constant/mlConstant";

export const chatReducer = (state = { messages: [], error: null }, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { text: action.payload, sender: "user" }],
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { text: action.payload, sender: "bot" }],
      };
    case API_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
