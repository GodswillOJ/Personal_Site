import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Swiper } from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'react'; // Import Swiper core and required modules

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const Home = ({ isLoggedIn }) => {
  // State variables for loading and error handling
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
            </div>

            <div className="cr_feat">
              <div className="feat">
                <Link to=""><li className="feat">Featured</li></Link>
                <Link to=""><li className="feat">Web Development</li></Link>
                <Link to=""><li className="feat">Data Science</li></Link>
                <Link to=""><li className="feat">Artificial Intelligence</li></Link>
              </div>
            </div>

            <div className="courses_info">
              <Swiper className='Swiper'
                spaceBetween={24}
                loop={true}
                
                pagination={{
                  clickable: true,
                }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                breakpoints={{
                  1200: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  }
                }}
              >
                {/* Your course items here */}
                <SwiperSlide>
                    <div className="course_c2" id="course_01" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/oneOnOne.jpg)`}}>
                    
                    </div>
                    <div className="course_text">
                        <p id="C_wk">18 weeks</p>
                        <p id="course_title">Data Science</p>
                        <p className="course_amnt">300,000</p>
                        <Link to=''><p>See More</p></Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="course_c2" id="course_01" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/oneOnOne.jpg)`}}>
                    
                    </div>
                    <div className="course_text">
                        <p id="C_wk">22 weeks</p>
                        <p id="course_title">Web Development</p>
                        <p className="course_amnt">250,000</p>
                        <Link to=''><p>See More</p></Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="course_c2" id="course_02" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/oneOnOne.jpg)`}}>
                        
                    </div>
                    <div className="course_text">
                        <p id="C_wk">12 weeks</p>
                        <p id="course_title">Artificial Intelligence</p>
                        <p className="course_amnt">250,000</p>
                        <Link to=''><p>See More</p></Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="course_c2" id="course_03" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/oneOnOne.jpg)`}}>
                        
                    </div>
                    <div className="course_text">
                        <p id="C_wk">11 weeks</p>
                        <p id="course_title">Machine Learning</p>
                        <p className="course_amnt">200,000</p>
                        <Link to=''><p>See More</p></Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="course_c2" id="course_04" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/oneOnOne.jpg)`}}>
                    
                    </div>
                    <div className="course_text">
                        <p id="C_wk">16 weeks</p>
                        <p id="course_title">Graphics Design</p>
                        <p className="course_amnt">150,000</p>
                        <Link to=''><p>See More</p></Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="course_c2" id="course_04" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/oneOnOne.jpg)`}}>

                    </div>
                    <div className="course_text">
                        <p id="C_wk">12 weeks</p>
                        <p id="course_title">UI/UX</p>
                        <p className="course_amnt">100,000</p>
                        <Link to=''><p>See More</p></Link>
                    </div>
                </SwiperSlide>
              </Swiper>
              <div className="swiper-button-next">
                  {/* <FontAwesomeIcon icon={faChevronRight} /> */}
                </div>
                <div className="swiper-button-prev">
                  {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
                </div>
            </div>
        </section>
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
  );
};

export default Home;
