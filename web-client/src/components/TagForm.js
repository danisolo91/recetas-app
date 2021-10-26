import { useState } from "react";

const TagForm = (props) => {
  let initialState = {
    data: '',
    tagError: ''
  }

  const [tag, setTag] = useState(initialState);

  const validate = () => {
    let isValid = true;
    let tagError = '';

    if (tag.data.trim().length === 0) {
      tagError = 'No se puede añadir tags vacíos.'
      isValid = false;
    }

    setTag(prevState => {
      return {
        ...prevState,
        tagError: tagError
      }
    })

    return isValid;
  }

  const handleInput = (e) => {
    setTag(prevState => {
      return {
        ...prevState,
        data: e.target.value
      }
    });
  }

  const addTag = () => {
    if (validate()) {
      props.addTag(tag.data);
      setTag(initialState);
    }
  }

  return (
    <div className="bg-white border rounded p-3 mt-3">
      <h5>Tags:</h5>
      <div className="input-group mb-3">
        <input
          type="text"
          className={tag.tagError ? 'form-control is-invalid' : 'form-control'}
          placeholder="Etiqueta"
          aria-describedby="button-addon3"
          name="tag"
          value={tag.data}
          onChange={handleInput} />
        <button
          className="btn btn-outline-secondary rounded-end"
          type="button"
          id="button-addon3"
          onClick={addTag}>Añadir</button>
        <div className="invalid-feedback">{tag.tagError}</div>
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