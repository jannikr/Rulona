import { Grid } from "@material-ui/core";
import React from "react";
import RuleOverview from "../RuleOverview/RuleOverview";
import Sidebar from "../Sidebar/Sidebar";
import Hidden from "@material-ui/core/Hidden";
import styles from "./LandingPage.module.css";

const LandingPage: React.FC = (): JSX.Element => {
  return (
    <Grid container spacing={0} className={styles.container}>
      <Grid className={styles.sidebar} item xs={12} md={3}>
        <Sidebar />
      </Grid>
      <Hidden smDown>
        <Grid item xs={9}>
          <RuleOverview />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default LandingPage;
