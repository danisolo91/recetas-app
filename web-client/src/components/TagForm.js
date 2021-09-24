import { useState } from "react";

const TagForm = (props) => {
  const [tag, setTag] = useState('');

  const handleInput = (e) => {
    setTag(e.target.value);
  }

  const addTag = () => {
    props.addTag(tag);
    setTag('');
  }

  return (
    <div className="bg-white border rounded p-3 mt-3">
      <h5>Tags:</h5>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Etiqueta" 
          aria-describedby="button-addon3"
          name="tag"
          value={tag}
          onChange={handleInput} />
        <button 
          className="btn btn-outline-secondary" 
          type="button" 
          id="button-addon3"
          onClick={addTag}>Añadir</button>
      </div>
      <ul className="list-inline">
        {props?.tags.map((t, index) => {
          return (
            <li className="list-inline-item">
              <span className="badge rounded-pill bg-secondary">
                {t}
                <button 
                  type="button" 
                  className="btn-close ms-1" 
                  style={{ width: '6px', height: '6px' }} 
                  aria-label="Eliminar"
                  onClick={() => props.removeTag(index)}></button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TagForm;