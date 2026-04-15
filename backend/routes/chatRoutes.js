const express = require("express");
const router = express.Router();
let messages = [];
router.post("/send", (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    if (!sender || !receiver || !text) {
      return res.status(400).json({ message: "Missing fields " });
    }
    messages.push({
      sender,
      receiver,
      text,
      time: new Date().toLocaleTimeString()
    });
    res.json({ message: "Sent " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error " });
  }
});
router.get("/:user1/:user2", (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const chat = messages.filter(
      (m) =>
        (m.sender === user1 && m.receiver === user2) ||
        (m.sender === user2 && m.receiver === user1)
    );
    res.json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error " });
  }
});
module.exports = router;