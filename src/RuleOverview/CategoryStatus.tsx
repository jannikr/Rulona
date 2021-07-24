import { Lens } from "@material-ui/icons";
import React from "react";
import { RuleStatus } from "../types";
import styles from "./CategoryStatus.module.css";

interface Props {
  status: RuleStatus;
}

const CategoryStatus: React.FC<Props> = (props) => {
  const { status } = props;
  switch (status) {
    case 0: {
      return (
        <Lens
          className={styles.redLens + " " + styles.spacing}
          fontSize="small"
        />
      );
    }
    case 1: {
      return <Lens className={styles.yellowLens + " " + styles.spacing} />;
    }
    case 2: {
      return (
        <Lens
          className={styles.greenLens + " " + styles.spacing}
          fontSize="small"
        />
      );
    }
    case -1: {
      return (
        <Lens
          className={styles.grayLens + " " + styles.spacing}
          fontSize="small"
        />
      );
    }
    default:
      return <></>;
  }
};

export default CategoryStatus;
