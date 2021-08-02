import { MyLocation } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { selectPlace } from "../store/actions";
import { Place } from "../types";
import styles from "./CurrentLocation.module.css";

interface Props {
  places: Place[];
}

const CurrentLocation: React.FC<Props> = (props) => {
  const { places } = props;

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const getLocation = useCallback((): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(lat, lng);
      });
      fetch(
        "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=" +
          "Y5-iRL7n3zZOZozpw0pvZ4WVyc-f9Sw4qrhzH5e0ZTk" +
          "&mode=retrieveAddresses&prox=" +
          lat +
          "," +
          lng
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (
            responseJson &&
            responseJson.Response &&
            responseJson.Response.View &&
            responseJson.Response.View[0] &&
            responseJson.Response.View[0].Result &&
            responseJson.Response.View[0].Result[0]
          ) {
            console.log(
              responseJson.Response.View[0].Result[0].Location.Address
                .PostalCode
            );
          }
        });
      const mockZip = "BRB";
      for (const place of places) {
        console.log(place.id);
        if (place.id === mockZip) {
          console.log("test");
          selectPlace(place);
        }
      }
    }
  }, [lat, lng, places]);

  return (
    <div className={styles.lineSpacing} onClick={getLocation}>
      <span className={styles.icon}>
        <MyLocation />
      </span>
      <span className={styles.name}>Aktueller Standort</span>
    </div>
  );
};

export default CurrentLocation;
