import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FoodItemModal(props) {
  const { show, onHide } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="food-item-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Milk Tea Name
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Check
                inline
                label={
                  <>
                    <FontAwesomeIcon icon="glass-martini-alt" size="lg" />{" "}
                    Regular
                  </>
                }
                name="size"
                type="radio"
                id="regular"
              />
            </Col>
            <Col>
              <Form.Check
                inline
                label={
                  <>
                    <FontAwesomeIcon icon="glass-martini-alt" size="2x" /> Large
                  </>
                }
                name="size"
                type="radio"
                id="large"
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={4}>
              <div>Add-Ons</div>
              <Form.Check
                type="checkbox"
                id="pearls"
                label="Pearls"
                name="add-ons"
              />
              <Form.Check
                type="checkbox"
                id="nata"
                label="Nata"
                name="add-ons"
              />
              <Form.Check
                type="checkbox"
                id="pudding"
                label="Pudding"
                name="add-ons"
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => {}} className="add-to-cart">
          Add To Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FoodItemModal;
