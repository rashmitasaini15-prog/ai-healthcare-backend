const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const apptRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", apptRoutes);
const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);
const reportRoutes = require("./routes/reportRoutes");
app.use("/api/report", reportRoutes);
const prescriptionRoutes = require("./routes/prescriptionRoutes");
app.use("/api/prescription", prescriptionRoutes);
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("DB Connected");
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
})
.catch(err => console.log(err));