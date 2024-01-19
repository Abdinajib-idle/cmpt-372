import { React, useState } from 'react';
import './App.css';
import RecipeList from './RecipeList';
import { message } from 'antd';

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
        if (recName === "" || dir === "" || ingr === "") {
            message.error("Can't save empty fields");
            return;
        }

        const lastModified = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const recipe = {
            recName: recName,
            dir: dir,
            ingr: ingr,
            lastModified: lastModified
        };

        localStorage.setItem(recName, JSON.stringify(recipe));
        resetForm();
    };
      const btnStyles={
        backgroundColor: '#1677ff',
        color: '#fff',
        padding: '10px 80px',
        border: 'none',
        borderRadius: '8px',
    }

    return (
        <div className = "container" style={{margin:"20px", padding: '20px',backgroundColor:"#fff", border: '1.5px solid #f2f2f2', width:"fit-content" }}>
            <p className='new-recipe'>New Recipe</p>
            <form onSubmit={handleForm} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label htmlFor="recipeName">Recipe Name</label>
                <br/>
                <input
                value={recName}
                onChange={(e) => setRecName(e.target.value)} 
                type="text" 
                id="recipeName" 
                style={{ width: '412px', boder:"5px solid #f2f2f2"}} />
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <button
                    style={btnStyles}
                    onClick = {resetForm}
                >
                    RESET
                </button>
                <br />
                <button
                    style={btnStyles}
                    onClick = {handleSave}
                >
                    SAVE
                </button>
                <br/>
                <button style = {btnStyles} onClick = {() => {<RecipeList/>}}>
                    Load
                </button>
                </div>
            </form>
        </div>
    );
}
