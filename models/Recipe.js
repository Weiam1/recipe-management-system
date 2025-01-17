const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    ingredients: {
        type: [String], 
        required: true,
        validate: {
            validator: function (v) {
                return v.length > 0; // Ensure at least one ingredient
            },
            message: 'At least one ingredient is required',
        },
    },
    instructions: {
        type: String, // التعليمات أو طريقة التحضير
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // تاريخ الإضافة تلقائيًا
    },
});

// Create the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
