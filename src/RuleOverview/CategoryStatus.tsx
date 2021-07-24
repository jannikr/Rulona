import { Lens } from "@material-ui/icons";
import classnames from "classnames";
import React from "react";
import { RuleStatus } from "../types";
import styles from "./CategoryStatus.module.css";

interface Props {
  status: RuleStatus;
}

const CategoryStatus: React.FC<Props> = (props) => {
  const { status } = props;
  let color = "";
  switch (status) {
    case 0: {
      color = styles.redLens;
      break;
    }
    case 1: {
      color = styles.yellowLens;
      break;
    }
    case 2: {
      color = styles.greenLens;
      break;
    }
    case -1: {
      color = styles.grayLens;
      break;
    }
  }
  return (
    <Lens className={classnames(styles.spacing, color)} fontSize="small" />
  );
};

export default CategoryStatus;
