import React, { useState } from 'react';
import './SchoolCalendar.css'; // Import CSS for styling

const SchoolCalendar = () => {
  const [events, setEvents] = useState([
    { id: 1, date: '2024-06-01', event: 'Sports Day' },
    { id: 2, date: '2024-06-15', event: 'Parent-Teacher Meeting' },
  ]);
  const [newEvent, setNewEvent] = useState({ date: '', event: '' });

  // Function to handle input changes for new event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  // Function to add a new event
  const addEvent = () => {
    if (newEvent.date && newEvent.event) {
      setEvents([
        ...events,
        { id: Date.now(), ...newEvent }
      ]);
      setNewEvent({ date: '', event: '' });
    }
  };

  // Function to delete an event
  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="calendar-container">
      <h2>School Calendar</h2>
      <div className="add-event">
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          placeholder="Enter date"
        />
        <input
          type="text"
          name="event"
          value={newEvent.event}
          onChange={handleInputChange}
          placeholder="Enter event"
        />
        <button onClick={addEvent}>Add Event</button>
      </div>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event.id}>
            <span>{event.date}:</span> {event.event}
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolCalendar;
