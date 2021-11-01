import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, Redirect } from "react-router-dom";
import { removeToken } from "../globals/helpers";
import { withRouter } from "react-router";
import { useState } from "react";

function NavbarComponent(props) {
  const { isUserAdmin, history } = props;
  const [isLogOutClicked, setIsLogOutClicked] = useState(false);

  const handleLogout = () => {
    setIsLogOutClicked(true);
    // removeToken();
    // // history.push("/sign-in");
    // return <Redirect exact to="/sign-in" />;
  };

  if (isLogOutClicked) {
    removeToken();
    return <Redirect exact to="/sign-in" />;
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Grab-A-Tea</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {/* <Nav className="me-auto"> */}
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>

          <Nav.Link as={Link} to="/food-menu">
            Food Menu
          </Nav.Link>

          <Nav.Link as={Link} to="/my-cart">
            My Cart
          </Nav.Link>

          {isUserAdmin && (
            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>
          )}
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          {/* </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(NavbarComponent);
