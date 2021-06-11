import { Grid } from "@material-ui/core";
import React from "react";
import RuleOverview from "../RuleOverview/RuleOverview";
import Sidebar from "../Sidebar/Sidebar";

const LandingPage: React.FC = (): JSX.Element => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <RuleOverview />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
