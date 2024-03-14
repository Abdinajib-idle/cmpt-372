import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import './App.css';

export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('/api/recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();
                setRecipes(data); 
                console.log("recipe Data: ", data);
            } catch (error) {
                console.error(`Fetch error: ${error.message}`);
                message.error(`Error: ${error.message}`);
            }
        };
        
        fetchRecipes();
        window.addEventListener('focus', fetchRecipes);
        return () => window.removeEventListener('focus', fetchRecipes);
    }, []);

    const deleteRecipe = async (id) => {
        try {
            const response = await fetch(`/api/recipes/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
            message.success('Recipe deleted successfully');
            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error(`Delete error: ${error.message}`);
            message.error(`Error: ${error.message}`);
        }
    };

    const editRecipe = (recipe) => {
        console.log("edit recipe:", recipe)
        navigate(`/edit/${recipe.id}`, { state: { recipe } });
    };

    const viewRecipe = (recipe) => {
        console.log("selected Recipe: ", recipe);
        setSelectedRecipe(recipe);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
    };

    return (
        <div>
            <div className='btnContainer' style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <Link to="/new" style={btnStyles}>Add New Recipe</Link>
            </div>

            {recipes.length > 0 ? (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Recipe Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe) => (
                            <tr key={recipe.id}>
                                <td onClick={() => viewRecipe(recipe)} style={{ cursor: 'pointer' }}>{recipe.title}</td>
                                <td>
                                    <button onClick={() => editRecipe(recipe)} style={actionButtonStyle}>Edit</button>
                                    <button onClick={() => deleteRecipe(recipe.id)} style={actionButtonStyle}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>No saved recipes</div>
            )}

            {selectedRecipe && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedRecipe.title}</h2>
                        <p><strong>Last Modified:</strong> {new Date(selectedRecipe.time_last_modified).toLocaleString()}</p>
                        <h3>Ingredients:</h3>
                        <ul>
                            {selectedRecipe.ingredients.split('\n').map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <h3>Directions:</h3>
                        <pre>{selectedRecipe.recipe_instructions}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}

function parseIngredientsForEdit(ingredientsString) {
    try {
      const correctedString = ingredientsString
        .replace(/\\|\{|\}|\"/g, '') // Remove extra escape characters and braces
        .replace(/name:/g, '') // Remove the 'name:' prefix
        .split(',') // Split the string by comma
        .join('\n'); // Join the array elements with newlines to create a multi-line string for the textarea
  
      return correctedString;
    } catch (error) {
      console.error('Error parsing ingredients:', error);
      return ''; // Return an empty string in case of an error
    }
  }
  
  
// Styles
const btnStyles = {
    backgroundColor: '#1677ff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    cursor: 'pointer',
};

const actionButtonStyle = {
    ...btnStyles,
    padding: '5px 10px',
    margin: '5px',
    fontSize: '14px',
};

const tableStyle = {
    width: '80%',
    margin: '0 auto',
    borderCollapse: 'collapse',
};


