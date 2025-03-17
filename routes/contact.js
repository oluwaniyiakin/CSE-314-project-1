const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const contactsController = require("../controllers/contactsController");

// ✅ Validation rules for Contact
const validateContact = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").notEmpty().withMessage("Phone number is required"),
];

// ✅ CRUD Routes for Contacts
router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContactById);
router.post("/", validateContact, contactsController.createContact);
router.put("/:id", validateContact, contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
