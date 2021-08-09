import React from "react";
import { IconButton } from "@material-ui/core";
import { Place } from "../types";
import { Directions } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export interface Props {
  place: Place;
}

const PlaceToRoute: React.FC<Props> = (props) => {
  const { place } = props;

  const history = useHistory();

  const onClick = (): void => {
    history.push(`/route/${place.id}`);
  };

  return (
    <IconButton onClick={onClick}>
      <Directions />
    </IconButton>
  );
};

export default PlaceToRoute;
