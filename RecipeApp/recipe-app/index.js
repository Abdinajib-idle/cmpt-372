require('dotenv').config(); // For environment variables
const express = require('express');
const { Pool } = require('pg'); // PostgreSQL connection pool
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API routes
// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM recipes ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching recipes:', err.message);
    res.status(500).send('Server error');
  }
});

// Get a single recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Recipe not found');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new recipe
app.post('/api/recipes', async (req, res) => {
  const { title, recipe_instructions, ingredients } = req.body; // Assume ingredients is a text string

  try {
    const insertRecipeText = 'INSERT INTO recipes (title, recipe_instructions, ingredients) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(insertRecipeText, [title, recipe_instructions, ingredients]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Failed to save recipe:', err.message);
    res.status(500).send('Server error');
  }
});

// Update a recipe
app.put('/api/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, recipe_instructions, ingredients } = req.body;

  try {
    const updateRecipeText = `
      UPDATE recipes
      SET title = $2, recipe_instructions = $3, ingredients = $4
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(updateRecipeText, [id, title, recipe_instructions, ingredients]);
    if (rows.length === 0) {
      return res.status(404).send('Recipe not found');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Failed to update recipe:', err.message);
    res.status(500).send('Server error');
  }
});

// Delete a recipe
app.delete('/api/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
