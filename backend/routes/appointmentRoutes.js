const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
router.post("/book", async (req, res) => {
  try {
    const appt = new Appointment(req.body);
    await appt.save();
    res.json(appt);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await Appointment.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
