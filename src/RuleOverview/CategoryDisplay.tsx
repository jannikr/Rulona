import React, { useCallback, useState } from "react";
import { Category, Rule, RuleStatus } from "../types";
import RuleDisplay from "./RuleDisplay";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import CategoryStatus from "./CategoryStatus";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "../MaterialUIOverrides";
import styles from "./RuleOverview.module.css";
import { Share } from "@material-ui/icons";

interface Props {
  category: Category;
  rules: Rule[];
}

const CategoryDisplay: React.FC<Props> = (props) => {
  const { category, rules } = props;
  const [showShare, setShowShare] = useState(false);

  const findLowestStatus = useCallback((): RuleStatus => {
    let lowest: RuleStatus = RuleStatus.Unknown;
    for (const rule of rules) {
      if (rule.status === RuleStatus.Unknown) continue;
      if (lowest === RuleStatus.Unknown || rule.status < lowest) {
        lowest = rule.status;
      }
    }
    return lowest;
  }, [rules]);

  return (
    <Accordion
      onChange={(): void => {
        setShowShare(!showShare);
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={styles.row}>
          <CategoryStatus status={findLowestStatus()} />
          {category.name}
          {showShare && (
            <Share
              className={styles.shareButton}
              onClick={(): void => {
                console.log(category.name);
              }}
            />
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {rules.map((rule) => (
            <RuleDisplay key={rule.id} rule={rule} />
          ))}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryDisplay;
