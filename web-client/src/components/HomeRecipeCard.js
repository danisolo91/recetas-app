import { Link } from 'react-router-dom';
import HealthyImg from '../images/healthy.jpg';

const HomeRecipeCard = (props) => {
  return (
    <Link to={ '/recipes/' + props.recipe.id } style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="row featurette">
        <div className={props.index % 2 ? 'col-md-7' : 'col-md-7 order-md-2'}>
          <h2 className="featurette-heading mb-sm-3">{props.recipe.title}. <span className="text-muted">{props.recipe.category}.</span></h2>
          <p className="lead">{props.recipe.description.substring(0, 150) + '...'}</p>
        </div>
        <div className={props.index % 2 ? 'col-md-5' : 'col-md-5 order-md-1'}>
          <img src={HealthyImg} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" alt="Saludable" />
        </div>
      </div>
    </Link>
  );
}

export default HomeRecipeCard;