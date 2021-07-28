import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import RuleOverview from "../RuleOverview/RuleOverview";
import Sidebar from "../Sidebar/Sidebar";
import Hidden from "@material-ui/core/Hidden";
import styles from "./LandingPage.module.css";
import { connect } from "react-redux";
import { AppState } from "../store/types";
import { Place } from "../types";

type Props = ReturnType<typeof mapStateToProps> & {
  place: Place;
};

const LandingPage: React.FC<Props> = (props) => {
  const { selectedPlace } = props;

  useEffect(() => {
    if (!selectedPlace) return;
  }, [selectedPlace]);

  if (!selectedPlace)
    return (
      <div className={styles.flex}>
        <Grid container spacing={0}>
          <Grid className={styles.sidebar} item xs={12} md={3}>
            <Sidebar />
          </Grid>
          <Hidden smDown>
            <Grid item xs={9}>
              <RuleOverview />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  return (
    <div className={styles.flex}>
      <Grid container spacing={0}>
        <Hidden smDown>
          <Grid className={styles.sidebar} item xs={12} md={3}>
            <Sidebar />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={9}>
          <RuleOverview />
        </Grid>
      </Grid>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { selectedPlace } = state;
  return { selectedPlace };
};

export default connect(mapStateToProps)(LandingPage);
