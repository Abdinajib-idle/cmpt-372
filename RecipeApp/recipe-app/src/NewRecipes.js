import { React, useState } from 'react';
import './App.css';

export default function NewRecipes() {
    const [recName,setRecName] = useState("");
    const [ingr, setIngr] = useState("");
    const [dir, setDir] = useState("");
     
    return (
        <div className = "container" style={{ padding: '20px', border: '1px solid #eee', width:"fit-content" }}>
            <h3>New Recipe</h3>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label htmlFor="recipeName">Recipe Name</label>
                <br/>
                <input type="text" id="recipeName" style={{ width: '412px'}} />
                <p>Ingredients</p>
                <textarea
                    style={{ width: '412px', height: '132px' }}
                />
                <p>Directions</p>
                <textarea
                    style={{ width: '414px', height: '232px' }}

                />
                <br />
                <div style = {{display:'flex', flexDirection:'column',alignItems:'center'}}>
                <button
                    style={{
                        backgroundColor: '#1677ff',
                        color: '#fff',
                        padding: '10px 80px',
                        border: 'none',
                        borderRadius: '8px',
                        // margin: '10px 0', 
                    }}
                    onClick = {saveHandler()}
                >
                    RESET
                </button>
                <br />
                <button
                    style={{
                        backgroundColor: '#1677ff',
                        color: '#fff',
                        padding: '10px 80px',
                        border: 'none',
                        borderRadius: '8px',
                    }}
                >
                    SAVE
                </button>
                </div>
            </form>
        </div>
    );
}
