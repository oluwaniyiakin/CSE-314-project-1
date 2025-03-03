require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Allow cross-origin requests

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for API access

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // Stop the app if DB connection fails
    });

// ✅ Routes
const contactsRouter = require('./routes/contacts');
app.use('/api/contacts', contactsRouter); // Correct API path

// ✅ Root Route
app.get('/', (req, res) => {
    res.status(200).send('🚀 API is running!');
});

// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
