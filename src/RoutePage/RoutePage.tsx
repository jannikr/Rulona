import { Grid, Hidden } from "@material-ui/core";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "../LandingPage/LandingPage.module.css";
import { AppState } from "../store/types";
import { connect } from "react-redux";
import Map from "./Map";

type Props = ReturnType<typeof mapStateToProps>;

const RoutePage: React.FC<Props> = (props) => {
  const { route } = props;
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
  const { route } = state;
  return { route };
};

export default connect(mapStateToProps)(RoutePage);
