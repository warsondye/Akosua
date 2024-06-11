import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './requestExeat.css';

const RequestExeat = ({ onClose }) => {
  const [studentName, setStudentName] = useState('');
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exeatRequest = {
      studentName,
      reason,
      fromDate,
      toDate,
    };

    try {
      const response = await axios.post('http://localhost:8081/api/request-exeat', exeatRequest, { withCredentials: true });
      if (response.data.success) {
        console.log('Exeat request submitted successfully');
        onClose();
      } else {
        setError('Error submitting exeat request: ' + response.data.message);
      }
    } catch (error) {
      setError('No response received from the server. Please check your network connection.');
    }
  };

  return (
    <div className="exeat-form-container">
      <h2>Request Exeat</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <input
            type="text"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fromDate">From Date:</label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="toDate">To Date:</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="action-button">
            <FontAwesomeIcon icon={faSave} /> Submit
          </button>
          <button type="button" className="action-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestExeat;
