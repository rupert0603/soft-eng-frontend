import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import FoodItemModal from "../components/FoodItemModal";
// import { getProducts } from "../actions/productActions";
import { getCart, deleteItemFromCart } from "../actions/shopActions";
import { toTitleCase } from "../globals/helpers";
import { Link, Redirect } from "react-router-dom";

function getFinalPrice(item) {
  let baseItemPrice = 0;
  let addOnsTotal = 0;
  let netItemPrice = 0;

  if (item.variant) {
    baseItemPrice = item.variant.price;
  } else {
    baseItemPrice = item.product.price;
  }

  addOnsTotal = item.addOns.reduce((total, addOn) => {
    return total + addOn.price;
  }, 0);

  netItemPrice = baseItemPrice + addOnsTotal;
  return netItemPrice;
}

function getCartItemPrice(item) {
  if (item.variant) {
    return item.variant.price + " " + toTitleCase(item.variant.name);
  } else {
    return item.product.price;
  }
}

function getCartTotalPrice(cartData) {
  return cartData.reduce((total, cartItem) => {
    return total + getFinalPrice(cartItem);
  }, 0);
}

function MyCart(props) {
  const { getCart, cartData, getCartStatus, deleteItemFromCart } = props;

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="my-cart-page p-3">
      <h1>My Cart</h1>
      <Container>
        {/* <Row xs={12}> */}
        {cartData &&
          cartData.map((cartItem) => {
            return (
              <Row className="pb-3" key={cartItem._id}>
                <Col xs={3}>
                  <Image src={cartItem.product.imageURL} fluid />
                </Col>
                <Col xs={6}>
                  <h3>{cartItem.product.title}</h3>

                  <div>{getCartItemPrice(cartItem)}</div>

                  <ul>
                    {cartItem?.addOns.map((addOn) => {
                      return (
                        <li key={addOn._id}>
                          {addOn.title} +{addOn.price}
                        </li>
                      );
                    })}
                  </ul>

                  <h3>Total: {getFinalPrice(cartItem)}</h3>
                  <Button
                    variant="danger"
                    onClick={() =>
                      deleteItemFromCart({ cartItemId: cartItem._id })
                    }
                  >
                    Remove
                  </Button>
                </Col>
                {/* <Col xs={3}>
                  <Button variant="danger" onClick={deleteItemFromCart()}>Remove</Button>
                </Col> */}
              </Row>
            );
          })}
        {cartData && cartData.length > 0 && (
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <h2>Total: {getCartTotalPrice(cartData)}</h2>
            </Col>
            <Col md={4}>
              <Button
                variant="warning"
                onClick={() => {}}
                className="checkout-btn"
              >
                <Link to="/checkout">Checkout</Link>
              </Button>
            </Col>
          </Row>
        )}
      </Container>
      {cartData && cartData.length === 0 && <h2>No items here</h2>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartData: state.shop.cartData,
    getCartStatus: state.shop.getCartStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getCart: () => dispatch(getCart()),
    deleteItemFromCart: (payload) => dispatch(deleteItemFromCart(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
