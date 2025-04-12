// === FILE: /server/models/Resume.js ===
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  sections: Object,
  template: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", resumeSchema);