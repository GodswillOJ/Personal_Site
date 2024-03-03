import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Extract the token parameter from the URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Token:', token);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Make a POST request to the reset password endpoint on your backend
      await axios.post(`https://personal-site-awu4.onrender.com/api/reset-password/${token}`, { newPassword });
      setMessage('Password reset successfully');
    } catch (error) {
      setError('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="CounterCont">
      <h2 className="Title">Personal Site</h2>
      <form onSubmit={handleResetPassword} className="Counter_Engine" id="resetPasswordForm">
        <h2>Reset Password</h2>
        <div>
          <label>Enter New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        <div id="redirect_log">
          <Link to="/register">Register</Link>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'blue' }}>{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
