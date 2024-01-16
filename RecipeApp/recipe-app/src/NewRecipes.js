import React from 'react'

export default function NewRecipes() {
  return (
    <div style = {{padding: "20px",border: "2px solid black"}}>
        <h3>New Recipe</h3>
     <form>
        <p>Recipe Name</p>
        <input type="text"/>
        <br/>
        <p>Ingredients</p>
        <textarea/>
        <br/>
        <p>Ingredients</p>
        <textarea/>
        <br/>
        <button>RESET </button>
        <br/>
        <button>SAVE </button>
     </form>
    </div>
  )
}
