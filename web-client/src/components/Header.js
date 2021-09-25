import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import AuthService from '../services/auth.service';

const Header = (props) => {
  const [loggedUser, setLoggedUser] = useState(undefined);

  const goToUserProfile = () => {
    props.history.push('/profiles/' + loggedUser.id);
  }

  const goToCreateRecipe = () => {
    props.history.push('/recipes/create');
    window.location.reload();
  }

  const logout = () => {
    AuthService.logout();
    setLoggedUser(undefined);
    props.history.push('/');
    window.location.reload();
  }

  useEffect(() => {
    const authData = AuthService.getAuthData();
    if (authData) {
      setLoggedUser(authData.user);
    }
  }, []);

  return (
    <header className="p-3 bg-dark text-white shadow">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link to='/' className='d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none me-4 fs-4'>
            <strong>Recetas</strong>App
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 text-white">Inicio</Link></li>
            <li className="dropdown text-end">
              <Link to="/recipes" className="nav-link px-2 text-white">Recetas</Link>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" className="form-control form-control-dark bg-dark border-secondary" placeholder="Search..." aria-label="Search" />
          </form>

          <div className="text-end">
            {loggedUser ?
              <div className="dropdown text-end">
                <div className="d-block link-light text-decoration-none dropdown-toggle cursor-pointer" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                </div>
                <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                  <li onClick={goToUserProfile} className="dropdown-item cursor-pointer">Mi perfil</li>
                  <li onClick={goToCreateRecipe} className="dropdown-item cursor-pointer">Crear receta</li>
                  <li><hr className="dropdown-divider" /></li>
                  <li onClick={logout} className="dropdown-item cursor-pointer">Cerrar sesión</li>
                </ul>
              </div> :
              <>
                <button onClick={() => props.history.push('/login')} className="btn btn-outline-light me-2">Iniciar sesión</button>
                <button onClick={() => props.history.push('/register')} className="btn btn-warning">Crear cuenta</button>
              </>
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);