import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import FoodItemModal from "../components/FoodItemModal";
import { getProducts } from "../actions/productActions";
import { addToCart, resetAddToCartStatus } from "../actions/shopActions";
import ActionModal from "../components/ActionModal";

function FoodMenu(props) {
  const {
    products,
    getProducts,
    addToCart,
    addToCartStatus,
    resetAddToCartStatus,
  } = props;
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [size, setSize] = useState(null);
  const [variant, setVariant] = useState(null);
  const [addOns, setAddOns] = useState([]);

  const handleCloseModal = () => {
    // setModalShow(false);
    // setSelectedProduct(null);
    // setSize(null);
    // setAddOns([]);
    resetItems();
  };
  const handleShowModal = (productItem) => {
    setModalShow(true);
    setSelectedProduct(productItem);
    // setSize("medium");
  };
  const changeVariant = (e) => {
    setVariant(e.target.value);
  };
  // const changeSize = (e) => {
  //   setSize(e.target.value);
  // };
  const changeAddOns = (e) => {
    const index = addOns.indexOf(e.target.value);

    if (index < 0) {
      setAddOns([...addOns, e.target.value]);
    } else {
      setAddOns(
        addOns.filter((addOn) => {
          return addOn !== e.target.value;
        })
      );
    }
  };
  const submitHandler = () => {
    const payload = {
      product: selectedProduct._id,
      addOns: addOns,
      // size: size,
      variant: variant,
    };
    addToCart(payload);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (addToCartStatus.isSuccess) {
      // setModalShow(false);
      resetItems();
    }
  }, [addToCartStatus]);

  const resetItems = useCallback(() => {
    setModalShow(false);
    setSelectedProduct(null);
    setVariant(null);
    setAddOns([]);
  });

  return (
    <div className="p-3 food-menu-page">
      {/* <CardGroup> */}
      {products && (
        <Row xs={1} md={3}>
          {products.map((product) => {
            if (product.productType === "AddOn") {
              return null;
            }

            return (
              // <Col>
              <Card key={product._id}>
                <Card.Img variant="top" src={product.imageURL} />
                <Card.Body>
                  <Card.Title>
                    {/* {product.productType === "drink"
                      ? `${product.title} - ₱${product.priceMedium}`
                      : `${product.title}`} */}
                    {product.title}
                  </Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="warning"
                    onClick={() => {
                      handleShowModal(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                </Card.Footer>
              </Card>
              // </Col>
            );
          })}
        </Row>
      )}
      {/* </CardGroup> */}
      {selectedProduct && (
        <FoodItemModal
          show={modalShow}
          onHide={() => {
            handleCloseModal();
          }}
          // changeSize={changeSize}
          changeVariant={changeVariant}
          changeAddOns={changeAddOns}
          addOns={products.addOns}
          selectedProduct={selectedProduct}
          submitHandler={submitHandler}
          // size={size}
          variant={variant}
          addToCartStatus={addToCartStatus}
          products={products}
        />
      )}
      <ActionModal
        show={addToCartStatus.isSuccess}
        onHide={() => resetAddToCartStatus()}
        message={"Successfully Added To Cart"}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    addToCartStatus: state.shop.addToCartStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getProducts: () => dispatch(getProducts()),
    addToCart: (payload) => dispatch(addToCart(payload)),
    resetAddToCartStatus: () => dispatch(resetAddToCartStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodMenu);
