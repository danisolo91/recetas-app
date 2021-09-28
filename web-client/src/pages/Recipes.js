import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CategoryList from '../components/CategoryList';
import RecipeCard from '../components/RecipeCard';
import RecipeService from '../services/recipe.service';

const Recipes = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(category) {
      RecipeService.getRecipesByCategory(category).then(res => {
        setRecipes(res.data);
        setLoading(false);
      }, error => console.log(error));
    } else {
      RecipeService.getAllRecipes().then(res => {
        setRecipes(res.data);
        setLoading(false);
      }, error => console.log(error));
    }
  }, [category]);

  return (
    <div className="row">

      <CategoryList selectedCategory={category ? category : '' } />

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