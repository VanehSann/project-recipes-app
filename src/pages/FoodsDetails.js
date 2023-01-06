import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../components/carousel.css';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { handleButtonFavorite } from '../utils/handleFavoritesRecipes';

const urlImage = (isFavorite) => {
  if (isFavorite) {
    return blackHeartIcon;
  }
  return whiteHeartIcon;
};

const valueBtn = (modifyBottom) => {
  if (modifyBottom) {
    return 'Continue Recipe';
  }
  return 'Start Recipe';
};

function FoodsDetails() {
  const { getDetailsById, recipeDetails,
    getRecommendation, recommended } = useContext(RecipesContext);
  const [modifyBottom, setModifyBottom] = useState(false);
  const history = useHistory();
  const [shouldShowBtn, setShouldShowBtn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  const verifyStorage = () => {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (progressRecipe) {
      const isProgressMeals = Object.keys(progressRecipe.meals).some((key) => key === id);

      if (isProgressMeals) {
        setModifyBottom(true);
      }
    }
  };

  const reloadPage = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (storage) {
      const existFavoriteRecipe = storage.some((recipe) => recipe.id === id);
      setIsFavorite(existFavoriteRecipe);
    }
  };

  const showBtn = () => {
    const isDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    if (isDoneRecipes.length > 0) {
      const isDoneRecipesResult = isDoneRecipes.some((key) => key.id === id);
      setShouldShowBtn(isDoneRecipesResult);
    }
  };

  // retirado de https://stackoverflow.com/questions/35583334/react-router-get-full-current-path-name
  useEffect(() => {
    reloadPage();
    const currentLocation = (window.location.pathname);
    getDetailsById(currentLocation);
    verifyStorage();
    showBtn();
    getRecommendation('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  }, []);

  const renderFoodIngredients = () => {
    const endIndex = 49;
    const startIndex = 9;
    const startMeasurement = 20;
    const ingredients = Object.values(recipeDetails).slice(startIndex, endIndex);
    // console.log(ingredients);
    return ingredients.map((item, index, array) => {
      if (item !== '' && index < startMeasurement) {
        return (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${item} - ${array[index + startMeasurement]}`}
          </li>
        );
      }
      return null;
    });
  };

  const renderFoodRecommendations = () => {
    const limite = 6;
    const { drinks } = recommended;
    return (drinks && drinks.slice(0, limite).map((drink, index) => (
      <div
        data-testid={ `${index}-recomendation-card` }
        className="recommended-card"
        key={ index }
      >
        <img
          alt="recommended-img"
          src={ drink.strDrinkThumb }
          width="100px"
          height="100px"
        />

        <p>
          { drink.strCategory }
        </p>

        <h3 data-testid={ `${index}-recomendation-title` }>
          { drink.strDrink }
        </h3>
      </div>
    )));
  };

  return (
    <section id="progress">
      <img
        data-testid="recipe-photo"
        alt="recipe-img"
        src={ recipeDetails.strMealThumb }
      />
      <div id="btnShareCopy">
        <h1 data-testid="recipe-title">
          {recipeDetails.strMeal}
        </h1>

        <div>
          { copied && <span>Link copied!</span> }
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
              setCopied(true);
            } }
          >
            <img src={ shareIcon } alt="compartilhar" />
          </button>

          <input
            type="image"
            data-testid="favorite-btn"
            onClick={ () => (
              handleButtonFavorite(setIsFavorite, isFavorite, recipeDetails)
            ) }
            src={ urlImage(isFavorite) }
            /* src={ globalStorage.some(({ idMeal }) => idMeal === id)
              ? blackHeartIcon : whiteHeartIcon } */
            alt="not favorite"
          />
        </div>

      </div>
      <p data-testid="recipe-category">
        {`Recipe category:
        ${recipeDetails.strCategory}`}
      </p>

      <div className="ingredients-container">
        <ul>
          { renderFoodIngredients() }
        </ul>
      </div>

      <div className="instructions-container">
        <h3> Instructions: </h3>
        <p data-testid="instructions">
          {recipeDetails.strInstructions}
        </p>
      </div>
      {/* referencia: https://www.hostinger.com.br/tutoriais/o-que-e-iframe?ppc_campaign=google_performance_max&gclid=Cj0KCQjwpcOTBhCZARIsAEAYLuX3FL3afxfWsxk47QRyzzjW8nAjA8TNj9TH_vGj2R2Y75YgzhiY3V4aAiyhEALw_wcB */}
      <div className="video-container">
        <iframe
          title="recipe-video"
          data-testid="video"
          src={ recipeDetails.strYoutube }
          width="680"
          height="480"
          allowFullScreen
        />
      </div>

      <div className="recommended-container">
        { renderFoodRecommendations() }
      </div>

      { !shouldShowBtn && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="startRecipeBtn"
          onClick={ () => history.push(`/foods/${id}/in-progress`) }
        >
          {valueBtn(modifyBottom)}
        </button>) }
    </section>
  );
}

export default FoodsDetails;
