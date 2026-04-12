const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const upload = multer({ storage: multer.memoryStorage() });
router.post("/analyze", (req, res) => {
  try {
    const { report } = req.body;
    if (!report) {
      return res.status(400).json({ message: "Report text is required" });
    }
    const result = analyzeText(report.toLowerCase());
    res.json({ analysis: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/analyze-pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }
    const data = await pdfParse(req.file.buffer);
    const text = data.text.toLowerCase();
    const result = analyzeText(text);
    res.json({ analysis: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "PDF processing failed" });
  }
});
function analyzeText(text) {
  let result = [];
  if (text.includes("hemoglobin")) {
    let value = extractNumber(text, "hemoglobin");
    if (value && value < 12) {
      result.push("Low Hemoglobin → Possible anemia");
    }
  }
  if (text.includes("glucose") || text.includes("sugar")) {
    let value = extractNumber(text, "glucose");
    if (value && value > 140) {
      result.push("High Blood Sugar → Risk of diabetes");
    }
  }
  if (text.includes("cholesterol")) {
    let value = extractNumber(text, "cholesterol");
    if (value && value > 200) {
      result.push("High Cholesterol → Heart risk");
    }
  }
  if (text.includes("bp") || text.includes("blood pressure")) {
    result.push("Check blood pressure levels carefully");
  }
  if (result.length === 0) {
    result.push("All values look normal 👍");
  }
  return result;
}
function extractNumber(text, keyword) {
  const regex = new RegExp(keyword + "\\s*(\\d+)", "i");
  const match = text.match(regex);
  return match ? parseInt(match[1]) : null;
}
module.exports = router;