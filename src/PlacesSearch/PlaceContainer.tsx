import React from "react";
import { connect } from "react-redux";
import { selectPlace } from "../store/actions";
import { AppDispatch, SelectPlaceAction } from "../store/types";
import { Place } from "../types";
import PlaceTrend from "./PlaceTrend";
import styles from "./PlacesSearch.module.css";
import FavouritePlace from "../Button/FavouritePlace";

type Props = ReturnType<typeof mapDispatchToProps> & {
  onClick?: (place: Place) => void;
  place: Place;
};

const PlaceContainer: React.FC<Props> = (props) => {
  const { place, selectPlace, onClick } = props;

  return (
    <div className={styles.row}>
      <span>
        <PlaceTrend trend={place.trend} />
      </span>
      <span
        onClick={(): void => {
          onClick && onClick(place);
          selectPlace(place);
        }}
      >
        {place.name}
      </span>
      <span className={styles.favoriteButton}>
        <FavouritePlace place={place} />
      </span>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  selectPlace: (place: Place): SelectPlaceAction =>
    dispatch(selectPlace(place)),
});

export default connect(null, mapDispatchToProps)(PlaceContainer);
