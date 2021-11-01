import { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toTitleCase } from "../globals/helpers";
import { BOBA_REWARDS_RATE } from "../config/env";
// import { getFinalPrice, getCartItemPrice } from "../globals/helpers";

// function getCartTotalPrice(cartData) {
//   return cartData.reduce((total, cartItem) => {
//     return total + getFinalPrice(cartItem);
//   }, 0);
// }
function getItemTotalPrice(item) {
  const itemPrice = item.product.price;

  const addOnsPrice = item.addOns.reduce((previous, current) => {
    return previous + current.price;
  }, 0);

  return itemPrice + addOnsPrice;
}

function PlacedOrder(props) {
  const { orderData } = props;

  return (
    <Container className="placed-order">
      {orderData.items.map((item) => {
        return (
          <Row key={item._id}>
            <Col md={4}>
              <Image src={item.product.imageURL} fluid />
            </Col>
            <Col md={8}>
              <h3>
                {item.product.title}
                {item.variant && ` - ${toTitleCase(item.variant.name)}`}
              </h3>
              <div>Price: {item.product.price}</div>
              <ul>
                {item?.addOns.map((addOn) => {
                  return (
                    <li key={addOn._id}>
                      {addOn.title} +{addOn.price}
                    </li>
                  );
                })}
              </ul>
              <h3>Item Total: {getItemTotalPrice(item)}</h3>
            </Col>
          </Row>
        );
      })}

      <Row>
        <Col md={{ span: 4, offset: 8 }}>
          <h4>Gross Order Total: {orderData.grossTotal}</h4>
          <h4>Boba Rewards Used: {orderData.bobaRewardsUsed}</h4>
          <h2 className="net-total">
            Net Order Total: {orderData.grossTotal - orderData.bobaRewardsUsed}
          </h2>
          <p>
            Boba Rewards Earned:{" "}
            {orderData.grossTotal * orderData.bobaRewardsRate}
            <br />
            {`(${orderData.bobaRewardsRate * 100}% of gross total)`}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default PlacedOrder;
