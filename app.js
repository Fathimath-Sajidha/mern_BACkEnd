const express = require('express');
const path = require('path');
const userRouter = require('./Router/user');
const DBconnect = require('./Config/db');
const cors=require('cors')



const app = express();


DBconnect();
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests only from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true, // Allow cookies if needed
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

app.use('/user', userRouter);


// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
    console.error('Server error:', err.message || err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message || err });
});


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
