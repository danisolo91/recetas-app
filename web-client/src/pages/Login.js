import React, { useState } from 'react';

import AuthService from '../services/auth.service';

const Login = (props) => {
  document.title = 'Iniciar sesión';

  const [state, setState] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    setState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    if (true) { // no validation errors...
      AuthService.login(state.username, state.password).then((data) => {
        props.history.push('/profiles/' + data.user.id);
        window.location.reload();
      }, (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center">Iniciar sesión</h1>
      <div class="row mt-4">
        <div class="col-sm-12 col-md-6 mx-auto">
          <div class="card">
            <div class="card-body">
              <form onSubmit={handleLogin}>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingEmail"
                    placeholder="nombre@ejemplo.com"
                    name="username"
                    value={state.username}
                    onChange={handleInput}
                    required />
                  <label for="floatingEmail">Correo electrónico</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Contraseña"
                    name="password"
                    value={state.password}
                    onChange={handleInput}
                    required />
                  <label for="floatingPassword">Contraseña</label>
                </div>
                <button className="btn btn-primary">
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  )}
                  <span>Enviar</span>
                </button>

                {message && (
                  <div className="form-group mt-3">
                    <div className="alert alert-danger" role="alert">
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

export default Login;