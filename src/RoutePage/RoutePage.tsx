import { Grid, Hidden } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "../LandingPage/LandingPage.module.css";
import {
  AppDispatch,
  AppState,
  SetDestinationAction,
  SetOriginAction,
  SetRouteAction,
} from "../store/types";
import { connect } from "react-redux";
import Map from "./Map";
import { useParams } from "react-router-dom";
import { resetRoute, setDestination, setOrigin } from "../store/actions";
import { Place } from "../types";

interface RouteProps {
  origin: string;
  destination: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const RoutePage: React.FC<Props> = (props) => {
  const { route, places, resetRoute, setOrigin, setDestination } = props;
  const params = useParams<RouteProps>();

  const getPlace = useCallback(
    (id: string) => places.find((place) => place.id === id),
    [places]
  );

  useEffect(() => {
    const { origin, destination } = params;
    resetRoute();
    setOrigin(getPlace(origin));
    setDestination(getPlace(destination));
  }, [params, getPlace, setOrigin, setDestination, resetRoute]);

  return (
    <Grid container spacing={0} className={styles.container}>
      <Hidden smDown={!!route}>
        <Grid className={styles.sidebar} item xs={12} md={3}>
          <Sidebar />
        </Grid>
      </Hidden>
      <Hidden smDown={!route}>
        <Grid item xs={12} md={9}>
          <Map />
        </Grid>
      </Hidden>
    </Grid>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { route, places, origin, destination } = state;
  return { route, places, origin, destination };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  resetRoute: (): SetRouteAction => dispatch(resetRoute()),
  setOrigin: (origin: Place | undefined): SetOriginAction =>
    dispatch(setOrigin(origin)),
  setDestination: (destination: Place | undefined): SetDestinationAction =>
    dispatch(setDestination(destination)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutePage);
