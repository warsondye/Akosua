import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './register';
import Dashboard from './dashboard';
import HousemasterDashboard from './housemaster-dashboard';
import HousemasterRegister from './housemaster-register';
import HousemasterExeatRequests from './HousemasterExeatRequests';
import Housemasterlogin from './housemaster-login';
import News from './news';
import RequestExeat from './RequestExeat';
import Calendar from './calendar';
import VisitSchedule from './VisitSchedule';
import Insights from './insights';
import './style.css';
import Chat from './chats';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DutyRoster from './duty-roster';
import PersonalNotes from './personal-notes';
import SchoolCalendar from './school-calendar';
import DocumentUpload from './documents';
import HouseDetails from './house-details';
import Login from './login';

const App = () => {
  const [formData, setFormData] = useState(null);
  const [theme, setTheme] = useState('light');
  const [userRole, setUserRole] = useState('viewer');
  const [user, setUser] = useState(null); // Added user state

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleFormData = (data) => {
    setFormData(data);

    // Redirect to the appropriate dashboard based on user role
    if (data.role === 'housemaster') {
      setUserRole('housemaster');
    } else {
      setUserRole('viewer');
    }
  };

  const handleUpdateData = (data) => {
    setFormData(data);
  };

  return (
    <div className={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Insights onSubmit={handleFormData} />} />
          <Route path="/housemaster-register" element={<HousemasterRegister onSubmit={handleFormData} />} />
          <Route path="/register" element={<RegistrationForm onSubmit={handleFormData} />} />
          <Route path="/dashboard" element={<Dashboard user={user} userRole={userRole} />} /> {/* Pass user as a prop */}
          <Route path="/HousemasterExeatRequests" element={<HousemasterExeatRequests theme={theme} toggleTheme={toggleTheme} />} />
      
          <Route path="/news" element={<News />} />
          <Route path="/request-exeat" element={<RequestExeat />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/visitschedule" element={<VisitSchedule />} />
          <Route path="/chats" element={<Chat onSubmit={handleFormData} />} />
          <Route path="/housemaster-login" element={<Housemasterlogin setUser={setUser} />} /> {/* Pass setUser as a prop */}
          <Route path="/personal-notes" element={<PersonalNotes />} />
          <Route path="/school-calendar" element={<SchoolCalendar />} />
          <Route path="/duty-roster" element={<DutyRoster />} />
          <Route path="/house-details" element={<HouseDetails />} />
          <Route path="/housemaster-dashboard" element={<HousemasterDashboard />} />
          <Route path="/documents" element={<DocumentUpload />} />
          <Route path="/login" element={<Login setUser={setUser} />} /> {/* Pass setUser as a prop */}
        </Routes>
      </Router>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
