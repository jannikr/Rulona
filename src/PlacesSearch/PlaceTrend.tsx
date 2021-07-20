import { CallMade, CallReceived } from "@material-ui/icons";
import React from "react";
import { Place } from "../types";
import styles from "./PlaceContainer.module.css";

interface Props {
  trend: Place["trend"];
}

const PlaceTrend: React.FC<Props> = (props) => {
  const { trend } = props;
  switch (trend) {
    case 0: {
      // TODO
      return <></>;
    }
    case 1: {
      return <CallMade className={styles.arrowUp} />;
    }
    case -1: {
      return <CallReceived className={styles.arrowDown} />;
    }
    default:
      return <></>;
  }
};

export default PlaceTrend;
