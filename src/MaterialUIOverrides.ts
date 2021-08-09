import { withStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { rootStyles } from "./utils";
import { ColorVariables } from "./types";

export const DialogContent = withStyles({
  root: {
    padding: 0,
    "&:first-child": {
      padding: 0,
    },
  },
})(MuiDialogContent);

export const Accordion = withStyles({
  root: {
    boxShadow: "none",
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: 0,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    margin: 0,
    "&$expanded": {
      margin: 0,
    },
  },
  expanded: {},
})(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: rootStyles.getPropertyValue(ColorVariables.BgGrey),
  },
}))(MuiAccordionDetails);
