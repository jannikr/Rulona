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
        <>
          <Lens fontSize="small" style={{ color: "red" }} />
        </>
      );
    }
    case 1: {
      return (
        <>
          <Lens fontSize="small" style={{ color: "yellow" }} />
        </>
      );
    }
    case 2: {
      return (
        <>
          <Lens fontSize="small" style={{ color: "green" }} />
        </>
      );
    }
    case -1: {
      return (
        <>
          <Lens fontSize="small" color="action" />
        </>
      );
    }
    default:
      return <></>;
  }
};

export default CategoryStatus;
