import { Container, Divider } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import SearchField from "../SearchField/SearchField";
import { fetchPlaces } from "../store/actions";
import { AppDispatch, AppState, SetPlacesAction } from "../store/types";
import PlaceContainer from "./PlaceContainer";
import styles from "./PlacesSearch.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const PlacesSearch: React.FC<Props> = (props) => {
  const { fetchPlaces, places } = props;

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  const search = (): void => {
    //TODO
  };

  return (
    <Container>
      <SearchField search={search} />
      <h4 className={styles.heading}>Beispiel-Orte</h4>
      <Divider />
      {places
        .filter((place) => place.example)
        .map((place) => (
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesSearch);
