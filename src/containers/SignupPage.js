import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignupPage(props) {
  const [registrationData, setRegistrationData] = useState({
    email: "",
    password: "",
    isAgreeToPrivacyPolicy: false,
  });
  const [validated, setValidated] = useState(false);

  const setRegistrationDataState = (key, value) => {
    setRegistrationData({
      ...registrationData,
      [key]: value,
    });
  };

  const onChangeEmail = (e) => {
    setRegistrationDataState("email", e.target.value);
  };

  const onChangePassword = (e) => {
    setRegistrationDataState("password", e.target.value);
  };

  const onChangeCheckbox = (e) => {
    setRegistrationDataState(
      "isAgreeToPrivacyPolicy",
      !registrationData.isAgreeToPrivacyPolicy
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="signup-page d-flex h-100">
      <div className="container align-self-center">
        <div className="row justify-content-md-center">
          <div className="col col-lg-4">
            <h2 className="">Sign Up</h2>
            <Form validated={validated} className="p-3">
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={onChangeEmail}
                  value={registrationData.email}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={onChangePassword}
                  value={registrationData.password}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="terms-policy">
                <Form.Check
                  type="checkbox"
                  label="I agree to the terms of services and privacy policy"
                  onChange={onChangeCheckbox}
                  checked={registrationData.isAgreeToPrivacyPolicy}
                  required
                />
              </Form.Group>

              <Button variant="warning" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
              <br />
              <Form.Text className="text-muted">
                Have an account? <Link to="/sign-in">Sign in</Link>
              </Form.Text>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
