import { Container, Hidden } from "@material-ui/core";
import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
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
  AppState,
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

interface RouteProps {
  origin: string;
  destination: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const RouteSearch: React.FC<Props> = (props): JSX.Element => {
  const {
    places,
    fetchRestrictions,
    resetRestrictions,
    resetRoute,
    resetRouteBoundary,
  } = props;
  const params = useParams<RouteProps>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [currentField, setCurrentField] = useState<Field>();
  const [startPlace, setStartPlace] = useState<Place>();
  const [destinationPlace, setDestinationPlace] = useState<Place>();
  const [loading, setLoading] = useState(false);
  const [restrictionsLoaded, setRestrictionsLoaded] = useState(false);
  const startRef = useRef<HTMLInputElement>();
  const destinationRef = useRef<HTMLInputElement>();

  const getPlace = useCallback(
    (id: string) => {
      return places.find((place) => place.id === id);
    },
    [places]
  );

  const search = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  }, []);

  const focusSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const unfocusSearch = (_: React.FocusEvent<HTMLInputElement>): void => {
    setCurrentField(undefined);
    setSearchTerm(undefined);
  };

  const searchStart = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setStartPlace(undefined);
      search(e);
    },
    [search]
  );

  const searchDestination = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setDestinationPlace(undefined);
      search(e);
    },
    [search]
  );

  const focusStartSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    setCurrentField(Field.Start);
    focusSearch(e);
  };

  const unfocusStartSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    unfocusSearch(e);
  };

  const focusDestinationSearch = (
    e: React.FocusEvent<HTMLInputElement>
  ): void => {
    setCurrentField(Field.Destination);
    focusSearch(e);
  };

  const unfocusDestinationSearch = (
    e: React.FocusEvent<HTMLInputElement>
  ): void => {
    unfocusSearch(e);
  };

  const selectPlace = useCallback(
    (place: Place, field: Field | undefined): void => {
      switch (field) {
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
    },
    [startRef, destinationRef, setStartPlace, setDestinationPlace]
  );

  const placeOnClick = (place: Place): void => {
    selectPlace(place, currentField);
  };

  useEffect(() => {
    const { origin, destination } = params;
    const originPlace = getPlace(origin);
    const destinationPlace = getPlace(destination);
    if (originPlace) selectPlace(originPlace, Field.Start);
    if (destinationPlace) selectPlace(destinationPlace, Field.Destination);
  }, [params, getPlace, selectPlace]);

  useEffect(() => {
    setRestrictionsLoaded(false);
    if (!startPlace || !destinationPlace) {
      resetRestrictions();
      resetRoute();
      resetRouteBoundary();
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
      {_.isNil(searchTerm) && (!startPlace || !destinationPlace) && (
        <Info text="Bitte einen Start- und Ziel-Ort auswählen." />
      )}
      {!_.isNil(searchTerm) && (
        <>
          <PlaceResults searchTerm={searchTerm} placeOnClick={placeOnClick} />
          <PlaceResults placeOnClick={placeOnClick} />
        </>
      )}
      {loading && <Info text="Lade Route..." />}
      <Hidden smDown>
        {_.isNil(searchTerm) && restrictionsLoaded && !loading && (
          <RouteRestrictions
            startPlace={startPlace}
            destinationPlace={destinationPlace}
          />
        )}
      </Hidden>
    </Container>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { places } = state;
  return { places };
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

export default connect(mapStateToProps, mapDispatchToProps)(RouteSearch);
