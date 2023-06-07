const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "number", required: true, unique: true },
  adress: { type: "string" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
