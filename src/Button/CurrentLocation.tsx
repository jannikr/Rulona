import { MyLocation } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { selectPlace } from "../store/actions";
import { AppDispatch, SelectPlaceAction } from "../store/types";
import { Place } from "../types";
import styles from "./CurrentLocation.module.css";

type Props = ReturnType<typeof mapDispatchToProps> & {
  places: Place[];
};

const CurrentLocation: React.FC<Props> = (props) => {
  const { places, selectPlace } = props;

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [district, setDistrict] = useState("");

  const getLocation = useCallback((): void => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(lat, lng);
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
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
        console.log(place);
        selectPlace(place);
      }
    }
  }, [lat, lng, district, places, selectPlace]);

  return (
    <div className={styles.lineSpacing} onClick={getLocation}>
      <span className={styles.icon}>
        <MyLocation />
      </span>
      <span className={styles.name}>Aktueller Standort</span>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  selectPlace: (place: Place): SelectPlaceAction =>
    dispatch(selectPlace(place)),
});

export default connect(null, mapDispatchToProps)(CurrentLocation);
