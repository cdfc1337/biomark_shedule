// netlify/functions/bookings.js
const mongoose = require('mongoose');

// MongoDB connection URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection setup
async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
  equipmentId: String,
  userName: String,
  startTime: Date,
  endTime: Date,
});

const Booking = mongoose.model('Booking', bookingSchema);

exports.handler = async function(event, context) {
  await connectToDatabase();

  if (event.httpMethod === 'GET') {
    // Handle GET request (fetch bookings)
    const { equipmentId } = event.queryStringParameters;

    try {
      const bookings = await Booking.find({ equipmentId });
      return {
        statusCode: 200,
        body: JSON.stringify(bookings),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error fetching bookings', error }),
      };
    }
  } else if (event.httpMethod === 'POST') {
    // Handle POST request (create booking)
    const { equipmentId, userName, startTime, endTime } = JSON.parse(event.body);

    try {
      const newBooking = new Booking({
        equipmentId,
        userName,
        startTime,
        endTime,
      });
      await newBooking.save();
      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Booking created successfully' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error creating booking', error }),
      };
    }
  } else if (event.httpMethod === 'DELETE') {
    // Handle DELETE request (clear all bookings for an equipment)
    const { equipmentId } = event.queryStringParameters;

    try {
      await Booking.deleteMany({ equipmentId });
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'All bookings cleared' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error clearing bookings', error }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
