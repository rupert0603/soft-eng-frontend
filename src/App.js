import "./css/main.css";
import { Switch, Route } from "react-router-dom";
import SignupPage from "./containers/SignupPage";
import SigninPage from "./containers/SigninPage";
import HomePage from "./containers/HomePage";
import FoodMenu from "./containers/FoodMenu";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faGlassMartiniAlt } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faGlassMartiniAlt);

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/sign-up">
          <SignupPage />
        </Route>
        <Route exact path="/sign-in">
          <SigninPage />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/food-menu">
          <FoodMenu />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
