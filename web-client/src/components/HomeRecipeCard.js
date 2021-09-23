import HealthyImg from '../images/healthy.jpg';

const RecipeCard = () => {

  return (
    <div className="row featurette">
      <div className="col-md-7 order-md-2">
        <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It’ll blow your mind.</span></h2>
        <p className="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
      </div>
      <div className="col-md-5">
        <img src={HealthyImg} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" alt="Saludable" />
      </div>
    </div>
  );
}

export default RecipeCard;