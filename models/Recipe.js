const mongoose = require('mongoose');

// تعريف Schema للوصفات
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // العنوان مطلوب
    },
    ingredients: {
        type: [String], // قائمة بالمكونات
        required: true,
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

// إنشاء النموذج (Model)
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
