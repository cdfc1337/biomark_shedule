// server.js or index.js (backend)
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Use CORS to handle cross-origin requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define the /bookings POST route
app.post('/bookings', (req, res) => {
  const { equipmentId, userName, startTime, endTime } = req.body;
  
  // Your logic to handle booking (e.g., save to database)
  // For now, just respond with success
  res.status(201).json({ message: 'Booking successful!' });
});

// Start the backend server on port 5000 (or any port)
app.listen(5000, () => {
  console.log('Backend server running on port 5000');
});
