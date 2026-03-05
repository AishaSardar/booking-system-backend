const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const protect = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");

// @route  POST /api/bookings
// @desc   Create a new booking (no email yet)
// @access Public
router.post("/", async (req, res) => {
  const { name, email, service, date, time, message } = req.body;

  try {
    // Save booking to MongoDB
    const booking = await Booking.create({
      name,
      email,
      service,
      date,
      time,
      message,
    });

    res.status(201).json({
      message: "Booking request received! We will confirm your appointment shortly.",
      booking,
    });
  } catch (err) {
    console.error("❌ Booking error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  GET /api/bookings
// @desc   Get all bookings (admin only)
// @access Protected
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  PUT /api/bookings/:id
// @desc   Update booking status + send email if confirmed (admin only)
// @access Protected
router.put("/:id", protect, async (req, res) => {
  const { status } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Send confirmation email only when admin confirms
    if (status === "confirmed") {
      try {
        await sendEmail({
          to: booking.email,
          name: booking.name,
          service: booking.service,
          date: booking.date,
          time: booking.time,
        });
      } catch (emailErr) {
        console.error("⚠️ Email failed:", emailErr.message);
      }
    }

    res.json({ message: "Booking updated!", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route  DELETE /api/bookings/:id
// @desc   Delete a booking (admin only)
// @access Protected
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;