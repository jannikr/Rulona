import { Lens } from "@material-ui/icons";
import React from "react";
import { RuleStatus } from "../types";

interface Props {
  status: RuleStatus;
}

const CategoryStatus: React.FC<Props> = (props) => {
  const { status } = props;
  switch (status) {
    case 0: {
      return (
        <Lens
          fontSize="small"
          style={{ color: "#B00020", marginRight: "0.8rem", fontSize: "1rem" }}
        />
      );
    }
    case 1: {
      return (
        <Lens
          style={{ color: "yellow", marginRight: "0.8rem", fontSize: "1rem" }}
        />
      );
    }
    case 2: {
      return (
        <Lens
          fontSize="small"
          style={{ color: "#00A907", marginRight: "0.8rem", fontSize: "1rem" }}
        />
      );
    }
    case -1: {
      return (
        <Lens
          fontSize="small"
          style={{ color: "gray", marginRight: "0.8rem", fontSize: "1rem" }}
        />
      );
    }
    default:
      return <></>;
  }
};

export default CategoryStatus;
