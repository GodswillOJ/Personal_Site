import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CounterApp() {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nin, setNin] = useState('');

  const navigate = useNavigate();

  // Use effect to check if the user is authenticated when the component mounts
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log('CounterApp isLoggedIn:', isLoggedIn);
  
    if (!isLoggedIn) {
      // Redirect to login page or perform any other action
      navigate('/login');
    }
  }, [navigate]);
  
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://population-counter.onrender.com/api/addToPop', { name, state, address, dateOfBirth, nin });
      alert('User added successfully!');
      setName('');
      setState('');
      setAddress('');
      setDateOfBirth('');
      setNin('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
    'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
    'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara',
  ];

  return (
    <div className="CounterCont">
      <form onSubmit={onSubmit} className="Counter_Engine">
        <h1 className="Title">Population Counter</h1>
        <div className="form-group">
          <label>Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="form-group">
          <label>DOB:</label>
          <input id="dateOfBirth" type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>

        <div className="selectCont">
          <div className="form-group select-wrapper" id='selectWrap'>
            <label htmlFor="stateSelect">State:</label>
            <select
              id="stateSelect"
              value={state}
              onChange={(e) => setState(e.target.value)}
              // className={isOpen ? 'open' : ''}
            >
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>NIN:</label>
            <input id="nin" type="text" value={nin} onChange={(e) => setNin(e.target.value)} />
          </div>
        </div>

        <div>
          <button className="btn1" type="submit">
            Add To Census
          </button>
        </div>
      </form>
    </div>
  );
}

export default CounterApp;