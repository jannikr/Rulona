import React from "react";
import Bookmark from "@material-ui/icons/Bookmark";
import IconButton from "@material-ui/core/IconButton";
import { Place } from "../types";

interface Props {
  selectedPlace?: Place;
}

const AddFavourite: React.FC<Props> = (props) => {
  const { selectedPlace } = props;
  if (!selectedPlace) return <></>;
  return (
    <>
      <IconButton>
        <Bookmark />
      </IconButton>
    </>
  );
};

export default AddFavourite;
