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
import Info from "../Info/Info";
import { Place } from "../types";
import ShareDialog from "../RuleOverview/ShareDialog";

type Props = ReturnType<typeof mapStateToProps> & {
  startPlace?: Place;
  destinationPlace?: Place;
};

const RouteRestrictions: React.FC<Props> = (props) => {
  const { places, restrictions, startPlace, destinationPlace } = props;

  return (
    <>
      <div className={styles.headingRow}>
        <h4>Regeln der Landkreise</h4>
        <ShareDialog path={`route/${startPlace?.id}/${destinationPlace?.id}`} />
      </div>
      {restrictions.length === 0 && (
        <Info text="Es gibt keine einschränkenden Regeln für die gewählte Route." />
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
            <Typography component="div">
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
