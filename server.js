const mongoose = require('mongoose');
const express = require('express');
const Recipe = require('./models/Recipe');
const User = require('./models/User'); 

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

// Documentation route
app.get('/documentation', (req, res) => {
    res.sendFile(__dirname + '/public/documentation.html');
});

// Recipe Routes
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
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const recipes = await Recipe.find().skip(offset).limit(limit);
        const total = await Recipe.countDocuments();
        res.json({ total, recipes });
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
});





app.put('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const updates = req.body; 
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedRecipe) return res.status(404).json({ error: 'Recipe not found' }); // Return an error if the recipe does not exist
        res.json(updatedRecipe); 
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
});

// Delete an existing recipe
app.delete('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the recipe ID from the URL
        const deletedRecipe = await Recipe.findByIdAndDelete(id); // Delete the recipe from the database
        if (!deletedRecipe)  return res.status(404).json({ error: 'Recipe not found' }); 
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
        res.status(500).json({ error: error.message });
    }
});

// Search recipes by title or ingredient
app.get('/recipes/search', async (req, res) => {
    try {
        const { title, ingredient } = req.query;
        const filter = {};
        if (title) filter.title = { $regex: title, $options: 'i' };
        if (ingredient) filter.ingredients = { $regex: ingredient, $options: 'i' };

        const recipes = await Recipe.find(filter);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Sorting Results

app.get('/recipes', async (req, res) => {
    try {
        const { sortBy = 'createdAt', order = 'asc', limit = 10, offset = 0 } = req.query;
        const recipes = await Recipe.find()
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip(Number(offset))
            .limit(Number(limit));
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// User Routes
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const users = await User.find().skip(offset).limit(limit);
        const total = await User.countDocuments();
        res.json({ total, users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.json(updatedUser);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});