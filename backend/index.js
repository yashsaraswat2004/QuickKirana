const express = require('express');
const connectDB = require('./src/config/db');
const app = express();
require('dotenv').config();
const authRoutes = require('./src/routes/authRoutes')
const orderRoutes = require('./src/routes/orderRoutes')
const shopRoutes = require('./src/routes/shopRoutes')
const uploadRoutes = require('./src/routes/uploadRoutes');
const PORT = process.env.PORT || 3001
const cors = require('cors')
const connectCloudinary = require('./src/config/cloudinary');


connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Welcome to the Backend API of QuickKiraana")
    
})

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/shops', shopRoutes)
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})