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
                    <h3>Machine Learning</h3>
                </div>
                <div id='course-hints'>
                    <div id='course-hint'>
                        <p>Supervised Learning (SL)</p>
                        <p>Unsupervised Learning (USL)</p>
                        <p>Model Evaluation and Validation</p>
                    </div>
                    <div id='course-hint'>
                        <p>Neural Network</p>
                        <p>SVM</p>
                        <p>NLP</p>
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
                      This course serves as an introduction to the fundamental concepts, techniques, and applications of machine learning. Students will gain a solid understanding of the basic principles behind machine learning algorithms and how to apply them to solve real-world problems.
                      </p>
                  </div>
                    <div className='c_info_c'>
                        <div className='c_info_'>
                            <b>Module 1: Introduction to Machine Learning</b>
                            <p>
                                    What is Machine Learning?
                                    Types of Machine Learning: Supervised, Unsupervised, and Reinforcement Learning
                                    Applications of Machine Learning
                                    Python Setup for Machine Learning

                            </p>
                            
                            <b>Module 2: Exploratory Data Analysis (EDA)</b>
                            <p>
                                    Data Preprocessing
                                    Data Visualization Techniques
                                    Handling Missing Data
                                    Feature Engineering
                            </p>
                            <b>Module 3: Supervised Learning - Regression 	</b>
                            <p>
                                    Linear Regression
                                    Polynomial Regression
                                    Evaluation Metrics: MSE, RMSE, MAE, R-squared
                                    Model Evaluation and Validation
                            </p>

                            <b>Module 4: Supervised Learning - Classification </b>
                            <p>
                                    Logistic Regression
                                    k-Nearest Neighbors (k-NN)
                                    Decision Trees
                                    Evaluation Metrics: Accuracy, Precision, Recall, F1 Score
                            </p>

                            <b>Module 5: Unsupervised Learning</b>
                            <p>

                                    Clustering Algorithms: K-Means, Hierarchical Clustering
                                    Dimensionality Reduction Techniques: PCA (Principal Component Analysis)
                            </p>

                            <b>Module 6:Introduction to Neural Networks</b>
                            <p>
                                    Basics of Artificial Neural Networks (ANNs)
                                    Activation Functions
                                    Training Neural Networks: Back propagation, Gradient Descent
                                    Introduction to Deep Learning
                            </p>
                            <b>Module 7: Deep Learning with TensorFlow</b>
                            <p>
                                    Introduction to TensorFlow and Keras
                                    Building and Training Deep Learning Models
                                    Convolutional Neural Networks (CNNs) for Image Classification
                            </p>
                            <b>Module 8: Advanced Topics in Machine Learning</b>
                            <p>
                                    Ensemble Learning: Bagging and Boosting
                                    Introduction to Support Vector Machines (SVM)
                                    Introduction to Natural Language Processing (NLP) and Text Classification
                            </p>
                            <b>Module 9: Case Studies and Practical Applications</b>
                            <p>
                                    Real-world examples of machine learning applications
                                    Hands-on projects and assignments
                                    Ethical considerations in machine learning
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