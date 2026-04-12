const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
router.post("/book", async (req, res) => {
  try {
    const { patientId, patientName, date } = req.body;
    if (!patientId || !patientName || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const appt = new Appointment({
      patientId,
      patientName,
      date
    });
    await appt.save();
    res.status(201).json(appt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await Appointment.find().sort({ date: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
