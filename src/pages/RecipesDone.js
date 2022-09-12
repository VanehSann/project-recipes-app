import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipesDone() {
  const history = useHistory();
  const [copiedIt, setCopiedIt] = useState(false);
  const [itemTypeName, setItemTypeName] = useState('all');

  const copyIt = ({ type, id }) => {
    const limitTimeToRemove = 2000;
    setCopiedIt(true);
    copy(`http://localhost:3000/${type}s/${id}`);
    setTimeout(() => { setCopiedIt(false); }, limitTimeToRemove);
  };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <>
      <Header title="Done Recipes" />
      <button
        type="button"
        onClick={ () => setItemTypeName('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => setItemTypeName('food') }
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>
      <button
        type="button"
        onClick={ () => setItemTypeName('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { doneRecipes !== null && doneRecipes
        .filter((item) => item.type === (itemTypeName === 'all'
          ? item.type : itemTypeName))
        .map((item, index) => (
          <div
            key={ index }
          >
            <img
              key={ index }
              width="200"
              src={ item.image }
              alt=""
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => history.push(`/${item.type}s/${item.id}`) }
              aria-hidden="true" // lint https://stackoverflow.com/a/64858019
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { (item.type === 'food')
                ? `${item.nationality} - ${item.category}`
                : item.alcoholicOrNot}
            </p>
            <p
              onClick={ () => history.push(`/${item.type}s/${item.id}`) }
              data-testid={ `${index}-horizontal-name` }
              aria-hidden="true" // lint https://stackoverflow.com/a/64858019
            >
              {item.name}

            </p>
            <button
              type="button"
              onClick={ () => copyIt(item) }
            >
              <img
                src={ shareIcon }
                alt=""
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button
              type="button"
              onClick={ () => unLikeItem(item) }
            >
              <img
                src={ blackHeartIcon }
                alt=""
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            <p
              data-testid={ `${index}-${item.tags[0]}-horizontal-tag` }
            >
              { item.tags[0] }
            </p>
            <p
              data-testid={ `${index}-${item.tags[1]}-horizontal-tag` }
            >
              { item.tags[1] }
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { item.doneDate }
            </p>
            { copiedIt && <p>Link copied!</p> }
          </div>
        ))}
    </>
  );
}

export default RecipesDone;
