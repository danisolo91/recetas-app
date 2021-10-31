import { useEffect, useRef, useState } from 'react';
import { Modal } from "bootstrap";
import UserService from '../services/user.service';

const ProfileModal = (props) => {
  const initialState = {
    fullname: '',
    description: '',
    fullnameError: '',
    descriptionError: ''
  }
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef();

  const validate = () => {
    let isValid = true;
    let fullnameError = '';
    let descriptionError = '';

    if (formState.fullname.trim().length === 0 || formState.fullname.trim().length > 45) {
      fullnameError = 'Campo obligatorio. Máximo 45 carácteres.';
      isValid = false;
    }

    if (formState.description.trim().length > 140) {
      descriptionError = 'Máximo 140 carácteres.';
      isValid = false;
    }

    setFormState(prevState => {
      return {
        ...prevState,
        fullnameError: fullnameError,
        descriptionError: descriptionError
      }
    });

    return isValid;
  }

  const handleInput = (e) => {
    setFormState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      UserService.updateProfile(props.userId, formState)
        .then(res => {
          window.location.reload();
          setLoading(false);
        }, error => {
          console.log(error.response.data);
          setLoading(false);
        });
    }
  }

  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle);
    bsModal.show();
  }

  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  }

  useEffect(() => {
    if (props.show === true && isVisible === false) {
      showModal();
      setIsVisible(true);
    } else {
      hideModal();
    }
  }, [props.show, isVisible, setIsVisible]);

  useEffect(() => {
    setFormState({
      fullname: props.profile.fullname,
      description: props.profile.description
    })
  }, [props.profile.fullname, props.profile.description]);

  return (
    <div className="modal fade" ref={modalRef} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Editar perfil</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={props.hide}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={formState.fullnameError ? 'form-control is-invalid' : 'form-control'}
                    id="floatingFullname"
                    placeholder="Nombre completo"
                    name="fullname"
                    value={formState.fullname}
                    onChange={handleInput} />
                  <label for="floatingFullname">Nombre completo</label>
                  <div className="invalid-feedback">{formState.fullnameError}</div>
                </div>
                <div className="form-floating">
                  <textarea
                    className={formState.descriptionError ? 'form-control is-invalid' : 'form-control'}
                    placeholder="Descripción"
                    id="floatingTextarea2"
                    style={{ height: '150px' }}
                    name="description"
                    value={formState.description}
                    onChange={handleInput} ></textarea>
                  <label for="floatingTextarea2">Descripción</label>
                  <div className="invalid-feedback">{formState.descriptionError}</div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.hide}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              {loading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;