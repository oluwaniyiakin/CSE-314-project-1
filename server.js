require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Allow frontend to access API

// ✅ MongoDB Connection (Fixed Warnings)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // Stop server on DB connection failure
    });

// ✅ Routes
const contactsRouter = require('./routes/contacts');
app.use('/api/contacts', contactsRouter); // Ensure correct API path

// ✅ Root Route
app.get('/', (req, res) => {
    res.status(200).send('🚀 API is running!');
});

// ✅ Start Server (Ensure Correct Port on Render)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
