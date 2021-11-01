import { useState, useEffect, useCallback, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getFinalPrice, getCartItemPrice } from "../globals/helpers";
import { BOBA_REWARDS_RATE } from "../config/env";

function getCartTotalPrice(cartData) {
  return cartData.reduce((total, cartItem) => {
    return total + getFinalPrice(cartItem);
  }, 0);
}

function Order(props) {
  const { orderData, isCheckout, userData, bobaRewardsChosenState } = props;

  const cartTotalPrice = useMemo(() => {
    return getCartTotalPrice(orderData);
  }, [orderData]);

  return (
    <Container>
      {orderData.map((item) => {
        return (
          <Row key={item._id}>
            <Col md={4}>
              <Image src={item.product.imageURL} fluid />
            </Col>
            <Col md={4}>
              <h3>{item.product.title}</h3>

              <div>{getCartItemPrice(item)}</div>

              <ul>
                {item?.addOns.map((addOn) => {
                  return (
                    <li key={addOn._id}>
                      {addOn.title} +{addOn.price}
                    </li>
                  );
                })}
              </ul>

              <h3>Total: {getFinalPrice(item)}</h3>
            </Col>
          </Row>
        );
      })}

      {isCheckout && userData.bobaRewards > 0 && (
        <>
          <br />
          <Row>
            <h4>You have {userData.bobaRewards} Points from Boba Rewards</h4>
            <Form.Label column md={2} className="pt-0">
              Boba Points to Spend
            </Form.Label>
            <Col md={4}>
              <Form.Control
                type="number"
                required
                min="0"
                max={
                  cartTotalPrice < userData.bobaRewards
                    ? cartTotalPrice
                    : userData.bobaRewards
                }
                onChange={(e) =>
                  bobaRewardsChosenState.setBobaRewardsChosen(
                    calculateBobaPointsInput(
                      e.target.value,
                      cartTotalPrice,
                      userData.bobaRewards
                    )
                  )
                }
                value={bobaRewardsChosenState.bobaRewardsChosen}
              />
            </Col>
          </Row>
        </>
      )}

      <Row>
        <Col md={{ span: 4, offset: 8 }}>
          <h4>Gross Total: {cartTotalPrice}</h4>
          <p>
            Boba Rewards to Earn After Purchase:{" "}
            {cartTotalPrice * BOBA_REWARDS_RATE}
            <br />
            {`(${BOBA_REWARDS_RATE * 100}% of gross total)`}
          </p>
          {isCheckout && userData.bobaRewards > 0 && (
            <h4>
              Boba Rewards Used: {bobaRewardsChosenState.bobaRewardsChosen}
            </h4>
          )}
          {
            <h2>
              Net Total:{" "}
              {cartTotalPrice - bobaRewardsChosenState.bobaRewardsChosen}
            </h2>
          }
        </Col>
      </Row>
    </Container>
  );
}

function calculateBobaPointsInput(inputValue, cartTotalPrice, bobaRewards) {
  if (inputValue <= 0) {
    return 0;
  }

  if (inputValue <= cartTotalPrice) {
    if (inputValue <= bobaRewards) {
      return inputValue;
    } else {
      return bobaRewards;
    }
  } else {
    if (cartTotalPrice <= bobaRewards) {
      return cartTotalPrice;
    } else {
      return bobaRewards;
    }
  }

  // cartTotalPrice < e.target.value
  // ? userData.bobaRewards < cartTotalPrice
  //   ? userData.bobaRewards
  //   : cartTotalPrice //if cart total price is less than the input, ccheck first the bobba rewards
  // : userData.bobaRewards < e.target.value
  // ? userData.bobaRewards
  // : e.target.value
}

export default Order;
