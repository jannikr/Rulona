import { MyLocation } from "@material-ui/icons";
import React, { useCallback, MouseEvent } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  AppState,
  SetDestinationAction,
  SetOriginAction,
} from "../store/types";
import { Place } from "../types";
import styles from "./CurrentLocation.module.css";

type Props = ReturnType<typeof mapStateToProps> & {
  setOrigin?: (origin: Place | undefined) => SetOriginAction;
  setDestination?: (destination: Place | undefined) => SetDestinationAction;
};

const CurrentLocation: React.FC<Props> = (props) => {
  const { places, setOrigin, setDestination } = props;
  const history = useHistory();

  const selectFromPlaces = useCallback(
    (location: string): boolean => {
      for (const place of places) {
        if (place.name === location) {
          if (setOrigin) {
            setOrigin(place);
          } else if (setDestination) {
            setDestination(place);
          } else {
            history.push(`/rules/${place.id}`);
          }
          return true;
        }
      }
      return false;
    },
    [places, history]
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
  }, [selectFromPlaces]);

  const onMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
  };

  return (
    <div
      className={styles.lineSpacing}
      onMouseDown={onMouseDown}
      onClick={getLocation}
    >
      <span className={styles.icon}>
        <MyLocation />
      </span>
      <span className={styles.name}>Aktueller Standort</span>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { places } = state;
  return { places };
};

export default connect(mapStateToProps)(CurrentLocation);
