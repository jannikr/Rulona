import React, { MouseEvent } from "react";
import { Divider } from "@material-ui/core";
import { Place } from "../types";
import PlaceTrend from "./PlaceTrend";
import styles from "./PlaceContainer.module.css";
import FavouritePlace from "../Button/FavouritePlace";

interface Props {
  onClick?: (place: Place) => void;
  place: Place;
}

const PlaceContainer: React.FC<Props> = (props) => {
  const { place, onClick } = props;

  const onMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className={styles.lineSpacing}
        onMouseDown={onMouseDown}
        onClick={(): void => {
          onClick && onClick(place);
        }}
      >
        <span className={styles.placeInfo}>
          <PlaceTrend trend={place.trend} />
        </span>
        <span className={styles.name}>{place.name}</span>
        <span className={styles.icon}>
          <FavouritePlace place={place} />
        </span>
      </div>
      <Divider />
    </div>
  );
};

export default PlaceContainer;
