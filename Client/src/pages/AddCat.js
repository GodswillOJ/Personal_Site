import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate for redirection
// import Chart from 'chart.js/auto';
import {D3Chart, AreaPlotChart} from '../Components/D3Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const AddCategory = () => {
  // const [dashboardData, setDashboardData] = useState({});
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/categories', { name: categoryName });
      console.log('Category added successfully:', response.data);
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };  
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
  
  
    if (loading) {
      return <div>Loading...</div>;
    }

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
                        <Link to=""><li><p>Add Course</p></li></Link>
                        <Link to=""><li><p>Settings</p></li></Link>
                        <Link to="/addToPop"><li><p>Add Data</p></li></Link>
                        <Link to=""><li><p>Messages</p></li></Link>
                      </ul>
                    </header>


                    <div className="AddCat">
                        <div class="cat_container">
                            <div class="cats">
                                <div class="about_us">
                                    <p> Follow us on facebook. Like our post on Instagram and linkedIn Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, necessitatibus.</p>
                                    <div class="about_links">
                                        <Link to="#"><input type="submit" value={"facebook"} /></Link>
                                        <Link to="#"><input type="submit" value={"linkedIn"} /></Link>
                                    </div>
                                </div>
                                <div class="email_cat">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sapiente dolorum ipsam doloremque animi labore sint doloribus officiis obcaecati fuga?</p>
                                    <input type="submit" value={"Get Started"} />
                                </div>
                                <div class="search_cat">
                                    <input type="text" name="search_category" />
                                    <button>Search Category</button>
                                </div>
                                <div class="add_cat">
                                    <form action="/admin/edit-category" onSubmit={handleSubmit} method="POST" class="cat_form">
                                        <div class="cat_name">
                                            <label for="name">Name</label>
                                            <input type="text" name="name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                        </div>
            
                                        <div class="cat_name">
                                            <label for="tags">Tag</label>
                                            <input type="text" name="tags" value={tag} onChange={(e) => setTag(e.target.value)} />
                                        </div>
            
                                        <div class="cat_name">
                                            <label for="description">Description</label>
                                            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>
            
                                        <div class="show_cats">
                                            <div class="cat_info">
                                                <div><input type="submit" class="edit_add" /></div>
                                                <p>Edit Categories</p>
                                            </div>
                
                                            <div class="show_tags">
            
                                                    <div class="single_tag" >
                                                        <input type="checkbox" class="tick_cat"  />
                                                        <h4></h4>
                                                    </div>
                                            </div>
                
                                            <div class="">
                                                <input type="submit" name="submit" value="Apply" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
            
                            </div>
                         </div>
                    </div>


                </div>
              </div>
            )}
      </div>
    );
}

export default AddCategory;
