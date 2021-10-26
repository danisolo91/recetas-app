import { useState } from "react";

const IngredientsForm = (props) => {
  let initialState = {
    food: '',
    quantity: '',
    foodError: '',
    quantityError: ''
  };

  const [ingredient, setIngredient] = useState(initialState);

  const validate = () => {
    let isValid = true;
    let foodError = '';
    let quantityError = '';

    if (ingredient.food.length === 0) {
      foodError = 'Nombre obligatorio.';
      isValid = false;
    }

    if (ingredient.quantity.length === 0) {
      quantityError = 'Cantidad obligatoria.';
      isValid = false;
    }

    setIngredient(prevState => {
      return {
        ...prevState,
        foodError: foodError,
        quantityError: quantityError
      }
    });

    return isValid;
  }

  const inputHandler = (e) => {
    setIngredient(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  const addIngredient = () => {
    if (validate()) {
      props.addIngredient(ingredient);
      setIngredient(initialState);
    }
  }

  return (
    <div className="bg-white border rounded p-3 mt-3">
      <h5>Ingredientes</h5>
      <div className="input-group mb-3">
        <input
          type="text"
          className={ingredient.foodError ? 'form-control is-invalid' : 'form-control'}
          placeholder="Nombre"
          aria-describedby="button-addon2"
          name="food"
          value={ingredient.food}
          onChange={inputHandler} />
        
        <input
          type="text"
          className={ingredient.quantityError ? 'form-control is-invalid' : 'form-control'}
          placeholder="Cantidad"
          aria-describedby="button-addon2"
          name="quantity"
          value={ingredient.quantity}
          onChange={inputHandler} />
        <button
          className="btn btn-outline-secondary rounded-end"
          type="button"
          id="button-addon2"
          onClick={addIngredient}>Añadir</button>
        <div className="invalid-feedback">{ingredient.foodError}</div>
        <div className="invalid-feedback">{ingredient.quantityError}</div>
      </div>
      <ul className="list-group list-group-flush">
        {props.ingredients?.map((ing, index) => {
          return (
            <li key={index} className="list-group-item">
              <small>{ing.food} - {ing.quantity}</small>
              <button
                type="button"
                className="btn-close btn-sm float-end"
                aria-label="Eliminar"
                onClick={() => props.removeIngredient(index)}></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default IngredientsForm;