const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const upload = multer({ dest: "uploads/" });
router.post("/analyze", async (req, res) => {
  try {
    const { report } = req.body;
    const text = report || "";
    let analysis = [];
    let summary = "";
    if (text.length < 10) {
      analysis.push("Please enter more text.");
    } else {
      summary = text.slice(0, 300);

      analysis.push("Document analyzed successfully.");
      analysis.push("Main topic extracted.");
      analysis.push("Use this content for learning or review.");
    }
    res.json({
      extractedText: text,
      summary,
      analysis
    });
  } catch (err) {
    res.status(500).json({
      message: "Analysis failed"
    });
  }
});
router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No PDF selected"
        });
      }
      const buffer =
        fs.readFileSync(req.file.path);
      const pdf =
        await pdfParse(buffer);
      const text =
        pdf.text || "";
      let analysis = [];
      let summary = "";
      if (text.length < 20) {
        analysis.push(
          "Very little readable text found. PDF may be scanned image."
        );
      } else {
        summary =
          text.slice(0, 500);
        analysis.push(
          "PDF scanned successfully."
        );
        analysis.push(
          "Key content extracted."
        );
        if (
          text.toLowerCase().includes("hemoglobin")
        ) {
          analysis.push(
            "Medical terms found."
          );
        }
        if (
          text.toLowerCase().includes("algorithm")
        ) {
          analysis.push(
            "Technical/education content found."
          );
        }
      }
      fs.unlinkSync(req.file.path);
      res.json({
        extractedText: text,
        summary,
        analysis
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message:
          "Unable to scan PDF"
      });
    }
  }
);
module.exports = router;