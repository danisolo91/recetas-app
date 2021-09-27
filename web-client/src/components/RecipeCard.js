import { Link } from 'react-router-dom';
import Healthy from '../images/healthy.jpg';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={ '/recipes/' + recipe.id } style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card mb-4 border-0 shadow-sm">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={Healthy} className="img-fluid rounded-start" alt="receta" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{recipe.title}</h5>
              <p className="card-text">{recipe.description}</p>
              <p className="card-text text-secondary">{recipe.category}</p>
              <p className="card-text"><small className="text-secondary">{recipe.createdAt}</small></p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;