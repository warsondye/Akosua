import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';
import { formatDistanceToNow } from 'date-fns';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [timerDuration, setTimerDuration] = useState(0); // Timer duration in minutes
  const [returnDate, setReturnDate] = useState(null); // Ward's return date
  const navigate = useNavigate();

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (eventName && eventDate) {
      const newEvent = { name: eventName, date: eventDate, timerDuration };
      setEvents([...events, newEvent]);
      setEventName('');
      setEventDate(new Date());
      setTimerDuration(0); // Reset timer duration
    }
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">Back</button>
      <h2>Event Calendar</h2>
      <form onSubmit={handleAddEvent}>
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            className="form-control"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Event Date:</label>
          <DatePicker
            selected={eventDate}
            onChange={(date) => setEventDate(date)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Timer Duration (minutes):</label>
          <input
            type="number"
            className="form-control"
            value={timerDuration}
            onChange={(e) => setTimerDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Event</button>
      </form>

      <h3>Set Ward's Return Date</h3>
      <div className="form-group">
        <label>Return Date:</label>
        <DatePicker
          selected={returnDate}
          onChange={(date) => setReturnDate(date)}
          className="form-control"
        />
        {returnDate && (
          <p>
            Countdown: {formatDistanceToNow(new Date(returnDate), { addSuffix: true })}
          </p>
        )}
      </div>

      <h3>Calendar</h3>
      <Calendar
        value={eventDate}
        onChange={(date) => setEventDate(date)}
        className="mb-3"
      />

      <h3>Upcoming Events</h3>
      <ul className="list-group">
        {events.map((event, index) => (
          <li key={index} className="list-group-item">
            <strong>{event.name}</strong> - {event.date.toDateString()} 
            <br />
            <small>{formatDistanceToNow(new Date(event.date), { addSuffix: true })}</small>
            <br />
            {event.timerDuration > 0 && <Timer duration={event.timerDuration} />}
            <button 
              className="btn btn-danger btn-sm mt-2"
              onClick={() => handleDeleteEvent(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return <div>Time left: {formatTime(timeLeft)}</div>;
};

export default EventCalendar;
