import "./css/main.css";
import { Switch, Route } from "react-router-dom";
import SignupPage from "./containers/SignupPage";
import SigninPage from "./containers/SigninPage";
import HomePage from "./containers/HomePage";
import FoodMenu from "./containers/FoodMenu";
// import Cart from "./containers/Cart";
import MyCart from "./containers/MyCart";
import AdminPage from "./containers/AdminPage";
import AuthRoute from "./containers/AuthRoute";
import CheckoutPage from "./containers/CheckoutPage";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faGlassMartiniAlt } from "@fortawesome/free-solid-svg-icons";

import { STRIPE_TEST_PUBLISHABLE_KEY } from "./config/env";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

library.add(fab, faGlassMartiniAlt);
const stripePromise = loadStripe(STRIPE_TEST_PUBLISHABLE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <Switch>
          <AuthRoute
            exact
            path="/sign-up"
            component={SignupPage}
            type="public"
          />
          <AuthRoute
            exact
            path="/sign-in"
            component={SigninPage}
            type="public"
          />
          {/* <Route exact path="/home" component={HomePage} /> */}
          <AuthRoute exact path="/home" component={HomePage} type="private" />
          <AuthRoute
            exact
            path="/food-menu"
            component={FoodMenu}
            type="private"
          />
          <AuthRoute exact path="/my-cart" component={MyCart} type="private" />
          <AuthRoute
            exact
            path="/checkout"
            component={CheckoutPage}
            type="private"
          />
          <AuthRoute
            exact
            path="/admin"
            component={AdminPage}
            type="private"
            admin
          />
          <AuthRoute exact path="/" />
          <AuthRoute component={HomePage} />
        </Switch>
      </div>
    </Elements>
  );
}

export default App;
