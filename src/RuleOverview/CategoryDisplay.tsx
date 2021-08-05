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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@material-ui/core";
import classnames from "classnames";

interface Props {
  category: Category;
  rules: Rule[];
}

const CategoryDisplay: React.FC<Props> = (props) => {
  const { category, rules } = props;
  const [showShare, setShowShare] = useState(false);
  const [showShareDisplay, setShowShareDisplay] = useState(false);

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

  const handleClose = (): void => {
    setShowShareDisplay(false);
  };

  return (
    <>
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
              <IconButton
                className={styles.shareButton}
                onClick={(): void => {
                  setShowShareDisplay(!showShareDisplay);
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
      <div>
        <Dialog
          open={showShareDisplay}
          onClose={handleClose}
          className={styles.dialog}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle>Teile diese Regeln</DialogTitle>
          <DialogContent className={classnames(styles.row, styles.dialogRow)}>
            <TextField
              defaultValue={
                "https://" + "derzeitigerPfad/rules/bundelsand/" + category.id
              }
              onFocus={(event): void => {
                event.target.select();
              }}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Link
                      className={styles.copyButton}
                      onClick={(): void => {
                        navigator.clipboard.writeText("pfad" + category.id);
                      }}
                    >
                      Kopieren
                    </Link>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              fullWidth={true}
              className={styles.linkField}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CategoryDisplay;
