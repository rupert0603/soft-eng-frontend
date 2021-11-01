import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { toTitleCase } from "../globals/helpers";

const initialState = {
  title: "",
  imageURL: "",
  variants: {},
  price: 0,
  description: "",
  productType: "drink",
};

const drinkSizes = ["small", "medium", "large"];

function CreateProduct(props) {
  const { createProduct, createProductStatus, resetCreateProductStatus } =
    props;

  const [newProductData, setNewProductData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const setNewProductDataState = (key, value) => {
    setNewProductData({
      ...newProductData,
      [key]: value,
    });
  };

  const onChangeTitle = (e) => {
    setNewProductDataState("title", e.target.value);
  };
  const onChangeImageURL = (e) => {
    setNewProductDataState("imageURL", e.target.value);
  };

  const onChangePriceNotDrink = (e) => {
    setNewProductDataState("price", e.target.value);
  };
  const onChangeDescription = (e) => {
    setNewProductDataState("description", e.target.value);
  };
  const onChangeAddOnType = (e) => {
    setNewProductDataState("type", e.target.value);
  };
  const onChangeProductType = (e) => {
    let newProductDataClone = { ...newProductData };

    if (e.target.value !== "addOn") {
      delete newProductDataClone.type;
    }
    if (e.target.value === "addOn") {
      newProductDataClone.type = "drink";
    }

    if (e.target.value !== "drink") {
      delete newProductDataClone.variants.small;
      delete newProductDataClone.variants.medium;
      delete newProductDataClone.variants.large;

      setNewProductData({
        ...newProductDataClone,
        productType: e.target.value,
      });
    } else {
      setNewProductData({
        ...newProductDataClone,
        productType: e.target.value,
      });
    }
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
      createProduct(newProductData);
    }

    setValidated(true);
  };

  useEffect(() => {
    if (createProductStatus.isSuccess) {
      setTimeout(() => {
        setNewProductData(initialState);
        setValidated(false);
        setIsFormValid(false);
        resetCreateProductStatus();
      }, 3000);
    }
  }, [createProductStatus.isSuccess, createProductStatus.isError]);

  const changeVariantHandler = (e) => {
    const selectedVariant = e.target.value;
    let { variants: newProductDataVariants } = newProductData;

    if (newProductDataVariants.hasOwnProperty(selectedVariant)) {
      delete newProductDataVariants[selectedVariant];

      setNewProductDataState("variants", newProductDataVariants);
    } else {
      setNewProductDataState("variants", {
        ...newProductDataVariants,
        [selectedVariant]: 0,
      });
    }
  };

  const changeVariantValueHandler = (e, variant) => {
    let { variants: newProductDataVariants } = newProductData;
    newProductDataVariants[variant] = e.target.value;

    setNewProductDataState("variants", newProductDataVariants);
  };

  return (
    <div className="p-5 create-product-page">
      {createProductStatus.isSuccess && (
        <Alert variant="success">Product successfully added! </Alert>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Product name"
              onChange={onChangeTitle}
              value={newProductData.title}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="imageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Image URL"
              onChange={onChangeImageURL}
              value={newProductData.imageURL}
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
              value={newProductData.description}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select
              aria-label="product type"
              onChange={onChangeProductType}
              value={newProductData.productType}
            >
              <option value="drink">Drink</option>
              <option value="food">Food</option>
              <option value="addOn">Add-On</option>
            </Form.Select>
          </Form.Group>
          {newProductData.productType !== "drink" && (
            <Form.Group as={Col} md="3" controlId="priceNotDrink">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                min="0"
                onChange={onChangePriceNotDrink}
                value={newProductData.priceNotDrink}
              />
            </Form.Group>
          )}
          {newProductData.productType === "addOn" && (
            <Form.Group as={Col} md="3" controlId="addOnType">
              <Form.Label>Add On Type</Form.Label>
              <Form.Select
                onChange={onChangeAddOnType}
                value={newProductData.type}
              >
                <option value="drink">Drink</option>
                <option value="food">Food</option>
              </Form.Select>
            </Form.Group>
          )}
          {newProductData.productType === "drink" && (
            <>
              <Form.Group as={Col} md="9" controlId="drinkVariants">
                <Row>
                  <Form.Group as={Col} md="12">
                    <Form.Label>Sizes</Form.Label>
                  </Form.Group>
                  {drinkSizes.map((drinkSize) => {
                    return (
                      <Form.Group
                        as={Row}
                        controlId="drinkVariants"
                        key={drinkSize}
                      >
                        <Col md="3">
                          <Form.Check
                            type="checkbox"
                            id={drinkSize}
                            label={toTitleCase(drinkSize)}
                            name="drinkVariants"
                            value={drinkSize}
                            onChange={(e) => {
                              changeVariantHandler(e);
                            }}
                            className="pb-3"
                            checked={newProductData?.variants.hasOwnProperty(
                              drinkSize
                            )}
                          />
                        </Col>
                        {newProductData.variants.hasOwnProperty(drinkSize) && (
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
                                  onChange={(e) =>
                                    changeVariantValueHandler(e, drinkSize)
                                  }
                                  value={newProductData.variants[drinkSize]}
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
            </>
          )}
        </Row>
        <Button type="submit" disabled={createProductStatus.isLoading}>
          Submit form
        </Button>
      </Form>
    </div>
  );
}

export default CreateProduct;

// {
//   <Form.Group as={Col} md="4" controlId="drinkVariants">
//     <Form.Label>Sizes</Form.Label>
//     {drinkSizes.map((drinkSize) => {
//       return (
//         <Form.Check
//           key={drinkSize}
//           type="checkbox"
//           // id={`default-checkbox`}
//           label={toTitleCase(drinkSize)}
//           name="drinkVariants"
//           value={drinkSize}
//           onClick={(e) => {
//             changeVariantHandler(e);
//           }}
//           className="mb-4"
//         />
//       );
//     })}
//   </Form.Group>
// }
// {
//   <Form.Group as={Col} md="5" controlId="drinkVariantPrices">
//     <Form.Label>Price</Form.Label>
//     {drinkSizes.map((drinkSize) => {
//       return (
//         <Form.Control
//           type="number"
//           required
//           min="0"
//           inline
//           // onChange={onChangePriceNotDrink}
//           // value={newProductData.priceNotDrink}
//           className="mb-3"
//         />
//       );
//     })}
//   </Form.Group>
// }
