const mongoose = require('mongoose');

// Define the Schema for users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'], 
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]+$/.test(v); 
            },
            message: 'Username must contain only letters and spaces',
        },
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
