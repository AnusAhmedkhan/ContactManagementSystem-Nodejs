const mongoose = require("mongoose");
const dbConnnection = async () => {
  try {
    const Connectdata = await mongoose.connect(process.env.CONNECTION);
    console.log("Database Connected", Connectdata.connection.name);
  } catch (err) {
    console.log("Database not Connected");
  }
};
module.exports = dbConnnection;
