const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Author"],
    default: "Author",
  },
  status: {
    type: String,
    enum: ["Active", "Not Active"],
    default: "Active",
    required: false
  }
},
);

module.exports = mongoose.model("User", userSchema);