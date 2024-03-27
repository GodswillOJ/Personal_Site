import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate for redirection
// import Chart from 'chart.js/auto';
import {D3Chart, AreaPlotChart} from '../Components/D3Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


const DashboardAdmin = () => {
  // const [dashboardData, setDashboardData] = useState({});
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
          const response = await axios.get('https://personal-site-awu4.onrender.com/api/dashboardAdmin', {
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
  
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/loginAdmin" />; // Redirect unauthorized users to login page
  }

  const data = [
    { label: 'January', value: 30 },
    { label: 'February', value: 50 },
    { label: 'March', value: 40 },
    { label: 'April', value: 60 },
    { label: 'May', value: 20 },
    { label: 'June', value: 55 },
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      {userData && (
        <div>
          <div className="userDashBoard">
              <header className={`nav dropdown fixed-header ${isDropdownOpen ? 'open' : ''}`} id="menu">
                <button id="sub_nav_but" onClick={toggleDropdown}>
                  <div id="my_logo">Gotech_dashboard</div>
                  <FontAwesomeIcon icon={faCaretDown} id="icon001" />
                </button>
                <ul className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`} id="myDropdown">
                  <Link to=""><li><p>Dashboard</p></li></Link>
                  <Link to=""><li><p>Profile</p></li></Link>
                  <Link to="/addCategory"><li><p>Add Course</p></li></Link>
                  <Link to=""><li><p>Settings</p></li></Link>
                  <Link to="/addToPop"><li><p>Add Data</p></li></Link>
                  <Link to=""><li><p>Messages</p></li></Link>
                </ul>
              </header>


              <div id="dash_board">
                <div className="dashboard_sec">
                    <div id="dash_head">
                      <div>
                        <p>Good Day, {userData.username}!</p>

                        <div className="col">
                          <nav aria-label="breadcrumb">
                            <ul className="breadcrumb" id='my_admin_nav'>
                              <li className="breadcrumb-item"><a href="/dashboardAdmin">Admin dashboard /</a></li>
                              <li className="breadcrumb-item active"><a href="/admin/add">Add User</a></li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      <div id="highlights">
                          <p>Hey {userData.username}, Here is your account overview</p>
                      </div>
                        <>
                        <div>
                          <h2>Customer Clicks Dashboard</h2>
                          <div id='D3_Chart'>
                            <D3Chart data={data} className="customer_clicks" />
                            <AreaPlotChart defaultClicks={10} className='area_container'/>
                          </div>
                        </div>

                        </>

                        <div id="total_sales">
                            <div className="sales_visits">
                                <p>New clicks</p>
                                <h3>10,200</h3>
                            </div>
                            <div className="sales_total">
                                <p>New Database Access</p>
                                <h3>10,200</h3>
                            </div>
                        </div>

                        <div id="sales_notification">
                            <li className="not_product">
                                <p>10 new admin notification</p>
                                <Link to="" >view notification <i className="fa-solid fa-circle-chevron-right"></i></Link>
                            </li>
                            <li className="not_product">
                                <p>18 courses notification</p>
                                <Link to="" >view notification <i className="fa-solid fa-circle-chevron-right"></i></Link>
                            </li>
                            <li className="not_product">
                                <p>5 pending contacts notification</p>
                                <Link to="" >view notification <i className="fa-solid fa-circle-chevron-right"></i></Link>
                            </li>
                        </div>
                    </div>
                </div>

                {/* <div id="visual_split">
                    
                    <div id="dash_visuals">

                        <div className="order-chart">
                            <canvas id="myClicks"></canvas>
                        </div>  
                        

                        <div className="order-chart">
                            <canvas id="myChart"></canvas>
                        </div>
                    </div>
                </div> */}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
