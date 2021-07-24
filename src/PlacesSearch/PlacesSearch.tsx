import { Container } from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import SearchField from "../SearchField/SearchField";
import {
  addLastSearchedPlace,
  fetchFavouritePlaces,
  fetchLastSearchedPlaces,
  fetchPlaces,
} from "../store/actions";
import {
  AppDispatch,
  AppState,
  SetFavouritePlacesAction,
  SetLastSearchedPlacesAction,
  SetPlacesAction,
} from "../store/types";
import { Place, SidebarHeading } from "../types";
import PlaceContainer from "./PlaceContainer";
import styles from "./PlacesSearch.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const PlacesSearch: React.FC<Props> = (props) => {
  const {
    fetchPlaces,
    places,
    favouritePlaces,
    lastSearchedPlaces,
    fetchFavouritePlaces,
    fetchLastSearchedPlaces,
    addLastSearchedPlace,
  } = props;
  const [examplePlaces, setExamplePlaces] = useState<Place[]>([]);
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [showHeading, setShowHeading] = useState(true);
  const [heading, setHeading] = useState(SidebarHeading.ExamplePlaces);

  const setInitialPlaces = useCallback((): void => {
    if (favouritePlaces.length > 0) {
      setHeading(SidebarHeading.FavouritePlaces);
    } else {
      setHeading(SidebarHeading.ExamplePlaces);
    }
    setShowHeading(true);
  }, [favouritePlaces]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  useEffect(() => {
    setInitialPlaces();
  }, [favouritePlaces, setInitialPlaces]);

  useEffect(() => {
    setExamplePlaces(places.filter((place) => place.example));
    fetchFavouritePlaces();
    fetchLastSearchedPlaces();
  }, [places, fetchFavouritePlaces, fetchLastSearchedPlaces]);

  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === "") {
      setHeading(SidebarHeading.LastSearch);
      setShowHeading(true);
    } else {
      setHeading(SidebarHeading.SearchResults);
      setSearchResults(
        places.filter(
          (place) =>
            place.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            place.id.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setShowHeading(false);
    }
  };

  const focusSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.target.value === "") {
      setHeading(SidebarHeading.LastSearch);
      setShowHeading(true);
    }
  };

  const unfocusSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.target.value === "") {
      setInitialPlaces();
    }
  };

  const shownPlaces = useCallback((): JSX.Element | JSX.Element[] => {
    switch (heading) {
      case SidebarHeading.ExamplePlaces: {
        return examplePlaces.map((place) => (
          <PlaceContainer key={place.id} place={place} />
        ));
      }
      case SidebarHeading.FavouritePlaces: {
        return favouritePlaces.map((place) => (
          <PlaceContainer key={place.id} place={place} />
        ));
      }
      case SidebarHeading.LastSearch: {
        return lastSearchedPlaces.map((place) => (
          <PlaceContainer
            key={place.id}
            place={place}
            onClick={addLastSearchedPlace}
          />
        ));
      }
      case SidebarHeading.SearchResults: {
        if (searchResults.length === 0) {
          return <span>Keine Ergebnisse gefunden</span>;
        }
        return searchResults.map((place) => (
          <PlaceContainer
            key={place.id}
            place={place}
            onClick={addLastSearchedPlace}
          />
        ));
      }
      default: {
        return <></>;
      }
    }
  }, [
    heading,
    examplePlaces,
    favouritePlaces,
    lastSearchedPlaces,
    searchResults,
    addLastSearchedPlace,
  ]);

  return (
    <Container>
      <SearchField
        onChange={search}
        onFocus={focusSearch}
        onBlur={unfocusSearch}
      />
      {showHeading && <h4 className={styles.heading}>{heading}</h4>}
      <Divider />
      {shownPlaces()}
    </Container>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { places, favouritePlaces, lastSearchedPlaces } = state;
  return { places, favouritePlaces, lastSearchedPlaces };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchPlaces: (): Promise<SetPlacesAction> => dispatch(fetchPlaces()),
  fetchFavouritePlaces: (): SetFavouritePlacesAction =>
    dispatch(fetchFavouritePlaces()),
  fetchLastSearchedPlaces: (): SetLastSearchedPlacesAction =>
    dispatch(fetchLastSearchedPlaces()),
  addLastSearchedPlace: (place: Place): void =>
    dispatch(addLastSearchedPlace(place)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesSearch);
