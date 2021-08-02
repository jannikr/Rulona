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

  const selectFromPlaces = useCallback(
    (location: string): boolean => {
      for (const place of places) {
        if (place.name === location) {
          selectPlace(place);
          return true;
        }
      }
      return false;
    },
    [places, selectPlace]
  );

  const getLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const reverseResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const reverseJson = await reverseResponse.json();
      const osmId = reverseJson.osm_id;
      const osmType = reverseJson.osm_type[0].toUpperCase();
      const state = reverseJson.address.state;
      const detailsResponse = await fetch(
        `https://nominatim.openstreetmap.org/details.php?osmtype=${osmType}&osmid=${osmId}&addressdetails=1&format=json`
      );
      const details = await detailsResponse.json();
      let location = state;
      for (const item of details.address) {
        if (item.admin_level === 6) {
          location = item.localname;
          break;
        }
      }
      selectFromPlaces(location) ||
        selectFromPlaces(state) ||
        selectFromPlaces("Germany");
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
