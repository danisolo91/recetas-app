import React, { useState } from 'react';

import AuthService from '../services/auth.service';
import EmailValidator from '../utilities/email.util';

const Register = (props) => {
  document.title = 'Crear cuenta';
  let initialState = {
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    fullnameError: '',
    usernameError: '',
    passwordError: '',
    confirmPasswordError: ''
  }

  const [formState, setFormState] = useState(initialState);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const validate = () => {
    let isValid = true;
    let fullnameError = '';
    let usernameError = '';
    let passwordError = '';
    let confirmPasswordError = '';

    if (formState.fullname.trim().length === 0 || formState.fullname.trim().length > 45) {
      fullnameError = 'Campo obligatorio. Máximo 45 carácteres.';
      isValid = false;
    }

    if (formState.username.trim().length === 0 || formState.username.trim().length > 50) {
      usernameError = 'Campo obligatorio. Máximo 50 carácteres.';
      isValid = false;
    } else if (!EmailValidator.isValid(formState.username)) {
      usernameError = 'Formato de email inválido.'
      isValid = false;
    }

    if (formState.password.trim().length < 6 || formState.password.trim().length > 40) {
      passwordError = 'La contraseña debe tener entre 6 y 40 carácteres.';
      isValid = false;
    }

    if (formState.password !== formState.confirmPassword) {
      confirmPasswordError = 'La contraseña no coincide.';
      isValid = false;
    }

    setFormState(prevState => {
      return {
        ...prevState,
        fullnameError: fullnameError,
        usernameError: usernameError,
        passwordError: passwordError,
        confirmPasswordError: confirmPasswordError
      }
    });

    return isValid;
  }

  const handleInput = (e) => {
    setFormState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage('');
    setSuccessful(false);

    if (validate()) {
      AuthService.register(formState.fullname, formState.username, formState.password)
        .then(response => {
          setMessage(response.data.message);
          setFormState(initialState);
          setSuccessful(true);
        }, error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        });
    }
  };

  return (
    <>
      <h1 className="text-center">Crear cuenta</h1>
      <div className="row mt-4">
        <div className="col-sm-12 col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleRegister}>
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
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={formState.usernameError ? 'form-control is-invalid' : 'form-control'}
                    id="floatingEmail"
                    placeholder="nombre@ejemplo.com"
                    name="username"
                    value={formState.username}
                    onChange={handleInput} />
                  <label for="floatingEmail">Correo electrónico</label>
                  <div className="invalid-feedback">{formState.usernameError}</div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={formState.passwordError ? 'form-control is-invalid' : 'form-control'}
                    id="floatingPassword"
                    placeholder="Contraseña"
                    name="password"
                    value={formState.password}
                    onChange={handleInput} />
                  <label for="floatingPassword">Contraseña</label>
                  <div className="invalid-feedback">{formState.passwordError}</div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={formState.confirmPasswordError ? 'form-control is-invalid' : 'form-control'}
                    id="floatingConfirmPassword"
                    placeholder="Confirmar contraseña"
                    name="confirmPassword"
                    value={formState.confirmPassword}
                    onChange={handleInput} />
                  <label for="floatingConfirmPassword">Confirmar contraseña</label>
                  <div className="invalid-feedback">{formState.confirmPasswordError}</div>
                </div>
                <button className="btn btn-primary">Enviar</button>

                {message && (
                  <div className="form-group mt-3">
                    <div
                      className={successful ? "alert alert-success" : "alert alert-danger"}
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;