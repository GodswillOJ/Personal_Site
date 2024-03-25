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
            const response = await axios.get('https://personal-site-awu4.onrender.com/api/single_course', {
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
                    <h3>Data Analysis</h3>
                </div>
                <div id='course-hints'>
                    <div id='course-hint'>
                        <p>Introduction to Data Analysis</p>
                        <p>Numpy</p>
                        <p>Pandas</p>
                    </div>
                    <div id='course-hint'>
                        <p>PostgreSQL</p>
                        <p>MatPlotLib</p>
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
                            <b>Module 1: Introduction to Data Science</b>
                            <p>

                            Overview of data science and its importance in various industries
Role of a data scientist and key skills required
Introduction to data science tools and libraries (e.g., Python, Jupyter Notebooks)

                            </p>
                            
                            <b>Module 2: Data Acquisition and Cleaning</b>
                            <p>
                            Data collection methods: scraping, APIs, databases
Data formats: CSV, JSON, XML
Data cleaning techniques: handling missing values, removing duplicates, data normalization
                            </p>
                            <b>Module 3: Exploratory Data Analysis (EDA) </b>
                            <p>

                            Descriptive statistics: mean, median, mode, variance, standard deviation
Data visualization using matplotlib and seaborn
Understanding data distributions and relationships between variables
                            </p>

                            <b>Module 4: Data Manipulation with Pandas </b>
                            <p>
                            Introduction to the Pandas library for data manipulation
Loading and saving data with Pandas
Data filtering, sorting, and grouping
Handling categorical data and text data
                            </p>

                            <b>Module 5: Statistical Analysis with Python</b>
                            <p>

                            Probability distributions: normal, binomial, Poisson
Hypothesis testing: t-tests, chi-square tests
Correlation analysis: Pearson correlation coefficient, Spearman rank correlation
                            </p>

                            <b>Module 6: Introduction to Machine Learning with Scikit-Learn</b>
                            <p>
                            Overview of machine learning concepts
Supervised learning vs. unsupervised learning
Building and evaluating machine learning models using Scikit-Learn                            </p>
                            <b>Module 7: Feature Engineering</b>
                            <p>

                            Feature selection techniques: filter methods, wrapper methods, embedded methods
Feature scaling and normalization
Handling categorical features: one-hot encoding, label encoding
                            </p>
                            <b>Module 7: Model Evaluation and Validation</b>
                            <p>

                            Cross-validation techniques: k-fold cross-validation, stratified cross-validation
Performance metrics for classification and regression tasks
Hyperparameter tuning using grid search and random search
                            </p>
                            <b>Module 7: Introduction to Time Series Analysis</b>
                            <p>

                            Understanding time series data
Time series visualization and decomposition
Time series forecasting techniques: ARIMA, Exponential Smoothing
                            </p>
                            <b>Final Project</b>

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