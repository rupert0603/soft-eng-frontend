import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getProducts,
  updateProduct,
  resetUpdateProductStatus,
  deleteProduct,
  resetDeleteProductStatus,
} from "../actions/productActions";
import UpdateProductModal from "./UpdateProductModal";
import ActionModal from "./ActionModal";

function ProductCatalogue(props) {
  const {
    products,
    getProducts,
    updateProductStatus,
    updateProduct,
    resetUpdateProductStatus,
    deleteProduct,
    deleteProductStatus,
    resetDeleteProductStatus,
  } = props;

  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleShowModal = (productItem) => {
    setModalShow(true);
    setSelectedProduct(productItem);
    // setSize("medium");
  };

  const handleCloseModal = () => {
    // setModalShow(false);
    // setSelectedProduct(null);
    // setSize(null);
    // setAddOns([]);
    resetItems();
  };

  const resetItems = useCallback(() => {
    setModalShow(false);
    setSelectedProduct(null);
    // setVariant(null);
    // setAddOns([]);
  });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mt-5 product-catalogue">
      {products && products.length === 0 && <h2>No items here</h2>}
      {products && products.length > 0 && (
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
                  <Row>
                    <Col xs={2}>
                      <Button
                        variant="primary"
                        onClick={() => {
                          handleShowModal(product);
                        }}
                        className="update-product-btn"
                      >
                        Update
                      </Button>
                    </Col>
                    <Col xs={1}></Col>
                    <Col xs={2}>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setDeleteModalShow(true);
                          setProductToDelete(product);
                        }}
                        // className="mx-4"
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
              // </Col>
            );
          })}
        </Row>
      )}
      {selectedProduct && (
        <UpdateProductModal
          show={modalShow}
          onHide={() => {
            handleCloseModal();
          }}
          selectedProduct={selectedProduct}
          // submitHandler={submitHandler}
          updateProductStatus={updateProductStatus}
          updateProduct={updateProduct}
        />
      )}
      <ActionModal
        show={updateProductStatus.isSuccess}
        onHide={() => {
          resetUpdateProductStatus();
          handleCloseModal();
        }}
        message={"Product successfully updated"}
      />

      <Modal
        show={deleteModalShow}
        onHide={() => {
          setDeleteModalShow(false);
        }}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setDeleteModalShow(false);
            }}
            disabled={deleteProductStatus.isLoading}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteProduct({
                ...productToDelete,
              });
            }}
            disabled={deleteProductStatus.isLoading}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <ActionModal
        show={deleteProductStatus.isSuccess}
        onHide={() => {
          resetDeleteProductStatus();
          setDeleteModalShow(false);
        }}
        message={"Product successfully deleted"}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    updateProductStatus: state.products.updateProductStatus,
    deleteProductStatus: state.products.deleteProductStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getProducts: () => dispatch(getProducts()),
    updateProduct: (payload) => dispatch(updateProduct(payload)),
    resetUpdateProductStatus: () => dispatch(resetUpdateProductStatus()),
    deleteProduct: (payload) => dispatch(deleteProduct(payload)),
    resetDeleteProductStatus: () => dispatch(resetDeleteProductStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalogue);
