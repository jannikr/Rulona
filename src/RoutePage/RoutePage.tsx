import { Grid } from "@material-ui/core";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "../LandingPage/LandingPage.module.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { MAPS_API_KEY } from "../constants";

const RoutePage: React.FC = () => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 51,
    lng: 9,
  };

  return (
    <Grid container spacing={0} className={styles.container}>
      <Grid className={styles.sidebar} item md={3}>
        <Sidebar />
      </Grid>
      <Grid item md={9}>
        <LoadScript googleMapsApiKey={MAPS_API_KEY || ""}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={7}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        </LoadScript>
      </Grid>
    </Grid>
  );
};

export default RoutePage;
