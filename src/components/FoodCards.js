import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Cards({ meal, index }) {
/*   const pickMeal = () => {

  } */

  const { strMeal, strMealThumb } = meal;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link
        key={ meal.idMeal }
        to={ `/foods/${meal.idMeal}` }
      >
        <h2 data-testid={ `${index}-card-name` }>{ strMeal }</h2>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt="Card receita"
          className="CardImg"
        />
      </Link>
    </div>
  );
}

Cards.propTypes = {
  meal: PropTypes.node,
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;

export default Cards;
