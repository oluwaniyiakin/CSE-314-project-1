const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import Contact model

// ✅ 1️⃣ Get ALL contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find(); // Fetch all contacts from MongoDB
        res.status(200).json(contacts); // Return JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving contacts', error: err });
    }
});

// ✅ 2️⃣ Get a SINGLE contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id); // Find by MongoDB ID
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(contact); // Return JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving contact', error: err });
    }
});

// ✅ 3️⃣ Create a NEW contact
router.post('/', async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const newContact = new Contact({
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    });

    try {
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(400).json({ message: 'Error saving contact', error: err });
    }
});

module.exports = router;
