const mongoose = require('mongoose');

// Define the Schema for users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Username is required
        unique: true, // Must be unique
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true, // Must be unique
    },
    password: {
        type: String,
        required: true, // Password is required
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
