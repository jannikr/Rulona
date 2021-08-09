import { CallMade, CallReceived } from "@material-ui/icons";
import classnames from "classnames";
import React from "react";
import { Place } from "../types";
import styles from "./PlaceTrend.module.css";

interface Props {
  trend: Place["trend"];
}

const PlaceTrend: React.FC<Props> = (props) => {
  const { trend } = props;
  switch (trend) {
    case 0: {
      return <CallMade className={classnames(styles.arrow, styles.neutral)} />;
    }
    case 1: {
      return <CallMade className={classnames(styles.arrow, styles.up)} />;
    }
    case -1: {
      return <CallReceived className={classnames(styles.arrow, styles.down)} />;
    }
    default:
      return <></>;
  }
};

export default PlaceTrend;
