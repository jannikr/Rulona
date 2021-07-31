import { MyLocation } from "@material-ui/icons";
import React, { useState } from "react";
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

  const getLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(lat, lng);
      });
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          lat +
          "," +
          lng +
          "&key=" +
          "keyhere"
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(
            "ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson)
          );
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
  };

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
