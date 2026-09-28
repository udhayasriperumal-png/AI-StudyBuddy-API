require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const materialRoutes = require("./src/routes/materialRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Authentication Routes
app.use("/api/auth", authRoutes);

// Material Routes
app.use("/api/material", materialRoutes);

// Home/Test Route
app.get("/", (req, res) => {
    res.send("AI StudyBuddy Backend is Running!");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});