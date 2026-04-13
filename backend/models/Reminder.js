const mongoose = require("mongoose");
const reminderSchema = new mongoose.Schema({
  patientId: String,
  medicine: String,
  time: String
});
module.exports = mongoose.model("Reminder", reminderSchema);
