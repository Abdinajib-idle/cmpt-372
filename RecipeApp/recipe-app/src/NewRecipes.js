import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { message } from 'antd';
import './App.css';

export default function NewRecipes() {
  const location = useLocation();
  const navigate = useNavigate();
  // Unified state object for the recipe
  const [recipe, setRecipe] = useState({
    id: null,
    title: '',
    ingredients: '',
    recipe_instructions: ''
  });

  // Check if we are editing an existing recipe and pre-fill the form
  useEffect(() => {
    if (location.state?.recipe) {
      console.log("from the useEffect:", location.state.recipe)
      const { id, title, ingredients, recipe_instructions } = location.state.recipe;
      setRecipe({
        id,
        title,
        ingredients, 
        recipe_instructions
      });
    }
  }, [location.state]);


  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      title: recipe.title,
      recipe_instructions: recipe.recipe_instructions,
      ingredients: recipe.ingredients 
    };
    console.log("Payload being sent:", payload);


    const url = recipe.id ? `/api/recipes/${recipe.id}` : '/api/recipes';
    const method = recipe.id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const responseData = await response.json();
      message.success(`Recipe ${recipe.id ? 'updated' : 'saved'} successfully`);
      navigate('/');
    } catch (error) {
      console.error('Saving error:', error);
      message.error(`Error: ${error.message}`);
    }
  };


  return (
    <div className="new-recipe-container">
      <h2>{recipe.id ? 'Edit Recipe' : 'New Recipe'}</h2>
      <form onSubmit={handleSave}>
        <label htmlFor="recipeName">Recipe Name</label>
        <input
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          type="text"
          id="recipeName"
          className="form-input"
          required
        />
        <label htmlFor="ingredients">Ingredients (one per line)</label>
        <textarea
          value={recipe.ingredients}
          onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
          id="ingredients"
          className="form-textarea"
          required
        />

        <label htmlFor="directions">Directions</label>
        <textarea
          value={recipe.recipe_instructions}
          onChange={(e) => setRecipe({ ...recipe, recipe_instructions: e.target.value })}
          id="directions"
          className="form-textarea"
          required
        />

        <button type="submit" className="submit-btn">Save</button>
        <Link to="/" className="back-btn">Back to Recipes List</Link>
      </form>
    </div>
  );
}
