import { useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tea1 from "../assets/images/Tea1.jpg";
import Tea2 from "../assets/images/Tea2.jpg";
import Tea3 from "../assets/images/Tea3.jpg";
import Tea4 from "../assets/images/Tea4.jpg";
import Tea5 from "../assets/images/Tea5.jpg";
import Tea6 from "../assets/images/Tea6.jpg";
import Tea7 from "../assets/images/Tea7.jpg";
import FoodItemModal from "../components/FoodItemModal";

const images = [Tea1, Tea2, Tea3, Tea4, Tea5, Tea6, Tea7];

function FoodMenu(props) {
  const [modalShow, setModalShow] = useState(false);

  const handleCloseModal = () => setModalShow(false);
  const handleShowModal = () => setModalShow(true);

  return (
    <div className="p-5 food-menu-page">
      {/* <CardGroup> */}
      <Row xs={1} md={3}>
        {images.map((image) => {
          return (
            // <Col>
            <Card key={image}>
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="warning" onClick={handleShowModal}>
                  Add to Cart
                </Button>
              </Card.Footer>
            </Card>
            // </Col>
          );
        })}
      </Row>
      {/* </CardGroup> */}
      <FoodItemModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default FoodMenu;
