import { Lens } from "@material-ui/icons";
import classnames from "classnames";
import React from "react";
import { RuleStatus } from "../types";
import styles from "./CategoryStatus.module.css";
import commonStyles from "../common.module.css";

interface Props {
  status: RuleStatus;
}

const CategoryStatus: React.FC<Props> = (props) => {
  const { status } = props;
  let color = "";
  switch (status) {
    case 0: {
      color = commonStyles.red;
      break;
    }
    case 1: {
      color = commonStyles.yellow;
      break;
    }
    case 2: {
      color = commonStyles.green;
      break;
    }
    case -1: {
      color = commonStyles.grey;
      break;
    }
  }
  return <Lens className={classnames(styles.lens, color)} />;
};

export default CategoryStatus;
