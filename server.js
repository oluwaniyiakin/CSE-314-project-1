require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for all origins
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ Import and Use Routes
const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

// ✅ Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Root Route
app.get('/', (req, res) => {
    res.send('🚀 Contacts API is running!');
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
