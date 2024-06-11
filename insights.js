import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './register';
import HousemasterRegister from './housemaster-register';
import Logo from './insight .jpg'; 
import './insights.css'; // Import the CSS file

const Insights = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show the animation for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="animation-container">
        <img src={Logo} alt="Logo" className="animation-logo" />
        <h1 className="animation-text">
          Insights <div className="diva">5th gen</div>
        </h1>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <div className="header-content">
          <img src={Logo} alt="Logo" className="logo" />
          <h1>Insights</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/register"><i className="fas fa-user-plus"></i> Register as Parent</Link></li>
            <li><Link to="/housemaster-register"><i className="fas fa-chalkboard-teacher"></i> Register as Housemaster</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/housemaster-register" element={<HousemasterRegister />} />
        </Routes>
      </main>
    </div>
  );
};

export default Insights;
