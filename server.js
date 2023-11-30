const express = require("express");
const dotenv = require("dotenv").config();
const dbConnnection = require("./config/dbConnection");
const contact = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");
const user = require("./routes/userRoutes");
const app = express();
dbConnnection();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", contact);
app.use("/api/user", user);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
