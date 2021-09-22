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
    <div class="card bg-dark text-white" style={{width: '200px'}}>
      <img src={showImg} class="card-img" alt={category} />
      <div class="card-img-overlay">
        <h5 class="card-title">{category}</h5>
        <p class="card-text">This is a wider card with supporting text...</p>
        <p class="card-text">Last updated 3 mins ago</p>
      </div>
    </div>
  );
}

export default CategoryCard;