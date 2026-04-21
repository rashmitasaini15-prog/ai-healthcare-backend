const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const upload = multer({
  dest: "uploads/"
});
router.post("/analyze", async (req, res) => {
  try {
    const { report } = req.body;
    const text = (report || "").toLowerCase();
    let analysis = [];
    let doctor = "General Physician";
    if (
      text.includes("glucose") ||
      text.includes("sugar")
    ) {
      analysis.push(
        "Possible high sugar levels detected."
      );
      doctor = "Diabetologist";
    }
    if (
      text.includes("hemoglobin")
    ) {
      analysis.push(
        "Check hemoglobin values for anemia risk."
      );
    }
    if (
      text.includes("thyroid")
    ) {
      analysis.push(
        "Possible thyroid related issue."
      );
      doctor = "Endocrinologist";
    }
    if (
      text.includes("vitamin d")
    ) {
      analysis.push(
        "Vitamin D deficiency may cause weakness."
      );
    }
    if (analysis.length === 0) {
      analysis.push(
        "No major issue detected."
      );
    }
    res.json({
      analysis,
      doctor
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message:
        "Text analysis failed"
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
          message:
            "No PDF selected"
        });
      }
      const filePath =
        req.file.path;
      const dataBuffer =
        fs.readFileSync(filePath);
      const pdfData =
        await pdfParse(dataBuffer);
      const text =
        pdfData.text || "";
      const lower =
        text.toLowerCase();
      let analysis = [];
      let doctor =
        "General Physician";
      if (
        lower.includes("glucose") ||
        lower.includes("sugar")
      ) {
        analysis.push(
          "Possible high sugar levels detected."
        );
        doctor =
          "Diabetologist";
      }
      if (
        lower.includes("hemoglobin")
      ) {
        analysis.push(
          "Check hemoglobin values for anemia risk."
        );
      }
      if (
        lower.includes("thyroid")
      ) {
        analysis.push(
          "Possible thyroid related issue."
        );
        doctor =
          "Endocrinologist";
      }
      if (
        lower.includes("vitamin d")
      ) {
        analysis.push(
          "Vitamin D deficiency may cause weakness."
        );
      }
      if (analysis.length === 0) {
        analysis.push(
          "No major issue detected."
        );
      }
      fs.unlinkSync(filePath);
      res.json({
        extractedText: text,
        analysis,
        doctor
      });
    } catch (err) {
      console.log(
        "PDF ERROR:",
        err
      );
      res.status(500).json({
        message:
          "Unable to read PDF"
      });
    }
  }
);
module.exports = router;