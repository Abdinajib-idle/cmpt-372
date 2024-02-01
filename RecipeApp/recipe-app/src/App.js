import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewRecipes from './NewRecipes';
import RecipeList from './RecipeList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewRecipes />} />
        <Route path="/recipes" element={<RecipeList />} />
      </Routes>
    </Router>
  );
}

export default App;
