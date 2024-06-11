import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DutyRoster = () => {
  const [students, setStudents] = useState([]);
  const [dutyRoster, setDutyRoster] = useState([]);

  useEffect(() => {
    // Fetch students from the backend
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
  }, []);

  const generateDutyRoster = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    const generatedRoster = students.map((student, index) => ({
      student_id: student.id,
      date: today,
      duty: `Duty ${index + 1}`
    }));
    setDutyRoster(generatedRoster);
  };

  const saveDutyRoster = () => {
    // Send a POST request to save the duty roster
    axios.post('http://localhost:8087/api/duty-rosters', dutyRoster)
      .then(response => {
        if (response.data.success) {
          console.log('Duty roster saved successfully:', response.data.dutyRoster);
          // Optionally, you can clear the duty roster state here
        } else {
          console.error('Error saving duty roster:', response.data.error);
        }
      })
      .catch(error => {
        console.error('Error saving duty roster:', error);
      });
  };

  return (
    <div>
      <h2>Duty Roster</h2>
      <div>
        <button onClick={generateDutyRoster}>Generate Duty Roster</button>
        <button onClick={saveDutyRoster}>Save Duty Roster</button>
      </div>
      <div>
        <h3>Duty Roster List</h3>
        <ul>
          {dutyRoster.map(roster => (
            <li key={roster.student_id}>
              {roster.date} - {roster.duty} (Student ID: {roster.student_id})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DutyRoster;
