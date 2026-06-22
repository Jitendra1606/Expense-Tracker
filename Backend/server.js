require("dotenv").config();

// Core Packages
const express = require("express");
const cors = require("cors");

// Database Connection
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

const path = require("path");

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

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

//serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
