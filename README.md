
# Recipe Management System

Welcome to the Recipe Management System! This project is a Node.js application built with Express.js. It provides a RESTful API for managing recipes and users, including CRUD operations, advanced validation, and additional features like pagination, sorting, and multi-field search.

---

## **Getting Started**

### Prerequisites
To run this project, you need:

1. **Node.js**: Version 14.x or later.
2. **MongoDB**: A MongoDB database connection.
3. **npm**: Installed alongside Node.js.

---

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd recipe-management-system
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Access the application:
   - API Base URL: `http://localhost:3000`
   - Documentation: `http://localhost:3000/documentation`

---

## **Features**

### Recipe Endpoints
- `GET /recipes` - Fetch all recipes with optional pagination and sorting.
- `GET /recipes/:id` - Get details of a specific recipe.
- `POST /recipes` - Add a new recipe.
- `PUT /recipes/:id` - Update an existing recipe.
- `DELETE /recipes/:id` - Delete a recipe.
- `GET /recipes/search` - Search recipes by title and ingredients.

### User Endpoints
- `GET /users` - Fetch all users with optional pagination.
- `POST /users` - Add a new user.
- `PUT /users/:id` - Update an existing user.
- `DELETE /users/:id` - Delete a user.

---

## **How to Use**

### Testing the API
Use **Postman** to interact with the API:

#### Example: Add a Recipe
**Request:**
```http
POST /recipes
```
**Body:**
```json
{
  "title": "Pizza",
  "ingredients": ["Cheese", "Tomato"],
  "instructions": "Bake in oven."
}
```

#### Example: Search Recipes
**Request:**
```http
GET /recipes/search?title=Pizza&ingredient=Cheese
```

#### Example: Get All Recipes with Pagination
**Request:**
```http
GET /recipes?limit=5&offset=0&sortBy=title&order=asc
```

#### Example: Update a Recipe
**Request:**
```http
PUT /recipes/:id
```
**Body:**
```json
{
  "title": "Updated Pizza",
  "ingredients": ["Cheese", "Pepperoni"],
  "instructions": "Bake in oven at 350F."
}
```

---

## **Credits**
- **Frameworks & Libraries:**
  - Node.js
  - Express.js
  - MongoDB Atlas

- **Documentation References:**
  - [MongoDB Documentation](https://cloud.mongodb.com/v2/67883b1ead010637edc1d854#/metrics/replicaSet/67883bdd22d48a51ba950af0/explorer/recipes)
  - [Express.js Documentation](https://expressjs.com/)


---

## **References**
This project was inspired by and developed with the help of the following resources:
- [Postman API Testing Guide](https://learning.postman.com/docs/getting-started/introduction/)
- [RESTful API Design](https://restfulapi.net/)
- Tutorials on [youtube](https://youtu.be/084rmLU1UgA?si=_99Dg1RNF9k7ulZ3)(https://youtu.be/-MTSQjw5DrM?si=72QgIr_kEijg9EZF)(https://youtu.be/bBA9rUdqmgY?si=wyw50AZqy3I5KEJa)(https://youtu.be/SccSCuHhOw0?si=0kTix1bg9KoiptpG).
- OpenAI assistance for code optimization and documentation.(https://chatgpt.com/)




