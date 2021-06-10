import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React from "react";
import { Place } from "../types";

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
      return <ArrowUpward />;
    }
    case -1: {
      return <ArrowDownward />;
    }
    default:
      return <></>;
  }
};

export default PlaceTrend;
