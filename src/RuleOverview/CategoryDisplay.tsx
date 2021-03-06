import React, { useCallback, useEffect, useState } from "react";
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
import styles from "./CategoryDisplay.module.css";
import ShareDialog from "./ShareDialog";
import { useLocation } from "react-router-dom";
import Highlighter from "./Higlighter";

interface Props {
  category: Category;
  rules: Rule[];
  searchWord?: string;
}

const CategoryDisplay: React.FC<Props> = (props) => {
  const { category, rules, searchWord } = props;
  const [expand, setExpand] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    const anchorId = location.hash.split("#category-")[1];
    if (anchorId === `${category.id}`) {
      const anchorEl = document.getElementById("category-" + anchorId);
      if (anchorEl) {
        setExpand(true);
        anchorEl.scrollIntoView();
      }
    }
  }, [category, location]);

  return (
    <>
      <Accordion
        id={`category-${category.id}`}
        onChange={(e, expanded): void => {
          setExpand(expanded);
        }}
        expanded={expand}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={styles.row}>
            <CategoryStatus status={findLowestStatus()} />
            <span className={styles.categoryName}>
              <Highlighter text={category.name} searchWord={searchWord} />
            </span>
            {expand && (
              <ShareDialog
                path={`${window.location.pathname}#category-${category.id}`}
              />
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            {rules.map((rule) => (
              <RuleDisplay key={rule.id} rule={rule} searchWord={searchWord} />
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CategoryDisplay;
