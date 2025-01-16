const mongoose = require('mongoose');
const express = require('express');
const Recipe = require('./models/Recipe');

// إنشاء تطبيق Express
const app = express();

// استخدام JSON Middleware لمعالجة بيانات JSON
app.use(express.json());

// الاتصال بـ MongoDB
const mongoURI = "mongodb+srv://weiamalmahnash:3cvXkqHHIHB8zoNa@cluster0.vxitv.mongodb.net/recipes?retryWrites=true&w=majority";
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// صفحة رئيسية بسيطة
app.get('/', (req, res) => {
    res.send('Welcome to the Recipe Management System API!');
});

// إضافة وصفة جديدة
app.post('/recipes', async (req, res) => {
    try {
        const recipe = new Recipe(req.body); // إنشاء وصفة جديدة من البيانات المُرسلة
        const savedRecipe = await recipe.save(); // حفظ الوصفة في قاعدة البيانات
        res.status(201).json(savedRecipe); // إرجاع الوصفة المحفوظة
    } catch (error) {
        res.status(400).json({ error: error.message }); // إرجاع خطأ إذا فشل الحفظ
    }
});

// بدء تشغيل السيرفر
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
