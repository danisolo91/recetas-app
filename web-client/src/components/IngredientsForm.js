import { useState } from "react";

const IngredientsForm = (props) => {
  const [ingredient, setIngredient] = useState({
    food: '',
    quantity: ''
  });

  const inputHandler = (e) => {
    setIngredient(prevState => {
      return {...prevState, [e.target.name]: e.target.value};
    });
  }

  const addIngredient = () => {
    if(ingredient.food.length > 0 && ingredient.food.length > 0) {
      props.addIngredient(ingredient);
      setIngredient({
        food: '',
        quantity: ''
      });
    }
  }

  return (
    <div className="bg-white border rounded p-3 mt-3">
      <h5>Ingredientes</h5>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Nombre" 
          aria-describedby="button-addon2"
          name="food"
          value={ingredient.food}
          onChange={inputHandler} />
        <input 
          type="text" 
          className="form-control" 
          placeholder="Cantidad" 
          aria-describedby="button-addon2"
          name="quantity"
          value={ingredient.quantity}
          onChange={inputHandler} />
        <button 
          className="btn btn-outline-secondary" 
          type="button" 
          id="button-addon2"
          onClick={addIngredient}>Añadir</button>
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