import { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import HomeCarousel from '../components/HomeCarousel';
import HomeRecipeCard from '../components/HomeRecipeCard';

import RecipeService from '../services/recipe.service';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [latestRecipes, setLatestRecipes] = useState([]);

  useEffect(() => {
    RecipeService.getCategories().then(res => {
      setCategories(res.data.values);
    }, error => console.log(error));

    RecipeService.getLatestRecipes().then(res => {
      setLatestRecipes(res.data);
    }, error => console.log(error));
  }, []);

  return (
    <>
      <HomeCarousel />
      <div className='row my-5'>
        {
          categories.map(category => {
            return (
              <div className='col-lg-4 text-center'>
                <CategoryCard key={category} category={category} />
              </div>
            )
          })
        }
      </div>
      {
        latestRecipes.map((recipe, index) => {
          return (
            <>
              <hr className='featurette-divider' />
              <HomeRecipeCard recipe={recipe} index={index} />
            </>
          );
        })
      }
    </>
  );
}

export default Home;