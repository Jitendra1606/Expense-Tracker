require("dotenv").config();

// Core Packages
const express = require("express");
const cors = require("cors");

// Database Connection
const connectDB = require("./config/db");

const app = express();

/**
 * CORS Middleware
 * Allows frontend to communicate with backend
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/**
 * Parse incoming JSON requests
 */
app.use(express.json());

/**
 * Connect MongoDB
 */
connectDB();

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
