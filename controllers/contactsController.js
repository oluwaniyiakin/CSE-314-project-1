const Contact = require('../models/contact');

// ✅ GET ALL CONTACTS
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ GET CONTACT BY ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ CREATE A NEW CONTACT
exports.createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
        await newContact.save();
        res.status(201).json({ id: newContact._id, message: "Contact created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ UPDATE A CONTACT
exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
        res.status(200).json({ message: "Contact updated successfully", updatedContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ DELETE A CONTACT
exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) return res.status(404).json({ message: "Contact not found" });
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
