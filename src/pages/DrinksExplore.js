import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function DrinksExplore({ history }) {
  const [randomSupriseDrinks, setRandomSupriseDrinks] = useState(false);
  const fetchAPIReturn = async () => {
    const fetchAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const jsonAPI = await fetchAPI.json();
    const { drinks } = jsonAPI;
    return drinks[0].idDrink;
  };

  useEffect(() => {
    const requestAPI = async () => {
      const results = await fetchAPIReturn();
      setRandomSupriseDrinks(results);
    };
    requestAPI();
  }, []);
  return (
    <>
      <Header title="Explore Drinks" />
      <div id="btnInfo">
        {/* <h1 data-testid="page-title">Explore Drinks</h1> */}
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/drinks/${randomSupriseDrinks}`) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}
DrinksExplore.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func,
}.isRequired;
export default DrinksExplore;
