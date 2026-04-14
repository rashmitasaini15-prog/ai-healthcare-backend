const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");
const Reminder = require("../models/Reminder"); 
router.post("/add", async (req, res) => {
  try {
    const { patientId, doctorId, appointmentId, medicines } = req.body;
    console.log("BACKEND RECEIVED:", req.body);
    const newData = new Prescription({
      patientId,
      doctorId,
      appointmentId: appointmentId || "NOT_SENT",
      medicines
    });
    await newData.save();
    for (let med of medicines) {
      const newReminder = new Reminder({
        patientId,
        medicine: med,
        time: "09:00",
        appointmentId
      });
      await newReminder.save();
    }
    res.json({ message: "Prescription + Reminder Saved " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error " });
  }
});
module.exports = router;