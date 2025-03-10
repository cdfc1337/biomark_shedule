const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and enable CORS
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Booking Model (MongoDB Schema)
const bookingSchema = new mongoose.Schema({
  equipmentId: String,
  userName: String,
  startTime: Date,
  endTime: Date,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes

// Get all bookings for a specific equipment
app.get('/bookings/:equipmentId', async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    const bookings = await Booking.find({ equipmentId });
    res.json(bookings); // Respond with bookings data
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Error fetching bookings." });
  }
});

// Add a new booking
app.post('/bookings', async (req, res) => {
  try {
    const { equipmentId, userName, startTime, endTime } = req.body;
    const newBooking = new Booking({
      equipmentId,
      userName,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });
    await newBooking.save();
    res.status(201).json(newBooking); // Respond with created booking
  } catch (err) {
    console.error("Error adding booking:", err);
    res.status(500).json({ message: "Error adding booking." });
  }
});

// Clear all bookings for a specific equipment
app.delete('/bookings/:equipmentId', async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    await Booking.deleteMany({ equipmentId });
    res.status(200).json({ message: "All bookings cleared!" });
  } catch (err) {
    console.error("Error clearing bookings:", err);
    res.status(500).json({ message: "Error clearing bookings." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://celadon-starburst-e57f6f.netlify.app:${PORT}`);
});
