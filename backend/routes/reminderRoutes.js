const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");
router.post("/add", async (req, res) => {
  try {
    const { patientId, medicine, time } = req.body;
    const data = new Reminder({
      patientId,
      medicine,
      time
    });
    await data.save();
    res.json({ message: "Reminder saved " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error saving reminder" });
  }
});
router.get("/:patientId", async (req, res) => {
  try {
    const data = await Reminder.find({
      patientId: req.params.patientId
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching reminders" });
  }
});
module.exports = router;
