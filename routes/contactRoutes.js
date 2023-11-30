const express = require("express");
const router = express.Router();
const verifyTokenMiddle = require("../middleware/ValidateTokenHandler");
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
} = require("../controllers/contactController");
router.use(verifyTokenMiddle);
router.route("/:id").get(getContact);
router.route("/").get(getContacts);
router.route("/").post(createContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

module.exports = router;
