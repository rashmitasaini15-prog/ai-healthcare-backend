const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");
router.post("/add", async (req, res) => {
  const data = new Prescription(req.body);
  await data.save();
  res.json({ message: "Prescription added" });
});
router.get("/:patientId", async (req, res) => {
  const data = await Prescription.find({
    patientId: req.params.patientId
  });
  res.json(data);
});
module.exports = router;
