import { useEffect, useState } from 'react';
import RecipeService from '../services/recipe.service';

const CategoryFormSelect = (props) => {
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    props.selectCategory(e.target.value);
  }

  useEffect(() => {
    RecipeService.getCategories().then(res => {
      setCategories(res.data.values);
    }, error => {
      console.log(error);
    });
  }, []);

  return (
    <div className="form-floating mb-3">
      <select 
        className="form-select" 
        id="floatingSelect" 
        aria-label="Floating label select example"
        onChange={handleChange}
        value={props.selectedCategory}>
        {categories?.map(category => {
          return (
            <option 
              key={category}
              value={category}
            >{category}</option>
          );
        })}
      </select>
      <label for="floatingSelect">Categoría</label>
    </div>
  );
}

export default CategoryFormSelect;