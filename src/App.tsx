import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage/LandingPage";
import RoutePage from "./RoutePage/RoutePage";
import { fetchPlaces } from "./store/actions";
import { AppDispatch, AppState, SetPlacesAction } from "./store/types";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const App: React.FC<Props> = (props): JSX.Element => {
  const { places, fetchPlaces } = props;
  useEffect(() => {
    if (places.length === 0) fetchPlaces();
  }, [places, fetchPlaces]);

  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/rules" />
        <Route
          exact
          path={["/rules", "/rules/:placeId"]}
          component={LandingPage}
        />
        <Route
          exact
          path={["/route", "/route/:start/:destination"]}
          component={RoutePage}
        />
      </Switch>
    </Router>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { places } = state;
  return { places };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchPlaces: (): Promise<SetPlacesAction> => dispatch(fetchPlaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
