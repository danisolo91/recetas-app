import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import CategoryFormSelect from "../components/CategoryFormSelect";
import IngredientsForm from "../components/IngredientsForm";
import TagForm from "../components/TagForm";

import AuthService from '../services/auth.service';
import RecipeService from '../services/recipe.service';

const RecipeForm = (props) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({
    author: { id: '' },
    title: '',
    description: '',
    category: '',
    image: '',
    ingredients: [],
    tags: []
  });
  const [loading, setLoading] = useState(true);

  const handleInput = (e) => {
    setRecipe(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleSubmit = () => {
    if (recipe.title && recipe.ingredients.length > 0) {
      if (recipeId) { // update
        RecipeService.editRecipe(recipe).then(res => {
          props.history.push('/profiles/' + recipe.author.id);
        }, error => {
          console.log(error);
        });
      } else { // add new
        RecipeService.addRecipe(recipe).then(res => {
          props.history.push('/profiles/' + recipe.author.id);
        }, error => {
          console.log(error);
        });
      }
    } else {
      console.log('form validation error...');
    }
  }

  const addIngredient = (ingredient) => {
    setRecipe(prevState => {
      return {
        ...prevState,
        ingredients: [...prevState.ingredients, ingredient]
      }
    });
  }

  const removeIngredient = (index) => {
    setRecipe(prevState => {
      return {
        ...prevState,
        ingredients: prevState.ingredients.filter((val, i) => i !== index)
      }
    });
  }

  const addTag = (tag) => {
    setRecipe(prevState => {
      return {
        ...prevState,
        tags: [...prevState.tags, tag]
      }
    });
  }

  const removeTag = (index) => {
    setRecipe(prevState => {
      return {
        ...prevState,
        tags: prevState.tags.filter((val, i) => i !== index)
      }
    });
  }

  const selectCategory = (category) => {
    setRecipe(prevState => {
      return {
        ...prevState,
        category: category
      }
    })
  }

  useEffect(() => {
    const authData = AuthService.getAuthData();

    // Check if user is logged in
    if (authData) {
      // set logged user as author
      setRecipe(prevState => {
        return { ...prevState, author: authData.user }
      });

      // load recipe to edit
      if (recipeId) {
        RecipeService.getRecipeById(recipeId).then(res => {

          // Check if the logged user is the author
          if (res.data.author.id === authData.user.id) {
            setRecipe(res.data);
          } else {
            console.log('forbidden');
            props.history.push('/'); // show 403 forbidden page...
            window.location.reload();
          }

        }, error => {
          console.log(error);
          props.history.push('/'); // show 404 not found page...
          window.location.reload();
        });
      }
      setLoading(false);
    } else {
      props.history.push('/'); // show 403 forbidden page...
      window.location.reload();
    }
  }, [recipeId, props.history, recipe.author.id]);

  return (
    <>
      {!loading &&
        <>
          <h1 className="mb-3">{recipeId ? 'Editar receta' : 'Crear nueva receta'}</h1>

          <CategoryFormSelect 
              selectedCategory={recipe.category}
              selectCategory={selectCategory}
            />

          <div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingTitle"
                placeholder="Titulo"
                name="title"
                value={recipe?.title}
                onChange={handleInput} />
              <label for="floatingTitle">Titulo</label>
            </div>

            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Descripción"
                id="floatingTextarea2"
                style={{ height: '150px' }}
                name="description"
                value={recipe?.description}
                onChange={handleInput} ></textarea>
              <label for="floatingTextarea2">Descripción</label>
            </div>

            <IngredientsForm
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
              ingredients={recipe.ingredients} />

            <TagForm
              addTag={addTag}
              removeTag={removeTag}
              tags={recipe.tags} />

            <div className="mb-3">
              <label for="formFileLg" className="form-label ms-2 mt-2">Imagen</label>
              <input className="form-control form-control-lg" id="formFileLg" type="file" />
            </div>
            <div className="my-5 col-md-3 mx-auto">
              <button
                className="btn btn-success w-100"
                onClick={handleSubmit}>Guardar</button>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default withRouter(RecipeForm);