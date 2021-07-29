import React, { useCallback } from "react";
import { Category, Rule, RuleStatus } from "../types";
import RuleDisplay from "./RuleDisplay";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import CategoryStatus from "./CategoryStatus";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import styles from "./RuleOverview.module.css";
import Highlighter from "./Higlighter";

interface Props {
  category: Category;
  rules: Rule[];
  searchWord: string;
}

const Accordion = withStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: 0,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, .03)",
  },
}))(MuiAccordionDetails);

const CategoryDisplay: React.FC<Props> = (props) => {
  const { category, rules, searchWord } = props;

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
