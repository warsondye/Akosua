import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import Logo from './insight .jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouseUser, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    houseCode: '',
    house: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/housemasters/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Server Response:', response.data);

      if (response.data.success) {
        // Navigate to dashboard and pass user data
        navigate('/housemaster-dashboard', { state: { user: formData } });
      } else {
        setError(`Registration failed: ${response.data.error}`);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'There was an error submitting the form. Please try again.');
      } else {
        setError('There was an error submitting the form. Please try again.');
      }
    }
  };

  const getIconForField = (field) => {
    switch (field) {
      case 'name': return faUser;
      case 'houseCode': return faHouseUser;
      case 'house': return faHouseUser;
      case 'phoneNumber': return faPhone;
      case 'password': return faLock;
      case 'confirmPassword': return faLock;
      default: return faUser;
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="registration-page">
      <header className="app-header">
        <img src={Logo} alt="Logo" className="logo" />
        <h1 className="app-name">Insights</h1>
      </header>
      <div className="container">
        <h2>Registration Form</h2>
        <h3>St. Augustine's College</h3>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key, index) => (
            <div className="input-group" key={index}>
              <label htmlFor={key}><FontAwesomeIcon icon={getIconForField(key)} /> {capitalizeFirstLetter(key.replace(/([A-Z])/g, ' $1'))}:</label>
              <input
                type={key.includes('password') ? 'password' : 'text'}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
            </div>
          ))}
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Register</button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/housemaster-login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
