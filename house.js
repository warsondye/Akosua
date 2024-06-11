const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'cud', // Replace with your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Endpoint to handle registration
app.post('/api/housemasters/register', (req, res) => {
  const { name, house, houseCode, phoneNumber, password } = req.body;

  const query = `INSERT INTO housemasters (name, house, houseCode, phoneNumber, password) VALUES (?, ?, ?, ?, ?)`;
  db.execute(query, [name, house, houseCode, phoneNumber, password], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.status(201).json({ success: true, data: results });
    }
  });
});

// Endpoint to handle login
app.post('/api/housemasters/login', (req, res) => {
  const { houseCode, password } = req.body;

  const query = `SELECT * FROM housemasters WHERE houseCode = ?`;
  db.execute(query, [houseCode], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else if (results.length === 0) {
      res.status(401).json({ success: false, error: 'House code not found' });
    } else {
      const user = results[0];
      if (password === user.password) {
        const token = jwt.sign({ id: user.id, houseCode: user.houseCode }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ success: true, token, user });
      } else {
        res.status(401).json({ success: false, error: 'Invalid password' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
