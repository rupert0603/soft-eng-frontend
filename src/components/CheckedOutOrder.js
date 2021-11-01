import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import PlacedOrder from "./PlacedOrder";
import { toTitleCase } from "../globals/helpers";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
// import { patchOrder } from "../actions/orderActions";

function formatDate(dateTime, format) {
  return moment(dateTime).format(format);
}

const deliveryStatuses = ["processing", "sent", "delivered"];
const paymentStatuses = ["paid", "not paid"];

function getPaymentMethod(paymentMethod) {
  const dictionary = {
    ["card"]: "Card",
    ["cash-on-delivery"]: "Cash on Delivery",
  };

  return dictionary[paymentMethod];
}

function CustomerDetails(props) {
  const { createdBy } = props;

  return (
    <Row>
      <Col>
        <h4>Customer Details:</h4>{" "}
        {`${createdBy.firstName} ${createdBy.lastName} - ${createdBy.email}`}
      </Col>
    </Row>
  );
}

function CheckedOutOrder(props) {
  const { checkedOutOrderData, isAdmin, patchOrder } = props;

  return (
    <Accordion.Item
      eventKey={checkedOutOrderData._id}
      className="checked-out-order"
    >
      <Accordion.Header>
        {formatDate(checkedOutOrderData.createdAt, "MMMM Do YYYY h:mm a")}
      </Accordion.Header>
      <Accordion.Body>
        <PlacedOrder orderData={checkedOutOrderData} />
        {isAdmin && (
          <CustomerDetails createdBy={checkedOutOrderData.createdBy} />
        )}
        <Row>
          <Col>
            <h4>Delivery Status:</h4>{" "}
            {!isAdmin && toTitleCase(checkedOutOrderData.deliveryStatus)}
            {isAdmin && (
              <Form.Select
                defaultValue={checkedOutOrderData.deliveryStatus}
                onChange={(e) =>
                  patchOrder({
                    orderId: checkedOutOrderData._id,
                    patchData: {
                      deliveryStatus: e.target.value,
                    },
                  })
                }
              >
                {deliveryStatuses.map((deliveryStatus) => {
                  return (
                    <option key={deliveryStatus} value={deliveryStatus}>
                      {toTitleCase(deliveryStatus)}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Delivery Address:</h4> {checkedOutOrderData.address}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Payment Method:</h4>{" "}
            {getPaymentMethod(checkedOutOrderData.paymentMethod)}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Payment Status:</h4>{" "}
            {!isAdmin && toTitleCase(checkedOutOrderData.paymentStatus)}
            {isAdmin && (
              <Form.Select
                defaultValue={checkedOutOrderData.paymentStatus}
                onChange={(e) =>
                  patchOrder({
                    orderId: checkedOutOrderData._id,
                    patchData: {
                      paymentStatus: e.target.value,
                    },
                  })
                }
              >
                {paymentStatuses.map((paymentStatus) => {
                  return (
                    <option key={paymentStatus} value={paymentStatus}>
                      {toTitleCase(paymentStatus)}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default CheckedOutOrder;
