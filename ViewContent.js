import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const VisitSchedule = () => {
  const [visitDate, setVisitDate] = useState(new Date());
  const [visitorName, setVisitorName] = useState('');
  const [scheduledVisits, setScheduledVisits] = useState([]);
  const navigate = useNavigate();

  const handleScheduleVisit = (e) => {
    e.preventDefault();
    const formattedDate = format(visitDate, 'MMMM d, yyyy h:mm aa');
    const newVisit = { id: Date.now(), visitorName, visitDate: formattedDate };
    setScheduledVisits([...scheduledVisits, newVisit]);
    setVisitorName('');
    setVisitDate(new Date());
  };

  const handleDeleteVisit = (id) => {
    const updatedVisits = scheduledVisits.filter(visit => visit.id !== id);
    setScheduledVisits(updatedVisits);
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">Back</button>
      <h2>Schedule Visit</h2>
      <form onSubmit={handleScheduleVisit}>
        <div className="form-group">
          <label>Visitor Name:</label>
          <input
            type="text"
            className="form-control"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Visit De and Time:</label>
          <DatePicker
            selected={visitDate}
            onChange={(date) => setVisitDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Schedule Visit</button>
      </form>

      <h2>Sculed Visits</h2>
      <ul className="list-group">
        {scheduledVisits.map(visit => (
          <li key={visit.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{visit.visitorName}</strong> - {visit.visitDate}
            </div>
            <button className="btn btn-danger" onClick={() => handleDeleteVisit(visit.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitSchedule;
