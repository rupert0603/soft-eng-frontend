import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { toTitleCase } from "../globals/helpers";

const drinkSizes = ["small", "medium", "large"];

function UpdateProductModal(props) {
  const { show, onHide, selectedProduct, updateProductStatus, updateProduct } =
    props;

  const [errorMsg, setErrorMsg] = useState(null);
  const [validated, setValidated] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [updatedProductData, setUpdatedProductData] = useState({
    ...selectedProduct,
  });

  const setUpdatedProductDataState = (key, value) => {
    setUpdatedProductData({
      ...updatedProductData,
      [key]: value,
    });
  };

  const onChangeTitle = (e) => {
    setUpdatedProductDataState("title", e.target.value);
  };
  const onChangeImageURL = (e) => {
    setUpdatedProductDataState("imageURL", e.target.value);
  };
  const onChangeDescription = (e) => {
    setUpdatedProductDataState("description", e.target.value);
  };
  const onChangePriceNotDrink = (e) => {
    setUpdatedProductDataState("price", e.target.value);
  };
  const onChangeAddOnType = (e) => {
    setUpdatedProductDataState("type", e.target.value);
  };

  const changeVariantHandler = (e, indexOfVariant) => {
    const selectedVariant = e.target.value;
    let variants = updatedProductData.variants;
    variants = JSON.parse(JSON.stringify(variants));

    if (indexOfVariant !== -1) {
      setUpdatedProductDataState(
        "variants",
        spliceNoMutate(variants, indexOfVariant)
      );
    } else {
      // setVariantsAdded(variantsAdded.concat([e.target.value]));

      variants.push({
        name: e.target.value,
        price: 0,
      });

      setUpdatedProductDataState("variants", variants);
    }
  };

  const changeVariantValueHandler = (e, variant, indexOfVariant) => {
    let variants = updatedProductData.variants;
    variants = JSON.parse(JSON.stringify(variants));
    variants[indexOfVariant].price = e.target.value;

    setUpdatedProductDataState("variants", variants);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setIsFormValid(false);
    }
    if (form.checkValidity() === true) {
      setIsFormValid(true);
      updateProduct(updatedProductData);
    }

    setValidated(true);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="update-product-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {updatedProductData.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && <Alert variant="warning">{errorMsg}</Alert>}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Product name"
                onChange={onChangeTitle}
                value={updatedProductData.title}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="imageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Image URL"
                onChange={onChangeImageURL}
                value={updatedProductData.imageURL}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={onChangeDescription}
                value={updatedProductData.description}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {updatedProductData.productType === "Food" && (
              <FoodFields
                updatedProductData={updatedProductData}
                onChangePriceNotDrink={onChangePriceNotDrink}
              />
            )}
            {updatedProductData.productType === "AddOn" && (
              <AddOnFields
                updatedProductData={updatedProductData}
                onChangeAddOnType={onChangeAddOnType}
                onChangePriceNotDrink={onChangePriceNotDrink}
              />
            )}
            {updatedProductData.productType === "Drink" && (
              <DrinkFields
                updatedProductData={updatedProductData}
                changeVariantHandler={changeVariantHandler}
                changeVariantValueHandler={changeVariantValueHandler}
              />
            )}
          </Row>
          <Button
            variant="warning"
            type="submit"
            // onClick={(e) => {
            //   e.preventDefault();

            // if (selectedProduct.variants.length > 0 && !variant) {
            //   setErrorMsg("Please choose a variant.");
            // } else {
            //   submitHandler();
            // }
            // }}
            className="update-product-btn"
            disabled={updateProductStatus.isLoading}
          >
            Update Product
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button
          variant="warning"
          // onClick={(e) => {
          //   e.preventDefault();

          // if (selectedProduct.variants.length > 0 && !variant) {
          //   setErrorMsg("Please choose a variant.");
          // } else {
          //   submitHandler();
          // }
          // }}
          className="update-product-btn"
          disabled={updateProductStatus.isLoading}
        >
          Update Product
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

function DrinkFields(props) {
  const {
    updatedProductData,
    changeVariantHandler,
    changeVariantValueHandler,
  } = props;

  return (
    <Form.Group as={Col} md="9" controlId="drinkVariants">
      <Row>
        <Form.Group as={Col} md="12">
          <Form.Label>Sizes</Form.Label>
        </Form.Group>
        {drinkSizes.map((drinkSize) => {
          const indexOfVariant = searchVariantSize(
            updatedProductData.variants,
            drinkSize
          );

          return (
            <Form.Group as={Row} controlId="drinkVariants" key={drinkSize}>
              <Col md="3">
                <Form.Check
                  type="checkbox"
                  id={drinkSize}
                  label={toTitleCase(drinkSize)}
                  name="drinkVariants"
                  defaultValue={drinkSize}
                  onChange={(e) => {
                    changeVariantHandler(e, indexOfVariant);
                  }}
                  className="pb-3"
                  checked={indexOfVariant !== -1 ? true : false}
                />
              </Col>
              {indexOfVariant !== -1 && (
                <Col>
                  <Row>
                    <Form.Label column md={2} className="pt-0">
                      Price
                    </Form.Label>
                    <Col md={4}>
                      <Form.Control
                        type="number"
                        required
                        min="0"
                        onChange={(e) => {
                          changeVariantValueHandler(
                            e,
                            drinkSize,
                            indexOfVariant
                          );
                        }}
                        value={
                          updatedProductData.variants[indexOfVariant].price
                        }
                      />
                    </Col>
                  </Row>
                </Col>
              )}
            </Form.Group>
          );
        })}
      </Row>
    </Form.Group>
  );
}

function FoodFields(props) {
  const { onChangePriceNotDrink, updatedProductData } = props;

  return (
    <Form.Group as={Col} md="3" controlId="priceNotDrink">
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="number"
        required
        min="0"
        onChange={onChangePriceNotDrink}
        value={updatedProductData.priceNotDrink}
      />
    </Form.Group>
  );
}

function AddOnFields(props) {
  const { updatedProductData, onChangeAddOnType, onChangePriceNotDrink } =
    props;

  return (
    <>
      <Form.Group as={Col} md="3" controlId="priceNotDrink">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          required
          min="0"
          onChange={onChangePriceNotDrink}
          value={updatedProductData.priceNotDrink}
        />
      </Form.Group>
      <Form.Group as={Col} md="3" controlId="addOnType">
        <Form.Label>Add On Type</Form.Label>
        <Form.Select
          onChange={onChangeAddOnType}
          value={updatedProductData.type}
        >
          <option value="drink">Drink</option>
          <option value="food">Food</option>
        </Form.Select>
      </Form.Group>
    </>
  );
}

function spliceNoMutate(myArray, indexToRemove) {
  return myArray
    .slice(0, indexToRemove)
    .concat(myArray.slice(indexToRemove + 1));
}

function searchVariantSize(variantsArray, searchTerm) {
  let index = 0;
  while (index !== variantsArray.length) {
    if (variantsArray[index].name === searchTerm) {
      break;
    }

    ++index;
  }

  if (index >= variantsArray.length) {
    return -1;
  } else {
    return index;
  }
}

export default UpdateProductModal;
