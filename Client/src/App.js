// App.js
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CounterNav from './Components/CounterNav';
import { Register, Login } from './pages/auth';
import Population from './pages/AddToPop';
import LoadDashboard from './pages/Dashboard';
import Home from './pages/home'; // Import the Home component
import axios from 'axios';

function App() {
  // State and functions to handle user authentication and data
  const [isLoggedIn, setLoggedIn] = useState(false); // Initialize as false
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // State to hold user data

  // Check user login status on component mount
  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  // Function to check user login status
  const checkLoggedInStatus = async () => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setLoggedIn(storedLoggedIn);
    setLoading(false);

    // If logged in, fetch user data

  };

  // Handle user login
  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Handle user logout
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>
    },
    {
      path: "/register", 
      element: <Register></Register>
    },
    {
      path: "/dashboard", 
      element: <LoadDashboard></LoadDashboard>
    },
    {
      path: "/addToPopulation", 
      element: <addToPop></addToPop>
    },
    {
      path: "/Login", 
      element: <Login></Login>
    },
  ])

  return(
    <div className='App'>
      <CounterNav/>,
      <main>
        <RouterProvider router={router}>

        </RouterProvider>
      </main>
    </div>
  )

  // return (
  //   <div className="App">
  //     <Router>
  //       <div>
  //         <CounterNav isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} />
  //       </div>,

  //       <Routes>
  //       <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} />} />
  //         <Route path="/addToPop" element={isLoggedIn ? <Population /> : <Navigate to="/login" />} /> {/* Removed isLoggedIn prop */}
          
  //         <Route path="/login" element={<Login onLogin={handleLogin} />} />
  //         <Route path="/dashboard" element={isLoggedIn ? <LoadDashboard /> : <Navigate to="/login" />} />
  //         <Route path="/logout" element={<Navigate to="/login" />} />
  //         {/* Add more routes as needed */}
  //       </Routes>
  //     </Router>
  //   </div>
  // );
}

export default App;
