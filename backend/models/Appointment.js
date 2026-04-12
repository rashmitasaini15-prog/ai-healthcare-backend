const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  }
});
module.exports = mongoose.model("Appointment", appointmentSchema);