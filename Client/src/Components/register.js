import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Register() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/registerUser', { username, email, password });
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
    <div className="Register">
      <div>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username} - {user.email}</li>
          ))}
        </ul>
      </div>
      <div className="CounterCont RegCont">
        
        <form onSubmit={handleCreateUser} className="Counter_Engine" id="registerInput">
        <h2>Register</h2>
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
          <button type="submit" disabled={loading}>
            {loading ? 'Creating User...' : 'Create User'}
          </button>
          <div id="redirect_log">
            <Link to="/login">Login</Link>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          
        </form>
      </div>
    </div>
  );
}

// src/components/Dashboard.js

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user-specific data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/userdata', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="userDashBoard">
      <h2>User Dashboard</h2>
      {userData ? (
        <div>
          <p>Welcome, {userData.username}!</p>
          <p>Email: {userData.email}</p>
          {/* Add more user-specific information as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export { Register, Dashboard };
