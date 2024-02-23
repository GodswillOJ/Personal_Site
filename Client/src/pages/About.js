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
                **About GOtech**

                GOtech is a pioneering tech company at the forefront of transforming the way individuals and businesses engage with technology. With a comprehensive suite of services tailored to meet the diverse needs of modern digital landscapes, GOtech is your partner in unlocking the full potential of technology. Whether you're an individual looking to upskill, a startup seeking innovative solutions, or an established enterprise aiming to harness the power of data and AI, GOtech is here to guide you on your journey.
            </p>

            <p>               
                **Personalized Learning Experience**

                At GOtech, we believe in the power of personalized learning. That's why we offer one-on-one training sessions, both online and in-person, designed to cater to your unique learning style and pace. Our expert instructors are committed to empowering you with the knowledge and skills needed to thrive in today's tech-driven world. Whether you're a beginner taking your first steps in coding or an experienced professional looking to expand your expertise, our tailored approach ensures that you achieve your learning goals with confidence.
            </p>

            <p>
                **Innovative Solutions for Businesses**

                In addition to our training services, GOtech specializes in delivering innovative solutions for businesses across various industries. From building sleek and functional websites to conducting in-depth data analysis and developing cutting-edge machine learning models, our team of experts is dedicated to driving your business forward. We understand the importance of staying ahead of the curve in a rapidly evolving digital landscape, and we're here to provide you with the tools and insights needed to succeed.
            </p>
            
            <p>
              **AI and App Development**

              As technology continues to advance, so do the possibilities it offers. At GOtech, we're passionate about harnessing the power of artificial intelligence to create impactful solutions for both businesses and individuals. Whether you're looking to integrate AI functionalities into your existing apps or seeking to develop innovative AI-driven applications from scratch, our experienced team is here to bring your vision to life. We thrive on pushing the boundaries of what's possible, crafting custom AI solutions that drive efficiency, innovation, and growth.
            </p>

            <p>     
              **Collaboration and Innovation**

              At the heart of GOtech lies a commitment to collaboration and innovation. We believe that the best ideas are born from collaboration and that innovation thrives in an environment of diversity and openness. Whether you're partnering with us on a project or joining our vibrant community of learners and professionals, you'll find a supportive ecosystem that fosters creativity, curiosity, and continuous learning. Together, let's build a future where technology empowers us to create positive change and drive progress forward. Welcome to GOtech, where the possibilities are limitless.
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