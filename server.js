const mongoose = require('mongoose');
const express = require('express');
const Recipe = require('./models/Recipe');


const app = express();

// Middleware to parse JSON requests
app.use(express.json());
// Serve static files from the "public" directory
app.use(express.static('public'));


// Connect to MongoDB
const mongoURI = "mongodb+srv://weiamalmahnash:3cvXkqHHIHB8zoNa@cluster0.vxitv.mongodb.net/recipes?retryWrites=true&w=majority";
mongoose.connect(mongoURI)
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




// Update an existing recipe
app.put('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the recipe ID from the URL
        const updates = req.body; // Get the updates from the request body
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, { new: true }); // Update the recipe in the database
        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' }); // Return an error if the recipe does not exist
        }
        res.json(updatedRecipe); // Return the updated recipe
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle errors
    }
});

// Delete an existing recipe
app.delete('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the recipe ID from the URL
        const deletedRecipe = await Recipe.findByIdAndDelete(id); // Delete the recipe from the database
        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' }); // Return an error if the recipe does not exist
        }
        res.json({ message: 'Recipe deleted successfully' }); // Return a success message
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle errors
    }
});

// Search recipes by title
app.get('/recipes/search', async (req, res) => {
    try {
        const { title } = req.query; // Get the title from the query string
        const recipes = await Recipe.find({ title: { $regex: title, $options: 'i' } }); // Case-insensitive search
        res.json(recipes); // Return the search results
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
});



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});