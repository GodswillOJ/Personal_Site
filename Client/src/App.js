// Modified App component
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CounterNav from './Components/CounterNav';
import { Register, Login, AdminRegister, AdminLogin } from './pages/auth';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Single_courses from './pages/Single_courses';
import AI from './pages/AI';
import Data_analysis from './pages/Data_analysis';
import Deep_learning from './pages/Deep_learning';
import Machine_learning from './pages/Machine_learning';
import Home from './pages/home';
import About from './pages/About';
import ResetPassword from './Components/ResetPassword';
import ForgetPassword from './Components/Forget-password';
import axios from 'axios';
import Deep_learning_ from './pages/Deep_learning';

const PrivateRoute = ({ element, authenticated, ...props }) => {
  return authenticated ? element : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLoggedInStatus();
  }, []);
  
  const checkLoggedInStatus = async () => {
    const storedLoggedIn = localStorage.getItem('access_token') ? true : false;
    console.log(storedLoggedIn)
    setLoggedIn(storedLoggedIn);
    setLoading(false);
    if (storedLoggedIn) {
      try {
        const response = await axios.get('https://personal-site-awu4.onrender.com/api/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        handleLogout(); // Log out the user if token is invalid or expired
      }
    }
  };
  

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('access_token');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <div>
          <CounterNav isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} />
        </div>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/About" element={<About isLoggedIn={isLoggedIn} />} />
          <Route path="/forget-password" element={<ForgetPassword isLoggedIn={isLoggedIn} />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerAdmin?_" element={<AdminRegister />} />
          <Route path="/all_courses" element={<Courses />} />
          <Route path="/web_development" element={<Single_courses />} />
          <Route path="/artificial_intelligence" element={<AI />} />
          <Route path="/machine_learning" element={<Machine_learning />} />
          <Route path="/data_analysis" element={<Data_analysis />} />
          <Route path="/deep_learning" element={<Deep_learning_ />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/loginAdmin?_" element={<AdminLogin onLogin={handleLogin} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          {/* Use PrivateRoute for the Dashboard */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} authenticated={isLoggedIn} />} />

          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/login" />;
};

export default App;
