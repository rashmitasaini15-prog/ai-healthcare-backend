const mongoose = require("mongoose");
const reminderSchema = new mongoose.Schema({
  patientId: String,
  medicine: String,
  time: String,
  appointmentId: String,  
  date: {
    type: String,
    default: new Date().toLocaleDateString()
  }
});
module.exports = mongoose.model("Reminder", reminderSchema);