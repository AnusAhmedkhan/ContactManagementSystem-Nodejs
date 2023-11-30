const express = require("express");
const verifyTokenMiddle = require("../middleware/ValidateTokenHandler");
const router = express.Router();
const { login, signup, currentUser } = require("../controllers/userController");

router.post("/login", login);
router.post("/register", signup);
router.get("/currentUser", verifyTokenMiddle, currentUser);
module.exports = router;
