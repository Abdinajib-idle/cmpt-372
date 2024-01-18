import './App.css';
import './NewRecipes'
import NewRecipes from './NewRecipes';
import RecipeList from './RecipeList';

function App() {
  return (
    <div className="App">
    <p className='header-item'>Recipe App</p>
   <RecipeList/>
    </div>
  );
}

export default App;
