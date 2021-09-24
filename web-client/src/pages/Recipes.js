import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeService from '../services/recipe.service';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    RecipeService.getAllRecipes().then(res => {
      setRecipes(res.data);
      setLoading(false);
    })
  }, []);

  return (
    <div className="row">
      <div className="col-md-3 mb-4">
        <div className="list-group sticky-top">
          <button type="button" className="list-group-item list-group-item-action active" aria-current="true">Todas las recetas</button>
          <button type="button" className="list-group-item list-group-item-action">Saludables</button>
          <button type="button" className="list-group-item list-group-item-action">Orgánicas</button>
          <button type="button" className="list-group-item list-group-item-action">Vegetarianas</button>
        </div>
      </div>
      <div className="col-md-9">
          {recipes.length > 0 ?
            recipes.map(recipe => {
              return <RecipeCard recipe={recipe} />
            }) :
            !loading && <p>No hay recetas</p>
          }
      </div>
    </div>
  );
}

export default Recipes;