const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");
router.post("/add", async (req, res) => {
  try {
    const { patientId, doctorId, medicines } = req.body;
    if (!patientId || !doctorId || !medicines) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const data = new Prescription({
      patientId,
      doctorId,
      medicines
    });
    await data.save();
    res.json({ message: "Prescription added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/:patientId", async (req, res) => {
  try {
    const data = await Prescription.find({
      patientId: req.params.patientId
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;