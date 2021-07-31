import React from "react";
import { PlaceInfo } from "../types";
import styles from "./PlaceInfoDisplay.module.css";
import Box from "@material-ui/core/Box";
import PlaceTrend from "../PlacesSearch/PlaceTrend";

interface Props {
  placeInfo?: PlaceInfo;
}

const PlaceInfoDisplay: React.FC<Props> = (props) => {
  const { placeInfo } = props;
  if (!placeInfo) return <></>;
  return (
    <>
      <div className={styles.row}>
        <span className={styles.trend}>
          <PlaceTrend trend={placeInfo.trend} />
        </span>
        <span className={styles.label}>7-Tage-Inzidenz: </span>
        <span className={styles.number}>{placeInfo.incidence}</span>
      </div>
      <Box mt={3}>
        <p>
          {`Die offiziellen Regeln für ${placeInfo.name} lassen sich `}
          <a className={styles.website} href={placeInfo.website}>
            hier
          </a>
          {` einsehen.`}
        </p>
      </Box>
    </>
  );
};

export default PlaceInfoDisplay;
