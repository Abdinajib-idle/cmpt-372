import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewRecipes from './NewRecipes';
import RecipeList from './RecipeList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/new" element={<NewRecipes />} />
        <Route path="/edit/:id" element={<NewRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
