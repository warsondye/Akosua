import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faComments, faBars, faAdjust, faFolderOpen, faSave, faCamera, faCog, faTimes, faEdit, faNewspaper, faWalking } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ViewContent from './ViewContent';
import './dashboard.css';
import Logo from './insight .jpg'; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [uploadedContent, setUploadedContent] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8082/api/user', { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setUser(response.data.user);
          if (response.data.user.profilePic) {
            setProfilePic(response.data.user.profilePic);
          }
        } else {
          console.error('User data fetch failed:', response.data.error);
          navigate('/login'); // Redirect to login if not logged in
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to login if an error occurs
      });
  }, [navigate]);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleMenuItemClick = (route) => {
    navigate(route);
  };

  const handleInputChange = (fieldName, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
      setUser((prevUser) => ({
        ...prevUser,
        profilePic: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    axios.post('http://localhost:8082/api/update-user', user, { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          console.log('User data updated successfully');
          setEditMode(false);
        } else {
          console.error('Error updating user data:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className={`dashboard-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="app-header">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
          <h1 className="app-name">Insights</h1>
        </div>
        <div className="menu-icon-container" onClick={handleMenuToggle}>
          <FontAwesomeIcon icon={faBars} className="menu-icon" />
          <span className="menu-label">Menu</span>
        </div>
        <FontAwesomeIcon icon={faAdjust} className="theme-toggle" onClick={handleThemeToggle} />
        <FontAwesomeIcon icon={faCog} className="settings-icon" onClick={handleSettingsToggle} />
      </div>
      {showMenu && (
        <div className="menu-content">
          <ul>
            <li onClick={() => handleMenuItemClick('/calendar')}><FontAwesomeIcon icon={faCalendarAlt} /> Calendar</li>
            <li onClick={() => handleMenuItemClick('/chats')}><FontAwesomeIcon icon={faComments} /> Chat with Housemaster</li>
            <li onClick={() => handleMenuItemClick('/documents')}><FontAwesomeIcon icon={faFolderOpen} /> Documents</li>
          </ul>
        </div>
      )}
      {showSettings && (
        <div className="settings-panel">
          <h2>Settings</h2>
          <div className="setting-option">
            <label htmlFor="dark-theme-checkbox">Dark Theme</label>
            <input type="checkbox" id="dark-theme-checkbox" checked={isDarkTheme} onChange={handleThemeToggle} />
          </div>
        </div>
      )}
      <div className="main-content">
        <h2>Welcome to Insights!</h2>
        {user ? (
          <div className="profile-summary">
            <h3>Profile Summary</h3>
            {editMode ? (
              <div className="profile-info edit-mode">
                <div className="profile-pic">
                  <label htmlFor="profile-pic-upload" className="profile-pic-label">
                    <FontAwesomeIcon icon={faCamera} />
                    <input type="file" id="profile-pic-upload" accept="image/*" onChange={handleProfilePicChange} />
                  </label>
                  {profilePic && <img src={profilePic} alt="Profile" className="profile-pic-preview" />}
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={user.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="house">House:</label>
                  <input
                    type="text"
                    id="house"
                    value={user.house || ''}
                    onChange={(e) => handleInputChange('house', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="houseCode">House Code:</label>
                  <input
                    type="text"
                    id="houseCode"
                    value={user.houseCode || ''}
                    onChange={(e) => handleInputChange('houseCode', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={user.phoneNumber || ''}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <div className="profile-pic">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="profile-pic-preview" />
                  ) : (
                    <FontAwesomeIcon icon={faCamera} className="profile-pic-icon" />
                  )}
                </div>
                <p><span>Name:</span> {user.name}</p>
                <p><span>House:</span> {user.house}</p>
                <p><span>Class:</span> {user.class}</p>
                <p><span>Phone Number:</span> {user.phoneNumber}</p>
              </div>
            )}
          </div>
        ) : (
          <p>No data available.</p>
        )}
        <div className="content-section">
          <ViewContent content={uploadedContent} />
        </div>
      </div>
      <div className="dashboard-actions">
        <div className="action-button" onClick={() => setEditMode(!editMode)}>
          {editMode ? <><FontAwesomeIcon icon={faTimes} /> Cancel</> : <><FontAwesomeIcon icon={faEdit} /> Edit Profile</>}
        </div>
        {editMode && (
          <div className="action-button" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} /> Save
          </div>
        )}
        <div className="action-button" onClick={() => handleMenuItemClick('/news')}>
          <FontAwesomeIcon icon={faNewspaper} /> News
        </div>
        <div className="action-button" onClick={() => handleMenuItemClick('/request-exeat')}>
          <FontAwesomeIcon icon={faWalking} /> Request Exeat
        </div>
        <div className="action-button" onClick={() => handleMenuItemClick('/forkids')}>
          <FontAwesomeIcon icon={faWalking} /> For Kids
        </div>

      </div>
      <div className="right-section">
        {user && (
          <div className="profile-info">
            <div className="profile-pic">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="profile-pic-preview" />
              ) : (
                <FontAwesomeIcon icon={faCamera} className="profile-pic-icon" />
              )}
            </div>
            <p><span>Name:</span> {user.name}</p>
            <p><span>House:</span> {user.house}</p>
            <p><span>Class:</span> {user.class}</p>
            <p><span>Phone Number:</span> {user.phoneNumber}</p>
          </div>
        )}
        <div className="report">
          <h2>Report</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
