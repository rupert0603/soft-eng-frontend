import CreateProduct from "../components/CreateProduct";
// import CarouselMilkTea from "../components/CarouselMilkTea";
import Tab from "react-bootstrap/Tab";
// import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import {
  createProduct,
  resetCreateProductStatus,
} from "../actions/productActions";
import { connect } from "react-redux";
import AdminOrders from "../components/AdminOrders";
import ProductCatalogue from "../components/ProductCatalogue";
import { useState } from "react";

function AdminPage(props) {
  const { createProduct, createProductStatus, resetCreateProductStatus } =
    props;

  const [chosenTab, setChosenTab] = useState("orders");

  return (
    <div className="container mt-3">
      <Tab.Container defaultActiveKey="orders">
        <Row>
          <Nav variant="tabs">
            <Col sm={2}>
              <Nav.Item variant="pills" onClick={() => setChosenTab("orders")}>
                <Nav.Link eventKey="orders">Orders</Nav.Link>
              </Nav.Item>
            </Col>
            <Col sm={2}>
              <Nav.Item onClick={() => setChosenTab("create-product")}>
                <Nav.Link eventKey="create-product">Create Product</Nav.Link>
              </Nav.Item>
            </Col>
            <Col sm={2}>
              <Nav.Item onClick={() => setChosenTab("product-catalogue")}>
                <Nav.Link eventKey="product-catalogue">
                  Product Catalogue
                </Nav.Link>
              </Nav.Item>
            </Col>
          </Nav>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="orders">
                <div className="mt-5">
                  {chosenTab === "orders" && <AdminOrders />}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="create-product">
                {chosenTab === "create-product" && (
                  <CreateProduct
                    createProduct={createProduct}
                    createProductStatus={createProductStatus}
                    resetCreateProductStatus={resetCreateProductStatus}
                  />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="product-catalogue">
                {chosenTab === "product-catalogue" && <ProductCatalogue />}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    createProductStatus: state.products.createProductStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    createProduct: (payload) => dispatch(createProduct(payload)),
    resetCreateProductStatus: () => dispatch(resetCreateProductStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);

// <div className="container">
//   <div className="row">
//     <CreateProduct
//       createProduct={createProduct}
//       createProductStatus={createProductStatus}
//       resetCreateProductStatus={resetCreateProductStatus}
//     />
//   </div>
// {/* <div className="row">
// <CarouselMilkTea />
// </div> */}
// {/* </div> */}
