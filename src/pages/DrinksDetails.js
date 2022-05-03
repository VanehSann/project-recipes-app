import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function DrinksDetails() {
  const { getDetailsById, recipeDetails } = useContext(RecipesContext);
  // retirado de https://stackoverflow.com/questions/35583334/react-router-get-full-current-path-name
  useEffect(() => {
    const currentLocation = (window.location.pathname);
    getDetailsById(currentLocation);
  }, [getDetailsById]);

  return (
    <>
      <img
        data-testid="recipe-photo"
        alt="recipe-img"
        src={ recipeDetails.strDrinkThumb }
      />
      <div>
        <h1 data-testid="recipe-title">
          { recipeDetails.strDrink }
        </h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          share icon
        </button>

        <button
          type="button"
          data-testid="favorite-btn"
        >
          favorite icon
        </button>
      </div>
      <p data-testid="recipe-category">
        { `Recipe category:
        ${recipeDetails.strAlcoholic}` }
      </p>

      <div className="ingredients-container">
        <ul>
          <li
            data-testid="0-ingredient-name-and-measure"
          >
            Ingredients
          </li>
        </ul>
      </div>

      <div className="instructions-container">
        <h3> Instructions: </h3>
        <p data-testid="instructions">
          { recipeDetails.strInstructions }
        </p>
      </div>

      <div className="recommended-container">
        <div data-testid="0-recomendation-card" />
      </div>
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="startRecipeBtn"
      >
        Start Recipe
      </button>
    </>
  );
}

export default DrinksDetails;
