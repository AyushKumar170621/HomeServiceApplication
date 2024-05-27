// components/Chatbot.js
import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendUserMessage } from '../../action/mlAction';
import './Chatbot.css';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const messages = useSelector((state) => state.chat.messages);
  const error = useSelector((state) => state.chat.error);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(sendUserMessage(input));
      setInput('');
    }
  };

  return (
    <Fragment>
      <div className="chatbot-container card">
        <div className="card-header">Chatbot</div>
        <div className="card-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <div className="card-footer">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Chatbot;
