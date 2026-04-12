const express = require("express");
const router = express.Router();
router.post("/analyze", (req, res) => {
  try {
    const { report } = req.body;
    if (!report) {
      return res.status(400).json({ message: "Report text is required" });
    }
    let result = [];
    const text = report.toLowerCase();
    if (text.includes("hemoglobin")) {
      let value = extractNumber(text, "hemoglobin");
      if (value && value < 12) {
        result.push("Low Hemoglobin → Possible anemia");
      }
    }
    if (text.includes("sugar") || text.includes("glucose")) {
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
    res.json({ analysis: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
function extractNumber(text, keyword) {
  const regex = new RegExp(keyword + "\\s*(\\d+)", "i");
  const match = text.match(regex);
  return match ? parseInt(match[1]) : null;
}
module.exports = router;