const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// ✅ Get all contacts
router.get('/', contactsController.getAllContacts);

// ✅ Get a single contact by ID
router.get('/:id', contactsController.getContactById);

// ✅ Create a new contact
router.post('/', contactsController.createContact);

// ✅ Update an existing contact
router.put('/:id', contactsController.updateContact);

const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  contactsController.createContact
);


// ✅ Delete a contact
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
