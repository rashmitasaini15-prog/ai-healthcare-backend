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
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));
app.get("/", (req, res) => {
  res.send("Backend Running ");
});
app.listen(5000, () => console.log("Server running on 5000"));
console.log(process.env.MONGO_URI);