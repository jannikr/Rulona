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
  const [district, setDistrict] = useState("");

  const getLocation = useCallback((): void => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      console.log(lat, lng);
    });
    fetch(
      "https://nominatim.openstreetmap.org/reverse?lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setDistrict(responseJson.address.state);
        console.log(district);
      });
    for (const place of places) {
      if (place.name === district) {
        console.log("Matched");
        selectPlace(place);
      }
    }
  }, [lat, lng, district, places]);

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
