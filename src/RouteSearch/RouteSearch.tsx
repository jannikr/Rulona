import { Container, Hidden } from "@material-ui/core";
import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Info from "../Info/Info";
import PlaceResults from "../PlacesSearch/PlaceResults";
import SearchField from "../SearchField/SearchField";
import {
  fetchRestrictions,
  resetRestrictions,
  resetRoute,
  setDestination,
  setOrigin,
} from "../store/actions";
import {
  AppState,
  AppDispatch,
  SetRestrictionsAction,
  SetRouteAction,
  SetOriginAction,
  SetDestinationAction,
} from "../store/types";
import { Place } from "../types";
import { setInputValue } from "../utils";
import RouteRestrictions from "./RouteRestrictions";

enum Field {
  Start,
  Destination,
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const RouteSearch: React.FC<Props> = (props): JSX.Element => {
  const {
    origin,
    destination,
    fetchRestrictions,
    resetRestrictions,
    resetRoute,
    setOrigin,
    setDestination,
  } = props;
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [currentField, setCurrentField] = useState<Field>();
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

  const unfocusSearch = (_: React.FocusEvent<HTMLInputElement>): void => {
    setCurrentField(undefined);
    setSearchTerm(undefined);
  };

  const searchStart = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setOrigin(undefined);
      search(e);
    },
    [search, setOrigin]
  );

  const searchDestination = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setDestination(undefined);
      search(e);
    },
    [search, setDestination]
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
          setOrigin(place);
          startRef.current?.blur();
          break;
        }
        case Field.Destination: {
          setInputValue(place.name, destinationRef);
          setDestination(place);
          destinationRef.current?.blur();
          break;
        }
      }
      setSearchTerm(undefined);
    },
    [startRef, destinationRef, setOrigin, setDestination]
  );

  const placeOnClick = (place: Place): void => {
    selectPlace(place, currentField);
  };

  useEffect(() => {
    if (origin) selectPlace(origin, Field.Start);
  }, [origin, selectPlace]);

  useEffect(() => {
    if (destination) selectPlace(destination, Field.Destination);
  }, [destination, selectPlace]);

  useEffect(() => {
    setRestrictionsLoaded(false);
    if (!origin || !destination) {
      resetRestrictions();
      return;
    }
    history.push(`/route/${origin.id}/${destination.id}`);
    setLoading(true);
    fetchRestrictions(origin, destination).then(() => {
      setRestrictionsLoaded(true);
      setLoading(false);
    });
  }, [
    history,
    origin,
    destination,
    fetchRestrictions,
    resetRestrictions,
    resetRoute,
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
      {_.isNil(searchTerm) && (!origin || !destination) && (
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
          <RouteRestrictions />
        )}
      </Hidden>
    </Container>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { origin, destination } = state;
  return { origin, destination };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  resetRestrictions: (): SetRestrictionsAction => dispatch(resetRestrictions()),
  resetRoute: (): SetRouteAction => dispatch(resetRoute()),
  setOrigin: (origin: Place | undefined): SetOriginAction =>
    dispatch(setOrigin(origin)),
  setDestination: (destination: Place | undefined): SetDestinationAction =>
    dispatch(setDestination(destination)),
  fetchRestrictions: (origin: Place, destination: Place): Promise<void> =>
    dispatch(fetchRestrictions(origin, destination)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteSearch);
