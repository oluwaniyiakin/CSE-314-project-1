const Contact = require("../models/contact");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().populate("company");
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).populate("company");
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
