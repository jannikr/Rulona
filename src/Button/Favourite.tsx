import React from "react";
import { IconButton } from "@material-ui/core";

export interface Props<T> {
  element?: T;
  favourites: T[];
  addFavourite: (element: T) => void;
  deleteFavourite: (element: T) => void;
  addIcon: JSX.Element;
  deleteIcon: JSX.Element;
}

const Favourite = <T,>(props: Props<T>): JSX.Element => {
  const {
    element,
    favourites,
    addFavourite,
    deleteFavourite,
    addIcon,
    deleteIcon,
  } = props;
  if (!element) return <></>;
  let icon = addIcon;
  let onClick = addFavourite;
  if (favourites.includes(element)) {
    icon = deleteIcon;
    onClick = deleteFavourite;
  }
  return (
    <>
      <IconButton
        onClick={(): void => {
          onClick(element);
        }}
      >
        {icon}
      </IconButton>
    </>
  );
};

export default Favourite;
