import { useState } from "react";
import moment from "moment";
import Tab from "react-bootstrap/Tab";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import MyOrders from "./MyOrders";
import MyProfile from "./MyProfile";

function createGreeting() {
  //   const morningStart = "0:00";
  const afternoonStart = "12:00";
  const eveningStart = "18:00";
  const nightStart = "21:00";

  const currentDate = moment();

  if (currentDate.isBefore(moment(afternoonStart, "hh:mm"))) {
    return "Good Morning ☀";
  } else if (currentDate.isBefore(moment(eveningStart, "hh:mm"))) {
    return "Good Afternoon ☀";
  } else if (currentDate.isBefore(moment(nightStart, "hh:mm"))) {
    return "Good Evening 🌙";
  } else {
    return "Good Night 🌙";
  }
}

function Profile(props) {
  //   const [key, setKey] = useState("home");
  const bobaRewardsStatus = 80;

  return (
    <div className="w-100">
      <Tab.Container defaultActiveKey="my-orders">
        <Row>
          <Nav variant="tabs">
            <Col sm={6}>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  {createGreeting()}
                </Nav.Link>
              </Nav.Item>
            </Col>
            <Col sm={2}>
              {/* <Nav.Item variant="pills">
                <Nav.Link eventKey="boba-rewards">Boba Rewards</Nav.Link>
              </Nav.Item> */}
            </Col>
            <Col sm={2}>
              <Nav.Item>
                <Nav.Link eventKey="my-orders">Orders</Nav.Link>
              </Nav.Item>
            </Col>
            <Col sm={2}>
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile</Nav.Link>
              </Nav.Item>
            </Col>
          </Nav>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              {/* <Tab.Pane eventKey="boba-rewards">
                Boba Rewards
                <br />
                <ProgressBar
                  now={bobaRewardsStatus}
                  label={`${bobaRewardsStatus}/100 🌟`}
                />
              </Tab.Pane> */}
              <Tab.Pane eventKey="my-orders">
                <MyOrders />
              </Tab.Pane>
              <Tab.Pane eventKey="profile">
                <MyProfile />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Profile;
