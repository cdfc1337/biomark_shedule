const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/equipmentBooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
  equipmentId: Number,
  userName: String,
  startTime: Date,
  endTime: Date,
});

// Booking Model
const Booking = mongoose.model('Booking', bookingSchema);

// Routes

// Get all bookings for an equipment
app.get('/bookings/:equipmentId', async (req, res) => {
  const { equipmentId } = req.params;
  const bookings = await Booking.find({ equipmentId });
  res.json(bookings);
});

// Create a new booking
app.post('/bookings', async (req, res) => {
  const { equipmentId, userName, startTime, endTime } = req.body;
  const newBooking = new Booking({ equipmentId, userName, startTime, endTime });
  await newBooking.save();
  res.status(201).json(newBooking);
});

// Clear all bookings for an equipment
app.delete('/bookings/:equipmentId', async (req, res) => {
  const { equipmentId } = req.params;
  await Booking.deleteMany({ equipmentId });
  res.status(200).send('All bookings cleared!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
