import React from "react";
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

interface Props {
  category: Category;
  rules: Rule[];
}

const findLowestStatus = (rules: Rule[]): RuleStatus => {
  let lowest: RuleStatus = RuleStatus.Unknown;
  rules.forEach((rule) => {
    if (rule.status !== RuleStatus.Unknown && lowest === RuleStatus.Unknown) {
      lowest = rule.status;
    } else if (rule.status !== RuleStatus.Unknown && rule.status < lowest) {
      lowest = rule.status;
    }
  });
  return lowest;
};

const CategoryDisplay: React.FC<Props> = (props) => {
  const { category, rules } = props;
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span>
            <CategoryStatus status={findLowestStatus(rules)} />
          </span>
          <span>{category.name}</span>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {rules.map((rule) => (
              <RuleDisplay key={rule.id} rule={rule} />
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CategoryDisplay;
