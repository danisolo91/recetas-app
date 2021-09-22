import CategoryCard from "../components/CategoryCard";
import HomeCarousel from "../components/HomeCarousel";
import RecipeCard from "../components/RecipeCard";

const Home = () => {

  const categories = ["Saludable", "Organica", "Vegetariana"];

  return (
    <>
      <HomeCarousel />
      <div className="row row-cols-auto justify-content-evenly mt-5">
        {
          categories.map((cat, index) => {
            return (
              <div className="col mb-4">
                <CategoryCard key={index} category={cat} />
              </div>
            )
          })
        }
      </div>
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </>
  );
}

export default Home;