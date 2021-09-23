import HealthyImg from '../images/healthy.jpg';
import OrganicImg from '../images/organic.jpg';
import VegetarianImg from '../images/vegetarian.jpg';

const CategoryCard = ({ category }) => {

  let showImg = null;

  switch (category) {
    case 'Saludable':
      showImg = HealthyImg;
      break;
    case 'Organica':
      showImg = OrganicImg;
      break;
    case 'Vegetariana':
      showImg = VegetarianImg;
      break;
    default:
      console.log('Error category switch...');
  }

  return (
    <>
      <img src={showImg} className="bd-placeholder-img rounded-circle" width="140" height="140" alt={category} />
      <h2>{category}</h2>
      <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
      <p><button className="btn btn-secondary">Ver recetas</button></p>
    </>
  );
}

export default CategoryCard;