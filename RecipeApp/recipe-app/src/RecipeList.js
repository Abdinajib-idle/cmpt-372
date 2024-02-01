import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

export default function RecipeList() {
    const [modal2Open, setModal2Open] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const recipesKeys = Object.keys(localStorage).filter(key => !key.startsWith('amplitude_'));
    const showModal = (key) => {
        const recipe = JSON.parse(localStorage.getItem(key));
        setSelectedRecipe(recipe);
        setModal2Open(true);
    };

    const closeModal = () => {
        setModal2Open(false);
    };
    const CloseButton = ({ onClick }) => (
        <button onClick={onClick} style={closeButtonStyle}>
            &times;
        </button>
    );

    // Styles
    const closeButtonStyle = {
        position: 'absolute',
        top: '22px',
        padding: "3px 9px",
        right: '32px',
        border: "none",
        borderRadius: "60%",
        background: 'none',
        fontSize: '25px',
        color: '#FFFFFF',
        backgroundColor: "#03549A",
        cursor: 'pointer',
    };

    return (
        <div>
            <div className='btnContainer' style={{display: "flex", justifyContent: "center", margin: "12px"}}>
                <button style={btnStyles}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Back to New Recipe</Link>
                </button>
            </div>

            {recipesKeys.length > 0 ? (
                <table style={tableStyle}>
                    <thead>
                        <tr style={tableRowStyle}>
                            <th style={{ ...tableCellStyle, color: '#333' }}>Saved Recipes</th>
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
            ) : (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>No saved recipes</div>
            )}

            {modal2Open && (
                <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
                    <CloseButton onClick={closeModal} />
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
            )}
        </div>
    );
}

// Extra styles
const btnStyles = {
    backgroundColor: '#1677ff',
    color: '#fff',
    padding: '10px 80px',
    border: 'none',
    borderRadius: '8px',
};

const modalContentStyle = {
    marginTop: "-100px",
    marginLeft: "200px",
    backgroundColor: "#F0EEEF",
    boxShadow: "0 0 10px rgba(0,0,0,0.25)",
    backdropFilter: 'blur(10px) saturate(180%)',
    WebkitBackdropFilter: 'blur(10px) saturate(180%)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    padding: '29px',
    width: '400px',
    maxWidth: '500px',
    overflowY: 'auto',
    position: 'relative',
    color: "#202529",
};

const tableStyle = {
    width: '90%',
    backgroundColor: "#fff",
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    marginLeft: '20px',
};

const tableRowStyle = {
    borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
    padding: '10px',
    textAlign: 'left',
    color: "#0E6EFD",
    textDecoration: 'underline',
};
