const mongoose = require('mongoose');

const DBconnect = async () => {
    const mongoDB_URI = 'mongodb://127.0.0.1:27017/JWTLogin';


    try {
        await mongoose.connect(mongoDB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected successfully');
    } catch (err) {
        console.error('DB connection failed:', err.message);
    }

    
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });
};

module.exports = DBconnect;
