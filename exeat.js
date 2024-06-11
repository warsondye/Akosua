const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8081;

// Middleware
app.use(bodyParser.json());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,POST', // Allow only GET and POST requests
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Store exeat requests in memory for this example
let exeatRequests = [];

// Endpoint to handle exeat requests from users
app.post('/api/request-exeat', (req, res) => {
  const exeatRequest = req.body;
  exeatRequests.push(exeatRequest);

  // Log the exeat request for testing purposes
  console.log('Received exeat request:', exeatRequest);

  // Respond with success message
  res.json({ success: true, message: 'Exeat request submitted successfully' });
});

// Endpoint for the housemaster to retrieve exeat requests
app.get('/api/housemaster/exeat-requests', (req, res) => {
  // In a real-world scenario, you might want to filter exeat requests based on the housemaster's house
  // For this example, we'll return all exeat requests
  res.json(exeatRequests);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
