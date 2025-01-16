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

// Add a new user
document.getElementById('addUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert('User added successfully!');
        fetchUsers(); // Refresh the users list
    } else {
        const error = await response.json();
        alert(`Failed to add user: ${error.error}`);
    }
});

// Fetch and display all users
async function fetchUsers() {
    const response = await fetch('/users');
    const users = await response.json();
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.username} - ${user.email}`;

        // Add update button
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => {
            const newUsername = prompt('Enter new username:', user.username);
            const newEmail = prompt('Enter new email:', user.email);
            updateUser(user._id, newUsername, newEmail);
        });

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete "${user.username}"?`)) {
                deleteUser(user._id);
            }
        });

        li.appendChild(updateButton);
        li.appendChild(deleteButton);
        usersList.appendChild(li);
    });
}

// Add a new user
document.getElementById('addUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert('User added successfully!');
        fetchUsers(); // Refresh the list
    } else {
        const error = await response.json();
        alert(`Failed to add user: ${error.error}`);
    }
});

// Update a user
async function updateUser(id, username, email) {
    try {
        const response = await fetch(`/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email }),
        });

        if (response.ok) {
            alert('User updated successfully!');
            fetchUsers(); // Refresh the list
        } else {
            const error = await response.json();
            alert(`Failed to update user: ${error.error}`);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        alert('An unexpected error occurred.');
    }
}

// Delete a user
async function deleteUser(id) {
    try {
        const response = await fetch(`/users/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('User deleted successfully!');
            fetchUsers();
        } else {
            const error = await response.json();
            alert(`Failed to delete user: ${error.error}`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('An unexpected error occurred.');
    }
}

// Fetch data on page load
fetchRecipes();
// Fetch users on page load
fetchUsers();
