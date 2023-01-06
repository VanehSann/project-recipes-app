import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodCategories() {
  const { food, setFood } = useContext(RecipesContext);
  const [categories, setCategoriesApi] = useState([]);
  const [allFood, setAllFood] = useState('');
  const [select, setSelect] = useState(false);
  const [selectCategory, setSelectCategory] = useState('');

  useEffect(() => {
    const getCategoriesApi = async () => {
      const limite = 5;
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const results = await response.json();
      setCategoriesApi(results.meals.slice(0, limite));
    };
    getCategoriesApi();
  }, []);

  async function fetchCategoriesByFood(param) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`);
    const foodCategoriesResponse = await response.json();
    return foodCategoriesResponse;
  }

  const categoriesItemsFetch = async ({ target }) => {
    setAllFood(food);
    if (select === false || selectCategory !== target.name) {
      const response = await fetchCategoriesByFood(target.name);
      setFood(response);
      setSelectCategory(target.name);
      setSelect(!select);
    } else if (select === true) {
      setFood(allFood);
      setSelect(!select);
    }
  };

  const returnAll = () => {
    setFood(allFood);
  };

  return (
    <div id="category">
      <button
        data-testid="All-category-filter"
        onClick={ returnAll }
        type="button"
      >
        All
      </button>
      {categories.map((category) => ((
        <button
          data-testid={ `${category.strCategory}-category-filter` }
          name={ category.strCategory }
          key={ category.strCategory }
          onClick={ categoriesItemsFetch }
          type="button"
        >
          {category.strCategory}
        </button>
      )
      ))}
    </div>
  );
}
export default FoodCategories;
