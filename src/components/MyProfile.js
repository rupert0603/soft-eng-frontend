import { useEffect } from "react";
import { connect } from "react-redux";
import { getUser } from "../actions/userActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MyProfile(props) {
  const { getUser, userData } = props;

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="mt-3">
      <h2>My Profile</h2>
      {userData && (
        <Container>
          <Row>
            <Col>First Name: {userData.firstName}</Col>
          </Row>
          <Row>
            <Col>Last Name: {userData.lastName}</Col>
          </Row>
          <Row>
            <Col>Email: {userData.email}</Col>
          </Row>
          <Row>
            <Col>Boba Reward Points: {userData.bobaRewards} 🌟</Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getUser: () => dispatch(getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
