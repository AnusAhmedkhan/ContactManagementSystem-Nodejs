const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Users",
    },
    name: {
      type: String,
      require: [true, "Please Enter Email"],
    },
    email: {
      type: String,
      require: [true, "Please Enter Email"],
    },
    phone: {
      type: String,
      require: [true, "Please Enter Phone Number"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Contact", contactSchema);
