import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details-container">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="detail-image" />
      <div 
        className="recipe-summary" 
        dangerouslySetInnerHTML={{ __html: recipe.summary }} 
      />
      
      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients?.map((ingredient, index) => (
          <li key={`${ingredient.id}-${index}`}>{ingredient.original}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <div 
        className="recipe-instructions"
        dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
      />
    </div>
  );
}
