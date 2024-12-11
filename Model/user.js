const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // You can add validation as needed
    },
    email: {
        type: String,
        required: true,
        unique: true, // Make sure this is unique
    },
    password: {
        type: String,
        required: true, // Make sure this is required
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
