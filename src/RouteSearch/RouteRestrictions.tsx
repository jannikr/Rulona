import { IconButton, Hidden, Typography } from "@material-ui/core";
import {
  ExpandMore,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Warning,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
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
import RouteShare from "../RoutePage/RouteShare";

type Props = ReturnType<typeof mapStateToProps> & {
  onExpand?: (expanded: boolean) => void;
};

const RouteRestrictions: React.FC<Props> = (props) => {
  const { places, restrictions, onExpand } = props;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    onExpand?.(expanded);
  }, [expanded, onExpand]);

  return (
    <>
      <div className={styles.headingRow}>
        <Hidden mdUp>
          <IconButton onClick={(): void => setExpanded(!expanded)}>
            {expanded ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </IconButton>
        </Hidden>
        <h4 className={styles.heading}>Regeln der Landkreise</h4>
        <Hidden smDown>
          <RouteShare />
        </Hidden>
      </div>
      {restrictions.length === 0 && (
        <Info text="Es gibt keine einschränkenden Regeln für die gewählte Route." />
      )}
      <Hidden smDown={!expanded}>
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
      </Hidden>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { places, restrictions } = state;
  return { places, restrictions };
};

export default connect(mapStateToProps)(RouteRestrictions);
