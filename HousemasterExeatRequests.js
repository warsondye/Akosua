import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HousemasterExeatRequests = () => {
  const [exeatRequests, setExeatRequests] = useState([]);

  useEffect(() => {
    fetchExeatRequests();
  }, []);

  const fetchExeatRequests = () => {
    axios.get('http://localhost:8081/api/housemaster/exeat-requests')
      .then(response => {
        setExeatRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching exeat requests:', error);
      });
  };

  return (
    <div>
      <h2>Exeat Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Reason</th>
            <th>From Date</th>
            <th>To Date</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {exeatRequests.map(request => (
            <tr key={request.id}>
              <td>{request.studentName}</td>
              <td>{request.reason}</td>
              <td>{request.fromDate}</td>
              <td>{request.toDate}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HousemasterExeatRequests;
