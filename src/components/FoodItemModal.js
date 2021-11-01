import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toTitleCase } from "../globals/helpers";
import { useMemo, useState } from "react";

function VariantOptions(props) {
  const { selectedProduct, changeVariant, variantSelected } = props;

  const sizeOrder = ["small", "medium", "large"];
  let orderedVariants = [];

  //check if small exists in the variants, if yes, then push it
  //if not, remove or skip that

  for (let i = 0; i < sizeOrder.length; ++i) {
    let found = false;
    let j = 0;

    for (j; j < selectedProduct.variants.length; ++j) {
      if (
        sizeOrder[i].toLowerCase() ===
        selectedProduct.variants[j].name.toLowerCase()
      ) {
        found = true;
        break;
      }
    }

    if (found) {
      orderedVariants.push(selectedProduct.variants[j]);
    }
  }

  return (
    // <ConditionalWrapper
    //   condition={selectedProduct.priceSmall !== 0}
    //   wrapper={children => <a href={link}>{children}</a>}
    // >
    <>
      {/* {selectedProduct.variants.map((variant) => { */}
      {orderedVariants.map((variant) => {
        return (
          <Col key={variant._id}>
            <Form.Check
              inline
              label={
                <>
                  <FontAwesomeIcon icon="glass-martini-alt" size="sm" />{" "}
                  {toTitleCase(variant.name)} ₱{variant.price}
                </>
              }
              name="variant"
              type="radio"
              id={variant._id}
              value={variant._id}
              // onChange={(e) => changeSize(e)}
              // checked={size === variant._id}
              onChange={(e) => changeVariant(e)}
              checked={variantSelected === variant._id}
              required
            />
          </Col>
        );
      })}
    </>
  );
}

function AddOnOptions(props) {
  const { products, changeAddOns, selectedProduct } = props;

  const addOnForms = useMemo(() => {
    const productAddOns = products.filter((product) => {
      return (
        product.productType === "AddOn" &&
        selectedProduct.productType.toLowerCase() === product.type.toLowerCase()
      );
    });

    return productAddOns.map((product) => {
      return (
        <Form.Check
          key={product._id}
          type="checkbox"
          id={product.title}
          label={`${product.title} +₱${product.price ? product.price : 0}`}
          name="add-ons"
          value={product._id}
          onClick={(e) => changeAddOns(e)}
        />
      );
    });
  }, [products, selectedProduct]);

  if (addOnForms.length !== 0) {
    return (
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <div>Add-Ons</div>
          {addOnForms}
        </Col>
      </Row>
    );
  } else {
    return null;
  }
}

function FoodItemModal(props) {
  const {
    show,
    onHide,
    // changeSize,
    changeVariant,
    changeAddOns,
    // addOns,
    selectedProduct,
    submitHandler,
    // size,
    variant,
    addToCartStatus,
    products,
  } = props;

  const [errorMsg, setErrorMsg] = useState(null);

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
          {selectedProduct.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && <Alert variant="warning">{errorMsg}</Alert>}
        <Form>
          <Row>
            {selectedProduct.variants && (
              <VariantOptions
                selectedProduct={selectedProduct}
                // changeSize={changeSize}
                changeVariant={changeVariant}
                variantSelected={variant}
              />
            )}
            {!selectedProduct.variants && (
              <Col>
                {selectedProduct.title} - {selectedProduct.price}
              </Col>
            )}
          </Row>
          {
            <AddOnOptions
              products={products}
              changeAddOns={changeAddOns}
              selectedProduct={selectedProduct}
            />
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={(e) => {
            e.preventDefault();

            if (
              selectedProduct.variants &&
              selectedProduct.variants.length > 0 &&
              !variant
            ) {
              setErrorMsg("Please choose a variant.");
            } else {
              submitHandler();
            }
          }}
          className="add-to-cart"
          disabled={addToCartStatus.isLoading}
        >
          Add To Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FoodItemModal;
