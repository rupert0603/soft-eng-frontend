import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ActionModal(props) {
  return (
    <Modal
      // {...props}
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Successfully Added To Cart</h4> */}
        <h4>{props.message}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ActionModal;
