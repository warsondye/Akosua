import React, { useState } from 'react';
import './PersonalNotes.css'; // Import CSS for styling

const PersonalNotes = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  // Function to handle adding a note
  const handleAddNote = () => {
    if (note.trim() !== '') { // Check if note is not empty
      setNotes([...notes, note]);
      setNote('');
    }
  };

  // Function to handle deleting a note
  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes-container">
      <h2>Personal Notes</h2>
      <div className="notes-list">
        {notes.length > 0 ? (
          <ul>
            {notes.map((note, index) => (
              <li key={index}>
                <span>{note}</span>
                <button onClick={() => handleDeleteNote(index)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes added yet.</p>
        )}
      </div>
      <div className="note-input">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter your note..."
        ></textarea>
        <button onClick={handleAddNote}>Add Note</button>
      </div>
    </div>
  );
};

export default PersonalNotes;
