import React from "react";
import { Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { selectPlace } from "../store/actions";
import { AppDispatch, SelectPlaceAction } from "../store/types";
import { Place } from "../types";
import PlaceTrend from "./PlaceTrend";
import styles from "./PlaceContainer.module.css";

type Props = ReturnType<typeof mapDispatchToProps> & {
  place: Place;
};

const PlaceContainer: React.FC<Props> = (props) => {
  const { place, selectPlace } = props;

  return (
    <div>
      <div
        className={styles.lineSpacing}
        onClick={(): void => {
          selectPlace(place);
        }}
      >
        <span
          style={{
            verticalAlign: "middle",
          }}
        >
          <PlaceTrend trend={place.trend} />
        </span>
        <span className={styles.eventStyles}>{place.name}</span>
      </div>
      <Divider />
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  selectPlace: (place: Place): SelectPlaceAction =>
    dispatch(selectPlace(place)),
});

export default connect(null, mapDispatchToProps)(PlaceContainer);
