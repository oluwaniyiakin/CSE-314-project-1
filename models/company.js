const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  industry: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Company", companySchema);
