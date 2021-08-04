import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage/LandingPage";
import RoutePage from "./RoutePage/RoutePage";

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/rules" />
        <Route
          exact
          path={[
            "/rules",
            "/rules/:placeId",
            "/rules/:placeId/category/:categoryId",
          ]}
          component={LandingPage}
        />
        <Route
          exact
          path={["/route", "/route/:start/:end"]}
          component={RoutePage}
        />
      </Switch>
    </Router>
  );
};

export default App;
