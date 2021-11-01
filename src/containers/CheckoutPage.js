import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import CardMinimal from "../components/CardMinimal";
import { getCart } from "../actions/shopActions";
import Order from "../components/Order";
import { checkOut, resetCheckoutStatus } from "../actions/orderActions";
import ActionModal from "../components/ActionModal";
import { Link, Redirect } from "react-router-dom";

function CheckoutPage(props) {
  const {
    getCart,
    cartData,
    getCartStatus,
    checkOut,
    userData,
    checkoutStatus,
    resetCheckoutStatus,
  } = props;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState("");
  const [cardPaymentMethodDetails, setCardPaymentMethodDetails] =
    useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bobaRewardsChosen, setBobaRewardsChosen] = useState(0);
  const [formInvalidMessage, setFormInvalidMessage] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const passCardPaymentMethodDetails = (paymentMethod) => {
    setCardPaymentMethodDetails(paymentMethod);
  };

  const onChangePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (isSubmitted && !address) {
      setFormInvalidMessage("Please enter your address");
      setIsSubmitted(false);
      return;
    }

    if (isSubmitted && paymentMethod === "card" && !cardPaymentMethodDetails) {
      setFormInvalidMessage("Please enter your card details");
      setIsSubmitted(false);
      return;
    }

    if (isSubmitted && paymentMethod === "card" && cardPaymentMethodDetails) {
      checkOut({
        paymentMethod,
        address,
        cardPaymentMethodDetails,
        bobaRewardsUsed: bobaRewardsChosen,
      });
    } else if (isSubmitted && paymentMethod === "cash-on-delivery") {
      checkOut({
        paymentMethod,
        address,
        bobaRewardsUsed: bobaRewardsChosen,
      });
    }
  }, [cardPaymentMethodDetails, isSubmitted, paymentMethod]);

  if (isOrderPlaced) {
    return <Redirect exact to="/home" />;
  }

  return (
    <div className="p-5 checkout-page">
      <h1>Checkout</h1>
      {formInvalidMessage && (
        <Alert variant="warning">{formInvalidMessage}</Alert>
      )}
      {cartData && cartData.length > 0 && userData && (
        <>
          <Container>
            {/* <Form> */}
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="payment-method">
                <Form.Label>Payment Method</Form.Label>
                <Form.Select
                  onChange={onChangePaymentMethod}
                  value={paymentMethod}
                  disabled={isSubmitted}
                >
                  <option value="cash-on-delivery">Cash On Delivery</option>
                  <option value="card">Card</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="address">
                {/* <Form.Label column sm="2"> */}
                <Form.Label>Address</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={onChangeAddress}
                    required
                    disabled={isSubmitted}
                  />
                  {/* <Form.Control plaintext readOnly defaultValue="email@example.com" /> */}
                </Col>
              </Form.Group>
            </Row>

            <Row>
              {paymentMethod === "card" && (
                <Col md={8}>
                  <Form.Label>Card Details</Form.Label>
                  <CardMinimal
                    passCardPaymentMethodDetails={passCardPaymentMethodDetails}
                    isSubmitted={isSubmitted}
                  />
                </Col>
              )}
            </Row>
            {/* </Form> */}
            <Row className="mt-5">
              <Order
                orderData={cartData}
                isCheckout
                userData={userData}
                bobaRewardsChosenState={{
                  bobaRewardsChosen,
                  setBobaRewardsChosen,
                }}
              />
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 8 }}>
                <Button
                  variant="warning"
                  onClick={handleSubmit}
                  className="checkout-btn"
                  disabled={checkoutStatus.isLoading}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
      <ActionModal
        show={checkoutStatus.isSuccess}
        onHide={() => {
          resetCheckoutStatus();
          setIsOrderPlaced(true);
        }}
        message={"Order successfully placed!"}
      />
      {cartData && cartData.length === 0 && <h2>No items here</h2>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartData: state.shop.cartData,
    getCartStatus: state.shop.getCartStatus,
    userData: state.user.userData,
    checkoutStatus: state.orders.checkoutStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getCart: () => dispatch(getCart()),
    checkOut: (payload) => dispatch(checkOut(payload)),
    resetCheckoutStatus: () => dispatch(resetCheckoutStatus()),
  };
};
// 4242 4242 4242 4242
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
