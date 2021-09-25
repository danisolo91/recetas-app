import { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import RecipeService from '../services/recipe.service';
import AuthService from '../services/auth.service';

import HealthyImg from '../images/healthy.jpg';
import { Link } from 'react-router-dom';

const Recipe = (props) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(undefined);
  const [loggedUser, setLoggedUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const goToEditRecipe = () => {
    props.history.push('/recipes/' + recipeId + '/edit');
  }

  const deleteRecipe = () => {
    RecipeService.deleteRecipe(recipeId);
    props.history.push('/profiles/' + loggedUser.id);
  }

  useEffect(() => {
    const authData = AuthService.getAuthData();

    if(authData) {
      setLoggedUser(authData.user);
    }

    RecipeService.getRecipeById(recipeId).then(res => {
      setRecipe(res.data);
      setLoading(false);
    }, error => {
      console.log(error);
      props.history.push('/'); // show 404 error page...
    });
  }, [props.history, recipeId]);

  return (
    <>
      {!loading &&
        <>
          <h1>{recipe.title}</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="fw-lighter">Autor: 
                <Link to={ '/profiles/' + recipe.author.id } className="ms-2">{recipe.author.fullname}</Link>
              </div>
              <small className="text-secondary fst-italic fw-lighter">
                Fecha de publicación: {recipe.createdAt}
              </small>
            </div>
            {(loggedUser?.id === recipe?.author.id) &&
              <div className="col-md-6 pt-2">
                <button onClick={goToEditRecipe} className="btn btn-success me-3"><i class="bi bi-pencil-square me-2" />Editar receta</button>
                <button onClick={deleteRecipe} className="btn btn-danger"><i class="bi bi-pencil-square me-2" />Eliminar receta</button>
              </div>
            }
          </div>
          <div className="row bg-white rounded py-4 px-3 my-4 shadow-sm">
            <div className="col-md-4">
              <img src={HealthyImg} className="img-fluid rounded" alt="recipe" />
            </div>
            <div className="col-md-8">
              <h4>Ingredientes: </h4>
              <ul>
                {recipe.ingredients.map(ingredient => {
                  return <li><small>{ingredient.food} - {ingredient.quantity}</small></li>
                })}
              </ul>
              <h4 className="mt-3">Descripción: </h4>
              <p>{recipe.description}</p>
              <small className="text-secondary">Tags: {recipe.tags.map(tag => <span>{tag}, </span>)}</small>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default withRouter(Recipe);