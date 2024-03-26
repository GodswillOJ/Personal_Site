import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const AdminVerifyMail = ({ isLoggedIn }) => {
  const { token, id } = useParams(); // Extract the token and ID parameters from the URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  console.log('Token:', token);
  console.log('ID:', id);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          const accessToken = localStorage.getItem('access_token');
          const response = await axios.get(`https://personal-site-awu4.onrender.com/api/adminMailVerify/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          console.log('User Data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [isLoggedIn]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="VerifyCont">
        <div>
            <h1>Admin Verify Mail</h1>
            <div>
                <p>
                    Email verified please click to redirect to login<Link to='/loginAdmin'> proceed to login</Link>
                </p>
            </div>
        </div>
    </div>
  );
};

export default AdminVerifyMail;
