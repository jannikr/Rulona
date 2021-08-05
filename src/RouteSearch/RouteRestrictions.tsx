import { Typography } from "@material-ui/core";
import { ExpandMore, Warning } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import RuleDisplay from "../RuleOverview/RuleDisplay";
import { AppState } from "../store/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../MaterialUIOverrides";
import classnames from "classnames";
import styles from "./RouteRestrictions.module.css";

type Props = ReturnType<typeof mapStateToProps>;

const RouteRestrictions: React.FC<Props> = (props) => {
  const { places, restrictions } = props;
  return (
    <>
      <h4>Regeln der Landkreise</h4>
      {restrictions.length === 0 && (
        <span>Es gibt keine einschränkenden Regeln für die Strecke.</span>
      )}
      {restrictions.map((restriction) => (
        <Accordion key={restriction.placeId} className={styles.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            className={styles.summary}
          >
            <Warning
              className={classnames(styles.iconSpacing, styles.warning)}
            />
            {places.find((place) => place.id === restriction.placeId)?.name}
          </AccordionSummary>
          <AccordionDetails className={styles.detail}>
            <Typography>
              {restriction.denyingRules.map((rule) => (
                <RuleDisplay key={rule.id} rule={rule} />
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { places, restrictions } = state;
  return { places, restrictions };
};

export default connect(mapStateToProps)(RouteRestrictions);
