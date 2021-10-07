import Carousel from "react-bootstrap/Carousel";
import Tea1 from "../assets/images/Tea1.jpg";
import Tea2 from "../assets/images/Tea2.jpg";
import Tea3 from "../assets/images/Tea3.jpg";
import Tea4 from "../assets/images/Tea4.jpg";
import Tea5 from "../assets/images/Tea5.jpg";
import Tea6 from "../assets/images/Tea6.jpg";
import Tea7 from "../assets/images/Tea7.jpg";

const images = [Tea1, Tea2, Tea3, Tea4, Tea5, Tea6, Tea7];

function CarouselMilkTea(props) {
  return (
    <div className="carousel-milk-tea">
      <h2>Discover Milk Tea</h2>
      <Carousel className="w-50">
        {images.map((image) => {
          return (
            <Carousel.Item className="h-100 w-100" key={image}>
              <img
                className="d-block mw-100 h-100 my-0 mx-auto"
                src={image}
                alt="image"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselMilkTea;
