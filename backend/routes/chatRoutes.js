const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
router.post("/send", async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    const newMsg = new Chat({ sender, receiver, text });
    await newMsg.save();
    res.json({ message: "Sent " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error " });
  }
});
router.get("/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const chat = await Chat.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    });
    res.json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error " });
  }
});
module.exports = router;