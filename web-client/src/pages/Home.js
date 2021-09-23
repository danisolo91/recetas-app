import CategoryCard from '../components/CategoryCard';
import HomeCarousel from '../components/HomeCarousel';
import HomeRecipeCard from '../components/HomeRecipeCard';

const Home = () => {

  const categories = ['Saludable', 'Organica', 'Vegetariana'];

  return (
    <>
      <HomeCarousel />
      <div className='row my-5'>
        {
          categories.map((cat, index) => {
            return (
              <div className='col-lg-4 text-center'>
                <CategoryCard key={index} category={cat} />
              </div>
            )
          })
        }
      </div>
      <hr className='featurette-divider' />
      <HomeRecipeCard />
      <hr className='featurette-divider' />
      <HomeRecipeCard />
      <hr className='featurette-divider' />
      <HomeRecipeCard />
    </>
  );
}

export default Home;