// Fetch and display all recipes
async function fetchRecipes() {
    const response = await fetch('/recipes');
    const recipes = await response.json();
    const recipesList = document.getElementById('recipesList');
    recipesList.innerHTML = '';
    recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.textContent = `${recipe.title} - ${recipe.ingredients.join(', ')}`;

        // Add update button
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => {
            const newTitle = prompt('Enter new title:', recipe.title);
            const newIngredients = prompt('Enter new ingredients (comma separated):', recipe.ingredients.join(', '));
            const newInstructions = prompt('Enter new instructions:', recipe.instructions);
            updateRecipe(recipe._id, newTitle, newIngredients.split(','), newInstructions);
        });

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
                deleteRecipe(recipe._id);
            }
        });

        li.appendChild(updateButton);
        li.appendChild(deleteButton);
        recipesList.appendChild(li);
    });
}

// Add a new recipe
document.getElementById('addRecipeForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const instructions = document.getElementById('instructions').value;

    const response = await fetch('/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, ingredients, instructions })
    });

    if (response.ok) {
        alert('Recipe added successfully!');
        fetchRecipes(); // Refresh the list
    } else {
        alert('Failed to add recipe');
    }
});

// Update a recipe
async function updateRecipe(id, title, ingredients, instructions) {
    const response = await fetch(`/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, ingredients, instructions }),
    });
    if (response.ok) {
        alert('Recipe updated successfully!');
        fetchRecipes();
    } else {
        alert('Failed to update recipe');
    }
}

// Delete a recipe
async function deleteRecipe(id) {
    const response = await fetch(`/recipes/${id}`, { method: 'DELETE' });
    if (response.ok) {
        alert('Recipe deleted successfully!');
        fetchRecipes();
    } else {
        alert('Failed to delete recipe');
    }
}

// Fetch recipes on page load
fetchRecipes();

// Search recipes by title
document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value;

    const response = await fetch(`/recipes/search?title=${encodeURIComponent(query)}`);
    if (response.ok) {
        const results = await response.json();
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';
        results.forEach(recipe => {
            const li = document.createElement('li');
            li.textContent = `${recipe.title} - ${recipe.ingredients.join(', ')}`;
            searchResults.appendChild(li);
        });
    } else {
        alert('Failed to fetch search results');
    }
});
