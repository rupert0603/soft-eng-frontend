import { useState, useEffect } from "react";
import moment from "moment";
import Tab from "react-bootstrap/Tab";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import { getAllOrders, patchOrder } from "../actions/orderActions";
import { connect } from "react-redux";
import CheckedOutOrder from "./CheckedOutOrder";
import Accordion from "react-bootstrap/Accordion";

function AdminOrders(props) {
  const { allOrders, allOrdersStatus, getAllOrders, patchOrder } = props;

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="w-100">
      {allOrders && allOrders.length > 0 && (
        <Accordion>
          {allOrders.map((order) => {
            return (
              <CheckedOutOrder
                key={order._id}
                checkedOutOrderData={order}
                isAdmin
                patchOrder={patchOrder}
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
    allOrders: state.orders.allOrders,
    allOrdersStatus: state.orders.allOrdersStatus,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getAllOrders: () => dispatch(getAllOrders()),
    patchOrder: (payload) => dispatch(patchOrder(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(AdminOrders);
