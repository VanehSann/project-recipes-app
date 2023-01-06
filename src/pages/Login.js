import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import logo from '../images/logo.png';

function Login({ history }) {
  const { email, setEmail, password,
    setPassword, isButtonDisabled, setButton } = useContext(RecipesContext);

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);
    const MIN_LENGTH = 6;
    const validPassword = password.length > MIN_LENGTH;
    if (validEmail && validPassword) {
      return setButton(false);
    }
    return setButton(true);
  }, [email, password, setButton]);

  return (
    <section id="sectionLogin">
      <img src={ logo } alt="logo" />
      <fieldset>
        <label htmlFor="email-input">
          <input
            type="text"
            data-testid="email-input"
            id="email-input"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            type="password"
            id="password-input"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </fieldset>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.node,
  push: PropTypes.func,
}.isRequired;

export default Login;
