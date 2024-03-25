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
                    <h3>Artificial Intelligence</h3>
                </div>
                <div id='course-hints'>
                    <div id='course-hint'>
                        <p>AI Basis</p>
                        <p>Python Fundamentals for AI</p>
                        <p>Machine learning</p>
                    </div>
                    <div id='course-hint'>
                        <p>Deep Learning </p>
                        <p>Computer Vision</p>
                        <p>Reinforcement Learning</p>
                    </div>
                </div>
           </div>

            <div className='single_c_cat'>
                <div classNam='singles_'>
                  <div id='course_descrip'>
                    <h4 id='course_headline'>About course</h4>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus doloribus culpa distinctio sit harum repellat dolore ratione inventore, nesciunt vero.</p>
                      <h4>Artificial Intelligence Outline</h4>
                      <p id='course_descrip_in'>
                      This course provides a comprehensive introduction to artificial intelligence (AI) with a focus on practical implementation using the Python programming language. Students will learn fundamental AI concepts, algorithms, and techniques, and gain hands-on experience through programming assignments and projects. Topics covered include machine learning, neural networks, natural language processing, computer vision, and reinforcement learning.
                      </p>
                  </div>
                    <div className='c_info_c'>
                        <div className='c_info_'>
                            <b>Module 1: Introduction to Artificial Intelligence</b>
                            <p>
                                      Overview of AI and its applications
                                      Historical perspective and milestones
                                      Types of AI: narrow vs. general AI
                                      Ethics and societal implications of AI
                            </p>
                            
                            <b>Module 2: Python Fundamentals for AI</b>
                            <p>
                            Introduction to Python programming language
Data types, variables, and basic syntax
Control structures: loops and conditionals
Functions and modules in Python
File I/O operations

                            </p>
                            <b>Module 3: Introduction to Machine Learning </b>
                            <p>
                            Basics of machine learning and its types
Supervised, unsupervised, and reinforcement learning
Overview of key machine learning libraries in Python (e.g., scikit-learn, TensorFlow, PyTorch)
                            </p>

                            <b>Module 4: Machine Learning with scikit-learn </b>
                            <p>
                            Preprocessing data: normalization, feature scaling, and handling missing values
Classification and regression algorithms (e.g., decision trees, logistic regression, SVM)
Model evaluation and validation techniques
                            </p>

                            <b>Module 5: Deep Learning Fundamentals</b>
                            <p>
                            Introduction to neural networks
Building blocks of neural networks: neurons, layers, and activation functions
Training neural networks using gradient descent and back propagation
Introduction to deep learning frameworks: TensorFlow and PyTorch
                            </p>

                            <b>Module 6: Deep Learning with TensorFlow</b>
                            <p>
                            Building and training neural networks using TensorFlow
Convolutional Neural Networks (CNNs) for computer vision tasks
Recurrent Neural Networks (RNNs) for sequential data processing
Transfer learning and fine-tuning pre-trained models
                            </p>
                            <b>Module 7: Natural Language Processing (NLP)</b>
                            <p>
                            Introduction to NLP and its applications
Text preprocessing techniques: tokenization, stemming, and lemmatization
Text classification and sentiment analysis using machine learning and deep learning approaches
Introduction to word embeddings and neural language models
                            </p>
                            <b>Module 7: Computer Vision</b>
                            <p>
                            Basics of computer vision and image processing
Image classification and object detection using CNNs
Image segmentation and feature extraction techniques
Applications of computer vision in autonomous vehicles, medical imaging, and surveillance
                            </p>
                            <b>Module 7: Reinforcement Learning</b>
                            <p>
                            Introduction to reinforcement learning (RL)
Markov Decision Processes (MDPs) and the RL framework
Q-learning and deep Q-networks (DQN)
Applications of reinforcement learning in game playing, robotics, and optimization problems
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