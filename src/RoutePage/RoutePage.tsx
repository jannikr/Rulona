import { Hidden } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./RoutePage.module.css";
import {
  AppDispatch,
  AppState,
  SetDestinationAction,
  SetOriginAction,
  SetRouteAction,
} from "../store/types";
import { connect } from "react-redux";
import Map from "./Map";
import RouteRestrictions from "../RouteSearch/RouteRestrictions";
import classnames from "classnames";
import ContentHeader from "../ContentHeader/ContentHeader";
import RouteShare from "./RouteShare";
import { useParams } from "react-router-dom";
import { resetRoute, setDestination, setOrigin } from "../store/actions";
import { Place } from "../types";
import Page from "../Page/Page";

interface RouteProps {
  origin: string;
  destination: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const RoutePage: React.FC<Props> = (props) => {
  const {
    route,
    places,
    origin,
    destination,
    resetRoute,
    setOrigin,
    setDestination,
  } = props;
  const params = useParams<RouteProps>();
  const [restrictionsExpanded, setRestrictionsExpanded] = useState(false);

  const getPlace = useCallback(
    (id: string) => places.find((place) => place.id === id),
    [places]
  );

  useEffect(() => {
    const { origin, destination } = params;
    resetRoute();
    setOrigin(getPlace(origin));
    setDestination(getPlace(destination));
  }, [params, getPlace, setOrigin, setDestination, resetRoute]);

  return (
    <Page mobileShowContent={!!route} contentClassName={styles.column}>
      <Hidden mdUp>
        <ContentHeader
          backLink={`/route/${origin?.id}`}
          heading={`${origin?.name} - ${destination?.name}`}
          buttons={[<RouteShare />]}
        />
      </Hidden>
      <div
        className={classnames(
          styles.map,
          restrictionsExpanded ? styles.collapsed : styles.expanded
        )}
      >
        <Map />
      </div>
      <Hidden mdUp>
        <div
          className={classnames(
            styles.mobilePadding,
            restrictionsExpanded ? styles.expanded : styles.collapsed
          )}
        >
          <RouteRestrictions onExpand={setRestrictionsExpanded} />
        </div>
      </Hidden>
    </Page>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { route, places, origin, destination } = state;
  return { route, places, origin, destination };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  resetRoute: (): SetRouteAction => dispatch(resetRoute()),
  setOrigin: (origin: Place | undefined): SetOriginAction =>
    dispatch(setOrigin(origin)),
  setDestination: (destination: Place | undefined): SetDestinationAction =>
    dispatch(setDestination(destination)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutePage);
