import { Container } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import CurrentLocation from "../Button/CurrentLocation";
import SearchField from "../SearchField/SearchField";
import { Place } from "../types";
import PlaceResults from "./PlaceResults";

const PlacesSearch: React.FC = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const focusSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const unfocusSearch = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.target.value === "") {
      setSearchTerm(undefined);
    }
  };

  const placeOnClick = useCallback(
    (place: Place) => {
      history.push(`/rules/${place.id}`);
    },
    [history]
  );

  return (
    <Container>
      <SearchField
        label="Suche"
        onChange={search}
        onFocus={focusSearch}
        onBlur={unfocusSearch}
      />
      <CurrentLocation />
      <PlaceResults searchTerm={searchTerm} placeOnClick={placeOnClick} />
    </Container>
  );
};

export default PlacesSearch;
