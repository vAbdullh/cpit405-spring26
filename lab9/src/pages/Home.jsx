import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [query, setQuery] = useState('pasta');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (searchQuery) => {
    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}`);
      const data = await response.json();
      if (data.results) {
        setRecipes(data.results);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes('pasta');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchRecipes(query);
    }
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search recipes..." 
        />
        <button type="submit">SEARCH</button>
      </form>

      <div className="recipes-grid">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <h3>{recipe.title}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p className="no-results">Nothing found</p>
        )}
      </div>
    </div>
  );
}
