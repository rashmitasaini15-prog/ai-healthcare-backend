const mongoose = require("mongoose");
const prescriptionSchema = new mongoose.Schema({
  patientId: String,
  doctorId: String,
  medicines: [String],
  date: {
    type: String,
    default: new Date().toLocaleDateString()
  }
});
module.exports = mongoose.model("Prescription", prescriptionSchema);
