const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");
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
    res.json({ message: "Saved " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error " });
  }
});
module.exports = router;