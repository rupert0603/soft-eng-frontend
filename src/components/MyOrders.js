import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { getMyOrders } from "../actions/orderActions";
import Accordion from "react-bootstrap/Accordion";
import CheckedOutOrder from "./CheckedOutOrder";

function MyOrders(props) {
  const { getMyOrders, myOrders, myOrdersStatus } = props;

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="mt-3">
      <h2>My Orders</h2>
      {myOrders && myOrders.length > 0 && (
        <Accordion>
          {myOrders.map((myOrder) => {
            return (
              <CheckedOutOrder
                key={myOrder._id}
                checkedOutOrderData={myOrder}
              />
            );
          })}
        </Accordion>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // state,
    myOrders: state.orders.myOrders,
    myOrdersStatus: state.orders.myOrdersStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getMyOrders: () => dispatch(getMyOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
