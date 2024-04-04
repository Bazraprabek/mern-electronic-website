const mongoose = require("mongoose");
const bycrptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide Username"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide Email"],
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  password: { type: String, required: true, trim: true },
  created_at: { type: Date, default: Date.now() },
});

userSchema.pre("save", async function () {
  this.password = await bycrptjs.hash(this.password, 10);
});

const User = mongoose.model("user", userSchema);

module.exports = User;
