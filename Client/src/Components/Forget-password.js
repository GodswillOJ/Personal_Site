// VerifyLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const ForgetPassword = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = async () => {
    try {
      setLoading(true);

      await axios.post('https://personal-site-static.onrender.com/api/forget-password', { email }); // Assuming the forget password endpoint is mounted at '/api/forget-password'
      setMessage('Password reset email sent successfully');
    } catch (error) {
      setError('Error sending reset password email');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="CounterCont">
      <h2 className="Title">Personal Site</h2>
      <form onSubmit={handleForgetPassword} className="Counter_Engine" id="registerInput">
        <h2>Forget Password</h2>
        <div>
          <label>Enter Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'sending...' : 'Send'}
        </button>

        <div id="redirect_log">
          <Link to="/login">Login</Link>
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

export default ForgetPassword;