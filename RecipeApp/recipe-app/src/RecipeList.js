import React, { useState } from 'react';
import './App.css'

export default function RecipeList() {
    const [modal2Open, setModal2Open] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    //i noticed that amplitude keys with empty array values were stored in the local storage, upon research i realized that they are web analytics stuff so i had to filter them out
    const recipesKeys = Object.keys(localStorage).filter(key => !key.startsWith('amplitude_'));
    const showModal = (key) => {
        const recipe = JSON.parse(localStorage.getItem(key));
        setSelectedRecipe(recipe);
        setModal2Open(true);
    };

    const closeModal = () => {
        setModal2Open(false);
    };
    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    return (
        <div>
            <table style={tableStyle}>
                <thead>
                    <tr style={tableRowStyle}>
                        <th style={tableCellStyle}>Saved Recipes</th>
                    </tr>
                </thead>
                <tbody>
                    {recipesKeys.map((key) => {
                        const recipe = JSON.parse(localStorage.getItem(key));
                        return (
                            <tr style={tableRowStyle} key={key} onClick={() => showModal(key)}>
                                <td style={tableCellStyle}>{recipe.recName}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {modal2Open && (
                <div style={modalStyle} onClick={handleOutsideClick}>
                    <div style={modalContentStyle}>
                        {selectedRecipe && (
                            <div>
                                <p><strong>{selectedRecipe.recName}</strong></p>
                                <>Ingredients:
                                    <span className='span-container'>
                                        <ol>
                                            {selectedRecipe.ingr.split('\n').map((ingredient, index) => (
                                                <li key={index}>{ingredient.replace(/ - /g, '').trim()}</li>
                                            ))}
                                        </ol>
                                    </span>
                                </>
                                <>Directions:
                                    <span className='span-container'>
                                        <ol>
                                            {selectedRecipe.dir.split('\n').map((direction, index) => (
                                                <li key={index}>{direction.replace(/ \* /g, '').trim()}</li>
                                            ))}
                                        </ol>
                                    </span>
                                </>

                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    backdropFilter: 'blur(10px) saturate(180%)', 
    WebkitBackdropFilter: 'blur(10px) saturate(180%)', 
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.25)', 
    padding: '29px',
    width: '500px', 
    maxWidth: '500px', 
    margin: '20px', 
    boxSizing: 'border-box', 
    overflowY: 'auto', 
    position: 'relative', 
};
const tableStyle = {
    width: '90%',
    backgroundColor: "#fff",
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    marginLeft: '20px',
};

const tableHeaderStyle = {
    // backgroundColor: '#f0f0f0', 
    textAlign: 'left',
    padding: '10px',
    borderBottom: '1px solid #333',
};

const tableRowStyle = {
    borderBottom: '1px solid #ddd',
};

const tableRowHoverStyle = {
    backgroundColor: '#f5f5f5',
};

const tableCellStyle = {
    padding: '10px',
    textAlign: 'left',
};
