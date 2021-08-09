import _ from "lodash";
import { Divider } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addLastSearchedPlace,
  fetchFavouritePlaces,
  fetchLastSearchedPlaces,
} from "../store/actions";
import {
  AppDispatch,
  AppState,
  SetFavouritePlacesAction,
  SetLastSearchedPlacesAction,
} from "../store/types";
import { Place, SidebarHeading } from "../types";
import PlaceContainer from "./PlaceContainer";
import styles from "./PlaceResults.module.css";
import Info from "../Info/Info";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    searchTerm?: string;
    placeOnClick?: (place: Place) => void;
  };

const PlaceResults: React.FC<Props> = (props) => {
  const {
    searchTerm,
    placeOnClick,
    places,
    favouritePlaces,
    lastSearchedPlaces,
    fetchFavouritePlaces,
    fetchLastSearchedPlaces,
    addLastSearchedPlace,
  } = props;

  const [examplePlaces, setExamplePlaces] = useState<Place[]>([]);
  const [results, setResults] = useState<Place[]>([]);
  const [heading, setHeading] = useState(SidebarHeading.ExamplePlaces);

  const setInitialPlaces = useCallback((): void => {
    if (heading === SidebarHeading.SearchResults) return;
    if (heading === SidebarHeading.LastSearch) return;
    if (favouritePlaces.length > 0) {
      setHeading(SidebarHeading.FavouritePlaces);
      setResults(favouritePlaces);
    } else {
      setHeading(SidebarHeading.ExamplePlaces);
      setResults(examplePlaces);
    }
  }, [heading, examplePlaces, favouritePlaces, setHeading, setResults]);

  const isSearchHeading = useCallback((): boolean => {
    return (
      heading === SidebarHeading.LastSearch ||
      heading === SidebarHeading.SearchResults
    );
  }, [heading]);

  const onClickWrapper = useCallback(
    (place: Place) => {
      if (isSearchHeading()) addLastSearchedPlace(place);
      placeOnClick?.(place);
    },
    [placeOnClick, isSearchHeading, addLastSearchedPlace]
  );

  useEffect(() => {
    setExamplePlaces(places.filter((place) => place.example));
  }, [places, setExamplePlaces]);

  useEffect(() => {
    fetchFavouritePlaces();
    fetchLastSearchedPlaces();
  }, [places, fetchFavouritePlaces, fetchLastSearchedPlaces]);

  useEffect(() => {
    if (_.isNil(searchTerm)) {
      setHeading(SidebarHeading.ExamplePlaces);
      setInitialPlaces();
      return;
    }

    if (searchTerm === "") {
      setHeading(SidebarHeading.LastSearch);
      setResults(lastSearchedPlaces);
      return;
    }

    setHeading(SidebarHeading.SearchResults);
    setResults(
      places.filter(
        (place) =>
          place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, places, lastSearchedPlaces, setInitialPlaces]);

  return (
    <>
      <h4 className={styles.heading}>{heading}</h4>
      <div className={styles.results}>
        <Divider />
        {results.map((place) => (
          <>
            <PlaceContainer
              key={place.id}
              place={place}
              className={styles.result}
              onClick={onClickWrapper}
            />
            <Divider />
          </>
        ))}
        {results.length === 0 && isSearchHeading() ? (
          <div className={styles.result}>
            <Info text="Keine Ergebnisse gefunden." />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { places, favouritePlaces, lastSearchedPlaces } = state;
  return { places, favouritePlaces, lastSearchedPlaces };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchFavouritePlaces: (): SetFavouritePlacesAction =>
    dispatch(fetchFavouritePlaces()),
  fetchLastSearchedPlaces: (): SetLastSearchedPlacesAction =>
    dispatch(fetchLastSearchedPlaces()),
  addLastSearchedPlace: (place: Place): void =>
    dispatch(addLastSearchedPlace(place)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceResults);
