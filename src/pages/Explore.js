import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore({ history }) {
  return (
    <>
      <Header title="Explore" />
      {/* <h1 data-testid="page-title">Explore</h1> */}
      <div id="btnInfo">
        <button
          data-testid="explore-foods"
          type="button"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </>
  );
}
//
Explore.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func,
}.isRequired;

export default Explore;
