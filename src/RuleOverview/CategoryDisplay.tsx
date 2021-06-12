import React from "react";
import { Category, Rule } from "../types";
import RuleDisplay from "./RuleDisplay";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

interface Props {
  category: Category;
  rules: Rule[];
}

const CategoryDisplay: React.FC<Props> = (props) => {
  const { category, rules } = props;
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {category.name}
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
