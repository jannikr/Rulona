import React from "react";
import { PlaceInfo } from "../types";
import styles from "./PlaceInfoDisplay.module.css";
import Box from "@material-ui/core/Box";

interface Props {
  placeInfo?: PlaceInfo;
}

const PlaceInfoDisplay: React.FC<Props> = (props) => {
  const { placeInfo } = props;
  if (!placeInfo) return <></>;
  return (
    <>
      <p>
        7-Tage-Inzidenz:{" "}
        <span className={styles.number}>{placeInfo.incidence}</span>
      </p>
      <Box mt={3}>
        <p>
          {`Die offiziellen Regeln für ${placeInfo.name} lassen sich `}
          <a className={styles.link} href={placeInfo.website}>
            hier
          </a>
          {` einsehen.`}
        </p>
      </Box>
    </>
  );
};

export default PlaceInfoDisplay;
