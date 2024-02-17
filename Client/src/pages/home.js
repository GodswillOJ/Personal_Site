// Home.js
import React from 'react';

const Home = ({ isLoggedIn, user }) => {
  return (
    <div className="Home">
      <h2>Welcome to the Home Page!</h2>
      {isLoggedIn && user && (
        <div>
          <p>Hello, {user.username}!</p> {/* Display user data */}
          {/* Display more user data as needed */}
        </div>
      )}
    </div>
  );
};

export default Home;
