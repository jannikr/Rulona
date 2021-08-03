import { Grid } from "@material-ui/core";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "../LandingPage/LandingPage.module.css";

const RoutePage: React.FC = () => {
  return (
    <Grid container spacing={0} className={styles.container}>
      <Grid className={styles.sidebar} item md={3}>
        <Sidebar />
      </Grid>
      <Grid item md={9}></Grid>
    </Grid>
  );
};

export default RoutePage;
