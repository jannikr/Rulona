import React, { useCallback } from "react";
import { Category, Rule, RuleStatus } from "../types";
import RuleDisplay from "./RuleDisplay";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import CategoryStatus from "./CategoryStatus";
import FavouriteCategory from "../Button/FavouriteCategory";
import styles from "./RuleOverview.module.css";
import Highlighter from "./Higlighter";

interface Props {
  category: Category;
  rules: Rule[];
  toggleFavourite: boolean;
  searchWord: string;
}

const CategoryDisplay: React.FC<Props> = (props) => {
  const { category, rules, toggleFavourite, searchWord } = props;

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
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={styles.row}>
          <CategoryStatus status={findLowestStatus()} />
          <Highlighter text={category.name} searchWord={searchWord} />
          {toggleFavourite && <FavouriteCategory category={category} />}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {rules.map((rule) => (
            <RuleDisplay key={rule.id} rule={rule} searchWord={searchWord} />
          ))}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryDisplay;
