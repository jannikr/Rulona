import React, { MouseEvent } from "react";
import { Place } from "../types";
import PlaceTrend from "./PlaceTrend";
import styles from "./PlaceContainer.module.css";
import commonStyles from "../common.module.css";
import FavouritePlace from "../Button/FavouritePlace";
import classnames from "classnames";

interface Props {
  onClick?: (place: Place) => void;
  place: Place;
  className?: string;
}

const PlaceContainer: React.FC<Props> = (props) => {
  const { place, onClick, className } = props;

  const onMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
  };

  return (
    <div
      className={classnames(styles.clickable, className)}
      onMouseDown={onMouseDown}
      onClick={(): void => {
        onClick && onClick(place);
      }}
    >
      <div className={classnames(commonStyles.row, styles.lineSpacing)}>
        <span className={styles.placeInfo}>
          <PlaceTrend trend={place.trend} />
        </span>
        <span className={styles.name}>{place.name}</span>
        <span className={styles.icon}>
          <FavouritePlace place={place} />
        </span>
      </div>
    </div>
  );
};

export default PlaceContainer;
