import Profile from "../components/Profile";
import CarouselMilkTea from "../components/CarouselMilkTea";

function HomePage(props) {
  return (
    <div className="container">
      <div className="row mb-3">
        <Profile />
      </div>
      <div className="row">
        <CarouselMilkTea />
      </div>
    </div>
  );
}

export default HomePage;
