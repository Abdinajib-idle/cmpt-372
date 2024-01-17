import { React, useState } from 'react';
import './App.css';

export default function NewRecipes() {
    const [recName,setRecName] = useState("");
    const [ingr, setIngr] = useState("");
    const [dir, setDir] = useState("");
    const saveHandler = (e) => {
       
        // e.preventDefault();
      };
      const handleForm = (e) => {
        e.preventDefault();
      };
      const resetForm = (e) => {
       setRecName(""); 
       setDir(""); 
       setIngr("");
      }
      const handleSave = (e) => {
        const savedRecipes = {

        }
      }
    return (
        <div className = "container" style={{ padding: '20px', border: '1px solid #eee', width:"fit-content" }}>
            <h3>New Recipe</h3>
            <form onSubmit={handleForm} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label htmlFor="recipeName">Recipe Name</label>
                <br/>
                <input
                value={recName}
                onChange={(e) => setRecName(e.target.value)} 
                type="text" 
                id="recipeName" 
                style={{ width: '412px'}} />
                <p>Ingredients</p>
                <textarea
                value={ingr}
                onChange={(e) => setIngr(e.target.value)}
                    style={{ width: '412px', height: '132px' }}
                />
                <p>Directions</p>
                <textarea
                    value = {dir}
                    onChange={(e) => setDir(e.target.value)}
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
                    onClick = {resetForm}
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
                    onClick = {handleSave}
                >
                    SAVE
                </button>
                </div>
            </form>
        </div>
    );
}
