const express = require("express");
const router = express.Router();
router.post("/chat", (req, res) => {
  const { message } = req.body;
  const msg = message.toLowerCase();
  let reply = "";
  const has = (words) => words.some(w => msg.includes(w));
  if (has(["fever"]) && has(["cough"])) {
    reply = "You may have a viral infection or flu. Take rest, drink warm fluids, and monitor temperature. Consult a doctor if symptoms persist.";
  }
  else if (has(["fever"])) {
    reply = "Fever usually indicates infection. Stay hydrated, take rest, and use paracetamol if needed. Consult a doctor if it lasts more than 2–3 days.";
  }
  else if (has(["cough"])) {
    reply = "Cough can be due to cold, infection, or allergy. Drink warm water, take steam, and avoid cold foods.";
  }
  else if (has(["cold", "runny nose", "sneezing"])) {
    reply = "Common cold is mild. Take rest, drink warm fluids, and do steam inhalation.";
  }
  else if (has(["headache", "migraine"])) {
    reply = "Headache may be due to stress, dehydration, or lack of sleep. Drink water, rest, and avoid screens.";
  }
  else if (has(["stomach", "gas", "acidity", "indigestion"])) {
    reply = "Stomach issues may be due to indigestion. Avoid oily/spicy food, eat light meals, and stay hydrated.";
  }
  else if (has(["vomit", "nausea"])) {
    reply = "Vomiting may be due to food infection. Drink ORS and avoid heavy food.";
  }
  else if (has(["diarrhea", "loose motion"])) {
    reply = "Stay hydrated with ORS, avoid spicy/oily food, and consult doctor if severe.";
  }
  else if (has(["body pain", "muscle pain", "weakness"])) {
    reply = "Body pain can be due to fatigue or infection. Rest well and stay hydrated.";
  else if (has(["skin", "rash", "allergy"])) {
    reply = "Skin issues may be due to allergy or infection. Keep area clean and avoid scratching.";
  }
  else if (has(["breathing", "asthma", "shortness of breath"])) {
    reply = "Breathing problems can be serious. Use inhaler if prescribed and consult a doctor immediately.";
  }
  else if (has(["chest pain"])) {
    reply = "Chest pain can be serious. Please seek immediate medical attention.";
  }
  else if (has(["medicine", "tablet", "drug"])) {
    reply = "Please consult a doctor before taking any medicine. Self-medication can be harmful.";
  }
  else if (has(["what should i do", "solution", "treatment"])) {
    reply = "Based on your symptoms, take rest, stay hydrated, and consult a doctor if symptoms persist.";
  }
  else if (has(["diet", "food"])) {
    reply = "Maintain a balanced diet with fruits, vegetables, and proper hydration. Avoid junk and oily food.";
  }
  else if (has(["exercise", "fitness"])) {
    reply = "Regular exercise like walking, yoga, or gym helps maintain good health.";
  }
  else if (has(["sleep"])) {
    reply = "Ensure 7–8 hours of sleep daily. Poor sleep can affect overall health.";
  }
  else if (has(["stress", "anxiety"])) {
    reply = "Practice relaxation techniques like meditation and breathing exercises.";
  }
  else {
    reply = "I understand your concern. Based on your query, I recommend maintaining good hydration, rest, and consulting a doctor for accurate diagnosis if needed.";
  }
  res.json({ reply });
});
module.exports = router;