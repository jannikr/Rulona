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
import { IconButton } from "@material-ui/core";
import CustomDialog from "./CustomDialog";

interface Props {
  category: Category;
  rules: Rule[];
}

const CategoryDisplay: React.FC<Props> = (props) => {
  const { category, rules } = props;
  const [showShare, setShowShare] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

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
    <>
      <Accordion
        id={`category-${category.id}`}
        onChange={(_, expanded): void => {
          setShowShare(expanded);
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={styles.row}>
            <CategoryStatus status={findLowestStatus()} />
            {category.name}
            {showShare && (
              <IconButton
                className={styles.shareButton}
                onClick={(): void => {
                  setShowDialog(!showDialog);
                }}
              >
                <Share />
              </IconButton>
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
      <CustomDialog
        link={`${window.location.href.split("#")[0]}#category-${category.id}`}
        open={showDialog}
        onClose={(): void => setShowDialog(false)}
      ></CustomDialog>
    </>
  );
};

export default CategoryDisplay;
