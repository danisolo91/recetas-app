
const Login = () => {
  document.title = 'Iniciar sesión';

  return (
    <>
      <h1 className="text-center">Iniciar sesión</h1>
      <div class="row mt-4">
        <div class="col-sm-12 col-md-6 mx-auto">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="floatingEmail" placeholder="nombre@ejemplo.com" />
                  <label for="floatingEmail">Correo electrónico</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña" />
                  <label for="floatingPassword">Contraseña</label>
                </div>
                <button className="btn btn-primary">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;