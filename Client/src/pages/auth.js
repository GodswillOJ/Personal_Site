// VerifyLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [_, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('https://personal-site-awu4.onrender.com/api/login', { username, password });
      setUsername('');
      setPassword('');
  
      console.log('Access Token:', response.data.access_token);
  
      // Set the access token in localStorage instead of cookies
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('userID', response.data.userID); // Store user ID in localStorage as well
      onLogin();
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Error in verifying user:', error.message);
  
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Error in verifying user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="CounterCont">
      <h2 className="Title">Personal Site</h2>
      <form onSubmit={handleLogin} className="Counter_Engine" id="registerInput">
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p>Already Have an Account
          <br></br>
          <Link to='/Forget-password'>Forget Password</Link>
        </p>
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

export const Register = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://personal-site-awu4.onrender.com/api/registerUser', { username, email, password });
      setUsername('');
      setEmail('');
      setPassword('');
      alert('User added successfully. Proceed to login!');
    } catch (error) {
      console.error('Error adding user:', error.message);
      setError('Error adding user. Please try again.'); // Provide user-friendly feedback
    } finally {
      setLoading(false);
    }
  };

  return (
      <Form 
          onSubmit={handleCreateUser}
          username={username} 
          setUsername={setUsername}
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword}
          label="Register"
       />
   )
}


const Form = ({ onSubmit, username, setUsername, email, setEmail, password, setPassword, label }) => {
  return (
    <div className="Register">
      <div className="CounterCont RegCont">
      <h2 className="Title">Personal Website</h2>
        <form className="Counter_Engine" id="registerInput" onSubmit={onSubmit}>
          <h2>{label}</h2>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">{label}</button>
          {label === 'Register' && (
            <div id="redirect_log">
              <Link to="/login">Login</Link>
            </div>
          )}
        </form>
        <div id="Footer_Dash">
            `<div>
            <Link to="https://www.linkedin.com/in/godswill-ogono-861802144/"><li><FontAwesomeIcon icon={faLinkedin} /></li></Link>
            <Link to="https://www.twitter.com/"><li><FontAwesomeIcon icon={faTwitter} /></li></Link>
            <Link to="https://www.instagram.com/godswill_oj/"><li><FontAwesomeIcon icon={faInstagram} /></li></Link>
            <Link to="https://api.whatsapp.com/send?phone=2347036744231&text=Hello, more information!"><li><FontAwesomeIcon icon={faWhatsapp} /></li></Link>
            <Link to="https://wwww.facebook.com/"><li><FontAwesomeIcon icon={faFacebook} /></li></Link>
            </div>
        </div>`
      </div>
    </div>
  );
};
