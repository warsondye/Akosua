import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './housemaster-login.css';
import Logo from './insight .jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faLock } from '@fortawesome/free-solid-svg-icons';

const HousemasterLogin = () => {
  const [formData, setFormData] = useState({
    houseCode: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    try {
      const response = await axios.post('http://localhost:8080/api/housemasters/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Server Response:', response.data);

      if (response.data.success) {
        // Navigate to dashboard and pass user data
        navigate('/housemaster-dashboard', { state: { user: response.data.user } });
      } else {
        setError(`Login failed: ${response.data.error}`);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'There was an error submitting the form. Please try again.');
      } else {
        setError('There was an error submitting the form. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <header className="app-header">
        <img src={Logo} alt="Logo" className="logo" />
        <h1 className="app-name">Insights</h1>
      </header>
      <div className="container">
        <h2>Login Form</h2>
        <h3>St. Augustine's College</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="houseCode"><FontAwesomeIcon icon={faHouseUser} /> House Code:</label>
            <input
              type="text"
              id="houseCode"
              name="houseCode"
              value={formData.houseCode}
              onChange={handleChange}
              required
              placeholder="Enter house code"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password"><FontAwesomeIcon icon={faLock} /> Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          Don't have an account? <Link to="/housemaster-register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default HousemasterLogin;
