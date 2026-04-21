const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
router.post("/analyze", async (req, res) => {
  try {
    const { report } = req.body;
    const text = (report || "").toLowerCase();
    let analysis = [];
    let doctor = "General Physician";
    if (text.includes("sugar") || text.includes("glucose")) {
      analysis.push("Possible high sugar levels detected.");
      doctor = "Diabetologist";
    }
    if (text.includes("hemoglobin")) {
      analysis.push("Check hemoglobin values for anemia risk.");
    }
    if (analysis.length === 0) {
      analysis.push("No major issue detected.");
    }
    res.json({ analysis, doctor });
  } catch (err) {
    res.status(500).json({ message: "Analyze failed" });
  }
});
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No PDF selected"
      });
    }
    const buffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(buffer);
    const text = (data.text || "").toLowerCase();
    let analysis = [];
    let doctor = "General Physician";
    if (text.includes("sugar") || text.includes("glucose")) {
      analysis.push("Possible high sugar levels detected.");
      doctor = "Diabetologist";
    }
    if (text.includes("hemoglobin")) {
      analysis.push("Check hemoglobin values for anemia risk.");
    }
    if (text.includes("thyroid")) {
      analysis.push("Thyroid related terms found.");
      doctor = "Endocrinologist";
    }
    if (analysis.length === 0) {
      analysis.push("No major issue detected.");
    }
    fs.unlinkSync(req.file.path);
    res.json({
      extractedText: data.text,
      analysis,
      doctor
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to read PDF"
    });
  }
});
module.exports = router;