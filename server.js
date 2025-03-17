require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactsRouter = require("./routes/contact");
const companiesRouter = require("./routes/company");

const app = express();
const PORT = process.env.PORT || 5500;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/contacts", contactsRouter);
app.use("/companies", companiesRouter);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
