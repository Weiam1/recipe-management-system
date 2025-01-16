const mongoose = require('mongoose');
const express = require('express');
const Recipe = require('./models/Recipe');


const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
const mongoURI = "mongodb+srv://weiamalmahnash:3cvXkqHHIHB8zoNa@cluster0.vxitv.mongodb.net/recipes?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Recipe Management System API!');
});

// Add a new recipe
app.post('/recipes', async (req, res) => {
    try {
        const recipe = new Recipe(req.body); // Create a new recipe using the request body
        const savedRecipe = await recipe.save(); // Save the recipe to the database
        res.status(201).json(savedRecipe); // Return the saved recipe
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle errors
    }
});

// Get all recipes
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetch all recipes from the database
        res.json(recipes); // Return the recipes as JSON
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});