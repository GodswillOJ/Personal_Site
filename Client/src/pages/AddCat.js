import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate for redirection
// import Chart from 'chart.js/auto';
import {D3Chart, AreaPlotChart} from '../Components/D3Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const AddCategory = ({ isLoggedIn }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (isLoggedIn) {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.get('https://personal-site-awu4.onrender.com/api/addCategory', {
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

    return (
        <div className="AddCat">
                        <div class="cat_container">
                    <div class="cats" style="display: block">
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
                            <form action="/admin/edit-category" method="POST" class="cat_form">
                                <div class="cat_name">
                                    <label for="name">Name</label>
                                    <input type="text" name="name" />
                                </div>
    
                                <div class="cat_name">
                                    <label for="tags">Tag</label>
                                    <input type="text" name="tags" />
                                </div>
    
                                <div class="cat_name">
                                    <label for="description">Description</label>
                                    <input type="text" name="description" />
                                </div>
    
                                <div class="show_cats">
                                    <div class="cat_info" style="display: grid; grid-template-columns: 1fr 1fr;">
                                        <div><input type="submit" value="edit" class="edit_add" style="padding: 0 4px 0 4px;" /></div>
                                        <p>Edit Categories</p>
                                    </div>
        
                                    <div class="show_tags" style="display: grid;">
    
                                        
                                         
                                            <div class="single_tag" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px;">
                                                <input type="checkbox" class="tick_cat" style="display: inline-block" />
                                                <h4></h4>
                                            </div>
    
                                        
    
    
                                    </div>
        
                                    <div class=""  style="display: grid; grid-template-columns: 1fr; padding-top: 50px;">
                                        <input type="submit" name="submit" value="Apply" />
                                    </div>
                                </div>
                            </form>
                        </div>
    
                    </div>
                </div>
        </div>
    );
}

export default AddCategory;
