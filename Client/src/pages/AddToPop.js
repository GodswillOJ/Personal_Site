import React from 'react';
import { Navigate } from 'react-router-dom';
import CounterApp from '../Components/CounterApp';

function Population({ isLoggedIn }) {
  if (!isLoggedIn) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render the CounterApp component if user is authenticated
  return (
    <div>
      <CounterApp />
    </div>
  );
}

export default Population;
