import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSchool, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './LoginForm.module.css'; // Updated import path
import Logo from './insight .jpg';

const LoginForm = ({ setUser }) => {
  const [loginData, setLoginData] = useState({ name: '', schoolCode: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Sending login request:', loginData);
      const response = await axios.post('http://localhost:8082/api/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials to support session-based authentication
      });
      console.log('Login response:', response.data);

      if (response.data.success) {
        setUser(response.data.user); // Set the user state in the parent component
        navigate('/dashboard');
      } else {
        setError('Login failed: ' + response.data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('There was an error during login. Please try again.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
            <input
              type="text"
              id="name"
              name="name"
              value={loginData.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <FontAwesomeIcon icon={faSchool} className={styles.inputIcon} />
            <input
              type="text"
              id="schoolCode"
              name="schoolCode"
              value={loginData.schoolCode}
              onChange={handleChange}
              required
              placeholder="School Code"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className={styles.inputField}
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
        <Link to="/register" className={styles.registrationLink}>Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
