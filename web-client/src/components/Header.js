import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Header = ({ history }) => {
  return (
    <header className="p-3 bg-dark text-white mb-4 shadow">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link to='/' className='d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none me-4 fs-4'>
            <strong>Recetas</strong>App
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
            <li><a href="/" className="nav-link px-2 text-white">Features</a></li>
            <li><a href="/" className="nav-link px-2 text-white">Pricing</a></li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" className="form-control form-control-dark bg-dark border-secondary" placeholder="Search..." aria-label="Search" />
          </form>

          <div className="text-end">
            <button onClick={() => history.push('/login')} className="btn btn-outline-light me-2">Iniciar sesión</button>
            <button onClick={() => history.push('/register')} className="btn btn-warning">Crear cuenta</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);