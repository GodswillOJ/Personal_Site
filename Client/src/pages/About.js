import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// Import MyFooter component

const About = ({ isLoggedIn }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          if (isLoggedIn) {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.get('https://population-counter.onrender.com/api/', {
              headers: {
                Authorization: `Bearer ${accessToken}` // Include the access token in the request headers
              }
            });
            setUserData(response.data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, [isLoggedIn]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  return (
    <div className='About_page'>
        <div id="my_about_Info">
        {isLoggedIn && userData && (
            <div>{userData.username}</div>
            )}
            <h1>
                About Us
            </h1>
            <p>
                Population Counter is a database storage website, that creates an environment
                for new citizens of a particular location to record the population of that location.
            </p>
            <p>
                Population Counter helps government agencies to have an already and obtainable data of citizens,
                which can be used for census, recommendations, and facts gathering regarding a citizen.
            </p>
            <p>
                Population Counter will be updated consistently to enable better UI performance and enhance time-access for multiple users in Nigeria.
            </p>
        </div>
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
  )
}


export default About;