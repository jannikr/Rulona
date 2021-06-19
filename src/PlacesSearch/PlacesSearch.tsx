import { Container, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchField from "../SearchField/SearchField";
import { fetchFavouritePlaces, fetchPlaces } from "../store/actions";
import {
  AppDispatch,
  AppState,
  SetFavouritePlacesAction,
  SetPlacesAction,
} from "../store/types";
import { Place } from "../types";
import PlaceContainer from "./PlaceContainer";
import styles from "./PlacesSearch.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const PlacesSearch: React.FC<Props> = (props) => {
  const { fetchPlaces, places, fetchFavouritePlaces } = props;
  const [shownPlaces, setShownPlaces] = useState<Place[]>([]);
  const [showHeading, setShowHeading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  useEffect(() => {
    setShownPlaces(places.filter((place) => place.example));
  }, [places]);

  useEffect(() => {
    fetchFavouritePlaces();
  }, [places, fetchFavouritePlaces]);

  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === "") {
      setShownPlaces(places.filter((place) => place.example));
      setShowHeading(true);
    } else {
      setShownPlaces(
        places.filter(
          (place) =>
            place.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            place.id.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setShowHeading(false);
    }
  };

  return (
    <Container>
      <SearchField search={search} />
      {showHeading && <h4 className={styles.heading}>Beispiel-Orte</h4>}
      <Divider />
      {shownPlaces.map((place) => (
        <PlaceContainer key={place.id} place={place} />
      ))}
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
  fetchPlaces: (): Promise<SetPlacesAction> => dispatch(fetchPlaces()),
  fetchFavouritePlaces: (): SetFavouritePlacesAction =>
    dispatch(fetchFavouritePlaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesSearch);
