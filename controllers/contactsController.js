const pool = require("../models/contact");

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts", error });
  }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM contacts WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contact", error });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await pool.query(
      "INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
      [name, email, phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creating contact", error });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const result = await pool.query(
      "UPDATE contacts SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *",
      [name, email, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM contacts WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
