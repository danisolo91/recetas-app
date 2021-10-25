import React, { useState } from 'react';

import AuthService from '../services/auth.service';

const Register = (props) => {
  document.title = 'Crear cuenta';

  const [formState, setFormState] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    setFormState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage('');
    setSuccessful(false);

    if (true) {
      AuthService.register(formState.fullname, formState.username, formState.password)
        .then(response => {
          setMessage(response.data.message);
          setFormState({
            fullname: '',
            username: '',
            password: '',
            confirmPassword: ''
          });
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
        }
        );
    }
  };

  return (
    <>
      <h1 className="text-center">Crear cuenta</h1>
      <div class="row mt-4">
        <div class="col-sm-12 col-md-6 mx-auto">
          <div class="card">
            <div class="card-body">
              <form onSubmit={handleRegister}>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingFullname"
                    placeholder="Nombre completo"
                    name="fullname"
                    value={formState.fullname}
                    onChange={handleInput}
                    required />
                  <label for="floatingFullname">Nombre completo</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingEmail"
                    placeholder="nombre@ejemplo.com"
                    name="username"
                    value={formState.username}
                    onChange={handleInput} 
                    required/>
                  <label for="floatingEmail">Correo electrónico</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Contraseña"
                    name="password"
                    value={formState.password}
                    onChange={handleInput}
                    required />
                  <label for="floatingPassword">Contraseña</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingConfirmPassword"
                    placeholder="Confirmar contraseña"
                    name="confirmPassword"
                    value={formState.confirmPassword}
                    onChange={handleInput}
                    required />
                  <label for="floatingConfirmPassword">Confirmar contraseña</label>
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