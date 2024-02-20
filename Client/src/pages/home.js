import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// import Swiper from 'swiper';
// import 'swiper/swiper-bundle.css';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

// Install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const Home = ({ isLoggedIn }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          const accessToken = localStorage.getItem('access_token');
          const response = await axios.get('https://population-counter.onrender.com/api/', {
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

    const swiper = new SwiperCore('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

  }, [isLoggedIn]);




  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const myImage = 'personalOpacity.jpg';

  return (
    <div className="Home">
      <h2>Welcome to the Home Page!</h2>
      <div>
        <div id="site_img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${myImage})` }}>
          <div className="site_hint">
            <h1>Gotech IT Training</h1>
            <p>Just a click away from your desired website</p>
            <Link to="/courses"><button className="button-default">See courses</button></Link>
          </div>
        </div>
        <section className="courses_">
          <div className="courses_heads">
                <div className="course_c1" id="course_1" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/shoper.jpg)` }}>
                  <h1>Online Learning</h1>
                  <p>Get an instructor online to meet your expectations</p>
                  <Link to=""><button className="button-default">Our Offers</button></Link>
                </div>

                <div className="course_c1" id="course_1" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/oneOnOne.jpg)` }}>
                  <h1>On site training</h1>
                  <p>Get an enrolled into any of our courses and get started</p>
                  <Link to=""><button className="button-default">See courses</button></Link>
                </div>
                <div className="course_c1" id="course_1" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/presentation.jpg)` }}>
                  <h1>Contact us for your dream websites</h1>
                  <p>Get an enrolled into any of our courses and get started</p>
                  <Link to=""><button className="button-default">Contact Us</button></Link>
                </div>
          </div>
          <div className="cr_feat">
              <div className="feat">
                <Link to=""><li className="feat">Featured</li></Link>
                <Link to=""><li className="feat">Web Development</li></Link>
                <Link to=""><li className="feat">Data Science</li></Link>
                <Link to=""><li className="feat">Artificial Intelligence</li></Link>
              </div>
          </div>
          <div className="courses_cont">
              <div className="courses_info swiper-container">
                  <div className="courses_all swiper-wrapper">

                    <div className="swiper-slide">
                      <div id="myCourse">
                      <div className="course_c2" id="course_01" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/DataAnaly.jpg)`}}>
                          
                          </div>
                          <div className="course_text">
                              <p id="C_wk">18 weeks</p>
                              <p id="course_title">Data Science</p>
                              <p className="course_amnt">300,000</p>
                              <Link to=""><p>See More</p></Link>
                          </div>
                      </div>
                  </div>

                  <div className="swiper-slide">
                      <div id="myCourse">
                        <div className="course_c2" id="course_01" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/web.jpg)`}}>
                        
                        </div>
                        <div className="course_text">
                            <p id="C_wk">22 weeks</p>
                            <p id="course_title">Web Development</p>
                            <p className="course_amnt">250,000</p>
                            <Link to=""><p>See More</p></Link>
                        </div>
                      </div>
                    </div>

                    <div className="swiper-slide">
                      <div id="myCourse">
                          <div className="course_c2" id="course_02" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/AI.jpg)`}}>
                              
                          </div>
                          <div className="course_text">
                              <p id="C_wk">12 weeks</p>
                              <p id="course_title">Artificial Intelligence</p>
                              <p className="course_amnt">250,000</p>
                              <Link to=""><p>See More</p></Link>
                          </div>
                      </div>
                    </div>

                    <div className="swiper-slide">
                        <div id="myCourse">
                            <div className="course_c2" id="course_03" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/machine.jpg)`}}>
                                
                            </div>
                            <div className="course_text">
                                <p id="C_wk">11 weeks</p>
                                <p id="course_title">Machine Learning</p>
                                <p className="course_amnt">200,000</p>
                                <Link to=""><p>See More</p></Link>
                            </div>
                        </div>
                    </div>

                    <div className="swiper-slide">
                      <div id="myCourse">
                          <div className="course_c2" id="course_04" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/UIUX.jpg)`}}>
                          
                          </div>
                          <div className="course_text">
                              <p id="C_wk">16 weeks</p>
                              <p id="course_title">Graphics Design</p>
                              <p className="course_amnt">150,000</p>
                              <Link to=""><p>See More</p></Link>
                          </div>
                      </div>
                    </div>

                    <div className="swiper-slide">
                      <div id="myCourse">
                          <div className="course_c2" id="course_04" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/Graphics.jpg)`}}>

                          </div>
                          <div className="course_text">
                              <p id="C_wk">12 weeks</p>
                              <p id="course_title">UI/UX</p>
                              <p className="course_amnt">100,000</p>
                              <Link to=""><p>See More</p></Link>
                          </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-pagination"></div>

                  <div className="swiper-button-prev">
                  <FontAwesomeIcon icon={faChevronLeft} className="arrow_slide" />
                  </div>
                  <div className="swiper-button-next">
                  <FontAwesomeIcon icon={faChevronRight} className="arrow_slide" />
                  </div>
                </div>

           </div>
        </section>
      </div>
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
  );
};

export default Home;
