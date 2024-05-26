// actions/chatActions.js
import axios from 'axios';

import { SEND_MESSAGE,RECEIVE_MESSAGE,API_ERROR } from '../constant/mlConstant';

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  payload: message,
});

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
});

export const apiError = (error) => ({
  type: API_ERROR,
  payload: error,
});

export const sendUserMessage = (message) => {
  return async (dispatch) => {
    dispatch(sendMessage(message));
    try {
      const response = await axios.post('http://localhost:5000/chat', { message });
      dispatch(receiveMessage(response.data.reply));
    } catch (error) {
      dispatch(apiError('Failed to get a reply from the server.'));
    }
  };
};
