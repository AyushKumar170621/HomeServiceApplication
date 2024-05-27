import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../action/userAction';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const { token } = useParams();

    const { loading, success, error } = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert('Password reset successful');
            dispatch(clearErrors());
        }
    }, [dispatch, error, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(token, { password, confirmPassword }));
    };

    return (
        <div className="reset-password">
            <h2>Reset Password</h2>
            <form onSubmit={submitHandler}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
