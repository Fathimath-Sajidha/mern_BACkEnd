const express = require('express');
const path = require('path');
const userRouter = require('./Router/user');
const productsRouter = require('./Router/products');
const DBconnect = require('./Config/db');
const cors=require('cors')

const app = express();

// Database Connection
DBconnect();
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST','PUT'],
    allowedHeaders:['Content-Type']
}))
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

// Routers
app.use('/user', userRouter);
app.use('/products', productsRouter);

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.message || err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message || err });
});
app.post('/user/signup', (req, res) => {
    // Your sign-up logic
});

// Start Server
const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
