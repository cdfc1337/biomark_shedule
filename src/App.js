const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
