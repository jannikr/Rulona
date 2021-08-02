import { MyLocation } from "@material-ui/icons";
import React, { useCallback } from "react";
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

  const getLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const json = await response.json();
      console.log(json);
      const district = json.address.state;
      for (const place of places) {
        if (place.name === district) {
          selectPlace(place);
          break;
        }
      }
    });
  }, [places, selectPlace]);

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
