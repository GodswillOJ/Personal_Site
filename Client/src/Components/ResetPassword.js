// ResetPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


const ResetPassword = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      await axios.post('https://personal-site-awu4.onrender.com/api/reset-password', { token, newPassword });
      setMessage('Password reset successfully');
    } catch (error) {
      setError('Error resetting password');
    }
  };

  return (
    <div className="CounterCont">
      <h2 className="Title">Personal Site</h2>
      <form onSubmit={handleResetPassword} className="Counter_Engine" id="registerInput">
        <h2>Forget Password</h2>
        <div>
          <label>Enter New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div id="redirect_log">
          <Link to="/register">Register</Link>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div id="Footer_Dash">
          <div>
          <Link to="https://www.linkedin.com/in/godswill-ogono-861802144/"><li><FontAwesomeIcon icon={faLinkedin} /></li></Link>
          <Link to="https://www.twitter.com/"><li><FontAwesomeIcon icon={faTwitter} /></li></Link>
          <Link to="https://www.instagram.com/godswill_oj/"><li><FontAwesomeIcon icon={faInstagram} /></li></Link>
          <Link to="https://api.whatsapp.com/send?phone=2347036744231&text=Hello, more information!"><li><FontAwesomeIcon icon={faWhatsapp} /></li></Link>
          <Link to="https://wwww.facebook.com/"><li><FontAwesomeIcon icon={faFacebook} /></li></Link>
          </div>
      </div>
    </div>
  );
};

export default ResetPassword;
