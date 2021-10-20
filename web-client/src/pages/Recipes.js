import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CategoryList from '../components/CategoryList';
import Pagination from '../components/Pagination';
import RecipeCard from '../components/RecipeCard';
import RecipeService from '../services/recipe.service';

const Recipes = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState({ content: [] });
  const [loading, setLoading] = useState(true);

  const changePage = (page) => {
    if (category) {
      RecipeService.getRecipesByCategory(category, page).then(res => {
        setRecipes(res.data);
      }, error => console.log(error));
    } else {
      RecipeService.getAllRecipes(page).then(res => {
        setRecipes(res.data);
      }, error => console.log(error));
    }
  }

  useEffect(() => {
    if (category) {
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

      <CategoryList selectedCategory={category ? category : ''} />

      <div className="col-md-9">
        {recipes.content.length > 0 ?
          <>
            {recipes.content.map(recipe => {
              return <RecipeCard recipe={recipe} />
            })}
            {recipes.totalPages > 1 &&
              <Pagination
                totalPages={recipes.totalPages}
                currentPage={recipes.number}
                changePage={changePage}
              />
            }
          </> :
          !loading && <p>No hay recetas</p>
        }
      </div>
    </div>
  );
}

export default Recipes;