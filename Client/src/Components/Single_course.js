import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faNairaSign, faUser, faMagnifyingGlass, faEnvelope, faPalette } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


const Single_course = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Track authentication state
  
    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const accessToken = localStorage.getItem('access_token');
          console.log(accessToken)
          if (accessToken) {
            setIsAuthenticated(true);
            const response = await axios.get('https://personal-site-awu4.onrender.com/api/web_development', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            setUserData(response.data);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };
      checkAuthentication();
    }, []);

    const [selectedTimes, setSelectedTimes] = useState({
      Monday: '9:00 AM - 11:00 AM',
      Tuesday: '10:00 AM - 12:00 PM',
      Wednesday: '11:00 AM - 1:00 PM',
      Thursday: '9:30 AM - 11:30 AM',
      Friday: '10:30 AM - 12:30 PM',
    });
    // Function to handle changing the selected time range for a day
  const handleTimeChange = (day, time) => {
    setSelectedTimes({
      ...selectedTimes,
      [day]: time,
    });
  };

    const myImage = 'pexels-fauxels-3184339.jpg';
    const MyImage = 'mansmiling.jpg';

    return (
        <div className='All_Courses'>


           <div className='single_cont_'>
                <div className='course_name'>
                    <h3>Full-Stack Web Programming</h3>
                </div>
                <div id='course-hints'>
                    <div id='course-hint'>
                        <p>Front-end Basis</p>
                        <p>ReactJs</p>
                        <p>NodeJs</p>
                    </div>
                    <div id='course-hint'>
                        <p>MongoDB</p>
                        <p>NextJs</p>
                    </div>
                </div>
           </div>

            <div className='single_c_cat'>
                <div classNam='singles_'>
                  <div id='course_descrip'>
                    <h4 id='course_headline'>About course</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus doloribus culpa distinctio sit harum repellat dolore ratione inventore, nesciunt vero.</p>
                      <h4>Full-Stack Web Programming Outline</h4>
                      <p id='course_descrip_in'>
                          This comprehensive course covers the essentials of full-stack web development, focusing on modern technologies and frameworks including HTML, CSS, React, MongoDB, Node.js, and Next.js. Participants will gain hands-on experience building dynamic web applications from scratch, mastering both front-end and back-end development techniques. By the end of the course, students will have the skills to create robust, scalable web applications ready for deployment.
                      </p>
                  </div>
                    <div className='c_info_c'>
                        <div className='c_info_'>
                            <b>Module 1: Introduction to Web Development</b>
                            <p>
                            ·         Overview of web development technologies
                            ·         Introduction to HTML and CSS
                            ·         Setting up a development environment
                            </p>
                            
                            <b>Module 2: Front-End Development with React</b>
                            <p>
                            ·         Introduction to React and its ecosystem
                            ·         JSX syntax and component structure
                            ·         State management and props
                            ·         Handling user input and events
                            ·         React Hooks for functional components
                            ·         Building reusable components
                            ·         Styling with CSS-in-JS and styled-components
                            </p>
                            <b>Module 3: Back-End Development with Node.js and Express.js 	</b>
                            <p>
                            ·         Introduction to Node.js and server-side JavaScript
                            ·         Setting up a Node.js environment
                            ·         Creating RESTful APIs with Express.js
                            ·         Handling HTTP requests and responses
                            ·         Middleware and error handling
                            ·         Authentication and authorization with JWT
                            ·         Integrating MongoDB with Mongoose for data persistence
                            </p>

                            <b>Module 4: Database Management with MongoDB </b>
                            <p>
                            ·         Introduction to MongoDB and NoSQL databases
                            ·         Basic CRUD operations with MongoDB
                            ·         Data modeling and schema design
                            ·         Indexing and querying MongoDB
                            </p>

                            <b>Module 5: Building Full-Stack Applications with React and Node.js</b>
                            <p>
                            ·         Integrating React with Node.js backend Consuming APIs in React applications
                            ·         Implementing user authentication and authorization
                            ·         Handling forms and form validation
                            ·         Implementing pagination and sorting
                            ·         Deployment strategies for full-stack applications
                            </p>

                            <b>Module 6: Advanced Front-End Development with Next.js</b>
                            <p>
                            ·         Introduction to Next.js and server-side rendering (SSR)
                            ·         Setting up a Next.js project
                            ·         Routing and navigation in Next.js
                            ·         Data fetching strategies (Server-side rendering, Static Site Generation, Incremental Static Regeneration)
                            ·         Optimizing performance and SEO with Next.js
                            ·         Deploying Next.js applications
                            </p>
                            <b>Module 7: Final Project</b>
                            <p>
                            ·         Capstone project to apply all concepts learned throughout the course
                            ·         Building a full-stack web application from scratch
                            ·         Implementing features such as user authentication, data management, and real-time updates
                            ·         Deploying the final project to a hosting platform
                            </p>

                        </div>

                        <div className='each_course'>
                          <div className='time-frames'>
                              <div className='additional_info'>
                                <div id="amnt_cost">
                                <FontAwesomeIcon icon={faNairaSign} />70,000
                                </div>

                                <div className='course_duration'>
                                  <p><b>Duration:</b> 4 Months, with intensive training and project-practicals.</p>
                                  <ul>
                                    <p>Mode of Learning</p>
                                    <button id='course_online'>Online</button>
                                    <button id='course_offline'>On Site training</button>
                                  </ul>
                                </div>
                              </div>
                              <h3>Course Timetable</h3>
                              <ul className="class-list">
                              {Object.keys(selectedTimes).map(day => (
                                  <li key={day} className="day-list-item">
                                  <span>{day}</span>
                                  <div className="select-container">
                                      <select
                                      value={selectedTimes[day]}
                                      onChange={(e) => handleTimeChange(day, e.target.value)}
                                      >
                                      <option value=""></option>
                                      <option value="">9:00 AM - 11:00 AM</option>
                                      </select>
                                  </div>
                                  </li>
                              ))}
                              </ul>
                          </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
                    {/* footer */}
                <div id="Footer_Dash">
                <div>
                    <Link to="https://www.linkedin.com/in/godswill-ogono-861802144/"><FontAwesomeIcon icon={faLinkedin} /></Link>
                    <Link to="https://www.twitter.com/"><FontAwesomeIcon icon={faTwitter} /></Link>
                    <Link to="https://www.instagram.com/godswill_oj/"><FontAwesomeIcon icon={faInstagram} /></Link>
                    <Link to="https://api.whatsapp.com/send?phone=2347036744231&text=Hello, more information!"><FontAwesomeIcon icon={faWhatsapp} /></Link>
                    <Link to="https://wwww.facebook.com/"><FontAwesomeIcon icon={faFacebook} /></Link>
                  </div>
                </div>
        </div>
        )
  }

export default Single_course;