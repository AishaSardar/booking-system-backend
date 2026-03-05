const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Routes
const bookingRoutes = require("./routes/bookings");
const authRoutes = require("./routes/auth");

app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Booking System API is running!" });
});

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected!");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });