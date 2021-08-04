import { Grid } from "@material-ui/core";
import React from "react";
import RuleOverview from "../RuleOverview/RuleOverview";
import Sidebar from "../Sidebar/Sidebar";
import Hidden from "@material-ui/core/Hidden";
import styles from "./LandingPage.module.css";
import { connect } from "react-redux";
import { AppDispatch, AppState, SelectPlaceAction } from "../store/types";
import { Place } from "../types";
import { RouteComponentProps } from "react-router-dom";
import { selectPlace } from "../store/actions";

interface RouteProps {
  placeId?: string;
  categoryId?: string;
}

type Props = RouteComponentProps<RouteProps> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const LandingPage: React.FC<Props> = (props) => {
  const { match, places, selectPlace } = props;
  const { placeId } = match.params;
  const selectedPlace = placeId
    ? places.find((place) => place.id === placeId)
    : undefined;

  if (selectedPlace) selectPlace(selectedPlace);

  if (!selectedPlace)
    return (
      <Grid container spacing={0} className={styles.container}>
        <Grid className={styles.sidebar} item xs={12} md={3}>
          <Sidebar />
        </Grid>
        <Hidden smDown>
          <Grid item md={9}>
            <RuleOverview />
          </Grid>
        </Hidden>
      </Grid>
    );
  return (
    <Grid container spacing={0} className={styles.container}>
      <Hidden smDown>
        <Grid className={styles.sidebar} item xs={12} md={3}>
          <Sidebar />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9}>
        <RuleOverview />
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { places } = state;
  return { places };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  selectPlace: (place: Place): SelectPlaceAction =>
    dispatch(selectPlace(place)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
