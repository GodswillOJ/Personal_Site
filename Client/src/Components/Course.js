import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faMagnifyingGlass, faEnvelope, faPalette } from '@fortawesome/free-solid-svg-icons';


const Courses_Comp = () => {
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
            const response = await axios.get('https://personal-site-awu4.onrender.com/api/all_courses', {
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
           <div>
              <p>Courses Page</p>
           </div>

           <div className='course_cont'>
              <div className='all_c'>
                  <div className='class_online' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${myImage})` }}>
                    <p>course_info, Get a tutor online. We offer the best tutors that will meet your needs, with much confidence. Click the button below, and get linked to a tutor now. Happy learning</p>
                    <input type='button' value={'Get started'}/>
                  </div>
              </div>

              <div className='all_c'>
                  <div className='class_onsite' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${MyImage})` }}>
                    <p>course_info, Contact a tutor onsite. We offer the best tutors that will meet your needs. Click the button below, and get linked to a tutor close to you. Happy learning</p>
                    <input type='button' value={'Contact tutor'}/>
                  </div>
              </div>
           </div>

            <div className='course_cat'>
              <p>Set by Category</p>
              <ul className='cat_show'>
                <li><p>Machine Learning</p></li>
                <li><p>Web Development</p></li>
                <li><p>Data Analysis</p></li>
                <li><p>Graphics Design</p></li>
              </ul>
            </div>

            <div className='each_course'>
              <div className='each_course_container'>
                    <div className='each_c'>
                          <div className='my_img1'>
                            <img src={`${process.env.PUBLIC_URL}/images/machine.jpg`} alt="My Image" />
                          </div>

                          <div className='c_information'>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consectetur ipsum quos repellat facere qui fuga sequi fugiat ea maxime</p>
                              <input type='button' value={"add to cart"}/>
                          </div>
                    </div>
                    <div className='each_c'>
                          <div className='my_img1'>
                            <img src={`${process.env.PUBLIC_URL}/images/DataAnaly.jpg`} alt="My Image" />
                          </div>
                          <div className='c_information'>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consectetur ipsum quos repellat facere qui fuga sequi fugiat ea maxime</p>
                              <input type='button' value={"add to cart"}/>
                          </div>
                    </div>
                    <div className='each_c'>
                          <div className='my_img1'>
                            <img src={`${process.env.PUBLIC_URL}/images/web.jpg`} alt="My Image" />
                          </div>
                          <div className='c_information'>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consectetur ipsum quos repellat facere qui fuga sequi fugiat ea maxime</p>
                              <input type='button' value={"add to cart"}/>
                          </div>
                    </div>
                    <div className='each_c'>
                          <div className='my_img1'>
                            <img src={`${process.env.PUBLIC_URL}/images/AI.jpg`} alt="My Image" />
                          </div>
                          <div className='c_information'>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consectetur ipsum quos repellat facere qui fuga sequi fugiat ea maxime</p>
                              <input type='button' value={"add to cart"}/>
                          </div>
                    </div>
              </div>
              <div className='time-frames'>
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
        )
  }

export default Courses_Comp;