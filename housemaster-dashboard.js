import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faBars, faAdjust, faFolderOpen, faSave, faCamera, faCog, faTimes, faEdit, faNewspaper, faWalking, faPlus, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './housemaster-dashboard.css';
import Logo from './insight .jpg';

const Dashboard = () => {
  const [editProfile, setEditProfile] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    parentNumber: '',
    nhisNumber: ''
  });
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [studentAddedMessage, setStudentAddedMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8087/api/user', { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setUser(response.data.user);
          if (response.data.user.profilePic) {
            setProfilePic(response.data.user.profilePic);
          }
        } else {
          console.error('User data fetch failed:', response.data.error);
          navigate('/login');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        navigate('');
      });

    axios.get('http://localhost:8087/api/students')
      .then(response => {
        if (response.data.success) {
          setStudents(response.data.students);
        } else {
          console.error('Error fetching students:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, [navigate]);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  const handleSaveField = (fieldName) => {
    // Function logic to save the field
    console.log(`Saving field: ${fieldName}`);
  };
  
  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  
  const handleMenuItemClick = (route) => {
    navigate(route);
  };
  const handleProfileEditToggle = () => {
    setEditProfile(!editProfile);
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
    axios.post('http://localhost:8087/api/update-user', user, { withCredentials: true })
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

  const handleNewStudentChange = (fieldName, value) => {
    setNewStudent(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleAddStudent = () => {
    axios.post('http://localhost:8087/api/students', newStudent)
      .then(response => {
        if (response.data.success) {
          setStudents([...students, response.data.student]);
          setNewStudent({ name: '', class: '', parentNumber: '', nhisNumber: '' });
          setShowAddStudentForm(false);
          setStudentAddedMessage('Student added successfully!');
          setTimeout(() => setStudentAddedMessage(''), 3000);
        } else {
          console.error('Error adding student:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  const handleDeleteStudent = (id) => {
    axios.delete(`http://localhost:8087/api/students/${id}`)
      .then(response => {
        if (response.data.success) {
          setStudents(students.filter(student => student.id !== id));
        } else {
          console.error('Error deleting student:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      });
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
            <li onClick={() => handleMenuItemClick('/personal=notes')}><FontAwesomeIcon icon={faComments} /> personal note</li>
            <li onClick={() => handleMenuItemClick('/duty-roster')}><FontAwesomeIcon icon={faFolderOpen} /> duty roster</li>
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
        className="input-field"
      />
      <button className="save-button" onClick={() => handleSaveField('name')}>Save</button>
    </div>
    <div className="form-group">
      <label htmlFor="houseCode">House Code:</label>
      <input
        type="text"
        id="houseCode"
        value={user.houseCode || ''}
        onChange={(e) => handleInputChange('houseCode', e.target.value)}
        className="input-field"
      />
      <button className="save-button" onClick={() => handleSaveField('houseCode')}>Save</button>
    </div>
    <div className="form-group">
      <label htmlFor="house">House:</label>
      <input
        type="text"
        id="house"
        value={user.house || ''}
        onChange={(e) => handleInputChange('house', e.target.value)}
        className="input-field"
      />
      <button className="save-button" onClick={() => handleSaveField('house')}>Save</button>
    </div>
    <div className="form-group">
      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        type="text"
        id="phoneNumber"
        value={user.phoneNumber || ''}
        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
        className="input-field"
      />
      <button className="save-button" onClick={() => handleSaveField('phoneNumber')}>Save</button>
    </div>
  </div>
) : (
  <div className="profile-info">
    <div className="profile-pic">
      {profilePic && <img src={profilePic} alt="Profile" className="profile-pic-preview" />}
    </div>
    <div className="profile-details">
      <div className="detail">
        <span className="detail-label">Name:</span> {user.name}
        <button className="edit-button" onClick={() => handleEditMode('name')}><FontAwesomeIcon icon={faEdit} /></button>
      </div>
      <div className="detail">
        <span className="detail-label">House Code:</span> {user.houseCode}
        <button className="edit-button" onClick={() => handleEditMode('houseCode')}><FontAwesomeIcon icon={faEdit} /></button>
      </div>
      <div className="detail">
        <span className="detail-label">House:</span> {user.house}
        <button className="edit-button" onClick={() => handleEditMode('house')}><FontAwesomeIcon icon={faEdit} /></button>
      </div>
      <div className="detail">
        <span className="detail-label">Phone Number:</span> {user.phoneNumber}
        <button className="edit-button" onClick={() => handleEditMode('phoneNumber')}><FontAwesomeIcon icon={faEdit} /></button>
      </div>
    </div>
  </div>
)}

            <div className="action-buttons">
              <div  onClick={() => setEditMode(!editMode)}>
             
              </div>
              {editMode && (
                <div className="action-button" onClick={handleSave}>
                  <FontAwesomeIcon icon={faSave} /> Save
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>No data available.</p>
        )}
        <div className="students-section">
          <h3>Students</h3>
          <div className="add-student-form">
            <button className="add-student-button" onClick={() => setShowAddStudentForm(!showAddStudentForm)}>
              <FontAwesomeIcon icon={faPlus} /> Add Student
            </button>
            {showAddStudentForm && (
              <div className="student-form">
                <div className="form-group">
                  <label htmlFor="student-name">Name:</label>
                  <input
                    type="text"
                    id="student-name"
                    value={newStudent.name}
                    onChange={(e) => handleNewStudentChange('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="student-class">Class:</label>
                  <input
                    type="text"
                    id="student-class"
                    value={newStudent.class}
                    onChange={(e) => handleNewStudentChange('class', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="student-parentNumber">Parent Number:</label>
                  <input
                    type="text"
                    id="student-parentNumber"
                    value={newStudent.parentNumber}
                    onChange={(e) => handleNewStudentChange('parentNumber', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="student-nhisNumber">NHIS Number:</label>
                  <input
                    type="text"
                    id="student-nhisNumber"
                    value={newStudent.nhisNumber}
                    onChange={(e) => handleNewStudentChange('nhisNumber', e.target.value)}
                  />
                </div>
                <button onClick={handleAddStudent}>Add Student</button>
              </div>
            )}
            {studentAddedMessage && (
              <div className="student-added-message">
                <FontAwesomeIcon icon={faCheckCircle} /> {studentAddedMessage}
              </div>
            )}
          </div>
          <div className="students-list">
            <ul>
              {students.map((student, index) => (
                <li key={index}>
                  <p><span>Name:</span> {student.name}</p>
                  <p><span>Class:</span> {student.class}</p>
                  <p><span>Parent Number:</span> {student.parentNumber}</p>
                  <p><span>NHIS Number:</span> {student.nhisNumber}</p>
                  <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteStudent(student.id)} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="dashboard-actions">
        <div className="action-button" onClick={() => handleMenuItemClick('/news')}>
          <FontAwesomeIcon icon={faNewspaper} /> News
        </div>
        <div className="action-button" onClick={() => handleMenuItemClick('/request-exeat')}>
          <FontAwesomeIcon icon={faWalking} /> Request Exeat
        </div>
        <div className="action-button" onClick={() => setEditMode(!editMode)}>
                {editMode ? <><FontAwesomeIcon icon={faTimes} /> save update</> : <><FontAwesomeIcon icon={faEdit} />  Profile</>}
  </div>
       
      </div>
      <div className="right-section">
     
      </div>
    </div>
  );
};

export default Dashboard;
