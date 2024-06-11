const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const cors = require('cors');

const app = express();
const port = 8087;

app.use(bodyParser.json());
app.use(cors());

const db = new Database('./dashboard.db');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    class TEXT,
    parentNumber TEXT,
    nhisNumber TEXT
  );
  
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    action TEXT,
    details TEXT
  );

  CREATE TABLE IF NOT EXISTS duty_rosters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    date TEXT,
    duty TEXT,
    FOREIGN KEY(student_id) REFERENCES students(id)
  );
`);

console.log('Database initialized successfully');

// API endpoint to get students
app.get('/api/students', (req, res) => {
  const students = db.prepare('SELECT * FROM students').all();
  res.status(200).json({ success: true, students });
  logActivity('GET /api/students', 'Retrieved list of students');
});

// API endpoint to add a student
app.post('/api/students', (req, res) => {
  const { name, class: studentClass, parentNumber, nhisNumber } = req.body;
  const stmt = db.prepare('INSERT INTO students (name, class, parentNumber, nhisNumber) VALUES (?, ?, ?, ?)');
  const info = stmt.run(name, studentClass, parentNumber, nhisNumber);
  
  const student = {
    id: info.lastInsertRowid,
    name,
    class: studentClass,
    parentNumber,
    nhisNumber
  };

  res.status(200).json({ success: true, student });
  logActivity('POST /api/students', `Added student: ${JSON.stringify(student)}`);
});

// API endpoint to delete a student
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM students WHERE id = ?');
  const result = stmt.run(id);

  if (result.changes > 0) {
    res.status(200).json({ success: true });
    logActivity('DELETE /api/students', `Deleted student with id: ${id}`);
  } else {
    res.status(404).json({ success: false, message: 'Student not found' });
  }
});

// API endpoint to get duty rosters
app.get('/api/duty-rosters', (req, res) => {
  const dutyRosters = db.prepare('SELECT * FROM duty_rosters').all();
  res.status(200).json({ success: true, dutyRosters });
  logActivity('GET /api/duty-rosters', 'Retrieved list of duty rosters');
});

// API endpoint to add a duty roster
app.post('/api/duty-rosters', (req, res) => {
  const { student_id, date, duty } = req.body;
  const stmt = db.prepare('INSERT INTO duty_rosters (student_id, date, duty) VALUES (?, ?, ?)');
  const info = stmt.run(student_id, date, duty);

  const dutyRoster = {
    id: info.lastInsertRowid,
    student_id,
    date,
    duty
  };

  res.status(200).json({ success: true, dutyRoster });
  logActivity('POST /api/duty-rosters', `Added duty roster: ${JSON.stringify(dutyRoster)}`);
});

// Function to log activities
function logActivity(action, details) {
  const stmt = db.prepare('INSERT INTO activities (action, details) VALUES (?, ?)');
  stmt.run(action, details);
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
