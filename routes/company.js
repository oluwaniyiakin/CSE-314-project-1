const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const companiesController = require("../controllers/companiesController");

// ✅ Validation rules for Company
const validateCompany = [
  body("name").notEmpty().withMessage("Company name is required"),
  body("location").notEmpty().withMessage("Location is required"),
];

// ✅ CRUD Routes for Companies
router.get("/", companiesController.getAllCompanies);
router.get("/:id", companiesController.getCompanyById);
router.post("/", validateCompany, companiesController.createCompany);
router.put("/:id", validateCompany, companiesController.updateCompany);
router.delete("/:id", companiesController.deleteCompany);

module.exports = router;
