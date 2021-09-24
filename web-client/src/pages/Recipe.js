import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RecipeService from '../services/recipe.service';

const Recipe = (props) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    RecipeService.getRecipeById(recipeId).then(res => {
      setRecipe(res.data);
      setLoading(false);
    }, error => {
      console.log(error);
      props.history.push('/'); // show 404 error page...
    });
  });

  return (
    <>
      {!loading &&
        <h1>{recipe.title}</h1>
      }
    </>
  );
}

export default Recipe;