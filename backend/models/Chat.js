const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  time: {
    type: String,
    default: new Date().toLocaleTimeString()
  }
});
module.exports = mongoose.model("Chat", chatSchema);
