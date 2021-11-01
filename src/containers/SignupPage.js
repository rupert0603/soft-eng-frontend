import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup, resetSignupStatus } from "../actions/userActions";
import { connect } from "react-redux";

function SignupPage(props) {
  const { signupStatus } = props;
  const [registrationData, setRegistrationData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    isAgreeToPrivacyPolicy: false,
  });
  const [validated, setValidated] = useState(false);
  const [isPasswordsSame, setIsPasswordsSame] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const setRegistrationDataState = (key, value) => {
    setRegistrationData({
      ...registrationData,
      [key]: value,
    });
  };

  const onChangeFirstName = (e) => {
    setRegistrationDataState("firstName", e.target.value);
  };

  const onChangeLastName = (e) => {
    setRegistrationDataState("lastName", e.target.value);
  };

  const onChangeEmail = (e) => {
    setRegistrationDataState("email", e.target.value);
  };

  const onChangePassword = (e) => {
    setRegistrationDataState("password", e.target.value);
  };

  const onChangePasswordConfirm = (e) => {
    setRegistrationDataState("passwordConfirm", e.target.value);
  };

  const onChangeCheckbox = (e) => {
    setRegistrationDataState(
      "isAgreeToPrivacyPolicy",
      !registrationData.isAgreeToPrivacyPolicy
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setIsFormValid(false);
    }
    if (form.checkValidity() === true) {
      setIsFormValid(true);
      if (registrationData.passwordConfirm !== registrationData.password) {
        setIsPasswordsSame(false);
      } else {
        setIsPasswordsSame(true);
        let requestSignupData = Object.assign({}, registrationData);
        delete requestSignupData.isAgreeToPrivacyPolicy;

        props.signup(requestSignupData);
      }
    }

    setValidated(true);
  };

  useEffect(() => {
    if (signupStatus.isSuccess) {
      setTimeout(() => {
        props.resetSignupStatus();
      }, 3000);
    }
  }, [signupStatus.isSuccess, signupStatus.isError]);
  // https://saurabhshah23.medium.com/react-navigation-re-render-reset-previous-pages-state-when-going-back-e7561b26b5d7

  return (
    <div className="signup-page d-flex h-90 mt-3">
      <div className="container align-self-center">
        <div className="row justify-content-md-center">
          <div className="col col-lg-4">
            <h2 className="">Sign Up</h2>

            {isFormValid && !isPasswordsSame && (
              <Alert variant="warning">
                Passwords do not match. Please re-enter.
              </Alert>
            )}
            {signupStatus.isSuccess && (
              <Alert variant="success">
                Successfully signed-up! You can now{" "}
                <Link to="/sign-in">sign-in.</Link>
              </Alert>
            )}

            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="p-3"
            >
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  onChange={onChangeFirstName}
                  value={registrationData.firstName}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  onChange={onChangeLastName}
                  value={registrationData.lastName}
                  required
                />
              </Form.Group>

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

              <Form.Group className="mb-3" controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={onChangePasswordConfirm}
                  value={registrationData.passwordConfirm}
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

              <Button
                variant="warning"
                type="submit"
                disabled={signupStatus.isLoading}
              >
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

const mapStateToProps = (state) => {
  return {
    signupStatus: state.signup.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    signup: (payload) => dispatch(signup(payload)),
    resetSignupStatus: () => dispatch(resetSignupStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
