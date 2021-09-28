import { useEffect, useState } from "react";
import { withRouter } from "react-router";

import RecipeService from '../services/recipe.service';

const CategoryList = (props) => {
  const [categories, setCategories] = useState([]);

  const goToCategory = (category) => {
    props.history.push('/recipes/cat/' + category);
  }

  const goToRecipes = () => {
    props.history.push('/recipes');
  }

  useEffect(() => {
    RecipeService.getCategories().then(res => {
      setCategories(res.data.values);
    }, error => console.log(error));
  }, []);

  return (
    <div className="col-md-3 mb-4">
      <div className="list-group sticky-top">
        <button
          onClick={goToRecipes}
          type="button"
          className={props.selectedCategory === '' ?
            'list-group-item list-group-item-action active' :
            'list-group-item list-group-item-action'}
        >Todas las recetas</button>
        {categories?.map(category => {
          return (
            <button
              onClick={() => goToCategory(category)}
              key={category}
              type="button"
              className={category === props.selectedCategory ?
                'list-group-item list-group-item-action active' :
                'list-group-item list-group-item-action'}
            >{category}</button>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(CategoryList);