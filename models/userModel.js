const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Please add Username"] },
    email: { type: String, required: [true, "Please add Email"] },
    password: { type: String, unique: [true, "This email is already taken"] },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", userSchema);
