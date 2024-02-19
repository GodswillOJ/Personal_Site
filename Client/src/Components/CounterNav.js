import React, { useState } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faMagnifyingGlass, faEnvelope, faPalette } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const CounterNav = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [lightTheme, toggleBackgroundColorOpen] = useState(false);
  const [darkTheme, toggleBackgroundColorClose] = useState(false);
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleBackgroundColor = () => {
    toggleBackgroundColorOpen(!lightTheme);
    toggleBackgroundColorClose(!darkTheme);
    document.body.classList.toggle('light-theme', lightTheme);
    document.body.classList.toggle('dark-theme', darkTheme);
  };

  const logout = () => {
    setCookies('access_token', '');
    window.localStorage.removeItem('isLoggedIn');
    onLogout();
    navigate('/login');
  };

  return (
    <div className="navbar">
      <NavLink to="/" className="logo">
        GOtech
      </NavLink>

      <div id="nav_menu" className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="#" id="theme_button" onClick={() => toggleBackgroundColor()}>
          <li>
            <FontAwesomeIcon icon={faPalette} />
          </li>
        </Link>
        <Link to="/search-user">
          <li>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          </li>
        </Link>
        <Link to="/">
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            <FontAwesomeIcon icon={faCaretDown} />
          </li>
        </Link>
        <div id="sub_menu_user" onClick={() => toggleUserMenu()}>
          <li className="sub_li">
            <Link to="#">
              <FontAwesomeIcon icon={faUser} id="icon001" />
              <FontAwesomeIcon icon={faCaretDown} id="icon001" />
            </Link>
            {isUserMenuOpen && (
              <ul className="submenu">
                <NavLink to="/dashboard">
                  <li>Dashboard</li>
                </NavLink>
                {isLoggedIn ? (
                  <li onClick={logout}>Logout</li>
                ) : (
                  <>
                    <NavLink to="/login">
                      <li>Login</li>
                    </NavLink>
                    <NavLink to="/register">
                      <li>Register</li>
                    </NavLink>
                  </>
                )}
              </ul>
            )}
          </li>
        </div>
        <Link to="/about">
          <li>About</li>
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );

};

export default CounterNav;
