import { Container, Hidden } from "@material-ui/core";
import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Info from "../Info/Info";
import PlaceResults from "../PlacesSearch/PlaceResults";
import SearchField from "../SearchField/SearchField";
import {
  fetchRestrictions,
  resetRestrictions,
  resetRoute,
  resetRouteBoundary,
} from "../store/actions";
import {
  AppDispatch,
  SetRestrictionsAction,
  SetRouteAction,
  SetRouteBoundaryAction,
} from "../store/types";
import { Place } from "../types";
import { setInputValue } from "../utils";
import RouteRestrictions from "./RouteRestrictions";

enum Field {
  Start,
  Destination,
}

type Props = ReturnType<typeof mapDispatchToProps>;

const RouteSearch: React.FC<Props> = (props): JSX.Element => {
  const {
    fetchRestrictions,
    resetRestrictions,
    resetRoute,
    resetRouteBoundary,
  } = props;
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [currentField, setCurrentField] = useState<Field>();
  const [startPlace, setStartPlace] = useState<Place>();
  const [destinationPlace, setDestinationPlace] = useState<Place>();
  const [loading, setLoading] = useState(false);
  const [restrictionsLoaded, setRestrictionsLoaded] = useState(false);
  const startRef = useRef<HTMLInputElement>();
  const destinationRef = useRef<HTMLInputElement>();

  const search = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  }, []);

  const focusSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const unfocusSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    setCurrentField(undefined);
    if (e.target.value === "") {
      setSearchTerm(undefined);
    }
  };

  const searchStart = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      search(e);
    },
    [search]
  );

  const searchDestination = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      search(e);
    },
    [search]
  );

  const focusStartSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    setCurrentField(Field.Start);
    setStartPlace(undefined);
    focusSearch(e);
  };

  const unfocusStartSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    unfocusSearch(e);
  };

  const focusDestinationSearch = (
    e: React.FocusEvent<HTMLInputElement>
  ): void => {
    setCurrentField(Field.Destination);
    setDestinationPlace(undefined);
    focusSearch(e);
  };

  const unfocusDestinationSearch = (
    e: React.FocusEvent<HTMLInputElement>
  ): void => {
    unfocusSearch(e);
  };

  const placeOnClick = (place: Place): void => {
    switch (currentField) {
      case Field.Start: {
        setInputValue(place.name, startRef);
        setStartPlace(place);
        startRef.current?.blur();
        break;
      }
      case Field.Destination: {
        setInputValue(place.name, destinationRef);
        setDestinationPlace(place);
        destinationRef.current?.blur();
        break;
      }
    }
    setSearchTerm(undefined);
  };

  useEffect(() => {
    if (!startPlace || !destinationPlace) {
      resetRestrictions();
      resetRoute();
      resetRouteBoundary();
      setRestrictionsLoaded(false);
      return;
    }
    setLoading(true);
    fetchRestrictions(startPlace, destinationPlace).then(() => {
      setRestrictionsLoaded(true);
      setLoading(false);
    });
  }, [
    startPlace,
    destinationPlace,
    fetchRestrictions,
    resetRestrictions,
    resetRoute,
    resetRouteBoundary,
    setLoading,
    setRestrictionsLoaded,
  ]);

  return (
    <Container>
      <SearchField
        label="Start"
        ref={startRef}
        onChange={searchStart}
        onFocus={focusStartSearch}
        onBlur={unfocusStartSearch}
      />
      <SearchField
        label="Ziel"
        ref={destinationRef}
        onChange={searchDestination}
        onFocus={focusDestinationSearch}
        onBlur={unfocusDestinationSearch}
      />
      {!_.isNil(searchTerm) ? (
        <>
          <PlaceResults searchTerm={searchTerm} placeOnClick={placeOnClick} />
          <PlaceResults placeOnClick={placeOnClick} />
        </>
      ) : (
        <></>
      )}
      <Hidden smDown>
        {restrictionsLoaded ? (
          <RouteRestrictions
            startPlace={startPlace}
            destinationPlace={destinationPlace}
          />
        ) : (
          <></>
        )}
      </Hidden>
      {loading ? <Info text="Lade Route..." /> : <></>}
    </Container>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  resetRestrictions: (): SetRestrictionsAction => dispatch(resetRestrictions()),
  resetRoute: (): SetRouteAction => dispatch(resetRoute()),
  resetRouteBoundary: (): SetRouteBoundaryAction =>
    dispatch(resetRouteBoundary()),
  fetchRestrictions: (origin: Place, destination: Place): Promise<void> =>
    dispatch(fetchRestrictions(origin, destination)),
});

export default connect(null, mapDispatchToProps)(RouteSearch);
