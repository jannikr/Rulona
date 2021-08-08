import { Grid, Hidden } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RuleOverview from "../RuleOverview/RuleOverview";
import { connect } from "react-redux";
import { AppDispatch, AppState, SelectPlaceAction } from "../store/types";
import { Place } from "../types";
import { RouteComponentProps } from "react-router-dom";
import { deselectPlace, selectPlace } from "../store/actions";
import TutorialContentPlace from "../Info/TutorialContentPlace";
import Page from "../Page/Page";

interface RouteProps {
  placeId?: string;
  categoryId?: string;
}

type Props = RouteComponentProps<RouteProps> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const LandingPage: React.FC<Props> = (props) => {
  const { match, selectedPlace, places, selectPlace, deselectPlace } = props;
  const { placeId } = match.params;
  const [tutorialSeen, setTutorialSeen] = useState(false);

  useEffect(() => {
    const place = placeId
      ? places.find((place) => place.id === placeId)
      : undefined;

    const tutorialSeenLocal = JSON.parse(
      localStorage.getItem("tutorialSeen") || "[]"
    );
    if (`${tutorialSeenLocal}` === "true") {
      setTutorialSeen(true);
    }

    if (!place) deselectPlace();
    if (place) selectPlace(place);
  }, [placeId, places, selectPlace, deselectPlace]);

  return (
    <>
      <Page mobileShowContent={!!selectedPlace}>
      <RuleOverview />
      </Page>
          <Hidden mdUp={true}>
              {!selectedPlace && !tutorialSeen && <TutorialDialog />}
          </Hidden>
          </>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { selectedPlace, places } = state;
  return { selectedPlace, places };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  selectPlace: (place: Place): SelectPlaceAction =>
    dispatch(selectPlace(place)),
  deselectPlace: (): SelectPlaceAction => dispatch(deselectPlace()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
