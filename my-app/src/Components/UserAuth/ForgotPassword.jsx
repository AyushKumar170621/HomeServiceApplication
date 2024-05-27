import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../action/userAction';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const { loading, message, error } = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert(message);
            dispatch(clearErrors());
        }
    }, [dispatch, error, message]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(email)
        dispatch(forgotPassword(email));
    };

    return (
        <div className="forgot-password">
            <h2>Forgot Password</h2>
            <form onSubmit={submitHandler}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    Send Email
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
