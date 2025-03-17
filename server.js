require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = process.env.PORT || 5500;

// ✅ Enable CORS for all origins
app.use(cors());
app.use(express.json());

// ✅ Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render deployment
  },
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err));

// ✅ Import and Use Routes
const contactsRouter = require("./routes/contact");
app.use("/contacts", contactsRouter);

// ✅ Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("🚀 Contacts API is running with PostgreSQL!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
